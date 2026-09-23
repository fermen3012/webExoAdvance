import { createClient } from "@supabase/supabase-js";
import { Database } from "@/lib/supabase/types";

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
        const prompt = `You are the lead AI Engineer and Solutions Consultant for Exo Advance LLC, a high-tech software and technology agency specializing in Restaurant Technology, Software Development, Business Intelligence, and Custom Software Solutions.

Analyze the following prospective client lead:
- Name: ${leadData.full_name}
- Company: ${leadData.company || "N/A"}
- Service of Interest: ${leadData.service}
- Message: "${leadData.message}"

Return a valid JSON object with the following exact keys:
1. "aiScore": a number from 1 to 100 based on lead quality and budget indicators.
2. "sentiment": one of ["Urgent", "High Interest", "Standard Inquiry", "Exploring"].
3. "intentSummary": a concise 1-2 sentence summary of what the client needs.
4. "recommendedResponse": a professional, warm, and highly personalized email response from Exo Advance addressing their specific project goals.`;

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
    await supabase.from("interactions").insert({
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
  message: string;}): AIAnalysisResult {
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
  if (leadData.service.includes("Restaurant")) {
    serviceSpecificText = "Our specialized POS integrations, automated kitchen operations, and analytics tools are built to streamline high-volume hospitality environments.";
  } else if (leadData.service.includes("Software")) {
    serviceSpecificText = "We architect scalable cloud-native web applications, mobile platforms, and high-performance microservices tailored to high-growth businesses.";
  } else if (leadData.service.includes("Business Intelligence")) {
    serviceSpecificText = "Our custom BI dashboards, predictive AI modeling, and data warehouse pipelines transform raw operational data into real-time decision-making assets.";
  } else {
    serviceSpecificText = "Exo Advance specializes in custom end-to-end technology architectures tailored specifically to complex enterprise workflows.";
  }

  const recommendedResponse = `Dear ${leadData.full_name},

Thank you for reaching out to Exo Advance LLC regarding your inquiry on ${leadData.service}${companyMention}.

${serviceSpecificText}

Based on your message ("${leadData.message.slice(0, 120)}${leadData.message.length > 120 ? "..." : ""}"), an Exo Advance Senior Software Architect has been assigned to your request and will follow up with you within 24 hours with a custom technical proposal and project timeline.

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
