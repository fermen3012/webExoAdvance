import React from "react";
import Link from "next/link";
import { ExoskeletonGraphic } from "@/components/ui/exoskeleton-graphic";
import { ExoSpringTransition } from "@/components/ui/exo-spring-transition";
import { ContactForm } from "@/components/sections/contact-form";
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
  MonitorCheck,
  QrCode,
  LineChart,
  Boxes,
} from "lucide-react";

export default function HomePage() {
  return (
    <div className="relative min-h-screen bg-[#0A0F1A] text-white selection:bg-[#00E5FF] selection:text-black">
      {/* ================= HERO SECTION ================= */}
      <section className="relative pt-32 pb-20 lg:pt-44 lg:pb-32 overflow-hidden border-b border-[#00E5FF]/10">
        {/* Background Grid & Lighting Effects */}
        <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#1E3A8A]/25 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-1/3 right-10 w-[350px] h-[350px] bg-[#00E5FF]/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-7 flex flex-col items-start text-left">
              <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-[#1E3A8A]/40 border border-[#00E5FF]/30 text-[#00E5FF] text-xs font-mono font-semibold tracking-wider mb-6 shadow-[0_0_15px_rgba(0,229,255,0.15)]">
                <span className="w-2 h-2 rounded-full bg-[#00E5FF] animate-pulse" />
                EXO ADVANCE LLC // ENTERPRISE TECHNOLOGY
              </div>

              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white leading-[1.05] font-sans">
                Technology that moves your business{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-[#00E5FF]">
                  forward.
                </span>
              </h1>

              <p className="mt-6 text-lg sm:text-xl text-[#64748B] leading-relaxed max-w-2xl font-normal">
                Software, intelligence and restaurant technology engineered to strengthen the way your business operates.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link
                  href="/solutions"
                  className="px-6 py-3.5 rounded-lg bg-[#1E3A8A] hover:bg-[#1E3A8A]/90 text-white font-mono text-xs tracking-wider font-bold uppercase border border-[#00E5FF] transition-all shadow-[0_0_25px_rgba(0,229,255,0.25)] hover:shadow-[0_0_35px_rgba(0,229,255,0.4)] flex items-center gap-2 group"
                >
                  <span>EXPLORE SOLUTIONS</span>
                  <ArrowRight className="w-4 h-4 text-[#00E5FF] group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  href="/contact"
                  className="px-6 py-3.5 rounded-lg bg-[#0F172A]/80 hover:bg-[#0F172A] text-slate-200 hover:text-white font-mono text-xs tracking-wider font-semibold uppercase border border-white/10 hover:border-white/30 transition-all flex items-center gap-2"
                >
                  <span>TALK TO US</span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </Link>
              </div>

              {/* Core Feature Tags */}
              <div className="mt-12 pt-8 border-t border-white/10 grid grid-cols-3 gap-6 w-full max-w-lg">
                <div>
                  <p className="text-xs font-mono text-[#00E5FF] font-semibold">SOFTWARE</p>
                  <p className="text-xs text-[#64748B] mt-0.5">Development</p>
                </div>
                <div>
                  <p className="text-xs font-mono text-[#00E5FF] font-semibold">DATA & BI</p>
                  <p className="text-xs text-[#64748B] mt-0.5">Intelligence</p>
                </div>
                <div>
                  <p className="text-xs font-mono text-[#00E5FF] font-semibold">EXO SERVER</p>
                  <p className="text-xs text-[#64748B] mt-0.5">Restaurant Tech</p>
                </div>
              </div>
            </div>

            {/* Right Visual Column (Exoskeleton Geometric Graphic) */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <ExoskeletonGraphic />
            </div>
          </div>
        </div>
      </section>

      {/* ================= SECTION 2: TECHNOLOGY AS AN EXOSKELETON ================= */}
      <section className="py-24 relative bg-[#070B14] border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-mono font-bold text-[#00E5FF] tracking-[0.3em] uppercase mb-3">
              BRAND PHILOSOPHY
            </h2>
            <h3 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              TECHNOLOGY AS AN EXOSKELETON
            </h3>
            <div className="w-16 h-1 bg-[#00E5FF] mx-auto my-6 shadow-[0_0_10px_#00E5FF]" />
            <p className="text-base sm:text-lg text-[#64748B] leading-relaxed">
              We build technology that works around your business, strengthening operations, improving decision-making and creating new possibilities for growth.
            </p>
          </div>

          {/* Three Visual Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Pillar 1: SOFTWARE */}
            <div className="glass-card p-8 rounded-2xl border border-[#00E5FF]/20 relative group hover:border-[#00E5FF]/60 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-[#1E3A8A]/40 border border-[#00E5FF]/40 flex items-center justify-center text-[#00E5FF] mb-6 shadow-[0_0_15px_rgba(0,229,255,0.2)]">
                <Code2 className="w-6 h-6" />
              </div>
              <p className="text-xs font-mono font-semibold text-[#00E5FF] tracking-widest uppercase">
                PILLAR 01
              </p>
              <h4 className="text-2xl font-black text-white mt-1 mb-2 font-sans">
                SOFTWARE
              </h4>
              <span className="inline-block px-3 py-1 rounded bg-[#00E5FF]/10 text-[#00E5FF] font-mono text-xs font-bold tracking-wider uppercase mb-4">
                BUILD
              </span>
              <p className="text-sm text-[#64748B] leading-relaxed">
                Custom enterprise web applications, robust system architectures, and tailored digital platforms engineered specifically for your operating workflow.
              </p>
            </div>

            {/* Pillar 2: DATA */}
            <div className="glass-card p-8 rounded-2xl border border-[#00E5FF]/20 relative group hover:border-[#00E5FF]/60 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-[#1E3A8A]/40 border border-[#00E5FF]/40 flex items-center justify-center text-[#00E5FF] mb-6 shadow-[0_0_15px_rgba(0,229,255,0.2)]">
                <BarChart3 className="w-6 h-6" />
              </div>
              <p className="text-xs font-mono font-semibold text-[#00E5FF] tracking-widest uppercase">
                PILLAR 02
              </p>
              <h4 className="text-2xl font-black text-white mt-1 mb-2 font-sans">
                DATA
              </h4>
              <span className="inline-block px-3 py-1 rounded bg-[#00E5FF]/10 text-[#00E5FF] font-mono text-xs font-bold tracking-wider uppercase mb-4">
                UNDERSTAND
              </span>
              <p className="text-sm text-[#64748B] leading-relaxed">
                Transform complex operational numbers into dynamic dashboards, executive KPIs, automated reporting pipelines, and real-time business intelligence.
              </p>
            </div>

            {/* Pillar 3: AUTOMATION */}
            <div className="glass-card p-8 rounded-2xl border border-[#00E5FF]/20 relative group hover:border-[#00E5FF]/60 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-[#1E3A8A]/40 border border-[#00E5FF]/40 flex items-center justify-center text-[#00E5FF] mb-6 shadow-[0_0_15px_rgba(0,229,255,0.2)]">
                <Zap className="w-6 h-6" />
              </div>
              <p className="text-xs font-mono font-semibold text-[#00E5FF] tracking-widest uppercase">
                PILLAR 03
              </p>
              <h4 className="text-2xl font-black text-white mt-1 mb-2 font-sans">
                AUTOMATION
              </h4>
              <span className="inline-block px-3 py-1 rounded bg-[#00E5FF]/10 text-[#00E5FF] font-mono text-xs font-bold tracking-wider uppercase mb-4">
                ADVANCE
              </span>
              <p className="text-sm text-[#64748B] leading-relaxed">
                Connect disparate enterprise software, eliminate manual friction points, protect asset data, and speed up execution across your entire value chain.
              </p>
            </div>
          </div>

          {/* Dynamic React Spring Transition Workload */}
          <div className="mt-16 max-w-3xl mx-auto">
            <ExoSpringTransition />
          </div>
        </div>
      </section>

      {/* ================= SECTION 3: EXO SERVER ================= */}
      <section className="py-28 relative bg-[#0A0F1A] border-b border-[#00E5FF]/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#1E3A8A]/50 border border-[#00E5FF]/40 text-[#00E5FF] font-mono text-xs font-semibold mb-4">
                <Utensils className="w-3.5 h-3.5" /> RESTAURANT SaaS ECOSYSTEM
              </div>

              <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tight font-sans">
                EXO SERVER
              </h2>
              <p className="text-xl text-[#00E5FF] font-mono mt-2 font-medium">
                The operating system for modern restaurants.
              </p>
              <p className="text-base text-[#64748B] mt-4 leading-relaxed">
                An all-in-one technological infrastructure designed to elevate guest ordering, streamline kitchen execution, empower waitstaff, and maximize restaurant profitability.
              </p>

              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { name: "Self-service Kiosks", icon: MonitorCheck },
                  { name: "QR Ordering & Digital Menu", icon: QrCode },
                  { name: "Kitchen Display System (KDS)", icon: Layers },
                  { name: "Waitstaff Mobile Ordering", icon: Utensils },
                  { name: "Orders & Sales Management", icon: Boxes },
                  { name: "Real-time Business Analytics", icon: LineChart },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 p-3.5 rounded-lg bg-[#0F172A] border border-white/5 hover:border-[#00E5FF]/30 transition-colors"
                  >
                    <item.icon className="w-4 h-4 text-[#00E5FF] shrink-0" />
                    <span className="text-xs font-semibold text-slate-200">{item.name}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <Link
                  href="/restaurant-technology"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-[#1E3A8A] hover:bg-[#1E3A8A]/90 text-white font-mono text-xs font-bold tracking-wider uppercase border border-[#00E5FF] shadow-[0_0_20px_rgba(0,229,255,0.2)] hover:shadow-[0_0_30px_rgba(0,229,255,0.35)] transition-all group"
                >
                  <span>DISCOVER EXO SERVER</span>
                  <ArrowRight className="w-4 h-4 text-[#00E5FF] group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Right Product Card Graphic */}
            <div className="lg:col-span-6">
              <div className="glass-card p-8 rounded-3xl border border-[#00E5FF]/30 shadow-[0_20px_60px_rgba(0,0,0,0.7)] relative overflow-hidden">
                <div className="absolute top-0 right-0 w-48 h-48 bg-[#00E5FF]/10 rounded-full blur-3xl" />
                
                <div className="flex items-center justify-between pb-6 border-b border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#1E3A8A] flex items-center justify-center text-[#00E5FF] font-bold">
                      EXO
                    </div>
                    <div>
                      <h4 className="text-sm font-bold font-mono text-white">EXO SERVER // POS HUB</h4>
                      <p className="text-[10px] font-mono text-[#00E5FF]">STATUS: ONLINE // 99.99% UPTIME</p>
                    </div>
                  </div>
                  <span className="w-2.5 h-2.5 rounded-full bg-[#00E5FF] animate-ping" />
                </div>

                <div className="mt-6 space-y-4">
                  <div className="p-4 rounded-xl bg-[#0A0F1A] border border-white/10 flex items-center justify-between">
                    <div>
                      <p className="text-xs text-[#64748B]">Active Kitchen Orders</p>
                      <p className="text-lg font-mono font-bold text-white">14 Orders In Line</p>
                    </div>
                    <span className="px-2.5 py-1 rounded bg-[#00E5FF]/10 text-[#00E5FF] text-[10px] font-mono font-bold">
                      KDS LIVE
                    </span>
                  </div>

                  <div className="p-4 rounded-xl bg-[#0A0F1A] border border-white/10 flex items-center justify-between">
                    <div>
                      <p className="text-xs text-[#64748B]">Today&apos;s Guest Tickets</p>
                      <p className="text-lg font-mono font-bold text-white">$4,892.50 USD</p>
                    </div>
                    <span className="px-2.5 py-1 rounded bg-[#1E3A8A]/50 text-white text-[10px] font-mono font-bold">
                      ANALYTICS
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= SECTION 4: BUSINESS INTELLIGENCE ================= */}
      <section className="py-24 relative bg-[#070B14] border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 order-2 lg:order-1">
              <div className="glass-card p-8 rounded-3xl border border-[#00E5FF]/20 shadow-2xl space-y-4">
                <div className="flex items-center justify-between pb-4 border-b border-white/10">
                  <h4 className="text-xs font-mono text-[#00E5FF] font-bold uppercase">EXECUTIVE BI DASHBOARD</h4>
                  <span className="text-[10px] font-mono text-[#64748B]">POWER BI & CUSTOM APIS</span>
                </div>
                <div className="h-44 w-full bg-[#0A0F1A] rounded-xl border border-white/10 p-4 flex flex-col justify-between">
                  <div className="flex justify-between text-xs text-[#64748B] font-mono">
                    <span>REVENUE PERFORMANCE</span>
                    <span className="text-[#00E5FF]">+28.4% YoY</span>
                  </div>
                  {/* Visual Chart Bars */}
                  <div className="flex items-end gap-2 h-24 pt-4">
                    {[40, 65, 50, 80, 70, 95, 85, 100].map((h, i) => (
                      <div key={i} className="flex-1 bg-[#1E3A8A] rounded-t hover:bg-[#00E5FF] transition-all" style={{ height: `${h}%` }} />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 order-1 lg:order-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#1E3A8A]/50 border border-[#00E5FF]/40 text-[#00E5FF] font-mono text-xs font-semibold mb-4">
                <BarChart3 className="w-3.5 h-3.5" /> DATA & ANALYTICS ARCHITECTURE
              </div>

              <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight font-sans">
                BUSINESS INTELLIGENCE
              </h2>
              <p className="text-xl text-[#00E5FF] font-mono mt-2 font-medium">
                Turn your business data into better decisions.
              </p>
              <p className="text-base text-[#64748B] mt-4 leading-relaxed">
                Extract clarity from complex enterprise operations. We design automated ETL data pipelines, Power BI integrations, and custom executive KPI dashboards.
              </p>

              <ul className="mt-6 space-y-3">
                {[
                  "Executive & Operational Dashboards",
                  "Real-time KPI Tracking & Alerts",
                  "Advanced Financial & Sales Analytics",
                  "Automated Reporting & Data Pipelines",
                  "Power BI & Data Warehouse Integrations",
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-3 text-sm text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-[#00E5FF] shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8">
                <Link
                  href="/business-intelligence"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-[#1E3A8A] hover:bg-[#1E3A8A]/90 text-white font-mono text-xs font-bold tracking-wider uppercase border border-[#00E5FF] transition-all group"
                >
                  <span>EXPLORE BI</span>
                  <ArrowRight className="w-4 h-4 text-[#00E5FF] group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= SECTION 5: SOFTWARE DEVELOPMENT ================= */}
      <section className="py-24 relative bg-[#0A0F1A] border-b border-[#00E5FF]/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#1E3A8A]/50 border border-[#00E5FF]/40 text-[#00E5FF] font-mono text-xs font-semibold mb-4">
                <Code2 className="w-3.5 h-3.5" /> CUSTOM ENGINEERING
              </div>

              <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight font-sans">
                SOFTWARE DEVELOPMENT
              </h2>
              <p className="text-xl text-[#00E5FF] font-mono mt-2 font-medium">
                Technology built around your business.
              </p>
              <p className="text-base text-[#64748B] mt-4 leading-relaxed">
                We engineer scalable, secure, and modern digital platforms. From enterprise web applications to complex cloud integrations, we deliver precision engineering.
              </p>

              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  "Custom Web Applications",
                  "Business Management Systems",
                  "Process Automation",
                  "API & Enterprise Integrations",
                  "Cloud Scalable Platforms",
                  "Next.js & Supabase Stack",
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3 rounded-lg bg-[#0F172A] border border-white/5">
                    <Cpu className="w-4 h-4 text-[#00E5FF]" />
                    <span className="text-xs font-semibold text-slate-200">{item}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <Link
                  href="/software-development"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-[#1E3A8A] hover:bg-[#1E3A8A]/90 text-white font-mono text-xs font-bold tracking-wider uppercase border border-[#00E5FF] transition-all group"
                >
                  <span>EXPLORE SOFTWARE DEV</span>
                  <ArrowRight className="w-4 h-4 text-[#00E5FF] group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="glass-card p-8 rounded-3xl border border-[#00E5FF]/20 font-mono text-xs space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-white/10 text-[#64748B]">
                  <span>ARCHITECTURE // SYSTEM ENGINE</span>
                  <span className="text-[#00E5FF]">PRODUCTION READY</span>
                </div>
                <div className="bg-[#070B14] p-4 rounded-xl border border-white/10 text-slate-300 space-y-2">
                  <p className="text-[#00E5FF]">{"// Engineered Architecture"}</p>
                  <p><span className="text-purple-400">const</span> exoPlatform = <span className="text-purple-400">new</span> Platform({"{"}</p>
                  <p className="pl-4">framework: <span className="text-amber-300">&quot;Next.js App Router&quot;</span>,</p>
                  <p className="pl-4">database: <span className="text-amber-300">&quot;Supabase PostgreSQL&quot;</span>,</p>
                  <p className="pl-4">security: <span className="text-amber-[#00E5FF]">&quot;Row Level Security (RLS)&quot;</span>,</p>
                  <p className="pl-4">scalability: <span className="text-amber-300">&quot;Edge Global Network&quot;</span></p>
                  <p>{"}"});</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= SECTION 6: WHY EXO ADVANCE ================= */}
      <section className="py-24 relative bg-[#070B14] border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-xs font-mono font-bold text-[#00E5FF] tracking-[0.3em] uppercase mb-3">
              THE EXO ADVANTAGE
            </h2>
            <h3 className="text-3xl sm:text-5xl font-black text-white tracking-tight font-sans">
              WHY EXO ADVANCE
            </h3>
            <p className="text-sm text-[#64748B] mt-4">
              Designed for companies that demand structural strength and technological precision.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "ENGINEERED",
                text: "Technology designed around real business problems.",
                icon: Cpu,
              },
              {
                title: "INTELLIGENT",
                text: "Data-driven systems that improve decision making.",
                icon: TrendingUp,
              },
              {
                title: "SCALABLE",
                text: "Architecture designed to grow with the business.",
                icon: Layers,
              },
              {
                title: "CONNECTED",
                text: "Technology that connects people, processes and information.",
                icon: ShieldCheck,
              },
            ].map((card, idx) => (
              <div
                key={idx}
                className="glass-card p-6 rounded-2xl border border-white/10 hover:border-[#00E5FF]/50 transition-all group"
              >
                <div className="w-10 h-10 rounded-lg bg-[#1E3A8A]/40 border border-[#00E5FF]/30 flex items-center justify-center text-[#00E5FF] mb-4">
                  <card.icon className="w-5 h-5" />
                </div>
                <h4 className="text-lg font-black text-white font-sans tracking-wide mb-2">
                  {card.title}
                </h4>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  {card.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= SECTION 7: FINAL CTA & CONTACT FORM ================= */}
      <section className="py-28 relative bg-[#0A0F1A] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl sm:text-6xl font-black text-white tracking-tight font-sans uppercase leading-tight">
              YOUR BUSINESS.<br />
              <span className="text-[#00E5FF]">OUR TECHNOLOGY.</span><br />
              ONE STEP AHEAD.
            </h2>
            <p className="text-lg text-slate-300 font-mono mt-6">
              Let&apos;s build what&apos;s next.
            </p>
          </div>

          {/* Contact Lead Form */}
          <ContactForm />
        </div>
      </section>
    </div>
  );
}
