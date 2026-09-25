import { Resend } from "resend";

export interface SendLeadEmailParams {
  toEmail: string;
  clientName: string;
  service: string;
  aiResponseContent: string;
}

/**
 * Sends an automated AI response email to the prospective client using Resend.
 */
export async function sendLeadEmailToClient(params: SendLeadEmailParams): Promise<{ success: boolean; id?: string; error?: string }> {
  try {
    const apiKey = process.env.RESEND_API_KEY;
    const fromEmail = process.env.RESEND_FROM_EMAIL || "Exo Advance <onboarding@resend.dev>";

    if (!apiKey) {
      console.warn("[EXO_EMAIL_WARN] RESEND_API_KEY is not set. Operating in simulated email dispatch mode.");
      console.log(`[SIMULATED EMAIL DISPATCH TO ${params.toEmail}]:\nSubject: Re: Your Inquiry with Exo Advance LLC - ${params.service}\n\n${params.aiResponseContent}`);
      return {
        success: false,
        error: "RESEND_API_KEY not configured. Operating in simulated email dispatch mode.",
      };
    }

    const resend = new Resend(apiKey);

    const htmlContent = `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 640px; margin: 0 auto; background-color: #0A0F1A; color: #F8FAFC; border: 1px solid rgba(0, 229, 255, 0.3); border-radius: 16px; overflow: hidden; box-shadow: 0 20px 50px rgba(0,0,0,0.6);">
        
        <!-- Header -->
        <div style="background: linear-gradient(90deg, #1E3A8A 0%, #0A0F1A 100%); padding: 32px 28px; border-bottom: 1px solid rgba(255, 255, 255, 0.1);">
          <div style="color: #00E5FF; font-family: monospace; font-size: 11px; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 6px;">
            EXO ADVANCE LLC // TECHNOLOGICAL INNOVATION
          </div>
          <h1 style="color: #FFFFFF; font-size: 22px; font-weight: 800; margin: 0;">
            Project Inquiry Follow-up
          </h1>
        </div>

        <!-- Body Content -->
        <div style="padding: 32px 28px; line-height: 1.7; font-size: 14px; color: #E2E8F0; white-space: pre-wrap;">
${params.aiResponseContent}
        </div>

        <!-- Footer -->
        <div style="background-color: #050811; padding: 24px 28px; border-top: 1px solid rgba(255, 255, 255, 0.08); font-family: monospace; font-size: 11px; color: #64748B; text-align: center;">
          <p style="margin: 0 0 4px 0;">Exo Advance LLC &bull; High-Tech Software Architecture & AI Engineering</p>
          <p style="margin: 0;">This is an automated response to your inquiry. Please reply directly to this email with your project details.</p>
        </div>

      </div>
    `;

    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: [params.toEmail],
      subject: `Re: Your Inquiry with Exo Advance LLC - ${params.service}`,
      html: htmlContent,
      text: params.aiResponseContent,
    });

    if (error) {
      console.error("[EXO_EMAIL_ERROR]", error);
      return { success: false, error: error.message };
    }

    console.log("[EXO_EMAIL_SUCCESS] Automated email sent to:", params.toEmail, "ID:", data?.id);
    return { success: true, id: data?.id };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Failed to send email";
    console.error("[EXO_EMAIL_EXCEPTION]", msg);
    return { success: false, error: msg };
  }
}
