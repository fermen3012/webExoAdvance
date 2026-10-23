export interface ProductServiceItem {
  id: string;
  name: string;
  category: "restaurant" | "software" | "bi" | "automation";
  program: string;
  badge: string;
  description: string;
  targetClient: string;
  features: string[];
  pricingModel: string;
  impactMetrics: { label: string; value: string }[];
  routeHref: string;
  demoHref?: string;
}

export const EXO_PRODUCTS_SERVICES: ProductServiceItem[] = [
  {
    id: "exo-server-restaurant-os",
    name: "Exo Server Restaurant OS",
    category: "restaurant",
    program: "Hospitality & Restaurant Suite",
    badge: "Flagship SaaS",
    description:
      "Eliminate line bottlenecks and boost check size. An all-in-one POS and kitchen display operating system with touchscreen self-service kiosks and digital QR ordering.",
    targetClient: "High-volume restaurants, food franchises, dark kitchens, and modern cafes.",
    features: [
      "Interactive touchscreen self-service ordering kiosks",
      "Instant contactless QR menus with zero app downloads",
      "Real-time Kitchen Display Systems (KDS) with dispatch timers",
      "Mobile handheld terminals for floor waitstaff",
      "Automated live inventory tracking with low-stock alerts",
      "Unified sales dashboard for dine-in, takeout, and delivery",
    ],
    pricingModel: "Monthly subscription per terminal/location + Hardware deployment",
    impactMetrics: [
      { label: "Wait Time in Line", value: "-45%" },
      { label: "Average Ticket (Upsell)", value: "+$4.20" },
      { label: "Kitchen Order Errors", value: "Near 0%" },
    ],
    routeHref: "/restaurant-technology",
    demoHref: "/restaurant-technology#demo",
  },
  {
    id: "exo-bi-analytics-suite",
    name: "Business Intelligence & Data Warehouse",
    category: "bi",
    program: "Executive Intelligence & Analytics",
    badge: "Enterprise Analytics",
    description:
      "Stop digging through chaotic spreadsheets. Get real-time executive dashboards and mobile telemetry tracking your sales, margins, and inventory health live.",
    targetClient: "CEOs, CFOs, operations directors, and scaling enterprises managing dispersed data sources.",
    features: [
      "Unified C-Suite dashboards (Finance, Sales, Inventory, and HR)",
      "Real-time operational KPI telemetry with automated trigger alerts",
      "Automated daily synchronization without manual report drafting",
      "Predictive models forecasting sales, demand seasonality, and profit margins",
      "Automated scheduled executive briefings and email digests",
      "Enterprise-grade governance with granular Row Level Security (RLS)",
    ],
    pricingModel: "Data pipeline engineering + Monthly synchronization maintenance",
    impactMetrics: [
      { label: "Manual Reporting Time", value: "-80%" },
      { label: "Margin Visibility", value: "100% Real-time" },
      { label: "Return on Investment", value: "3x in 90 days" },
    ],
    routeHref: "/business-intelligence",
    demoHref: "/business-intelligence#demo",
  },
  {
    id: "exo-custom-core-software",
    name: "Custom Enterprise Web Platforms",
    category: "software",
    program: "Tailored Software Architecture",
    badge: "High-Performance Cloud",
    description:
      "Replace disjointed off-the-shelf software with a custom web platform built 100% around your business workflow, team permissions, and client portal.",
    targetClient: "Growing enterprises that have outgrown rigid off-the-shelf software and chaotic spreadsheets.",
    features: [
      "Ultra-fast progressive web applications powered by Next.js 16 and React 19",
      "Bespoke internal management systems (lightweight ERP, custom CRM portals)",
      "Automated business workflows driven by cloud functions and real-time webhooks",
      "Seamless payment gateway integrations (Stripe, Square, PayPal) and third-party APIs",
      "Serverless cloud infrastructure with 99.99% SLA uptime and sub-second latency",
      "Bank-level data encryption, defensive sanitization, and continuous InfoSec audits",
    ],
    pricingModel: "Milestone-based project architecture + SLA support & continuous evolution",
    impactMetrics: [
      { label: "Page Load Time", value: "< 1.2s" },
      { label: "Platform SLA Uptime", value: "99.99%" },
      { label: "Manual Effort Saved", value: "Up to 25 hrs/wk" },
    ],
    routeHref: "/software-development",
    demoHref: "/software-development#demo",
  },
  {
    id: "exo-ai-workflow-agents",
    name: "Autonomous AI Agents & Lead Enrichment",
    category: "automation",
    program: "Artificial Intelligence Automation",
    badge: "AI Powered",
    description:
      "Never lose a high-value lead again. Autonomous AI that scores inbound inquiries, analyzes commercial intent, and drafts personalized proposals in under 5 seconds.",
    targetClient: "Sales teams, professional service firms, and fast-growing B2B commerce platforms.",
    features: [
      "Instant automated lead qualification and algorithmic scoring (0 to 100)",
      "Natural language sentiment and purchase intent analysis with LLM reasoning",
      "Real-time personalized proposal generation and instant dispatch via Resend",
      "Complete interaction history and automated audit logs in a centralized CRM",
      "Native integration with spam-protected, rate-limited contact workflows",
      "Zero-downtime graceful fallback resilience against third-party API interruptions",
    ],
    pricingModel: "Flat agent engine tier + token consumption per qualified lead",
    impactMetrics: [
      { label: "Response Velocity", value: "< 5 seconds" },
      { label: "Contact Conversion Rate", value: "+60%" },
      { label: "Lead Qualification", value: "100% Automated" },
    ],
    routeHref: "/solutions",
    demoHref: "/solutions#demo",
  },
];
