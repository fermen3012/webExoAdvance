import { createClient } from "@supabase/supabase-js";

async function testFetch() {
  const url = "https://enbrjdaypbeessebizfu.supabase.co";
  const key = "sb_publishable_fskndaJSFbDZoRGiEhjjWA_X7IDH9CJ";
  const supabase = createClient(url, key);

  console.log("Fetching leads with anon key...");
  const { data: leads, error } = await supabase.from("leads").select("*, interactions(*)");

  console.log("FETCH RESULT ERROR:", error);
  console.log("FETCH RESULT LEADS COUNT:", leads?.length);
  if (leads && leads.length > 0) {
    console.log("FIRST LEAD NAME:", leads[0].full_name);
  }
}

testFetch();
