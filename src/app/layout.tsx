import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { AntigravityBackground } from "@/components/ui/antigravity-background";
import { PageTransition } from "@/components/layout/page-transition";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#0A0F1A",
  colorScheme: "dark",
};

export const metadata: Metadata = {
  title: {
    default: "Exo Advance LLC | Custom SaaS, Restaurant OS & Business Intelligence",
    template: "%s | Exo Advance LLC",
  },
  description:
    "Empower your business with Exo Advance. Custom software development, Exo Server restaurant kiosk POS, and real-time executive BI dashboards. Simplify all your operations in a single control panel.",
  keywords: [
    "Exo Advance",
    "Restaurant POS Kiosk Software",
    "Exo Server Restaurant OS",
    "Custom SaaS Development",
    "Executive Business Intelligence Dashboards",
    "Self-Service Kiosks POS",
    "Power BI Executive Dashboards",
    "Custom Web Applications",
    "AI Lead Automation Software",
    "Florida Custom Software Company",
  ],
  authors: [{ name: "Exo Advance LLC" }],
  creator: "Exo Advance LLC",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://exoadvance.com",
    title: "Exo Advance LLC | Tailored Solutions for Your Business, Your Way",
    description:
      "All your operations in a single control panel. Custom SaaS, Restaurant POS kiosks, and executive business intelligence dashboards engineered for growth.",
    siteName: "Exo Advance LLC",
  },
  twitter: {
    card: "summary_large_image",
    title: "Exo Advance LLC | Tailored Solutions for Your Business, Your Way",
    description:
      "All your operations in a single control panel. Custom SaaS, Restaurant POS kiosks, and executive business intelligence dashboards engineered for growth.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://exoadvance.com/#organization",
      "name": "Exo Advance LLC",
      "url": "https://exoadvance.com",
      "logo": "https://exoadvance.com/logo.png",
      "description":
        "Custom software development and modern web applications company. Our essence is to empower your business with unified operations and intelligent SaaS solutions.",
      "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "Sales and Demos",
        "email": "contact@exoadvance.com"
      }
    },
    {
      "@type": "SoftwareApplication",
      "name": "Exo Server Restaurant OS",
      "applicationCategory": "BusinessApplication",
      "operatingSystem": "Web, Cloud, POS Handhelds, Kiosks",
      "description":
        "Industrial-grade operating system for modern restaurants featuring self-service touchscreen kiosks, digital QR ordering, and real-time Kitchen Display Systems (KDS).",
      "offers": {
        "@type": "Offer",
        "priceCurrency": "USD",
        "availability": "https://schema.org/InStock"
      }
    },
    {
      "@type": "SoftwareApplication",
      "name": "Exo Business Intelligence & Data Warehouse",
      "applicationCategory": "BusinessApplication",
      "operatingSystem": "Web, Cloud, Desktop",
      "description":
        "Executive business intelligence dashboards and real-time KPI data warehousing for C-Suite leadership.",
      "offers": {
        "@type": "Offer",
        "priceCurrency": "USD",
        "availability": "https://schema.org/InStock"
      }
    }
  ]
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} h-full dark`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#0A0F1A] text-white font-sans antialiased selection:bg-[#00E5FF] selection:text-black relative">
        <AntigravityBackground />
        <Navbar />
        <main className="flex-grow relative z-10">
          <PageTransition>{children}</PageTransition>
        </main>
        <Footer />
      </body>
    </html>
  );
}
