import React from "react";
import Link from "next/link";
import { ExoskeletonGraphic } from "@/components/ui/exoskeleton-graphic";
import { ExoSpringTransition } from "@/components/ui/exo-spring-transition";
import { ContactForm } from "@/components/sections/contact-form";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { TechMarquee } from "@/components/ui/tech-marquee";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { InteractiveBentoSuite } from "@/components/ui/interactive-bento-suite";
import { ModernParallaxShowcase } from "@/components/ui/modern-parallax-showcase";
import {
  Code2,
  BarChart3,
  Utensils,
  ArrowRight,
  ShieldCheck,
  Zap,
  TrendingUp,
  Layers,
  CheckCircle2,
  ChevronRight,
  Cpu,
  Sparkles,
  Bot,
  Activity,
} from "lucide-react";

export default function HomePage() {
  return (
    <div className="relative min-h-screen text-white selection:bg-[#00E5FF] selection:text-black">
      {/* ================= ACTO 1: THE KINETIC HERO (ESTILO FRAMER) ================= */}
      <section className="relative pt-32 pb-20 lg:pt-44 lg:pb-28 overflow-hidden border-b border-[#00E5FF]/10">
        {/* Background Grid & Lighting Effects */}
        <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#1E3A8A]/25 rounded-full blur-[140px] pointer-events-none animate-glow-pulse" />
        <div className="absolute top-1/3 right-10 w-[350px] h-[350px] bg-[#00E5FF]/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-7 flex flex-col items-start text-left">
              <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#1E3A8A]/40 border border-[#00E5FF]/30 text-[#00E5FF] text-xs font-mono font-semibold tracking-wider mb-6 shadow-[0_0_20px_rgba(0,229,255,0.2)]">
                <span className="w-2 h-2 rounded-full bg-[#00E5FF] animate-pulse" />
                EXO ADVANCE // CUSTOM SAAS & CLOUD PLATFORMS
              </div>

              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white leading-[1.05] font-sans">
                Tailored solutions for your business,{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-[#00E5FF]">
                  your way.
                </span>
              </h1>

              <p className="mt-6 text-lg sm:text-xl text-[#94A3B8] leading-relaxed max-w-2xl font-normal">
                <strong className="text-white font-bold">Exo Advance</strong> is a custom software and modern web development company. Our essence is to empower your business: run your sales, inventory, and operations from a single control panel. Improve productivity, eliminate manual bottlenecks, and gain a decisive competitive advantage.
              </p>

              {/* Shimmer CTAs */}
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link
                  href="/services#demos"
                  className="px-7 py-4 rounded-xl bg-[#1E3A8A] hover:bg-[#1E3A8A]/90 text-white font-mono text-xs tracking-wider font-bold uppercase border border-[#00E5FF] transition-all shadow-[0_0_25px_rgba(0,229,255,0.25)] hover:shadow-[0_0_35px_rgba(0,229,255,0.45)] hover:scale-[1.02] active:scale-95 flex items-center gap-2 group cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-[#00E5FF] animate-pulse" />
                  <span>EXPLORE LIVE DEMOS</span>
                  <ArrowRight className="w-4 h-4 text-[#00E5FF] group-hover:translate-x-1.5 transition-transform" />
                </Link>

                <Link
                  href="/contact"
                  className="px-7 py-4 rounded-xl bg-[#0F172A]/80 hover:bg-[#0F172A] text-slate-200 hover:text-white font-mono text-xs tracking-wider font-semibold uppercase border border-white/10 hover:border-white/30 transition-all flex items-center gap-2 hover:scale-[1.02] active:scale-95 cursor-pointer"
                >
                  <span>TALK TO AN EXPERT</span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </Link>
              </div>

              {/* Core Feature Tags with Spotlight Touch */}
              <div className="mt-12 pt-8 border-t border-white/10 grid grid-cols-3 gap-6 w-full max-w-lg">
                <div>
                  <p className="text-xs font-mono text-[#00E5FF] font-semibold">ONE CONTROL PANEL</p>
                  <p className="text-xs text-[#64748B] mt-0.5">Zero chaos</p>
                </div>
                <div>
                  <p className="text-xs font-mono text-[#00E5FF] font-semibold">LIVE DEMOS</p>
                  <p className="text-xs text-[#64748B] mt-0.5">Test instantly</p>
                </div>
                <div>
                  <p className="text-xs font-mono text-[#00E5FF] font-semibold">AUTOMATION</p>
                  <p className="text-xs text-[#64748B] mt-0.5">Built to scale</p>
                </div>
              </div>
            </div>

            {/* Right Visual Column (Exoskeleton Kinetic Graphic) */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <ExoskeletonGraphic />
            </div>
          </div>
        </div>
      </section>

      {/* ================= ACTO 2: LIVE TECH MARQUEE (FRAMER STYLE) ================= */}
      <TechMarquee />

      {/* ================= ACTO 3: METRIC COUNTERS (ANIMATED IMPACT) ================= */}
      <section className="py-16 relative bg-[#0A0F1A] border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <SpotlightCard className="p-6 text-center">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#64748B] block mb-1">
                Order Speed Acceleration
              </span>
              <div className="text-3xl sm:text-5xl font-black text-[#00E5FF] font-sans tracking-tight">
                <AnimatedCounter to={45} prefix="-" suffix="%" />
              </div>
              <p className="text-[11px] font-mono text-slate-400 mt-2">
                Faster checkout with touch kiosks & QR menus
              </p>
            </SpotlightCard>

            <SpotlightCard className="p-6 text-center">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#64748B] block mb-1">
                Average Ticket Upsell
              </span>
              <div className="text-3xl sm:text-5xl font-black text-emerald-400 font-sans tracking-tight">
                <AnimatedCounter to={4.2} prefix="+$" decimals={2} />
              </div>
              <p className="text-[11px] font-mono text-slate-400 mt-2">
                Automated recommendations per order
              </p>
            </SpotlightCard>

            <SpotlightCard className="p-6 text-center">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#64748B] block mb-1">
                System Reliability
              </span>
              <div className="text-3xl sm:text-5xl font-black text-purple-400 font-sans tracking-tight">
                <AnimatedCounter to={99.99} suffix="%" decimals={2} />
              </div>
              <p className="text-[11px] font-mono text-slate-400 mt-2">
                Zero crashes during peak sales rush
              </p>
            </SpotlightCard>

            <SpotlightCard className="p-6 text-center">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#64748B] block mb-1">
                Lead Response Time
              </span>
              <div className="text-3xl sm:text-5xl font-black text-white font-sans tracking-tight">
                <AnimatedCounter to={5} prefix="<" suffix="s" />
              </div>
              <p className="text-[11px] font-mono text-slate-400 mt-2">
                Instant 24/7 AI qualification & quotes
              </p>
            </SpotlightCard>
          </div>
        </div>
      </section>

      {/* ================= ACTO 4: INTERACTIVE BENTO GRID SUITE (ESTILO FRAMER) ================= */}
      <section className="py-24 sm:py-32 relative bg-[#070B14] border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1E3A8A]/50 border border-[#00E5FF]/40 text-[#00E5FF] font-mono text-xs font-bold uppercase tracking-wider mb-4">
              <Layers className="w-3.5 h-3.5" />
              <span>PRODUCT-LED SUITE // LIVE APPS</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight font-sans">
              SaaS Platforms Engineered to <span className="text-[#00E5FF]">Grow Your Bottom Line</span>
            </h2>
            <p className="text-base text-[#94A3B8] mt-4 leading-relaxed font-normal">
              Pick your platform, explore interactive features, and see how our systems put you miles ahead of the competition.
            </p>
          </div>

          {/* Bento Grid Interactivo con Spotlight */}
          <InteractiveBentoSuite />
        </div>
      </section>

      {/* ================= ACTO 4.5: MODERN PARALLAX SHOWCASE (FRAMER DEPTH) ================= */}
      <ModernParallaxShowcase />

      {/* ================= ACTO 5: OPERATIONS & UNIFIED COMMAND ================= */}
      <section className="py-24 relative bg-[#0A0F1A] border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-mono font-bold text-[#00E5FF] tracking-[0.3em] uppercase mb-3">
              THE POWER OF SIMPLICITY
            </h2>
            <h3 className="text-3xl sm:text-5xl font-black text-white tracking-tight font-sans uppercase">
              ALL YOUR OPERATIONS IN A SINGLE CONTROL PANEL
            </h3>
            <div className="w-16 h-1 bg-[#00E5FF] mx-auto my-6 shadow-[0_0_10px_#00E5FF]" />
            <p className="text-base sm:text-lg text-[#94A3B8] leading-relaxed">
              Simplify your operations with Exo Advance. Stop juggling 10 different tools. Automate routine tasks so you can focus 100% on expanding your business.
            </p>
          </div>

          {/* Three Visual Pillars with Spotlight */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <SpotlightCard className="p-8">
              <div className="w-12 h-12 rounded-xl bg-[#1E3A8A]/40 border border-[#00E5FF]/40 flex items-center justify-center text-[#00E5FF] mb-6 shadow-[0_0_15px_rgba(0,229,255,0.2)]">
                <Code2 className="w-6 h-6" />
              </div>
              <p className="text-xs font-mono font-semibold text-[#00E5FF] tracking-widest uppercase">
                TAILORED SOLUTIONS
              </p>
              <h4 className="text-2xl font-black text-white mt-1 mb-2 font-sans">
                CUSTOM SOFTWARE
              </h4>
              <span className="inline-block px-3 py-1 rounded bg-[#00E5FF]/10 text-[#00E5FF] font-mono text-xs font-bold tracking-wider uppercase mb-4">
                YOUR WAY
              </span>
              <p className="text-sm text-[#94A3B8] leading-relaxed">
                Ditch messy spreadsheets. Get a high-speed web application tailored 100% to your team&apos;s workflow, clients, and growth goals.
              </p>
            </SpotlightCard>

            <SpotlightCard className="p-8">
              <div className="w-12 h-12 rounded-xl bg-[#1E3A8A]/40 border border-[#00E5FF]/40 flex items-center justify-center text-[#00E5FF] mb-6 shadow-[0_0_15px_rgba(0,229,255,0.2)]">
                <BarChart3 className="w-6 h-6" />
              </div>
              <p className="text-xs font-mono font-semibold text-[#00E5FF] tracking-widest uppercase">
                CENTRALIZED COMMAND
              </p>
              <h4 className="text-2xl font-black text-white mt-1 mb-2 font-sans">
                SINGLE CONTROL PANEL
              </h4>
              <span className="inline-block px-3 py-1 rounded bg-[#00E5FF]/10 text-[#00E5FF] font-mono text-xs font-bold tracking-wider uppercase mb-4">
                SIMPLIFY
              </span>
              <p className="text-sm text-[#94A3B8] leading-relaxed">
                Live revenue, margin, and stock dashboards on your phone or desktop. Eliminate blind spots and make decisions based on real-time facts.
              </p>
            </SpotlightCard>

            <SpotlightCard className="p-8">
              <div className="w-12 h-12 rounded-xl bg-[#1E3A8A]/40 border border-[#00E5FF]/40 flex items-center justify-center text-[#00E5FF] mb-6 shadow-[0_0_15px_rgba(0,229,255,0.2)]">
                <Utensils className="w-6 h-6" />
              </div>
              <p className="text-xs font-mono font-semibold text-[#00E5FF] tracking-widest uppercase">
                EMPOWER YOUR GROWTH
              </p>
              <h4 className="text-2xl font-black text-white mt-1 mb-2 font-sans">
                EXO ADVANCE SUITE
              </h4>
              <span className="inline-block px-3 py-1 rounded bg-[#00E5FF]/10 text-[#00E5FF] font-mono text-xs font-bold tracking-wider uppercase mb-4">
                PRODUCTIVITY
              </span>
              <p className="text-sm text-[#94A3B8] leading-relaxed">
                Cut dining wait times, eliminate kitchen order mistakes, and let routine tasks run on autopilot so your business expands faster.
              </p>
            </SpotlightCard>
          </div>

          {/* Dynamic React Spring Transition Workload */}
          <div className="mt-16 max-w-3xl mx-auto">
            <ExoSpringTransition />
          </div>
        </div>
      </section>

      {/* ================= ACTO 6: FINAL CTA & CONTACT FORM ================= */}
      <section className="py-28 relative bg-[#070B14] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl sm:text-6xl font-black text-white tracking-tight font-sans uppercase leading-tight">
              READY TO RUN YOUR BUSINESS<br />
              <span className="text-[#00E5FF]">ON AUTOPILOT?</span>
            </h2>
            <p className="text-lg text-slate-300 font-mono mt-6">
              Stop wasting hours on manual tasks. Test our live demos or tell us what you need.
            </p>
          </div>

          {/* Contact Lead Form */}
          <ContactForm />
        </div>
      </section>
    </div>
  );
}
