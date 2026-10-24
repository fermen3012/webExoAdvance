export interface LeadSMSNotificationParams {
  fullName: string;
  phone?: string | null;
  email: string;
  company?: string | null;
  service: string;
  message: string;
}

/**
 * Sends an instant SMS alert to the administrator's phone via Twilio REST API.
 * Uses native fetch so no external dependencies are needed.
 */
export async function sendLeadNotificationSMS(
  params: LeadSMSNotificationParams
): Promise<{ success: boolean; id?: string; error?: string }> {
  try {
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const fromPhone = process.env.TWILIO_PHONE_NUMBER;
    const toPhone = process.env.ADMIN_SMS_PHONE || "+17273072089";

    if (!accountSid || !authToken || !fromPhone) {
      console.warn("[EXO_SMS_WARN] Twilio credentials are not set in environment. Skipping SMS dispatch.");
      return { success: false, error: "Twilio credentials not configured" };
    }

    const messageBody = `🚨 [EXO ADVANCE - NUEVO LEAD]\n👤 Cliente: ${params.fullName}\n🏷️ Servicio: ${params.service}\n📱 Tel: ${params.phone || "No provisto"}\n📧 Email: ${params.email}\n🏢 Negocio: ${params.company || "N/A"}\n💬 Mensaje: "${params.message}"\n🤖 Karen Mendoza ya envió respuesta inicial.`;

    const url = `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`;
    const basicAuth = Buffer.from(`${accountSid}:${authToken}`).toString("base64");

    const formBody = new URLSearchParams({
      From: fromPhone,
      To: toPhone,
      Body: messageBody,
    });

    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Basic ${basicAuth}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formBody.toString(),
    });

    const data = await response.json();

    if (!response.ok) {
      // Graceful handling if account is still in Trial
      if (data.code === 572006) {
        console.warn("[EXO_SMS_TRIAL_NOTICE] Twilio account is in Trial mode. Upgrade account in Twilio Console to enable custom lead text messages.");
      } else {
        console.error("[EXO_SMS_ERROR]", data);
      }
      return { success: false, error: data.message || "Failed to send SMS" };
    }

    console.log("[EXO_SMS_SUCCESS] Admin SMS alert dispatched. SID:", data.sid);
    return { success: true, id: data.sid };
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : "Failed to send SMS";
    console.error("[EXO_SMS_EXCEPTION]", errorMsg);
    return { success: false, error: errorMsg };
  }
}
