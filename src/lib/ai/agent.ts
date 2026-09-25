import { createClient } from "@supabase/supabase-js";
import { Database } from "@/lib/supabase/types";
import { sendLeadEmailToClient } from "@/lib/email/send-email";

export interface AIAnalysisResult {
  aiScore: number;
  sentiment: "Urgent" | "High Interest" | "Standard Inquiry" | "Exploring";
  intentSummary: string;
  recommendedResponse: string;
}

function getSupabaseBackendClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://enbrjdaypbeessebizfu.supabase.co";
  const supabaseKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
    "sb_publishable_fskndaJSFbDZoRGiEhjjWA_X7IDH9CJ";

  return createClient<Database>(supabaseUrl, supabaseKey);
}

/**
 * Intelligent AI Lead Processing & Response Engine
 * Analyzes incoming leads, computes qualification scores, and generates tailored responses.
 */
export async function processLeadWithAI(leadId: string, leadData: {
  full_name: string;
  company?: string | null;
  email: string;
  phone?: string | null;
  service: string;
  message: string;
}): Promise<AIAnalysisResult | null> {
  try {
    const apiKey = process.env.OPENAI_API_KEY;
    let aiResult: AIAnalysisResult;

    if (apiKey) {
      try {
        const prompt = `You are the Lead Solutions Architect and AI Technical Consultant for Exo Advance LLC, a high-tech software engineering agency specializing in Restaurant Technology, Software Development, Business Intelligence, and Custom Software.

Analyze the following prospective client lead:
- Client Name: ${leadData.full_name}
- Company: ${leadData.company || "N/A"}
- Service Requested: ${leadData.service}
- Client Message: "${leadData.message}"

Your task is to generate an automated follow-up email that warmly acknowledges their request and asks 3-4 specific, highly relevant technical and operational follow-up questions to gather critical project details (such as current stack, project scope, key features, budget/timeline, or integrations needed).

Return a valid JSON object with the exact keys:
1. "aiScore": a number from 1 to 100 based on lead quality and enterprise potential.
2. "sentiment": one of ["Urgent", "High Interest", "Standard Inquiry", "Exploring"].
3. "intentSummary": a concise 1-2 sentence summary of what the client is asking for.
4. "recommendedResponse": a polished, professional email response addressed to ${leadData.full_name}, acknowledging their inquiry and asking 3-4 precise follow-up questions to request more details about their project.`;

        const response = await fetch("https://api.openai.com/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            model: "gpt-4o-mini",
            messages: [{ role: "user", content: prompt }],
            response_format: { type: "json_object" },
            temperature: 0.7,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          const content = JSON.parse(data.choices[0].message.content);
          aiResult = {
            aiScore: typeof content.aiScore === "number" ? content.aiScore : 85,
            sentiment: content.sentiment || "High Interest",
            intentSummary: content.intentSummary || "Client is inquiring about technical implementation.",
            recommendedResponse: content.recommendedResponse || "Thank you for contacting Exo Advance. Our team is reviewing your project.",
          };
        } else {
          aiResult = generateContextualFallback(leadData);
        }
      } catch {
        aiResult = generateContextualFallback(leadData);
      }
    } else {
      aiResult = generateContextualFallback(leadData);
    }

    // Direct Supabase Client (No cookies() dependency so it runs cleanly in background/standalone context)
    const supabase = getSupabaseBackendClient();

    // Insert AI response into interactions table
    const { error: aiIntErr } = await supabase.from("interactions").insert({
      lead_id: leadId,
      type: "ai_response",
      content: aiResult.recommendedResponse,
      sentiment: aiResult.sentiment,
      ai_score: aiResult.aiScore,
      metadata: {
        intent_summary: aiResult.intentSummary,
        generated_at: new Date().toISOString(),
        engine: apiKey ? "openai-gpt-4o-mini" : "exo-ai-rules-v1",
      },
    });

    if (aiIntErr) {
      console.error("[EXO_AI_AGENT_INSERT_ERROR] Failed to save AI response interaction:", aiIntErr.message, aiIntErr);
    }

    // Automatically send response email to client
    try {
      await sendLeadEmailToClient({
        toEmail: leadData.email,
        clientName: leadData.full_name,
        service: leadData.service,
        aiResponseContent: aiResult.recommendedResponse,
      });
    } catch (emailErr) {
      console.error("[EXO_AI_EMAIL_DISPATCH_ERROR]", emailErr);
    }

    // Update lead status & notes with AI insights
    await supabase
      .from("leads")
      .update({
        status: "ai_processed",
        notes: `[AI Analysis] Score: ${aiResult.aiScore}/100 | Sentiment: ${aiResult.sentiment} | Intent: ${aiResult.intentSummary}`,
      })
      .eq("id", leadId);

    return aiResult;
  } catch (error) {
    console.error("[EXO_AI_AGENT_ERROR]", error);
    return null;
  }
}

/**
 * Contextual fallback generator tuned to Exo Advance LLC service offerings
 */
function generateContextualFallback(leadData: {
  full_name: string;
  company?: string | null;
  service: string;
  message: string;
}): AIAnalysisResult {
  const msgLower = leadData.message.toLowerCase();
  let score = 75;
  let sentiment: AIAnalysisResult["sentiment"] = "Standard Inquiry";

  if (msgLower.includes("urgent") || msgLower.includes("asap") || msgLower.includes("immediately")) {
    score += 15;
    sentiment = "Urgent";
  } else if (msgLower.includes("budget") || msgLower.includes("quote") || msgLower.includes("enterprise") || leadData.company) {
    score += 10;
    sentiment = "High Interest";
  }

  const companyMention = leadData.company ? ` at ${leadData.company}` : "";
  
  let serviceSpecificText = "";
  let followUpQuestions = "";

  if (leadData.service.includes("Restaurant")) {
    serviceSpecificText = "Our specialized POS integrations, automated kitchen operations, and analytics tools are built to streamline high-volume hospitality environments.";
    followUpQuestions = `To help us prepare a tailored proposal, could you share a few more details:
1. What POS or kitchen ordering system are you currently using (or planning to implement)?
2. How many locations or active terminals will require integration?
3. What are your main operational bottlenecks (e.g., order sync speed, inventory tracking, mobile ordering)?`;
  } else if (leadData.service.includes("Software")) {
    serviceSpecificText = "We architect scalable cloud-native web applications, mobile platforms, and high-performance microservices tailored to high-growth businesses.";
    followUpQuestions = `To help us design the right software architecture, could you clarify:
1. Is this a new custom application from scratch, or an upgrade to an existing platform?
2. What target platforms are required (Web, Mobile iOS/Android, Desktop, or Cloud Backend API)?
3. What is your estimated launch timeline or key milestone target?`;
  } else if (leadData.service.includes("Business Intelligence")) {
    serviceSpecificText = "Our custom BI dashboards, predictive AI modeling, and data warehouse pipelines transform raw operational data into real-time decision-making assets.";
    followUpQuestions = `To help us build your data intelligence pipeline, could you share:
1. What primary data sources or databases will need to be connected (e.g., PostgreSQL, BigQuery, Shopify, ERP)?
2. What key KPIs or real-time metrics do you want visible on your executive dashboard?
3. How many active team members or managers will need dashboard access?`;
  } else {
    serviceSpecificText = "Exo Advance specializes in custom end-to-end technology architectures tailored specifically to complex enterprise workflows.";
    followUpQuestions = `To help us evaluate your project requirements, could you provide:
1. What are the main features or core capabilities required for the platform?
2. Are there any existing third-party APIs or external tools that must be integrated?
3. What is your target timeline or start date for development?`;
  }

  const recommendedResponse = `Dear ${leadData.full_name},

Thank you for reaching out to Exo Advance LLC regarding your inquiry on ${leadData.service}${companyMention}.

${serviceSpecificText}

To ensure our Senior Software Architect can prepare an accurate technical proposal and project scope for you, could you please provide a bit more context on the following points?

${followUpQuestions}

Once you reply with these details, our engineering team will deliver a comprehensive project blueprint and estimated timeline within 24 hours.

Best regards,
The Exo Advance AI & Engineering Team
Exo Advance LLC // Technological Innovation & Software Architecture`;

  return {
    aiScore: Math.min(score, 98),
    sentiment,
    intentSummary: `Prospective lead requesting specialized ${leadData.service} solutions.`,
    recommendedResponse,
  };
}
