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
    default: "Exo Advance LLC | Enterprise Software & Restaurant Technology",
    template: "%s | Exo Advance LLC",
  },
  description:
    "Exo Advance LLC provides custom software development, business intelligence, executive analytics dashboards, and Exo Server restaurant operating system software.",
  keywords: [
    "Exo Advance",
    "Software Development",
    "Business Intelligence",
    "Restaurant Technology",
    "Exo Server",
    "Kiosk POS",
    "Power BI",
    "Enterprise Systems",
    "Florida Technology Company",
  ],
  authors: [{ name: "Exo Advance LLC" }],
  creator: "Exo Advance LLC",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://exoadvance.com",
    title: "Exo Advance LLC | Technology as an Exoskeleton",
    description:
      "Software development, Business Intelligence, and Restaurant Technology engineered to strengthen enterprise operations.",
    siteName: "Exo Advance LLC",
  },
  twitter: {
    card: "summary_large_image",
    title: "Exo Advance LLC | Technology as an Exoskeleton",
    description:
      "Software development, Business Intelligence, and Restaurant Technology engineered to strengthen enterprise operations.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Exo Advance LLC",
  url: "https://exoadvance.com",
  logo: "https://exoadvance.com/logo.png",
  description:
    "Exo Advance LLC is an enterprise technology firm specializing in Software Development, Business Intelligence, and Restaurant Technology (Exo Server).",
  knowsAbout: [
    "Software Engineering",
    "Business Intelligence & Analytics",
    "Restaurant Technology",
    "Self-Service Kiosks",
    "Kitchen Display Systems",
  ],
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
