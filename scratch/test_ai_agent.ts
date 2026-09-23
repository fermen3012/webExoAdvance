import { processLeadWithAI } from "../src/lib/ai/agent";
import { createClient } from "@supabase/supabase-js";

async function testAIAgent() {
  const leadId = "12608040-44d4-496a-9d08-fb7ae06f6ec2";
  console.log("Triggering AI Agent for Maria Santos (ID:", leadId, ")...");

  const result = await processLeadWithAI(leadId, {
    full_name: "Maria Santos",
    company: "Santos Enterprise",
    email: "maria@santosenterprise.com",
    service: "Business Intelligence",
    message: "Queremos conectar nuestras bases de datos operativas con un dashboard de inteligencia de negocios asistido por IA para prediccion de demanda.",
  });

  console.log("AI AGENT RESULT:", result);

  const url = "https://enbrjdaypbeessebizfu.supabase.co";
  const key = "sb_publishable_fskndaJSFbDZoRGiEhjjWA_X7IDH9CJ";
  const supabase = createClient(url, key);

  const { data: intData } = await supabase.from("interactions").select("*").eq("lead_id", leadId);
  console.log("INTERACTIONS IN SUPABASE FOR MARIA SANTOS:", intData);
}

testAIAgent();
