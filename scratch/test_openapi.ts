import { createClient } from "@supabase/supabase-js";

async function inspectColumns() {
  const url = "https://enbrjdaypbeessebizfu.supabase.co";
  const key = "sb_publishable_fskndaJSFbDZoRGiEhjjWA_X7IDH9CJ";

  const res = await fetch(`${url}/rest/v1/?apikey=${key}`);
  const schema = await res.json();
  const leadsDefinition = schema.definitions?.leads;
  console.log("LEADS COLUMNS IN SUPABASE:", Object.keys(leadsDefinition?.properties || {}));
}

inspectColumns();
