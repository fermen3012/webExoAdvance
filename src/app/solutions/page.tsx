import React from "react";
import Link from "next/link";
import { ArrowRight, Code2, BarChart3, Utensils, CheckCircle2 } from "lucide-react";

export const metadata = {
  title: "Solutions | Exo Advance LLC",
  description: "Explore enterprise software development, business intelligence, and restaurant technology solutions engineered by Exo Advance LLC.",
};

export default function SolutionsPage() {
  return (
    <div className="min-h-screen bg-[#0A0F1A] text-white pt-32 pb-24 selection:bg-[#00E5FF] selection:text-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#1E3A8A]/50 border border-[#00E5FF]/40 text-[#00E5FF] font-mono text-xs font-semibold mb-4">
            SOLUTIONS OVERVIEW
          </div>
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white font-sans">
            Technology Solutions Engineered for{" "}
            <span className="text-[#00E5FF]">Operational Supremacy</span>
          </h1>
          <p className="text-lg text-[#64748B] mt-6 leading-relaxed">
            Exo Advance builds specialized enterprise software, advanced data analytics tools, and modern SaaS products designed to act as an external technological exoskeleton for your organization.
          </p>
        </div>

        {/* Core Solution Pillars */}
        <div className="space-y-16">
          {/* Solution 1: Exo Server */}
          <div className="glass-card p-8 sm:p-12 rounded-3xl border border-[#00E5FF]/30 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7">
              <div className="w-12 h-12 rounded-xl bg-[#1E3A8A] flex items-center justify-center text-[#00E5FF] mb-6">
                <Utensils className="w-6 h-6" />
              </div>
              <p className="text-xs font-mono font-bold text-[#00E5FF] tracking-widest uppercase">
                FLAGSHIP SaaS PRODUCT
              </p>
              <h2 className="text-3xl font-black text-white mt-1 mb-4 font-sans">
                Exo Server Restaurant OS
              </h2>
              <p className="text-base text-[#64748B] leading-relaxed mb-6">
                The operating system for modern restaurants. Exo Server integrates self-service kiosks, digital QR ordering, kitchen display systems (KDS), mobile waitstaff apps, and real-time operational analytics into a unified cloud engine.
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8 text-sm">
                {[
                  "Self-service ordering kiosks",
                  "Contactless QR code menus",
                  "Real-time Kitchen Displays (KDS)",
                  "Waitstaff mobile terminal software",
                  "Automated inventory tracking",
                  "Multi-location sales analytics",
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-[#00E5FF] shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/restaurant-technology"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#1E3A8A] hover:bg-[#1E3A8A]/90 text-white font-mono text-xs font-bold tracking-wider uppercase border border-[#00E5FF] transition-all"
              >
                <span>EXPLORE EXO SERVER</span>
                <ArrowRight className="w-4 h-4 text-[#00E5FF]" />
              </Link>
            </div>
            <div className="lg:col-span-5 bg-[#070B14] p-6 rounded-2xl border border-white/10">
              <h3 className="text-xs font-mono font-bold text-[#00E5FF] mb-4">EXO SERVER CAPABILITY</h3>
              <div className="space-y-3 font-mono text-xs text-slate-300">
                <div className="p-3 bg-[#0A0F1A] rounded border border-white/5 flex justify-between">
                  <span>Guest Order Time</span>
                  <span className="text-[#00E5FF]">-45% Acceleration</span>
                </div>
                <div className="p-3 bg-[#0A0F1A] rounded border border-white/5 flex justify-between">
                  <span>Kitchen Error Rate</span>
                  <span className="text-[#00E5FF]">Near Zero</span>
                </div>
                <div className="p-3 bg-[#0A0F1A] rounded border border-white/5 flex justify-between">
                  <span>Average Ticket Size</span>
                  <span className="text-[#00E5FF]">+$4.20 Upsell</span>
                </div>
              </div>
            </div>
          </div>

          {/* Solution 2: Business Intelligence */}
          <div className="glass-card p-8 sm:p-12 rounded-3xl border border-[#00E5FF]/30 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7">
              <div className="w-12 h-12 rounded-xl bg-[#1E3A8A] flex items-center justify-center text-[#00E5FF] mb-6">
                <BarChart3 className="w-6 h-6" />
              </div>
              <p className="text-xs font-mono font-bold text-[#00E5FF] tracking-widest uppercase">
                DATA & ANALYTICS
              </p>
              <h2 className="text-3xl font-black text-white mt-1 mb-4 font-sans">
                Business Intelligence & Analytics
              </h2>
              <p className="text-base text-[#64748B] leading-relaxed mb-6">
                Transforming disconnected operational data into decisive executive leadership insights. We build custom Power BI dashboards, automated data ingestion pipelines, and predictive analytics tools.
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8 text-sm">
                {[
                  "Executive KPI tracking",
                  "Power BI & custom reporting",
                  "Real-time operational alerts",
                  "Automated ETL data pipelines",
                  "Financial & sales forecasting",
                  "Cross-platform data warehousing",
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-[#00E5FF] shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/business-intelligence"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#1E3A8A] hover:bg-[#1E3A8A]/90 text-white font-mono text-xs font-bold tracking-wider uppercase border border-[#00E5FF] transition-all"
              >
                <span>EXPLORE BUSINESS INTELLIGENCE</span>
                <ArrowRight className="w-4 h-4 text-[#00E5FF]" />
              </Link>
            </div>
            <div className="lg:col-span-5 bg-[#070B14] p-6 rounded-2xl border border-white/10">
              <h3 className="text-xs font-mono font-bold text-[#00E5FF] mb-4">DATA INTEGRATION SOURCES</h3>
              <div className="space-y-3 font-mono text-xs text-slate-300">
                <div className="p-3 bg-[#0A0F1A] rounded border border-white/5">
                  Power BI & SQL Data Warehouses
                </div>
                <div className="p-3 bg-[#0A0F1A] rounded border border-white/5">
                  ERP & CRM Enterprise Connections
                </div>
                <div className="p-3 bg-[#0A0F1A] rounded border border-white/5">
                  Custom Financial & Operational APIs
                </div>
              </div>
            </div>
          </div>

          {/* Solution 3: Custom Software Development */}
          <div className="glass-card p-8 sm:p-12 rounded-3xl border border-[#00E5FF]/30 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7">
              <div className="w-12 h-12 rounded-xl bg-[#1E3A8A] flex items-center justify-center text-[#00E5FF] mb-6">
                <Code2 className="w-6 h-6" />
              </div>
              <p className="text-xs font-mono font-bold text-[#00E5FF] tracking-widest uppercase">
                ENTERPRISE ENGINEERING
              </p>
              <h2 className="text-3xl font-black text-white mt-1 mb-4 font-sans">
                Custom Software Development
              </h2>
              <p className="text-base text-[#64748B] leading-relaxed mb-6">
                When off-the-shelf software fails your business logic, we architect custom platforms. Tailored web applications, internal business operating systems, cloud automations, and secure APIs.
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8 text-sm">
                {[
                  "Full-stack Next.js & React apps",
                  "Supabase & PostgreSQL backends",
                  "Enterprise API integrations",
                  "Workflow & operational automation",
                  "Row Level Security (RLS) models",
                  "Scalable cloud deployment",
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-[#00E5FF] shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/software-development"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#1E3A8A] hover:bg-[#1E3A8A]/90 text-white font-mono text-xs font-bold tracking-wider uppercase border border-[#00E5FF] transition-all"
              >
                <span>EXPLORE SOFTWARE DEVELOPMENT</span>
                <ArrowRight className="w-4 h-4 text-[#00E5FF]" />
              </Link>
            </div>
            <div className="lg:col-span-5 bg-[#070B14] p-6 rounded-2xl border border-white/10">
              <h3 className="text-xs font-mono font-bold text-[#00E5FF] mb-4">ENGINEERING STACK</h3>
              <div className="grid grid-cols-2 gap-3 font-mono text-xs text-slate-300">
                <div className="p-3 bg-[#0A0F1A] rounded border border-white/5">Next.js 16</div>
                <div className="p-3 bg-[#0A0F1A] rounded border border-white/5">TypeScript</div>
                <div className="p-3 bg-[#0A0F1A] rounded border border-white/5">Supabase</div>
                <div className="p-3 bg-[#0A0F1A] rounded border border-white/5">PostgreSQL</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
