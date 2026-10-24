import { Resend } from "resend";
import { isSpanishText } from "@/lib/utils";

export interface SendLeadEmailParams {
  toEmail: string;
  clientName: string;
  service: string;
  aiResponseContent: string;
  language?: "es" | "en";
}

export interface AdminLeadNotificationParams {
  leadId: string;
  fullName: string;
  email: string;
  phone?: string | null;
  company?: string | null;
  service: string;
  message: string;
  aiScore?: number;
}

/**
 * Resolves a verified sender address. If the environment variable contains an unverified
 * address or typo from older deploys, safely falls back to the verified exoadvancellc.com domain.
 */
function resolveVerifiedSender(fallback: string): string {
  const envSender = process.env.RESEND_FROM_EMAIL?.trim();
  if (envSender && (envSender.includes("@exoadvancellc.com") || envSender.includes("onboarding@resend.dev"))) {
    return envSender;
  }
  return fallback;
}

/**
 * Sends an automated sales consultant response email to the prospective client using Resend.
 */
export async function sendLeadEmailToClient(params: SendLeadEmailParams): Promise<{ success: boolean; id?: string; error?: string }> {
  try {
    const apiKey = process.env.RESEND_API_KEY;
    const fromEmail = resolveVerifiedSender("Karen Mendoza <contact@exoadvancellc.com>");
    const replyToEmail = process.env.RESEND_REPLY_TO || "contact@exoadvancellc.com";

    if (!apiKey) {
      console.warn("[EXO_EMAIL_WARN] RESEND_API_KEY is not set. Operating in simulated email dispatch mode.");
      console.log(`[SIMULATED EMAIL DISPATCH TO ${params.toEmail}]:\nSubject: Re: Your Inquiry with Exo Advance LLC - ${params.service}\n\n${params.aiResponseContent}`);
      return {
        success: false,
        error: "RESEND_API_KEY not configured. Operating in simulated email dispatch mode.",
      };
    }

    const resend = new Resend(apiKey);
    const isEs = params.language === "es" || isSpanishText(params.aiResponseContent);

    const serviceEsMap: Record<string, string> = {
      "Restaurant Technology": "Tecnología para Restaurantes",
      "Custom Software": "Desarrollo de Software",
      "Business Intelligence": "Inteligencia de Negocios",
      "Other": "Soluciones Tecnológicas",
    };

    const serviceDisplay = isEs ? (serviceEsMap[params.service] || params.service) : params.service;
    const emailSubject = isEs
      ? `Re: Tu consulta sobre ${serviceDisplay} — Soluciones Exo Advance`
      : `Re: Your ${params.service} Inquiry — Exo Advance Solutions`;

    const subHeader = isEs ? "EXO ADVANCE LLC // SOLUCIONES CORPORATIVAS" : "EXO ADVANCE LLC // CLIENT SOLUTIONS";
    const headerTitle = isEs ? "Consultoría Personalizada de Proyecto" : "Tailored Project Consultation";
    const tagline = isEs
      ? "Exo Advance LLC &bull; Soluciones a la medida de tu negocio, a tu manera"
      : "Exo Advance LLC &bull; Tailored Solutions for Your Business, Your Way";
    const replyInstruction = isEs
      ? 'Puedes responder directamente a este correo o escribirnos a <a href="mailto:contact@exoadvancellc.com" style="color: #00E5FF; text-decoration: none;">contact@exoadvancellc.com</a>'
      : 'You can reply directly to this email or reach us at <a href="mailto:contact@exoadvancellc.com" style="color: #00E5FF; text-decoration: none;">contact@exoadvancellc.com</a>';

    const htmlContent = `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 640px; margin: 0 auto; background-color: #0A0F1A; color: #F8FAFC; border: 1px solid rgba(0, 229, 255, 0.3); border-radius: 16px; overflow: hidden; box-shadow: 0 20px 50px rgba(0,0,0,0.6);">
        
        <!-- Header -->
        <div style="background: linear-gradient(90deg, #1E3A8A 0%, #0A0F1A 100%); padding: 32px 28px; border-bottom: 1px solid rgba(255, 255, 255, 0.1);">
          <div style="color: #00E5FF; font-family: monospace; font-size: 11px; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 6px;">
            ${subHeader}
          </div>
          <h1 style="color: #FFFFFF; font-size: 22px; font-weight: 800; margin: 0;">
            ${headerTitle}
          </h1>
        </div>

        <!-- Body Content -->
        <div style="padding: 32px 28px; line-height: 1.7; font-size: 14px; color: #E2E8F0; white-space: pre-wrap;">
${params.aiResponseContent}
        </div>

        <!-- Footer -->
        <div style="background-color: #050811; padding: 24px 28px; border-top: 1px solid rgba(255, 255, 255, 0.08); font-family: monospace; font-size: 11px; color: #64748B; text-align: center;">
          <p style="margin: 0 0 6px 0; color: #94A3B8;">${tagline}</p>
          <p style="margin: 0;">${replyInstruction}</p>
        </div>

      </div>
    `;

    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: [params.toEmail],
      replyTo: replyToEmail,
      subject: emailSubject,
      html: htmlContent,
      text: params.aiResponseContent,
    });

    if (error) {
      console.error("[EXO_EMAIL_ERROR]", error);
      return { success: false, error: error.message };
    }

    console.log("[EXO_EMAIL_SUCCESS] Automated sales email sent to:", params.toEmail, "ID:", data?.id);
    return { success: true, id: data?.id };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Failed to send email";
    console.error("[EXO_EMAIL_EXCEPTION]", msg);
    return { success: false, error: msg };
  }
}

/**
 * Sends an instant internal alert to the Exo Advance team about a new inbound lead.
 */
export async function sendAdminNewLeadNotification(params: AdminLeadNotificationParams): Promise<{ success: boolean; id?: string }> {
  try {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) return { success: false };

    const resend = new Resend(apiKey);
    const fromEmail = resolveVerifiedSender("Exo Advance Alerts <contact@exoadvancellc.com>");
    const adminEmail = process.env.ADMIN_NOTIFICATION_EMAIL || "contact@exoadvancellc.com";

    const htmlContent = `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background: #0A0F1A; color: #FFFFFF; padding: 24px; border: 1px solid #1E3A8A; border-radius: 12px;">
        <h2 style="color: #00E5FF; margin-top: 0;">🚨 New Inbound Lead Received</h2>
        <p>A new potential client submitted the contact form on Exo Advance:</p>
        <table style="width: 100%; border-collapse: collapse; margin-top: 16px; font-size: 14px;">
          <tr><td style="color: #64748B; padding: 6px 0;">Client:</td><td style="font-weight: bold;">${params.fullName}</td></tr>
          <tr><td style="color: #64748B; padding: 6px 0;">Email:</td><td><a href="mailto:${params.email}" style="color: #00E5FF;">${params.email}</a></td></tr>
          <tr><td style="color: #64748B; padding: 6px 0;">Phone:</td><td>${params.phone || "Not provided"}</td></tr>
          <tr><td style="color: #64748B; padding: 6px 0;">Company:</td><td>${params.company || "Not provided"}</td></tr>
          <tr><td style="color: #64748B; padding: 6px 0;">Service:</td><td style="color: #34D399; font-weight: bold;">${params.service}</td></tr>
          <tr><td style="color: #64748B; padding: 6px 0;">AI Lead Score:</td><td><strong>${params.aiScore || "N/A"}/100</strong></td></tr>
        </table>
        <div style="margin-top: 16px; padding: 12px; background: #070B14; border-radius: 8px; border: 1px solid rgba(255,255,255,0.1);">
          <strong style="color: #94A3B8; font-size: 12px; text-transform: uppercase;">Message:</strong>
          <p style="margin: 6px 0 0 0; font-size: 13px; line-height: 1.5;">${params.message}</p>
        </div>
        <p style="margin-top: 20px; font-size: 12px; color: #64748B;">View this lead in your CRM: <a href="https://www.exoadvancellc.com/admin/leads" style="color: #00E5FF;">CRM Portal</a></p>
      </div>
    `;

    const { data } = await resend.emails.send({
      from: fromEmail,
      to: [adminEmail],
      subject: `🚨 [New Lead] ${params.fullName} - ${params.service}`,
      html: htmlContent,
      text: `New Lead: ${params.fullName}\nEmail: ${params.email}\nPhone: ${params.phone || "N/A"}\nCompany: ${params.company || "N/A"}\nService: ${params.service}\nMessage: ${params.message}`,
    });

    return { success: true, id: data?.id };
  } catch (err) {
    console.error("[EXO_ADMIN_NOTIF_ERROR]", err);
    return { success: false };
  }
}

export interface AdminReplyNotificationParams {
  leadId: string;
  fullName: string;
  email: string;
  service: string;
  clientReply: string;
  aiResponse: string;
}

/**
 * Sends an alert to the admin whenever a client replies to Karen Mendoza and Karen responds.
 */
export async function sendAdminReplyNotification(params: AdminReplyNotificationParams): Promise<{ success: boolean; id?: string }> {
  try {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) return { success: false };

    const resend = new Resend(apiKey);
    const fromEmail = resolveVerifiedSender("Exo Advance Alerts <contact@exoadvancellc.com>");
    const adminEmail = process.env.ADMIN_NOTIFICATION_EMAIL || "contact@exoadvancellc.com";

    const htmlContent = `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background: #0A0F1A; color: #FFFFFF; padding: 24px; border: 1px solid #1E3A8A; border-radius: 12px;">
        <h2 style="color: #00E5FF; margin-top: 0;">💬 Client Replied & AI Agent Responded</h2>
        <p>A client replied to our email and Karen Mendoza has automatically answered their questions:</p>
        <table style="width: 100%; border-collapse: collapse; margin-top: 16px; font-size: 14px;">
          <tr><td style="color: #64748B; padding: 6px 0;">Client:</td><td style="font-weight: bold;">${params.fullName}</td></tr>
          <tr><td style="color: #64748B; padding: 6px 0;">Email:</td><td><a href="mailto:${params.email}" style="color: #00E5FF;">${params.email}</a></td></tr>
          <tr><td style="color: #64748B; padding: 6px 0;">Service:</td><td style="color: #34D399; font-weight: bold;">${params.service}</td></tr>
        </table>
        <div style="margin-top: 16px; padding: 12px; background: #070B14; border-radius: 8px; border-left: 3px solid #38BDF8;">
          <strong style="color: #38BDF8; font-size: 12px; text-transform: uppercase;">Client Wrote:</strong>
          <p style="margin: 6px 0 0 0; font-size: 13px; line-height: 1.5; color: #F1F5F9;">${params.clientReply}</p>
        </div>
        <div style="margin-top: 12px; padding: 12px; background: #070B14; border-radius: 8px; border-left: 3px solid #10B981;">
          <strong style="color: #10B981; font-size: 12px; text-transform: uppercase;">Karen Mendoza's AI Response Sent:</strong>
          <p style="margin: 6px 0 0 0; font-size: 13px; line-height: 1.5; color: #E2E8F0; white-space: pre-wrap;">${params.aiResponse}</p>
        </div>
        <p style="margin-top: 20px; font-size: 12px; color: #64748B;">View conversation thread in CRM: <a href="https://www.exoadvancellc.com/admin/leads" style="color: #00E5FF;">CRM Portal</a></p>
      </div>
    `;

    const { data } = await resend.emails.send({
      from: fromEmail,
      to: [adminEmail],
      subject: `💬 [Reply from ${params.fullName}] - ${params.service}`,
      html: htmlContent,
      text: `Client ${params.fullName} (${params.email}) replied:\n"${params.clientReply}"\n\nKaren Mendoza responded:\n"${params.aiResponse}"`,
    });

    return { success: true, id: data?.id };
  } catch (err) {
    console.error("[EXO_ADMIN_REPLY_ALERT_ERROR]", err);
    return { success: false };
  }
}
