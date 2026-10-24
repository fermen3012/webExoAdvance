import { createClient } from "@supabase/supabase-js";
import { Database } from "@/lib/supabase/types";
import {
  sendLeadEmailToClient,
  sendAdminNewLeadNotification,
  sendAdminReplyNotification,
} from "@/lib/email/send-email";
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

export interface ProcessReplyParams {
  leadId: string;
  leadData: {
    full_name: string;
    company?: string | null;
    email: string;
    service: string;
  };
  clientReply: string;
  conversationHistory: Array<{
    type: string;
    content: string;
  }>;
}

/**
 * Multi-Turn Conversational AI Engine
 * Processes subsequent email replies from clients, answers their questions,
 * and maintains conversational momentum signed as Karen Mendoza.
 */
export async function processLeadReplyWithAI(params: ProcessReplyParams): Promise<{
  recommendedResponse: string;
  sentiment: string;
  aiScore: number;
} | null> {
  try {
    const apiKey = process.env.OPENAI_API_KEY;
    const isSpanish = isSpanishText(params.clientReply);
    let aiResponseText = "";
    let sentiment = "High Interest";
    let aiScore = 92;

    if (apiKey) {
      try {
        const historyText = params.conversationHistory
          .map((h) => `${h.type === "ai_response" ? "Karen Mendoza (Exo Advance)" : params.leadData.full_name}: ${h.content}`)
          .join("\n\n");

        const prompt = `You are Karen Mendoza, Senior Solutions & Sales Specialist for Exo Advance LLC (https://www.exoadvancellc.com). We engineer custom SaaS, Exo Server restaurant kiosk systems, custom mobile apps, and business intelligence solutions.

A prospective client who previously contacted us has just REPLIED to our email.

Client Context:
- Name: ${params.leadData.full_name}
- Company: ${params.leadData.company || "N/A"}
- Service Requested: ${params.leadData.service}

Previous Conversation History:
${historyText}

NEW CLIENT REPLY:
"${params.clientReply}"

CRITICAL INSTRUCTIONS:
1. LANGUAGE: Detect the language of the client's reply. If Spanish, write 100% in natural, warm, professional Latin American Spanish. If English, write in English.
2. ANSWER THEIR DOUBTS THOROUGHLY: Directly address what they asked (e.g. restaurant app features, ordering workflow, POS integration, hardware, timelines, pricing structure).
3. CONSULTATIVE SALES CLOSING: Advance the conversation toward a concrete next step (e.g. proposing a 10-minute live demo or asking about their specific requirements like number of tables, branches, or features).
4. SIGNATURE: Sign as Karen Mendoza, Senior Solutions & Sales Specialist, Exo Advance LLC.

Return a valid JSON object with keys:
- "sentiment": "High Interest" | "Urgent" | "Standard Inquiry" | "Exploring"
- "aiScore": number (80 to 98)
- "recommendedResponse": full email response text addressed to ${params.leadData.full_name}.`;

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
          const parsed = JSON.parse(data.choices[0].message.content);
          aiResponseText = parsed.recommendedResponse;
          sentiment = parsed.sentiment || "High Interest";
          aiScore = parsed.aiScore || 92;
        } else {
          aiResponseText = generateConversationalFallback(params);
        }
      } catch {
        aiResponseText = generateConversationalFallback(params);
      }
    } else {
      aiResponseText = generateConversationalFallback(params);
    }

    const supabase = getSupabaseBackendClient();

    // 1. Record Karen's AI follow-up in interactions
    await supabase.from("interactions").insert({
      lead_id: params.leadId,
      type: "ai_response",
      content: aiResponseText,
      sentiment,
      ai_score: aiScore,
      metadata: {
        engine: apiKey ? "openai-gpt-4o-mini" : "exo-ai-rules-v1",
        stage: "multi_turn_reply",
        generated_at: new Date().toISOString(),
      },
    });

    // 2. Dispatch the email response to the client
    await sendLeadEmailToClient({
      toEmail: params.leadData.email,
      clientName: params.leadData.full_name,
      service: params.leadData.service,
      aiResponseContent: aiResponseText,
      language: isSpanish ? "es" : "en",
    });

    // 3. Notify admin that client replied and Karen responded
    await sendAdminReplyNotification({
      leadId: params.leadId,
      fullName: params.leadData.full_name,
      email: params.leadData.email,
      service: params.leadData.service,
      clientReply: params.clientReply,
      aiResponse: aiResponseText,
    });

    // 4. Update lead status in Supabase
    await supabase
      .from("leads")
      .update({
        status: "active_conversation",
        notes: `[Active Conversation] Client replied: "${params.clientReply.substring(0, 100)}" | Karen responded.`,
      })
      .eq("id", params.leadId);

    return {
      recommendedResponse: aiResponseText,
      sentiment,
      aiScore,
    };
  } catch (err) {
    console.error("[EXO_AI_REPLY_PROCESS_ERROR]", err);
    return null;
  }
}

/**
 * Intelligent domain-specific rule fallback for follow-up conversations.
 */
function generateConversationalFallback(params: ProcessReplyParams): string {
  const isSpanish = isSpanishText(params.clientReply);
  const textLower = params.clientReply.toLowerCase();
  const name = params.leadData.full_name;

  if (isSpanish) {
    // Topic: Restaurant app / pedidos / comandas
    if (
      textLower.includes("restaurante") ||
      textLower.includes("app") ||
      textLower.includes("kiosco") ||
      textLower.includes("comanda") ||
      textLower.includes("pedido") ||
      textLower.includes("menu") ||
      textLower.includes("mesa") ||
      textLower.includes("delivery")
    ) {
      return `Hola ${name},

¡Excelente! En Exo Advance nos especializamos justamente en tecnología para restaurantes y aplicaciones de pedidos digitales.

Para restaurantes desarrollamos dos tipos de soluciones que pueden operar de forma integrada o independiente según tus necesidades:

1. Aplicación de Pedidos y Delivery Propio (iOS, Android y Web):
   - Tus clientes ordenan directo desde su teléfono escaneando un código QR en mesa o desde casa para delivery/takeout.
   - Sin pagar el 25%-30% de comisión a plataformas de terceros como DoorDash o UberEats.
   - Pasarela de cobros segura integrada con depósito directo a tu cuenta bancaria.

2. Exo Server Restaurant OS (Punto de Venta y Kioscos Táctiles):
   - Kioscos de autoservicio para caja que eliminan filas y aumentan el ticket promedio en +$4.20.
   - Pantalla digital de cocina (KDS) para que los pedidos lleguen al chef en tiempo real sin papel.
   - Panel administrativo para control de stock de insumos, recetas y reportes de ventas diarias.

Para recomendarte la mejor arquitectura y darte un presupuesto exacto:
1. ¿Tu restaurante opera principalmente con servicio en mesa, para llevar (delivery/pickup), o un modelo mixto?
2. ¿Actualmente ya cuentas con una sucursal en marcha, o estás en fase de planificación y apertura?

Si lo deseas, con mucho gusto podemos coordinar una breve llamada de 10 minutos para mostrarte una demostración en vivo de la app en acción. ¿Qué día y horario te quedaría mejor?

Saludos cordiales,

Karen Mendoza
Senior Solutions & Sales Specialist
Exo Advance LLC — Soluciones a la medida de tu negocio
Email: contact@exoadvancellc.com | Web: https://www.exoadvancellc.com`;
    }

    // Topic: Pricing / Presupuesto / Cuánto cuesta
    if (
      textLower.includes("precio") ||
      textLower.includes("costo") ||
      textLower.includes("cuanto") ||
      textLower.includes("presupuesto") ||
      textLower.includes("cotiz") ||
      textLower.includes("tarifa")
    ) {
      return `Hola ${name},

Con mucho gusto te oriento sobre la inversión y esquemas de presupuesto para tu proyecto.

En Exo Advance estructuramos las soluciones con dos modalidades para que elijas la más conveniente para tu negocio:

1. Modelo SaaS Mensual (Llave en Mano):
   - Inversión inicial accesible que incluye infraestructura cloud, servidores de alto rendimiento, mantenimiento preventivo y soporte técnico continuo.
2. Desarrollo a la Medida (Código Propietario):
   - Inversión por etapas de desarrollo con entrega de propiedad total del código fuente y personalización al 100%.

Para prepararte una propuesta formal y cerrada sin sobrecostos:
¿Cuáles son las 2 o 3 funciones indispensables que debe tener el sistema en tu primera versión?

Si tienes 10 minutos disponibles hoy o mañana, podemos tener una llamada rápida para definir el alcance exacto y prepararte la cotización formal de inmediato. ¿Qué horario te queda bien?

Saludos cordiales,

Karen Mendoza
Senior Solutions & Sales Specialist
Exo Advance LLC — Soluciones a la medida de tu negocio
Email: contact@exoadvancellc.com | Web: https://www.exoadvancellc.com`;
    }

    // Default conversational reply in Spanish
    return `Hola ${name},

Muchas gracias por los detalles que me compartes. Entiendo perfectamente lo que necesitas y podemos desarrollarlo a la medida de tus procesos.

En Exo Advance construimos plataformas diseñadas para operar con total estabilidad y escalar conforme tu negocio crezca, con integraciones limpias, seguridad empresarial y soporte prioritario.

Para dar el siguiente paso y estructurar el plan de trabajo:
¿Tienes alguna fecha límite o meta en la que te gustaría tener el sistema listo y funcionando?

También te invito a coordinar una llamada de 10 minutos o una demo en vivo por videollamada para aclarar cualquier duda técnica y mostrarte ejemplos de sistemas similares que ya tenemos en producción. Dime qué día te queda mejor.

Quedo muy atenta a tus comentarios.

Saludos cordiales,

Karen Mendoza
Senior Solutions & Sales Specialist
Exo Advance LLC — Soluciones a la medida de tu negocio
Email: contact@exoadvancellc.com | Web: https://www.exoadvancellc.com`;
  }

  // English fallback
  return `Hi ${name},

Thank you for providing those details! We completely understand what you are looking to achieve, and Exo Advance is ideally positioned to engineer this solution for your business.

We build custom high-performance cloud software, specialized restaurant operating systems, and automated dashboards tailored 100% to your workflow.

To help us scope your solution accurately:
1. What is your target timeline for launching?
2. Would you be available for a brief 10-minute discovery call or live product demo this week?

Please feel free to share what day and time works best for you, and I will be happy to coordinate our session.

Best regards,

Karen Mendoza
Senior Solutions & Sales Specialist
Exo Advance LLC — Tailored Solutions for Your Business, Your Way
Email: contact@exoadvancellc.com | Web: https://www.exoadvancellc.com`;
}
