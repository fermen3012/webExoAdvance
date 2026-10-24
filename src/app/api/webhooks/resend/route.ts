import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { createClient } from "@supabase/supabase-js";
import { Database } from "@/lib/supabase/types";
import { processLeadReplyWithAI, processLeadWithAI } from "@/lib/ai/agent";
import { extractCleanEmailReply } from "@/lib/utils";

function getSupabaseBackendClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder-project.supabase.co";
  const supabaseKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
    "placeholder-key";

  return createClient<Database>(supabaseUrl, supabaseKey);
}

/**
 * Resend Inbound Webhook Endpoint
 * Listens for incoming email responses from prospective clients at contact@exoadvancellc.com
 * and triggers Karen Mendoza to continue the sales conversation autonomously.
 */
export async function POST(req: NextRequest) {
  try {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.warn("[EXO_WEBHOOK_WARN] RESEND_API_KEY is not configured.");
      return NextResponse.json({ error: "Server configuration missing" }, { status: 500 });
    }

    const payload = await req.json();
    console.log("[EXO_RESEND_WEBHOOK_RECEIVED] Event type:", payload?.type);

    // Only process inbound emails
    if (payload?.type !== "email.received") {
      return NextResponse.json({ message: "Ignored event type", type: payload?.type });
    }

    const emailId = payload?.data?.email_id;
    const rawFrom = payload?.data?.from || "";
    const subject = payload?.data?.subject || "";

    // Extract raw email address (handles "John Doe <john@example.com>" or "john@example.com")
    const emailMatch = rawFrom.match(/<([^>]+)>/);
    const senderEmail = (emailMatch ? emailMatch[1] : rawFrom).trim().toLowerCase();

    if (!senderEmail || !emailId) {
      return NextResponse.json({ error: "Missing required sender email or email_id" }, { status: 400 });
    }

    // Defensive loop prevention: Never respond to our own outbound addresses or daemons
    if (
      senderEmail.includes("contact@exoadvancellc.com") ||
      senderEmail.includes("exoadvancellc.com") ||
      senderEmail.includes("amazonses.com") ||
      senderEmail.includes("no-reply") ||
      senderEmail.includes("noreply")
    ) {
      console.log("[EXO_WEBHOOK_LOOP_GUARD] Skipping internal or daemon address:", senderEmail);
      return NextResponse.json({ message: "Loop prevention triggered for internal email" });
    }

    // Fetch the full content of the received email from Resend Inbound API
    const resend = new Resend(apiKey);
    const emailDetails = await resend.emails.receiving.get(emailId);

    if (emailDetails.error || !emailDetails.data) {
      console.error("[EXO_WEBHOOK_GET_EMAIL_ERROR]", emailDetails.error);
      return NextResponse.json({ error: "Failed to retrieve email content from Resend" }, { status: 502 });
    }

    const emailText = emailDetails.data.text || "";
    const cleanReply = extractCleanEmailReply(emailText);

    if (!cleanReply) {
      console.warn("[EXO_WEBHOOK_WARN] Received empty email reply from:", senderEmail);
      return NextResponse.json({ message: "Empty email reply body" });
    }

    console.log(`[EXO_WEBHOOK_CLIENT_REPLY] From: ${senderEmail} | Subject: ${subject} | Content: "${cleanReply}"`);

    const supabase = getSupabaseBackendClient();

    // 1. Look up existing lead by sender email
    const { data: existingLead, error: leadLookupErr } = await supabase
      .from("leads")
      .select("*")
      .ilike("email", senderEmail)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (leadLookupErr) {
      console.error("[EXO_WEBHOOK_LEAD_LOOKUP_ERROR]", leadLookupErr);
    }

    if (existingLead) {
      // 2a. Existing Lead: Record client's new message in interactions
      const { error: intErr } = await supabase.from("interactions").insert({
        lead_id: existingLead.id,
        type: "client_reply",
        content: cleanReply,
        metadata: {
          email_id: emailId,
          subject,
          received_at: new Date().toISOString(),
        },
      });

      if (intErr) {
        console.error("[EXO_WEBHOOK_INSERT_REPLY_ERROR]", intErr);
      }

      // Fetch recent interaction history to feed the AI full conversational context
      const { data: pastInteractions } = await supabase
        .from("interactions")
        .select("type, content")
        .eq("lead_id", existingLead.id)
        .order("created_at", { ascending: true })
        .limit(12);

      // Trigger Karen Mendoza multi-turn conversational response
      await processLeadReplyWithAI({
        leadId: existingLead.id,
        leadData: {
          full_name: existingLead.full_name,
          company: existingLead.company,
          email: existingLead.email,
          service: existingLead.service || "Technology Solutions",
        },
        clientReply: cleanReply,
        conversationHistory: (pastInteractions || []).map((i) => ({
          type: i.type,
          content: i.content,
        })),
      });

      return NextResponse.json({
        success: true,
        mode: "reply_processed",
        leadId: existingLead.id,
      });
    } else {
      // 2b. New inbound lead who emailed contact@exoadvancellc.com directly
      const clientName = (emailDetails.data.from || senderEmail).split("@")[0].replace(/[._-]/g, " ");

      const { data: newLead, error: insertLeadErr } = await supabase
        .from("leads")
        .insert({
          full_name: clientName,
          email: senderEmail,
          service: "Direct Inbound Consultation",
          message: cleanReply,
          status: "new",
          source: "email_inbound",
        })
        .select()
        .single();

      if (insertLeadErr || !newLead) {
        console.error("[EXO_WEBHOOK_CREATE_LEAD_ERROR]", insertLeadErr);
        return NextResponse.json({ error: "Failed to create lead from email" }, { status: 500 });
      }

      // Record first interaction
      await supabase.from("interactions").insert({
        lead_id: newLead.id,
        type: "website_inquiry",
        content: cleanReply,
        metadata: {
          email_id: emailId,
          subject,
          source: "email_inbound",
        },
      });

      // Process with initial AI lead engine
      await processLeadWithAI(newLead.id, {
        full_name: newLead.full_name,
        email: newLead.email,
        service: newLead.service,
        message: cleanReply,
      });

      return NextResponse.json({
        success: true,
        mode: "new_lead_created",
        leadId: newLead.id,
      });
    }
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : "Unknown error";
    console.error("[EXO_WEBHOOK_FATAL_ERROR]", errorMsg);
    return NextResponse.json({ error: errorMsg }, { status: 500 });
  }
}
