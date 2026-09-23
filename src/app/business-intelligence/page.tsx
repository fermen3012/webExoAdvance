import React from "react";
import { BarChart3, LineChart, TrendingUp, CheckCircle2, Database, Shield, Zap } from "lucide-react";
import { ContactForm } from "@/components/sections/contact-form";

export const metadata = {
  title: "Business Intelligence & Analytics | Exo Advance LLC",
  description: "Turn your business data into better decisions with custom Power BI dashboards, KPI tracking, automated reporting, and enterprise data pipelines.",
};

export default function BusinessIntelligencePage() {
  return (
    <div className="min-h-screen bg-[#0A0F1A] text-white pt-32 pb-24 selection:bg-[#00E5FF] selection:text-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Header */}
        <div className="text-center max-w-4xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1E3A8A]/50 border border-[#00E5FF]/40 text-[#00E5FF] font-mono text-xs font-semibold mb-6">
            <BarChart3 className="w-4 h-4" /> ENTERPRISE DATA INTELLIGENCE
          </div>
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white font-sans uppercase">
            Turn your business data into <span className="text-[#00E5FF]">better decisions.</span>
          </h1>
          <p className="text-base sm:text-lg text-[#64748B] mt-6 max-w-2xl mx-auto leading-relaxed font-normal">
            Custom Power BI dashboards, automated data warehousing pipelines, and executive KPI monitoring designed to give leaders complete operational clarity.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {[
            {
              icon: BarChart3,
              title: "Executive Dashboards",
              description: "Unified C-suite visual dashboards aggregating revenue, operational expenses, inventory, and employee performance into a single screen.",
            },
            {
              icon: LineChart,
              title: "Real-Time KPI Monitoring",
              description: "Track live operational metrics with automated threshold triggers that alert management before issues impact profitability.",
            },
            {
              icon: Database,
              title: "Data Warehouse Pipelines",
              description: "Consolidate scattered data sources into high-performance SQL databases, Supabase analytics stores, or Power BI semantic models.",
            },
            {
              icon: TrendingUp,
              title: "Sales & Margin Forecasting",
              description: "Predictive financial modeling helping companies analyze product profitability, customer lifetime value, and seasonal trends.",
            },
            {
              icon: Zap,
              title: "Automated Reporting",
              description: "Eliminate manual spreadsheet assembly. Schedule daily, weekly, or monthly executive reports generated automatically.",
            },
            {
              icon: Shield,
              title: "Enterprise Governance",
              description: "Strict role-based data security ensuring departments only access information relevant to their operational authorization.",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="glass-card p-8 rounded-2xl border border-white/10 hover:border-[#00E5FF]/50 transition-all group"
            >
              <div className="w-12 h-12 rounded-xl bg-[#1E3A8A]/40 border border-[#00E5FF]/30 flex items-center justify-center text-[#00E5FF] mb-6">
                <item.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2 font-sans">{item.title}</h3>
              <p className="text-xs text-[#64748B] leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>

        {/* Technical Architecture Section */}
        <div className="glass-card p-8 sm:p-12 rounded-3xl border border-[#00E5FF]/30 mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6">
              <span className="text-xs font-mono text-[#00E5FF] font-bold uppercase tracking-widest">
                DATA ENGINEERING
              </span>
              <h2 className="text-3xl font-black text-white mt-2 font-sans">
                From Raw Data to Strategic Intelligence
              </h2>
              <p className="text-sm text-[#64748B] mt-4 leading-relaxed">
                Most companies collect vast amounts of data but lack the infrastructure to convert it into actionable strategy. Our engineers build the bridge.
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  "Clean ETL (Extract, Transform, Load) pipelines",
                  "Power BI Desktop & Service semantic modeling",
                  "Rest APIs & SQL Database connections",
                  "Row Level Security (RLS) implementation",
                ].map((point, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-[#00E5FF] shrink-0" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-6 bg-[#070B14] p-6 rounded-2xl border border-white/10 font-mono text-xs">
              <h3 className="text-xs text-[#00E5FF] font-bold uppercase mb-4">DATA PIPELINE FLOW</h3>
              <div className="space-y-3 text-slate-300">
                <div className="p-3 bg-[#0A0F1A] rounded border border-white/5 flex items-center justify-between">
                  <span>1. Source Ingestion (POS, ERP, Web)</span>
                  <span className="text-[#00E5FF]">CONNECTED</span>
                </div>
                <div className="p-3 bg-[#0A0F1A] rounded border border-white/5 flex items-center justify-between">
                  <span>2. Transformation & Cleaning</span>
                  <span className="text-[#00E5FF]">AUTOMATED</span>
                </div>
                <div className="p-3 bg-[#0A0F1A] rounded border border-white/5 flex items-center justify-between">
                  <span>3. Power BI & Executive Dashboards</span>
                  <span className="text-[#00E5FF]">LIVE METRICS</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form Section */}
        <div className="mt-16">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-3xl font-black text-white font-sans uppercase">
              Start Your BI Transformation
            </h2>
            <p className="text-sm text-[#64748B] mt-2">
              Speak with our data architects to evaluate your reporting and analytics needs.
            </p>
          </div>
          <ContactForm defaultService="Business Intelligence" />
        </div>
      </div>
    </div>
  );
}
