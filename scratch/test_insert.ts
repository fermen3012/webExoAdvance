import { createClient } from "@supabase/supabase-js";

async function testInsert() {
  const url = "https://enbrjdaypbeessebizfu.supabase.co";
  const key = "sb_publishable_fskndaJSFbDZoRGiEhjjWA_X7IDH9CJ";

  console.log("Connecting to Supabase at:", url);
  const supabase = createClient(url, key);

  const { data, error } = await supabase.from("leads").insert({
    full_name: "Carlos Rivera Test",
    company: "Rivera Tech Group",
    email: "carlos@riveratech.com",
    phone: "+1 (727) 555-9876",
    service: "Software Development",
    message: "Test message for inventory management software",
    source: "website",
    status: "new",
  }).select();

  if (error) {
    console.error("SUPABASE INSERT ERROR:", error);
  } else {
    console.log("SUPABASE INSERT SUCCESS:", data);
  }
}

testInsert();
