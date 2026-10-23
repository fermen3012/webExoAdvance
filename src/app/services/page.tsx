import React from "react";
import Link from "next/link";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { EXO_PRODUCTS_SERVICES } from "@/lib/products-data";
import {
  Code2,
  BarChart3,
  Utensils,
  Bot,
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  ShieldCheck,
  Zap,
  Globe,
  Layers,
  Sparkles,
} from "lucide-react";

export const metadata = {
  title: "Services & Production Apps | Exo Advance LLC",
  description:
    "Tailored solutions for your business, your way. Discover our custom software, websites, and high-performance production applications.",
};

export default function ServicesPage() {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "restaurant":
        return <Utensils className="w-6 h-6 text-[#00E5FF]" />;
      case "bi":
        return <BarChart3 className="w-6 h-6 text-purple-400" />;
      case "software":
        return <Code2 className="w-6 h-6 text-emerald-400" />;
      case "automation":
        return <Bot className="w-6 h-6 text-amber-400" />;
      default:
        return <Globe className="w-6 h-6 text-[#00E5FF]" />;
    }
  };

  return (
    <div className="min-h-screen text-white pt-32 pb-24 selection:bg-[#00E5FF] selection:text-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Hero */}
        <div className="text-center max-w-4xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1E3A8A]/50 border border-[#00E5FF]/40 text-[#00E5FF] font-mono text-xs font-semibold mb-6">
            <Sparkles className="w-4 h-4 animate-pulse" />
            SERVICES & PRODUCTION APPLICATIONS
          </div>

          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white font-sans uppercase">
            Tailored solutions for your business,{" "}
            <span className="text-[#00E5FF]">your way.</span>
          </h1>

          <p className="text-base sm:text-lg text-[#94A3B8] mt-6 max-w-2xl mx-auto leading-relaxed font-normal">
            <strong>Exo Advance</strong> is a custom software and modern web development company. Our essence is to empower your business by simplifying all your operations into a single control panel.
          </p>
        </div>

        {/* Core Value Proposition Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          <SpotlightCard className="p-7">
            <div className="w-12 h-12 rounded-2xl bg-[#1E3A8A]/50 border border-[#00E5FF]/40 flex items-center justify-center text-[#00E5FF] mb-5">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-black text-white font-sans mb-2">
              Improve Productivity
            </h3>
            <p className="text-xs text-[#94A3B8] leading-relaxed">
              Gain a decisive competitive advantage by automating manual, repetitive tasks across your team.
            </p>
          </SpotlightCard>

          <SpotlightCard className="p-7">
            <div className="w-12 h-12 rounded-2xl bg-purple-950/50 border border-purple-500/40 flex items-center justify-center text-purple-400 mb-5">
              <Layers className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-black text-white font-sans mb-2">
              All Operations, Unified
            </h3>
            <p className="text-xs text-[#94A3B8] leading-relaxed">
              Manage inventory, sales, customer interactions, and processes in a single centralized, secure control panel.
            </p>
          </SpotlightCard>

          <SpotlightCard className="p-7">
            <div className="w-12 h-12 rounded-2xl bg-emerald-950/50 border border-emerald-500/40 flex items-center justify-center text-emerald-400 mb-5">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-black text-white font-sans mb-2">
              Focus on Growth
            </h3>
            <p className="text-xs text-[#94A3B8] leading-relaxed">
              Automate routine workflows so your leadership can focus entirely on expanding and scaling your business.
            </p>
          </SpotlightCard>
        </div>

        {/* Section: Apps & Systems in Production */}
        <div id="demos" className="space-y-8 mb-20 scroll-mt-28">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/10 pb-6">
            <div>
              <span className="text-[10px] font-mono tracking-widest text-[#00E5FF] uppercase block font-bold">
                ACTIVE PRODUCTION PORTFOLIO // LIVE SANDBOX
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-white font-sans mt-1">
                Our Applications & Systems in Production
              </h2>
            </div>
            <p className="text-xs text-[#64748B] font-mono sm:max-w-xs">
              Explore interactive live demos and test our production platforms directly.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {EXO_PRODUCTS_SERVICES.map((prod) => (
              <SpotlightCard key={prod.id} className="p-8 sm:p-9 flex flex-col justify-between">
                <div className="space-y-5">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3.5">
                      <div className="w-12 h-12 rounded-2xl bg-[#070B14] border border-white/10 flex items-center justify-center shrink-0">
                        {getCategoryIcon(prod.category)}
                      </div>
                      <div>
                        <span className="text-[10px] font-mono tracking-widest text-[#00E5FF] uppercase block">
                          {prod.program}
                        </span>
                        <h3 className="text-2xl font-black text-white font-sans">
                          {prod.name}
                        </h3>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono uppercase tracking-wider font-bold px-3 py-1 rounded-full bg-white/5 border border-white/10 text-slate-300 shrink-0">
                      {prod.badge}
                    </span>
                  </div>

                  <p className="text-sm text-[#94A3B8] leading-relaxed font-normal">
                    {prod.description}
                  </p>

                  {/* Features List */}
                  <div className="space-y-2 pt-2 border-t border-white/10">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#64748B] block font-bold">
                      Key Capabilities:
                    </span>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
                      {prod.features.slice(0, 4).map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-slate-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#00E5FF] shrink-0 mt-0.5" />
                          <span className="text-[11px] leading-tight">{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Impact Metrics */}
                  <div className="grid grid-cols-3 gap-2 pt-3 border-t border-white/10">
                    {prod.impactMetrics.map((metric, idx) => (
                      <div key={idx} className="bg-[#070B14] p-2.5 rounded-lg border border-white/5 text-center">
                        <span className="text-[9px] font-mono text-[#64748B] block uppercase">
                          {metric.label}
                        </span>
                        <span className="text-sm font-black text-[#00E5FF] font-sans mt-0.5 block">
                          {metric.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
                  <span className="text-[11px] font-mono text-slate-400">
                    {prod.pricingModel}
                  </span>

                  <div className="flex items-center gap-2">
                    <Link
                      href={prod.demoHref || prod.routeHref}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-[#00E5FF]/20 to-[#1E3A8A]/50 hover:from-[#00E5FF]/30 hover:to-[#1E3A8A]/70 text-[#00E5FF] hover:text-white font-mono text-xs font-bold uppercase tracking-wider border border-[#00E5FF]/60 hover:border-[#00E5FF] transition-all shadow-[0_0_15px_rgba(0,229,255,0.25)] hover:scale-105 active:scale-95 group/demo cursor-pointer"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-[#00E5FF] animate-pulse" />
                      <span>Live Demo</span>
                    </Link>

                    <Link
                      href={prod.routeHref}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white font-mono text-xs font-bold uppercase tracking-wider border border-white/10 hover:border-white/20 transition-all group"
                    >
                      <span>Details</span>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#00E5FF] group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </SpotlightCard>
            ))}
          </div>
        </div>

        {/* CTA Contact Section */}
        <div className="glass-card p-10 sm:p-14 rounded-3xl border border-[#00E5FF]/30 text-center relative overflow-hidden bg-gradient-to-r from-[#0A0F1A] via-[#1E3A8A]/20 to-[#0A0F1A]">
          <h2 className="text-3xl sm:text-5xl font-black text-white font-sans uppercase">
            Ready to simplify your operations?
          </h2>
          <p className="text-sm sm:text-base text-[#94A3B8] max-w-xl mx-auto mt-4 leading-relaxed font-normal">
            Empower your enterprise with an architecture engineered exactly your way. Our senior engineering team is ready to assist you.
          </p>
          <div className="mt-8 flex justify-center">
            <Link
              href="/contact"
              className="px-8 py-4 rounded-xl bg-[#1E3A8A] hover:bg-[#1E3A8A]/90 text-white font-mono text-xs tracking-wider font-bold uppercase border border-[#00E5FF] transition-all shadow-[0_0_25px_rgba(0,229,255,0.3)] hover:scale-105 active:scale-95 flex items-center gap-2 group"
            >
              <span>START A CONVERSATION</span>
              <ArrowRight className="w-4 h-4 text-[#00E5FF] group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
