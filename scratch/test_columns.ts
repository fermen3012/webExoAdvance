import { createClient } from "@supabase/supabase-js";

async function checkSchema() {
  const url = "https://enbrjdaypbeessebizfu.supabase.co";
  const key = "sb_publishable_fskndaJSFbDZoRGiEhjjWA_X7IDH9CJ";
  const supabase = createClient(url, key);

  // Attempt empty insert to see column errors
  const { data, error } = await supabase.from("leads").select("*").limit(1);
  console.log("SELECT DATA:", data);
  console.log("SELECT ERROR:", error);
}

checkSchema();
