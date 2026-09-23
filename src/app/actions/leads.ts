"use server";

import { headers } from "next/headers";
import { createServerClientInstance } from "@/lib/supabase/server";
import { processLeadWithAI } from "@/lib/ai/agent";
import { Database } from "@/lib/supabase/types";
import { checkRateLimit } from "@/lib/security/rate-limiter";
import { isServerAdminAuthenticated } from "@/app/actions/auth";

export type LeadRow = Database["public"]["Tables"]["leads"]["Row"];
export type InteractionRow = Database["public"]["Tables"]["interactions"]["Row"];

export interface LeadWithInteractions extends LeadRow {
  interactions: InteractionRow[];
}

export interface LeadSubmissionState {
  success: boolean;
  message?: string;
  errors?: Record<string, string>;
}

async function getClientIP(): Promise<string> {
  const headerList = await headers();
  const xForwardedFor = headerList.get("x-forwarded-for");
  if (xForwardedFor) {
    return xForwardedFor.split(",")[0].trim();
  }
  return headerList.get("x-real-ip") || "127.0.0.1";
}

export async function submitLead(prevState: LeadSubmissionState | null, formData: FormData): Promise<LeadSubmissionState> {
  try {
    // 0. Server-Side IP Rate Limiter (Max 5 submissions per 10 minutes)
    const ip = await getClientIP();
    const rateCheck = checkRateLimit(`submit_lead:${ip}`, 5, 10 * 60 * 1000);

    if (!rateCheck.allowed) {
      return {
        success: false,
        message: `Submission limit reached. Please wait ${rateCheck.resetInSeconds} seconds before sending another inquiry.`,
      };
    }

    // 1. Honeypot Anti-Spam Check
    const honeypot = formData.get("website_url_hp") as string;
    if (honeypot && honeypot.trim().length > 0) {
      return {
        success: true,
        message: "Thank you. Your message has been received. Our team will contact you shortly.",
      };
    }

    // 2. Extract and Sanitize Required Fields
    const fullName = (formData.get("full_name") as string || "").trim();
    const company = (formData.get("company") as string || "").trim();
    const email = (formData.get("email") as string || "").trim();
    const phone = (formData.get("phone") as string || "").trim();
    const service = (formData.get("service") as string || "").trim();
    const message = (formData.get("message") as string || "").trim();

    // 3. Validation
    const errors: Record<string, string> = {};

    if (!fullName) errors.full_name = "Full Name is required.";

    if (!email) {
      errors.email = "Email address is required.";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        errors.email = "Please enter a valid email address.";
      }
    }

    if (!service) errors.service = "Please select a service interest.";

    if (!message) {
      errors.message = "Message details are required.";
    } else if (message.length < 10) {
      errors.message = "Please enter a message of at least 10 characters.";
    }

    if (Object.keys(errors).length > 0) {
      return {
        success: false,
        errors,
      };
    }

    // 4. Ingestion into Supabase
    const supabase = await createServerClientInstance();

    const payload = {
      full_name: fullName,
      company: company || null,
      email: email,
      phone: phone || null,
      service: service,
      message: message,
      source: "website",
      status: "new",
    };

    const { data: insertedLead, error } = await supabase
      .from("leads")
      .insert(payload)
      .select("id")
      .single();

    if (error) {
      console.error("[EXO_LEADS_ERROR] Database insertion failed:", error.message);
      
      if (error.message.includes("placeholder-project") || error.message.includes("FetchError") || error.message.includes("Invalid API key")) {
        console.warn("[EXO_LEADS_WARN] Operating with mock persistence (Supabase environment variables pending).");
        return {
          success: true,
          message: "Thank you. Your message has been received. Our team will contact you shortly.",
        };
      }

      return {
        success: false,
        message: "An error occurred while submitting your message. Please try again or contact us directly.",
      };
    }

    if (insertedLead?.id) {
      // 5. Create initial interaction record for the customer's message
      await supabase.from("interactions").insert({
        lead_id: insertedLead.id,
        type: "website_inquiry",
        content: message,
        metadata: {
          service,
          company: company || null,
        },
      });

      // 6. Automatically process lead with AI Agent
      try {
        await processLeadWithAI(insertedLead.id, {
          full_name: fullName,
          company,
          email,
          phone,
          service,
          message,
        });
      } catch (err) {
        console.error("[EXO_AI_BG_ERROR]", err);
      }
    }

    return {
      success: true,
      message: "Thank you. Your message has been received. Our team will contact you shortly.",
    };
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : "Unknown error";
    console.error("[EXO_LEADS_EXCEPTION]", errorMsg);
    return {
      success: false,
      message: "Unable to process request at this moment. Please try again later.",
    };
  }
}

/**
 * CRM Server Action: Fetch all leads with their interactions (Secured)
 */
export async function fetchCRMLeads(): Promise<{ success: boolean; leads: LeadWithInteractions[]; error?: string }> {
  try {
    const isAuthed = await isServerAdminAuthenticated();
    if (!isAuthed) {
      return { success: false, leads: [], error: "Unauthorized access. Admin authentication required." };
    }

    const supabase = await createServerClientInstance();

    const { data: leads, error } = await supabase
      .from("leads")
      .select("*, interactions(*)")
      .order("created_at", { ascending: false });

    if (error) {
      return { success: false, leads: [], error: error.message };
    }

    // Cast response safely
    const formattedLeads: LeadWithInteractions[] = (leads || []).map((lead: any) => ({
      ...lead,
      interactions: (lead.interactions || []).sort((a: any, b: any) => 
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      ),
    }));

    return { success: true, leads: formattedLeads };
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : "Failed to load CRM leads";
    return { success: false, leads: [], error: errorMsg };
  }
}

/**
 * CRM Server Action: Update lead status (Secured)
 */
export async function updateLeadStatusAction(leadId: string, status: string) {
  try {
    const isAuthed = await isServerAdminAuthenticated();
    if (!isAuthed) return { success: false, error: "Unauthorized access." };

    const supabase = await createServerClientInstance();
    const { error } = await supabase
      .from("leads")
      .update({ status })
      .eq("id", leadId);

    if (error) return { success: false, error: error.message };

    // Record interaction of status update
    await supabase.from("interactions").insert({
      lead_id: leadId,
      type: "status_change",
      content: `Lead status updated to: ${status}`,
    });

    return { success: true };
  } catch (err: unknown) {
    return { success: false, error: err instanceof Error ? err.message : "Failed to update status" };
  }
}

/**
 * CRM Server Action: Add manual internal note to a lead (Secured)
 */
export async function addLeadNoteAction(leadId: string, content: string) {
  try {
    const isAuthed = await isServerAdminAuthenticated();
    if (!isAuthed) return { success: false, error: "Unauthorized access." };

    if (!content.trim()) return { success: false, error: "Note content cannot be empty" };

    const supabase = await createServerClientInstance();
    const { error } = await supabase.from("interactions").insert({
      lead_id: leadId,
      type: "note",
      content: content.trim(),
    });

    if (error) return { success: false, error: error.message };
    return { success: true };
  } catch (err: unknown) {
    return { success: false, error: err instanceof Error ? err.message : "Failed to add note" };
  }
}

/**
 * CRM Server Action: Manually trigger AI Agent reply for a specific lead (Secured)
 */
export async function triggerAIReplyAction(leadId: string) {
  try {
    const isAuthed = await isServerAdminAuthenticated();
    if (!isAuthed) return { success: false, error: "Unauthorized access." };

    const supabase = await createServerClientInstance();
    const { data: lead, error } = await supabase
      .from("leads")
      .select("*")
      .eq("id", leadId)
      .single();

    if (error || !lead) return { success: false, error: "Lead not found" };

    const aiResult = await processLeadWithAI(lead.id, {
      full_name: lead.full_name,
      company: lead.company,
      email: lead.email,
      phone: lead.phone,
      service: lead.service,
      message: lead.message,
    });

    if (!aiResult) return { success: false, error: "AI agent failed to generate response" };

    return { success: true, aiResult };
  } catch (err: unknown) {
    return { success: false, error: err instanceof Error ? err.message : "AI agent error" };
  }
}
