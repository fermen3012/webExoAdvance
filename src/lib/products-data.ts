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
}

export const EXO_PRODUCTS_SERVICES: ProductServiceItem[] = [
  {
    id: "exo-server-restaurant-os",
    name: "Exo Server Restaurant OS",
    category: "restaurant",
    program: "Hospitality & Restaurant Suite",
    badge: "Flagship SaaS",
    description:
      "Industrial-grade operating system for modern restaurants featuring unified point-of-sale integration, self-service kiosks, and real-time operations control.",
    targetClient: "High-volume restaurants, food franchises, dark kitchens, and modern cafes.",
    features: [
      "Interactive touchscreen self-service ordering kiosks (Self-service ordering)",
      "Dynamic digital menus and instant QR code ordering with zero app downloads",
      "Kitchen Display System (KDS) with dispatch routing and preparation timers",
      "Mobile handheld terminals for floor waitstaff",
      "Real-time automated inventory tracking with low-stock alerts",
      "Omnichannel management consolidating delivery, dine-in, and takeout",
    ],
    pricingModel: "Monthly subscription per terminal/location + Hardware deployment",
    impactMetrics: [
      { label: "Wait Time in Line", value: "-45%" },
      { label: "Average Ticket (Upsell)", value: "+$4.20" },
      { label: "Kitchen Order Errors", value: "Near 0%" },
    ],
    routeHref: "/restaurant-technology",
  },
  {
    id: "exo-bi-analytics-suite",
    name: "Business Intelligence & Data Warehouse",
    category: "bi",
    program: "Executive Intelligence & Analytics",
    badge: "Enterprise Analytics",
    description:
      "Data engineering, automated ETL pipelines, and executive dashboards with continuous synchronization of strategic business KPIs.",
    targetClient: "CEOs, CFOs, operations directors, and scaling enterprises managing dispersed data sources.",
    features: [
      "Unified C-Suite dashboards (Finance, Sales, Inventory, and HR)",
      "Real-time operational KPI telemetry with automated trigger alerts",
      "Scalable Data Warehouse pipelines (PostgreSQL, Supabase, BigQuery)",
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
  },
  {
    id: "exo-custom-core-software",
    name: "Custom Enterprise Web Platforms",
    category: "software",
    program: "Tailored Software Architecture",
    badge: "High-Performance Cloud",
    description:
      "Custom web platforms and bespoke SaaS systems built with modern microservices, TypeScript, and Next.js, serving as your business's technological exoskeleton.",
    targetClient: "Growing enterprises that have outgrown rigid off-the-shelf software and chaotic spreadsheets.",
    features: [
      "Ultra-fast progressive web applications powered by Next.js 16 and React 19",
      "Custom internal management systems (lightweight ERP, bespoke CRM portals)",
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
  },
  {
    id: "exo-ai-workflow-agents",
    name: "Autonomous AI Agents & Lead Enrichment",
    category: "automation",
    program: "Artificial Intelligence Automation",
    badge: "AI Powered",
    description:
      "Autonomous agents for instant inbound lead qualification, personalized AI email responses, and automated operational orchestration.",
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
  },
];
