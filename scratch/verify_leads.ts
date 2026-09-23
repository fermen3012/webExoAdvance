import { createClient } from "@supabase/supabase-js";

async function verifyAllLeads() {
  const url = "https://enbrjdaypbeessebizfu.supabase.co";
  const key = "sb_publishable_fskndaJSFbDZoRGiEhjjWA_X7IDH9CJ";
  const supabase = createClient(url, key);

  console.log("=== FETCHING ALL LEADS FROM SUPABASE ===");
  const { data: leads, error: leadsError } = await supabase
    .from("leads")
    .select("*, interactions(*)")
    .order("created_at", { ascending: false });

  if (leadsError) {
    console.error("Error fetching leads:", leadsError);
    return;
  }

  console.log(`Found ${leads?.length || 0} leads in Supabase:`);
  leads?.forEach((lead: any, index: number) => {
    console.log(`\n--- LEAD #${index + 1} ---`);
    console.log(`ID: ${lead.id}`);
    console.log(`Name: ${lead.full_name}`);
    console.log(`Company: ${lead.company}`);
    console.log(`Email: ${lead.email}`);
    console.log(`Service: ${lead.service}`);
    console.log(`Status: ${lead.status}`);
    console.log(`Created At: ${lead.created_at}`);
    console.log(`Interactions Count: ${lead.interactions?.length || 0}`);
    lead.interactions?.forEach((int: any, iIdx: number) => {
      console.log(`   [Interaction #${iIdx + 1}] Type: ${int.type} | Sentiment: ${int.sentiment || 'N/A'} | AI Score: ${int.ai_score || 'N/A'}`);
      console.log(`   Content: ${int.content.slice(0, 100)}...`);
    });
  });
}

verifyAllLeads();
