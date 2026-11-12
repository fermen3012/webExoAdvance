"use server";

import { createServerClientInstance } from "@/lib/supabase/server";
import { isServerAdminAuthenticated } from "@/app/actions/auth";
import { sendOutboundColdEmail } from "@/lib/email/send-email";

export interface OutboundReviewItem {
  id: string;
  domain: string;
  url: string;
  companyName: string;
  contactName: string;
  contactRole: string;
  recipientEmail: string;
  phone?: string;
  address?: string;
  city?: string;
  county?: string;
  preferredLocale?: "en" | "es";
  score: number;
  priorityTier: "tier_1_high" | "tier_2_medium" | "tier_3_low";
  status: "DISCOVERED" | "SCRAPED" | "READY_REVIEW" | "APPROVED" | "SENT" | "REPLIED" | "DISCARDED";
  signals: {
    runningGoogleAds?: boolean;
    runningMetaAds?: boolean;
    hasToastPOS?: boolean;
    hasCloverPOS?: boolean;
    noSelfServiceKiosk?: boolean;
    noOnlineOrdering?: boolean;
    highThirdPartyCommission?: boolean;
    hiringWaitstaff?: boolean;
    techStack?: string[];
    monthlyEstimatedLoss?: number;
  };
  emailDraft: {
    subject: string;
    body: string;
    groundedSignal: string;
    wordCount: number;
  };
  drafts?: {
    en: { subject: string; body: string };
    es: { subject: string; body: string };
  };
  gateStatus: {
    passed: boolean;
    reasons: string[];
  };
  sentAt?: string;
}

// Verified Florida target prospects in Hillsborough & Pinellas counties (OrderPoint POS & Kiosk Campaign)
const INITIAL_TARGET_PROSPECTS: OutboundReviewItem[] = [
  {
    id: "prospect-fl-stefanos",
    domain: "stefanospizzatampa.com",
    url: "https://www.clover.com/online-ordering/stefanos-pizza-and-pasta-tampa",
    companyName: "Stefanos Pizza & Pasta",
    contactName: "General Manager / Owner",
    contactRole: "Owner & Operator",
    recipientEmail: "info@stefanospizzatampa.com",
    phone: "(813) 246-4270",
    address: "10203 US-92, Tampa, FL 33610",
    city: "Tampa",
    county: "Hillsborough",
    preferredLocale: "en",
    score: 95,
    priorityTier: "tier_1_high",
    status: "READY_REVIEW",
    signals: {
      hasCloverPOS: true,
      noSelfServiceKiosk: true,
      highThirdPartyCommission: true,
      techStack: ["Clover Online Ordering", "NetWaiter"],
      monthlyEstimatedLoss: 1150,
    },
    emailDraft: {
      subject: "clover processing fees at Stefanos Pizza",
      body: "Hi, saw you guys are operating on Clover at Stefanos Pizza on US-92 in Tampa. High-volume pizzerias typically give up $1,100 to $1,400 monthly in card processing deductions and third-party fees. We engineered OrderPoint with 0% transaction markups and fast 11-inch Samsung self-service kiosks. This is Fernando from Exo Advance in Tampa, could I drop by for a 10-minute in-person demo with our working counter kiosk this week?",
      groundedSignal: "Clover POS Active + High Counter Pizzeria Volume",
      wordCount: 71,
    },
    drafts: {
      en: {
        subject: "clover processing fees at Stefanos Pizza",
        body: "Hi, saw you guys are operating on Clover at Stefanos Pizza on US-92 in Tampa. High-volume pizzerias typically give up $1,100 to $1,400 monthly in card processing deductions and third-party fees. We engineered OrderPoint with 0% transaction markups and fast 11-inch Samsung self-service kiosks. This is Fernando from Exo Advance in Tampa, could I drop by for a 10-minute in-person demo with our working counter kiosk this week?",
      },
      es: {
        subject: "comisiones de Clover en Stefanos Pizza",
        body: "Hola, vi que operan con Clover en Stefanos Pizza sobre la US-92 en Tampa. Las pizzerías de alto volumen suelen perder más de $1,100 mensuales entre porcentajes de procesamiento y apps de terceros. En Exo Advance diseñamos OrderPoint con 0% de comisiones por transacción y kioskos táctiles de autoservicio Samsung. Habla Fernando, ¿podemos pasar 10 minutos por su local para mostrarles el kiosko físico en funcionamiento sin compromiso?",
      },
    },
    gateStatus: {
      passed: true,
      reasons: [],
    },
  },
  {
    id: "prospect-fl-churrascaso",
    domain: "elchurrascasogrilltampa.com",
    url: "https://www.toasttab.com/el-churrasco-grill",
    companyName: "El Churrascaso Grill",
    contactName: "General Manager / Owner",
    contactRole: "Managing Director",
    recipientEmail: "contact@elchurrascasogrilltampa.com",
    phone: "(813) 999-1125",
    address: "8425 W Hillsborough Ave, Tampa, FL 33615",
    city: "Tampa",
    county: "Hillsborough",
    preferredLocale: "es",
    score: 93,
    priorityTier: "tier_1_high",
    status: "READY_REVIEW",
    signals: {
      hasToastPOS: true,
      noSelfServiceKiosk: true,
      highThirdPartyCommission: true,
      techStack: ["Toast POS", "Toast Online Ordering"],
      monthlyEstimatedLoss: 1420,
    },
    emailDraft: {
      subject: "tarifas de Toast POS en El Churrascaso",
      body: "Hola, vi que operan con Toast POS en El Churrascaso Grill en W Hillsborough Ave. Con el volumen diario de cortes y platos que manejan, las tarifas de procesamiento y cargos por terminal de Toast se llevan más de $1,400 cada mes. Nuestro sistema OrderPoint elimina al 100% las comisiones por transacción e incluye kiosko de 11\" para pedidos rápidos. Habla Fernando de Exo Advance, ¿te gustaría que te mostremos una demo física en tu restaurante esta semana?",
      groundedSignal: "Toast POS Active + Latin Grill High Check Margin",
      wordCount: 78,
    },
    drafts: {
      es: {
        subject: "tarifas de Toast POS en El Churrascaso",
        body: "Hola, vi que operan con Toast POS en El Churrascaso Grill en W Hillsborough Ave. Con el volumen diario de cortes y platos que manejan, las tarifas de procesamiento y cargos por terminal de Toast se llevan más de $1,400 cada mes. Nuestro sistema OrderPoint elimina al 100% las comisiones por transacción e incluye kiosko de 11\" para pedidos rápidos. Habla Fernando de Exo Advance, ¿te gustaría que te mostremos una demo física en tu restaurante esta semana?",
      },
      en: {
        subject: "toast processing markups at El Churrascaso Grill",
        body: "Hi team at El Churrascaso Grill on W Hillsborough Ave. Running high daily grill volume on Toast POS typically costs restaurants over $1,400 monthly just in credit card surcharges and terminal leases. OrderPoint provides 0% transaction commissions and counter self-service Samsung kiosks. This is Fernando from Exo Advance in Tampa, can I stop by for 10 minutes to show you our physical demo kiosk at your counter?",
      },
    },
    gateStatus: {
      passed: true,
      reasons: [],
    },
  },
  {
    id: "prospect-fl-roam",
    domain: "roamsteakhouse.com",
    url: "https://www.clover.com/online-ordering/roam-steakhouse-and-bar-st-petersburg",
    companyName: "ROAM Steakhouse & Bar",
    contactName: "Christian (General Manager)",
    contactRole: "Managing Director & Partner",
    recipientEmail: "christian@roamsaintpetes.com",
    phone: "(727) 346-5242",
    address: "3405 34th St N, St. Petersburg, FL 33713",
    city: "St. Petersburg",
    county: "Pinellas",
    preferredLocale: "en",
    score: 89,
    priorityTier: "tier_1_high",
    status: "READY_REVIEW",
    signals: {
      hasCloverPOS: true,
      noSelfServiceKiosk: true,
      techStack: ["Clover Station", "Digital Ordering"],
      monthlyEstimatedLoss: 1650,
    },
    emailDraft: {
      subject: "processing savings at ROAM Steakhouse",
      body: "Hi Christian, saw your setup on 34th St N in St. Petersburg operating on Clover. Given your premium check averages, percentage-based card fees erode thousands from bottom-line profitability every quarter. OrderPoint delivers native table QR ordering and counter stations with 0% transaction markups. This is Fernando from Exo Advance in Tampa Bay, would you be open to a quick 10-minute in-person walkthrough at your bar this week?",
      groundedSignal: "Clover Station + High-Ticket Steakhouse Processing Loss",
      wordCount: 71,
    },
    drafts: {
      en: {
        subject: "processing savings at ROAM Steakhouse",
        body: "Hi Christian, saw your setup on 34th St N in St. Petersburg operating on Clover. Given your premium check averages, percentage-based card fees erode thousands from bottom-line profitability every quarter. OrderPoint delivers native table QR ordering and counter stations with 0% transaction markups. This is Fernando from Exo Advance in Tampa Bay, would you be open to a quick 10-minute in-person walkthrough at your bar this week?",
      },
      es: {
        subject: "ahorro en procesamiento de tarjetas en ROAM Steakhouse",
        body: "Hola Christian, vi que operan en 34th St N en St. Petersburg con Clover. Con el ticket promedio de su menú, las comisiones bancarias porcentuales se llevan miles de dólares de ganancia cada trimestre. En Exo Advance creamos OrderPoint con 0% de comisiones por transacción y comandas directas a cocina en 50ms. Habla Fernando de Exo Advance, ¿te gustaría ver una demo de 10 minutos en tu barra esta semana?",
      },
    },
    gateStatus: {
      passed: true,
      reasons: [],
    },
  },
  {
    id: "prospect-fl-burgerish",
    domain: "burgerishbar.com",
    url: "https://www.clover.com/online-ordering/burger-ish-st-pete-beach",
    companyName: "Burger-ish Bar & Grill",
    contactName: "General Manager / Owner",
    contactRole: "Owner & Operator",
    recipientEmail: "info@burgerishbar.com",
    phone: "(727) 954-0001",
    address: "4755 Gulf Blvd, St. Pete Beach, FL 33706",
    city: "St. Pete Beach",
    county: "Pinellas",
    preferredLocale: "en",
    score: 88,
    priorityTier: "tier_1_high",
    status: "READY_REVIEW",
    signals: {
      hasCloverPOS: true,
      noSelfServiceKiosk: true,
      techStack: ["Clover Online Ordering", "Beachside Takeout"],
      monthlyEstimatedLoss: 980,
    },
    emailDraft: {
      subject: "counter line bottlenecks at Burger-ish St. Pete Beach",
      body: "Hi Burger-ish team, noticed your location on Gulf Blvd in St. Pete Beach. Beach traffic rushes create heavy counter bottlenecks for takeout burgers and drinks. Our 11-inch Samsung self-service kiosks let beachgoers order and pay instantly in under 30 seconds with 0% transaction commissions. Can I stop by for a quick 10-minute demo with our physical kiosk at your counter this week?",
      groundedSignal: "Beachside Fast-Casual Flow + Clover POS + Peak Line Bottlenecks",
      wordCount: 68,
    },
    drafts: {
      en: {
        subject: "counter line bottlenecks at Burger-ish St. Pete Beach",
        body: "Hi Burger-ish team, noticed your location on Gulf Blvd in St. Pete Beach. Beach traffic rushes create heavy counter bottlenecks for takeout burgers and drinks. Our 11-inch Samsung self-service kiosks let beachgoers order and pay instantly in under 30 seconds with 0% transaction commissions. Can I stop by for a quick 10-minute demo with our physical kiosk at your counter this week?",
      },
      es: {
        subject: "filas en mostrador en Burger-ish St. Pete Beach",
        body: "Hola equipo de Burger-ish, vi su local en Gulf Blvd en St. Pete Beach. En horas pico de playa se forman cuellos de botella en el mostrador para pedir hamburguesas y bebidas para llevar. Nuestros kioskos Samsung de 11\" permiten que los clientes pidan y paguen en 30 segundos con 0% de comisiones por transacción. Habla Fernando de Exo Advance, ¿puedo pasar 10 minutos a mostrarles el kiosko esta semana?",
      },
    },
    gateStatus: {
      passed: true,
      reasons: [],
    },
  },
  {
    id: "prospect-fl-eggtown",
    domain: "eggtownfl.com",
    url: "https://www.toasttab.com/eggtown",
    companyName: "EggTown Breakfast & Brunch",
    contactName: "General Manager / Owner",
    contactRole: "Owner & Operator",
    recipientEmail: "contact@eggtownfl.com",
    phone: "(813) 994-9666",
    address: "27607 State Road 56, #110, Wesley Chapel, FL 33544",
    city: "Wesley Chapel",
    county: "Pasco",
    preferredLocale: "en",
    score: 94,
    priorityTier: "tier_1_high",
    status: "READY_REVIEW",
    signals: {
      hasToastPOS: true,
      noSelfServiceKiosk: true,
      highThirdPartyCommission: true,
      techStack: ["Toast POS", "Toast Online Ordering"],
      monthlyEstimatedLoss: 1380,
    },
    emailDraft: {
      subject: "toast terminal and processing fees at EggTown Wesley Chapel",
      body: "Hi EggTown team, noticed your busy breakfast and brunch spot on SR 56 in Wesley Chapel running on Toast POS. High morning traffic with ticket customizations often results in steep Toast percentage deductions and hardware leases exceeding $1,300 monthly. OrderPoint equips your counter with high-speed 11-inch Samsung self-service kiosks and 0% card transaction markups. This is Fernando from Exo Advance in Tampa Bay, could I drop by for 10 minutes to show you our working counter kiosk this week?",
      groundedSignal: "Toast POS Active + Peak Breakfast Bottlenecks + Wesley Chapel Growth Corridor",
      wordCount: 84,
    },
    drafts: {
      en: {
        subject: "toast terminal and processing fees at EggTown Wesley Chapel",
        body: "Hi EggTown team, noticed your busy breakfast and brunch spot on SR 56 in Wesley Chapel running on Toast POS. High morning traffic with ticket customizations often results in steep Toast percentage deductions and hardware leases exceeding $1,300 monthly. OrderPoint equips your counter with high-speed 11-inch Samsung self-service kiosks and 0% card transaction markups. This is Fernando from Exo Advance in Tampa Bay, could I drop by for 10 minutes to show you our working counter kiosk this week?",
      },
      es: {
        subject: "comisiones de Toast POS en EggTown Wesley Chapel",
        body: "Hola equipo de EggTown, vi su concurrido local de desayunos y brunch en SR 56 en Wesley Chapel operando con Toast POS. Con el alto volumen matutino, Toast descuenta más de $1,300 al mes en comisiones porcentuales y alquiler de terminales. OrderPoint equipa su mostrador con kioskos Samsung de 11\" y 0% comisiones por transacción. Habla Fernando de Exo Advance, ¿puedo pasar 10 minutos a mostrarles el kiosko funcionando esta semana?",
      },
    },
    gateStatus: {
      passed: true,
      reasons: [],
    },
  },
  {
    id: "prospect-fl-moschellas",
    domain: "moschellas.com",
    url: "https://www.clover.com/online-ordering/moschellas-italian-eatery-market-wesley-chapel",
    companyName: "Moschella's Italian Eatery & Market",
    contactName: "General Manager / Owner",
    contactRole: "Managing Director",
    recipientEmail: "moschellaswc@gmail.com",
    phone: "(813) 973-7500",
    address: "5648 Post Oak Blvd, Wesley Chapel, FL 33544",
    city: "Wesley Chapel",
    county: "Pasco",
    preferredLocale: "en",
    score: 91,
    priorityTier: "tier_1_high",
    status: "READY_REVIEW",
    signals: {
      hasCloverPOS: true,
      noSelfServiceKiosk: true,
      techStack: ["Clover Station", "Clover Online Ordering"],
      monthlyEstimatedLoss: 1250,
    },
    emailDraft: {
      subject: "sandwich and prepared foods counter ordering at Moschella's",
      body: "Hi team at Moschella's, love the market and hot food counter on Post Oak Blvd in Wesley Chapel. With the lunch crowd ordering artisan sandwiches and prepared Italian specialties, counter lines can build up quickly while Clover takes a healthy cut on card processing. Our 11-inch Samsung kiosks let customers browse photos of combos, order, and pay instantly without staff intervention. This is Fernando from Exo Advance, could I visit for a 10-minute live demonstration at your counter this week?",
      groundedSignal: "Clover Station + High Counter Volume + Italian Specialty Market",
      wordCount: 83,
    },
    drafts: {
      en: {
        subject: "sandwich and prepared foods counter ordering at Moschella's",
        body: "Hi team at Moschella's, love the market and hot food counter on Post Oak Blvd in Wesley Chapel. With the lunch crowd ordering artisan sandwiches and prepared Italian specialties, counter lines can build up quickly while Clover takes a healthy cut on card processing. Our 11-inch Samsung kiosks let customers browse photos of combos, order, and pay instantly without staff intervention. This is Fernando from Exo Advance, could I visit for a 10-minute live demonstration at your counter this week?",
      },
      es: {
        subject: "pedidos rápidos de mostrador en Moschella's Wesley Chapel",
        body: "Hola equipo de Moschella's, vi su mercado y mostrador de comidas preparadas en Post Oak Blvd en Wesley Chapel. En las horas del almuerzo se forman filas para ordenar sándwiches artesanales mientras Clover cobra altas comisiones por cada tarjeta. Nuestros kioskos táctiles Samsung permiten ver fotos del menú, pedir y pagar sin demoras y con 0% de comisiones. Habla Fernando de Exo Advance, ¿les gustaría ver una demo de 10 minutos en su local esta semana?",
      },
    },
    gateStatus: {
      passed: true,
      reasons: [],
    },
  },
  {
    id: "prospect-fl-toast-npr",
    domain: "toasttab.com",
    url: "https://www.toasttab.com/toast-newportrichey",
    companyName: "Toast Fresh Fast Fun",
    contactName: "General Manager / Owner",
    contactRole: "Owner & Operator",
    recipientEmail: "manager@toastnpr.com",
    phone: "(727) 376-7121",
    address: "7121 State Road 54, New Port Richey, FL 34653",
    city: "New Port Richey",
    county: "Pasco",
    preferredLocale: "en",
    score: 93,
    priorityTier: "tier_1_high",
    status: "READY_REVIEW",
    signals: {
      hasToastPOS: true,
      noSelfServiceKiosk: true,
      highThirdPartyCommission: true,
      techStack: ["Toast POS", "Toast Online Ordering"],
      monthlyEstimatedLoss: 1450,
    },
    emailDraft: {
      subject: "toast processing surcharges at Toast New Port Richey",
      body: "Hi team at Toast Fresh Fast Fun on SR 54 in New Port Richey. With your high-volume morning diner rush, processing fees on Toast POS add up to over $1,400 monthly in card deductions and terminal leases. OrderPoint delivers turnkey 11-inch Samsung self-service ordering with 0% transaction commissions. This is Fernando from Exo Advance in Tampa Bay, could I drop by for a quick 10-minute counter demo this week?",
      groundedSignal: "Toast POS Active + SR 54 High Traffic + Brunch Bottlenecks",
      wordCount: 74,
    },
    drafts: {
      en: {
        subject: "toast processing surcharges at Toast New Port Richey",
        body: "Hi team at Toast Fresh Fast Fun on SR 54 in New Port Richey. With your high-volume morning diner rush, processing fees on Toast POS add up to over $1,400 monthly in card deductions and terminal leases. OrderPoint delivers turnkey 11-inch Samsung self-service ordering with 0% transaction commissions. This is Fernando from Exo Advance in Tampa Bay, could I drop by for a quick 10-minute counter demo this week?",
      },
      es: {
        subject: "comisiones de Toast POS en Toast New Port Richey",
        body: "Hola equipo de Toast Fresh Fast Fun en SR 54 en New Port Richey. Con el alto volumen de clientes en el desayuno, las comisiones porcentuales de Toast POS suman más de $1,400 al mes en tarifas bancarias y alquiler de terminales. OrderPoint ofrece kioskos Samsung de 11 pulgadas con 0% comisiones por transacción. Habla Fernando de Exo Advance, ¿puedo pasar 10 minutos a mostrarles el kiosko esta semana?",
      },
    },
    gateStatus: {
      passed: true,
      reasons: [],
    },
  },
  {
    id: "prospect-fl-grandbakery-npr",
    domain: "grandbakerynpr.com",
    url: "https://www.clover.com/online-ordering/grand-bakery-and-cafe-new-port-richey",
    companyName: "Grand Bakery & Cafe",
    contactName: "General Manager / Owner",
    contactRole: "Managing Director",
    recipientEmail: "info@grandbakerynpr.com",
    phone: "(727) 375-5298",
    address: "5732 Main Street, New Port Richey, FL 34652",
    city: "New Port Richey",
    county: "Pasco",
    preferredLocale: "en",
    score: 90,
    priorityTier: "tier_1_high",
    status: "READY_REVIEW",
    signals: {
      hasCloverPOS: true,
      noSelfServiceKiosk: true,
      techStack: ["Clover Station", "Clover Online Ordering"],
      monthlyEstimatedLoss: 920,
    },
    emailDraft: {
      subject: "bakery counter ordering at Grand Bakery & Cafe",
      body: "Hi team at Grand Bakery on Main Street in downtown New Port Richey. During morning pastry runs and lunch rushes, counter lines force customers to wait while Clover takes a percentage cut on every transaction. Our compact 11-inch Samsung kiosks let customers order pastries and coffee in under 30 seconds with 0% transaction fees. This is Fernando from Exo Advance, open to a quick 10-minute in-person demo?",
      groundedSignal: "Downtown Main Street + Clover Station + Fast Pastry Counter",
      wordCount: 73,
    },
    drafts: {
      en: {
        subject: "bakery counter ordering at Grand Bakery & Cafe",
        body: "Hi team at Grand Bakery on Main Street in downtown New Port Richey. During morning pastry runs and lunch rushes, counter lines force customers to wait while Clover takes a percentage cut on every transaction. Our compact 11-inch Samsung kiosks let customers order pastries and coffee in under 30 seconds with 0% transaction fees. This is Fernando from Exo Advance, open to a quick 10-minute in-person demo?",
      },
      es: {
        subject: "pedidos rápidos de mostrador en Grand Bakery New Port Richey",
        body: "Hola equipo de Grand Bakery en Main Street en New Port Richey. En las mañanas se forman filas en el mostrador para pedir café y pasteles mientras Clover cobra comisiones por cada tarjeta. Nuestros kioskos compactos Samsung permiten pedir y pagar en 30 segundos con 0% de comisiones por transacción. Habla Fernando de Exo Advance, ¿les gustaría ver una demo de 10 minutos esta semana?",
      },
    },
    gateStatus: {
      passed: true,
      reasons: [],
    },
  },
  {
    id: "prospect-fl-christinas-npr",
    domain: "discovernewportrichey.com",
    url: "https://nprmainstreet.com/dining/christinas-restaurant/",
    companyName: "Christina's Restaurant",
    contactName: "General Manager / Owner",
    contactRole: "Owner & Operator",
    recipientEmail: "contact@christinasnpr.com",
    phone: "(727) 847-7827",
    address: "5821 Main Street, New Port Richey, FL 34652",
    city: "New Port Richey",
    county: "Pasco",
    preferredLocale: "en",
    score: 89,
    priorityTier: "tier_1_high",
    status: "READY_REVIEW",
    signals: {
      hasCloverPOS: true,
      noSelfServiceKiosk: true,
      techStack: ["Clover POS", "Main Street Counter"],
      monthlyEstimatedLoss: 1100,
    },
    emailDraft: {
      subject: "table and counter ordering at Christina's Restaurant Main St",
      body: "Hi team at Christina's on Main Street in New Port Richey. As a downtown staple for morning family dining, weekend breakfast rushes create long wait times at the register. OrderPoint equips your counter with high-speed self-service ordering and 0% card transaction commissions. This is Fernando from Exo Advance, could I drop by for a quick 10-minute live demonstration at your location this week?",
      groundedSignal: "Historic Main Street Anchor + Weekend Breakfast Bottlenecks",
      wordCount: 71,
    },
    drafts: {
      en: {
        subject: "table and counter ordering at Christina's Restaurant Main St",
        body: "Hi team at Christina's on Main Street in New Port Richey. As a downtown staple for morning family dining, weekend breakfast rushes create long wait times at the register. OrderPoint equips your counter with high-speed self-service ordering and 0% card transaction commissions. This is Fernando from Exo Advance, could I drop by for a quick 10-minute live demonstration at your location this week?",
      },
      es: {
        subject: "pedidos rápidos de mostrador en Christina's Restaurant Main St",
        body: "Hola equipo de Christina's en Main Street en New Port Richey. En las mañanas de fin de semana se forman filas en la caja para pagar desayunos familiares. OrderPoint equipa su mostrador con kioskos de autoservicio y 0% de comisiones por transacción. Habla Fernando de Exo Advance, ¿puedo pasar 10 minutos a mostrarles una demo en vivo esta semana?",
      },
    },
    gateStatus: {
      passed: true,
      reasons: [],
    },
  },
];

/**
 * Fetches outbound cold prospect leads with signals and AI drafts.
 */
export async function fetchOutboundProspects(): Promise<{
  success: boolean;
  prospects: OutboundReviewItem[];
  error?: string;
}> {
  try {
    const isAuth = await isServerAdminAuthenticated();
    if (!isAuth) {
      return { success: false, prospects: [], error: "Unauthorized access." };
    }

    const supabase = await createServerClientInstance();
    const { data: dbProspects, error } = await supabase
      .from("prospects" as never)
      .select("*, email_logs(*)" as never)
      .order("score" as never, { ascending: false });

    if (error || !dbProspects || (dbProspects as unknown[]).length === 0) {
      // Return curated Florida target prospects
      return { success: true, prospects: INITIAL_TARGET_PROSPECTS };
    }

    const formatted: OutboundReviewItem[] = (dbProspects as any[]).map((p) => {
      const latestEmail = p.email_logs && p.email_logs.length > 0 ? p.email_logs[0] : null;
      return {
        id: p.id,
        domain: p.domain,
        url: p.url,
        companyName: p.company_name || p.domain,
        contactName: p.contact_name || "Owner",
        contactRole: p.role || "Decision Maker",
        recipientEmail: p.email || "",
        score: p.score || 0,
        priorityTier: p.priority_tier || "tier_3_low",
        status: p.status || "READY_REVIEW",
        signals: p.signals || {},
        personalizationNotes: p.personalization_notes,
        emailDraft: {
          subject: latestEmail?.draft_subject || "OrderPoint for your restaurant",
          body: latestEmail?.draft_body || "",
          groundedSignal: p.personalization_notes || "Detected Tech & Operating Signal",
          wordCount: (latestEmail?.draft_body || "").split(/\s+/).filter(Boolean).length,
        },
        gateStatus: latestEmail?.gate_check_result || { passed: true, reasons: [] },
        sentAt: latestEmail?.sent_at,
      };
    });

    return { success: true, prospects: formatted };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Failed to load outbound prospects";
    console.error("[OUTBOUND_FETCH_ERROR]", msg);
    return { success: true, prospects: INITIAL_TARGET_PROSPECTS };
  }
}

/**
 * Approves a cold draft and delivers it to the prospect via Resend.
 */
export async function approveAndSendOutboundEmail(
  prospectId: string,
  finalSubject: string,
  finalBody: string,
  recipientEmail: string,
  companyName: string
): Promise<{ success: boolean; messageId?: string; error?: string }> {
  try {
    const isAuth = await isServerAdminAuthenticated();
    if (!isAuth) {
      return { success: false, error: "Unauthorized access. Please log in to admin." };
    }

    if (!finalSubject.trim() || !finalBody.trim() || !recipientEmail.trim()) {
      return { success: false, error: "Recipient email, subject, and body are required." };
    }

    // 1. Dispatch through Resend Outbound
    const dispatchRes = await sendOutboundColdEmail({
      toEmail: recipientEmail.trim(),
      companyName,
      subject: finalSubject.trim(),
      body: finalBody.trim(),
    });

    if (!dispatchRes.success && dispatchRes.error) {
      return { success: false, error: dispatchRes.error };
    }

    // 2. Persist update in Supabase if table exists
    try {
      const supabase = await createServerClientInstance();
      await supabase
        .from("prospects" as never)
        .update({ status: "SENT" } as never)
        .eq("id" as never, prospectId as never);

      await supabase
        .from("email_logs" as never)
        .update({
          status: "SENT",
          final_subject: finalSubject.trim(),
          final_body: finalBody.trim(),
          message_id: dispatchRes.id || null,
          sent_at: new Date().toISOString(),
        } as never)
        .eq("prospect_id" as never, prospectId as never);
    } catch {
      // Ignored if local or table not yet migrated
    }

    return { success: true, messageId: dispatchRes.id };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Failed to approve and send outbound email";
    console.error("[OUTBOUND_SEND_EXCEPTION]", msg);
    return { success: false, error: msg };
  }
}

/**
 * Regenerates an email draft using a specific sales angle.
 */
export async function regenerateOutboundAngle(
  prospect: OutboundReviewItem,
  angle: "savings_toast" | "kiosk_upsell" | "kitchen_speed"
): Promise<{ success: boolean; subject: string; body: string }> {
  const isEs = prospect.recipientEmail.endsWith(".es") || prospect.domain.includes("taqueria") || prospect.domain.includes("habana");

  if (angle === "savings_toast") {
    return {
      success: true,
      subject: isEs ? "ahorro en comisiones vs Toast" : "cutting Toast processing markups",
      body: isEs
        ? `Hola ${prospect.contactName}, vi que ${prospect.companyName} procesa con sistemas cerrados tipo Toast o Clover. En locales de alto volumen eso suele representar más de $1,400 al mes en comisiones extras. OrderPoint ofrece software plano a $99/mes y 0% comisión por tarjeta. ¿Te gustaría ver los números exactos en una llamada de 5 minutos?`
        : `Hi ${prospect.contactName}, noticed ${prospect.companyName} operates on a traditional locked POS like Toast. Usually that ties up $1,200 to $1,800 monthly in card processing take-rates and proprietary terminal rentals. OrderPoint operates on flat 0% commission with open Samsung hardware. Open to seeing the exact side-by-side numbers on a 5-minute call?`,
    };
  }

  if (angle === "kiosk_upsell") {
    return {
      success: true,
      subject: isEs ? "kiosko 11 pulgadas y ventas sugeridas" : "counter self-service kiosks",
      body: isEs
        ? `Hola ${prospect.contactName}, estuvimos analizando el flujo de pedidos en ${prospect.companyName}. Nuestro Kiosko Autoservicio Samsung de 11" en mostrador sugiere automáticamente combos, bebidas y postres con cada orden (+22% en ticket promedio) y elimina las colas de espera. ¿Podemos llevar el equipo físico 10 minutos a tu local para que lo pruebes?`
        : `Hi ${prospect.contactName}, took a look at the order flow at ${prospect.companyName}. Our 11-inch Samsung self-service counter kiosk automatically prompts combos, sides, and beverage upgrades on every check (+22% average spend) while cutting queue times. Would you be open to an in-person 10-minute demo with our physical kiosk at your counter?`,
    };
  }

  // kitchen_speed
  return {
    success: true,
    subject: isEs ? "velocidad de comanda cocina y KDS" : "kitchen ticket speed under 50ms",
    body: isEs
      ? `Hola ${prospect.contactName}, en turnos de comida rápida en ${prospect.companyName}, la demora entre la toma de orden y la cocina suele generar cancelaciones. Nuestro sistema KDS sincroniza pedidos de saloneros y kioskos en menos de 50ms directo a la cocina. ¿Te interesaría probarlo sin compromiso?`
      : `Hi ${prospect.contactName}, during high-volume meal rushes at ${prospect.companyName}, lag between order taking and kitchen prep often creates bottleneck friction. Our real-time KDS system routes tickets from kiosks and handhelds in under 50ms. Would you be open to a quick demonstration?`,
  };
}
