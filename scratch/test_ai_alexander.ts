import { processLeadWithAI } from "../src/lib/ai/agent";
import { createClient } from "@supabase/supabase-js";

async function runAIForAlexander() {
  const leadId = "f3bf2a9a-ee86-45a0-b0b1-4aa83b3f3da5";
  console.log("Processing AI Agent for Alexander Wright...");

  const aiResult = await processLeadWithAI(leadId, {
    full_name: "Alexander Wright",
    company: "Wright Restaurant Group",
    email: "alexander@wrightgroup.com",
    phone: "+1 (305) 555-0188",
    service: "Restaurant Technology",
    message: "Necesitamos integrar nuestro sistema POS con control de inventario automatizado en cocina y un agente de IA para responder reservaciones de clientes inmediatamente.",
  });

  console.log("\n=== AI AGENT OUTPUT ===");
  console.log("Score:", aiResult?.aiScore);
  console.log("Sentiment:", aiResult?.sentiment);
  console.log("Intent Summary:", aiResult?.intentSummary);
  console.log("Generated Email Response:\n", aiResult?.recommendedResponse);

  const url = "https://enbrjdaypbeessebizfu.supabase.co";
  const key = "sb_publishable_fskndaJSFbDZoRGiEhjjWA_X7IDH9CJ";
  const supabase = createClient(url, key);

  const { data: lead } = await supabase.from("leads").select("*").eq("id", leadId).single();
  console.log("\nUpdated Lead Status in Supabase:", lead?.status);
  console.log("Updated Lead Notes in Supabase:", lead?.notes);
}

runAIForAlexander();
