import { createClient } from "@supabase/supabase-js";
import { Database } from "@/lib/supabase/types";
import { sendLeadEmailToClient, sendAdminNewLeadNotification } from "@/lib/email/send-email";
import { isSpanishText } from "@/lib/utils";

export interface AIAnalysisResult {
  aiScore: number;
  sentiment: "Urgent" | "High Interest" | "Standard Inquiry" | "Exploring";
  intentSummary: string;
  recommendedResponse: string;
}

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
        const prompt = `You are Karen Mendoza, Senior Solutions & Sales Specialist for Exo Advance LLC (https://www.exoadvancellc.com). We build custom SaaS platforms, Exo Server restaurant kiosk POS systems, and executive Business Intelligence dashboards.

A prospective client just contacted us through our website:
- Client Name: ${leadData.full_name}
- Company: ${leadData.company || "N/A"}
- Service Requested: ${leadData.service}
- Client Message: "${leadData.message}"

CRITICAL MANDATORY REQUIREMENT - LANGUAGE MATCHING:
Detect the exact language used by the client in their message ("${leadData.message}").
- If the client wrote in SPANISH (e.g. Spanish words, inquiries, or Hispanic phrasing), you MUST write the ENTIRE "recommendedResponse" in natural, warm, professional Latin American / Spanish business language.
- If the client wrote in ENGLISH, write in professional English.
- If in another language, write in that same language.
NEVER reply in English if the client contacted us in Spanish.

Your objective is to act as an attentive, consultative sales specialist who wants to understand their exact business needs and close the deal.
Craft a warm, highly professional follow-up email that:
1. Warmly thanks them and acknowledges their specific inquiry.
2. Explains briefly how Exo Advance helps businesses in their industry eliminate operational chaos and boost revenue.
3. Asks 3 strategic qualifying questions to understand their scope, timeline, and current bottlenecks.
4. Invites them to reply with details or set up a quick 10-minute live demo/strategy call.

Return a valid JSON object with the exact keys:
1. "aiScore": a number from 1 to 100 based on buyer intent, budget cues, and enterprise potential.
2. "sentiment": one of ["Urgent", "High Interest", "Standard Inquiry", "Exploring"].
3. "intentSummary": a concise 1-2 sentence commercial summary of what the client wants to achieve.
4. "recommendedResponse": the full polished sales email text addressed to ${leadData.full_name}, signed by "Karen Mendoza | Senior Solutions & Sales Specialist, Exo Advance LLC".`;

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
            recommendedResponse: content.recommendedResponse || "Thank you for contacting Exo Advance. Our sales team is reviewing your project.",
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
      const isSpanish = isSpanishText(leadData.message);
      await sendLeadEmailToClient({
        toEmail: leadData.email,
        clientName: leadData.full_name,
        service: leadData.service,
        aiResponseContent: aiResult.recommendedResponse,
        language: isSpanish ? "es" : "en",
      });

      // Send instant notification to Exo Advance admin
      await sendAdminNewLeadNotification({
        leadId,
        fullName: leadData.full_name,
        email: leadData.email,
        phone: leadData.phone,
        company: leadData.company,
        service: leadData.service,
        message: leadData.message,
        aiScore: aiResult.aiScore,
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
 * Contextual sales fallback generator tuned to Exo Advance LLC service offerings
 * Automatically detects whether the client writes in Spanish or English and matches the language.
 */
function generateContextualFallback(leadData: {
  full_name: string;
  company?: string | null;
  service: string;
  message: string;
}): AIAnalysisResult {
  const isSpanish = isSpanishText(leadData.message);
  const msgLower = leadData.message.toLowerCase();
  let score = 75;
  let sentiment: AIAnalysisResult["sentiment"] = "Standard Inquiry";

  if (
    msgLower.includes("urgent") || msgLower.includes("urgente") ||
    msgLower.includes("asap") || msgLower.includes("inmediat") ||
    msgLower.includes("cuanto antes")
  ) {
    score += 15;
    sentiment = "Urgent";
  } else if (
    msgLower.includes("budget") || msgLower.includes("presupuesto") ||
    msgLower.includes("quote") || msgLower.includes("cotiz") ||
    msgLower.includes("price") || msgLower.includes("precio") ||
    msgLower.includes("costo") || leadData.company
  ) {
    score += 10;
    sentiment = "High Interest";
  }

  const companyMention = leadData.company
    ? isSpanish
      ? ` para ${leadData.company}`
      : ` for ${leadData.company}`
    : "";

  let serviceHeadline = "";
  let serviceValueProp = "";
  let followUpQuestions = "";

  if (isSpanish) {
    if (leadData.service.includes("Restaurant")) {
      serviceHeadline = `Exo Server OS y Kioscos Autoservicio para Restaurantes${companyMention}`;
      serviceValueProp =
        "Nuestro sistema operativo especializado para restaurantes está diseñado para eliminar filas en caja, agilizar la rotación de mesas y elevar el ticket promedio con pantallas táctiles de autoservicio y comandas digitales QR.";
      followUpQuestions = `Para que nuestro equipo prepare una propuesta personalizada y una demo en vivo adaptada a su operación, ¿podría compartirnos algunos detalles rápidos:
1. ¿Qué sistema POS o de comandas utilizan actualmente (o están evaluando)?
2. ¿Cuántas sucursales o terminales/kioscos táctiles tienen proyectado equipar?
3. ¿Cuál es su fecha objetivo de implementación, y le gustaría ver una demostración en vivo de 10 minutos de los kioscos en funcionamiento?`;
    } else if (leadData.service.includes("Software")) {
      serviceHeadline = `Desarrollo de Software a la Medida y Plataformas Web${companyMention}`;
      serviceValueProp =
        "Diseñamos y programamos aplicaciones web en la nube, portales para clientes y paneles administrativos 100% adaptados al flujo operativo de su negocio, eliminando el caos operativo y reuniendo todo en un solo lugar.";
      followUpQuestions = `Para diseñar la solución técnica adecuada y brindarle un presupuesto detallado:
1. ¿Cuál es el principal cuello de botella o proceso manual que necesitan automatizar?
2. ¿Qué sistemas externos, pasarelas de pago o APIs necesitan integrar?
3. ¿Cuál es la fecha estimada o meta clave para el lanzamiento del sistema?`;
    } else if (leadData.service.includes("Business Intelligence")) {
      serviceHeadline = `Inteligencia de Negocios Ejecutiva y Dashboards en Vivo${companyMention}`;
      serviceValueProp =
        "Nuestros paneles ejecutivos y canalizaciones de datos automatizadas brindan a la dirección visibilidad en tiempo real sobre ventas diarias, márgenes de ganancia y salud de inventario directo en el móvil o computador, eliminando horas de reportes manuales en hojas de cálculo.";
      followUpQuestions = `Para configurar la arquitectura de datos adecuada a su empresa:
1. ¿Dónde se encuentra almacenada su información actualmente (PostgreSQL, ERP, Shopify, Excel)?
2. ¿Cuáles son los 3 indicadores clave (KPIs) más importantes que necesitan consultar cada mañana?
3. ¿Cuántos directivos, gerentes o usuarios requerirán acceso a los dashboards?`;
    } else {
      serviceHeadline = `Soluciones Tecnológicas a la Medida${companyMention}`;
      serviceValueProp =
        "Exo Advance desarrolla software especializado y sistemas operativos inteligentes diseñados para simplificar su operación, automatizar tareas repetitivas y escalar su negocio.";
      followUpQuestions = `Para evaluar su requerimiento y entregarle un plan claro de trabajo:
1. ¿Cuál es el principal desafío o meta que desean resolver con este proyecto?
2. ¿Cuentan con un sistema actual que deba migrarse o conectarse?
3. ¿Cuándo tienen previsto iniciar y les gustaría coordinar una llamada estratégica de 10 minutos?`;
    }
  } else {
    // English
    if (leadData.service.includes("Restaurant")) {
      serviceHeadline = `Exo Server Restaurant OS & Kiosks${companyMention}`;
      serviceValueProp =
        "Our specialized restaurant operating system is designed to eliminate line bottlenecks, speed up table turns, and increase average ticket size by +$4.20 with touchscreen self-service kiosks and digital QR ordering.";
      followUpQuestions = `To help our team prepare a customized proposal and live demo tailored to your operation, could you share a few quick details:
1. What POS or ordering system are you currently using (or evaluating)?
2. How many locations or ordering terminals (kiosks / tables) are you looking to equip?
3. What is your ideal launch timeline, and would you like to see a 10-minute live demo of the kiosks in action?`;
    } else if (leadData.service.includes("Software")) {
      serviceHeadline = `Custom Software & Enterprise Web Platforms${companyMention}`;
      serviceValueProp =
        "We engineer tailored cloud web applications, client portals, and administrative hubs built 100% around your business workflow so all your operations run smoothly in one place.";
      followUpQuestions = `To help us design the right software solution and provide an accurate cost estimate:
1. What is the primary operational bottleneck or manual process you want to automate?
2. What third-party tools, payment gateways, or APIs need to be integrated?
3. What is your target timeline or key milestone for going live?`;
    } else if (leadData.service.includes("Business Intelligence")) {
      serviceHeadline = `Executive Business Intelligence & Live Dashboards${companyMention}`;
      serviceValueProp =
        "Our executive dashboards and automated data pipelines give leadership real-time visibility into daily revenue, profit margins, and inventory health right on your phone or desktop—eliminating hours of manual spreadsheet work.";
      followUpQuestions = `To help us tailor your executive intelligence setup:
1. Where is your sales and operational data currently stored (PostgreSQL, ERP, Shopify, Excel)?
2. What are the top 3 KPIs or metrics you need to see every morning?
3. How many team members or managers will need dashboard access?`;
    } else {
      serviceHeadline = `Tailored Technology Solutions${companyMention}`;
      serviceValueProp =
        "Exo Advance builds custom software and intelligent operating systems engineered to simplify your operations, automate repetitive tasks, and empower your business to scale.";
      followUpQuestions = `To help us evaluate your project and deliver a clear plan:
1. What is the main challenge or goal you want to achieve with this project?
2. Do you have an existing system that needs to be connected or upgraded?
3. When are you looking to get started, and would you like to schedule a quick 10-minute discovery call?`;
    }
  }

  const recommendedResponse = isSpanish
    ? `Hola ${leadData.full_name},

Muchas gracias por contactar a Exo Advance LLC sobre ${serviceHeadline}.

${serviceValueProp}

He revisado tu mensaje: "${leadData.message}". Para asegurarnos de entregarte una propuesta exacta, opciones de presupuesto y recomendaciones técnicas para tu operación, ¿podrías compartirnos algunos detalles breves?

${followUpQuestions}

Puedes responder directamente a este correo con tus respuestas. Si prefieres agendar una breve llamada de 10 minutos o ver una demostración en vivo de nuestras plataformas, ¡avísame qué día y horario te resulta más conveniente!

Será un verdadero gusto ayudarte a llevar la tecnología de tu empresa al siguiente nivel.

Saludos cordiales,

Karen Mendoza
Senior Solutions & Sales Specialist
Exo Advance LLC — Soluciones a la medida de tu negocio
Email: contact@exoadvancellc.com | Web: https://www.exoadvancellc.com`
    : `Hi ${leadData.full_name},

Thank you for contacting Exo Advance LLC regarding ${serviceHeadline}.

${serviceValueProp}

I reviewed your message: "${leadData.message}". To make sure we give you the most accurate scope, pricing options, and recommendations, could you please share a few quick details?

${followUpQuestions}

You can simply reply directly to this email with your answers. If you prefer to jump on a quick 10-minute discovery call or see a live demo of our platforms, let me know what day and time works best for you!

Looking forward to helping you take your operations to the next level.

Best regards,

Karen Mendoza
Senior Solutions & Sales Specialist
Exo Advance LLC — Tailored Solutions for Your Business, Your Way
Email: contact@exoadvancellc.com | Web: https://www.exoadvancellc.com`;

  return {
    aiScore: Math.min(score, 98),
    sentiment,
    intentSummary: isSpanish
      ? `Cliente potencial solicita soluciones de ${leadData.service}.`
      : `Prospective lead requesting specialized ${leadData.service} solutions.`,
    recommendedResponse,
  };
}
