"use client";

import React, { useState } from "react";
import Link from "next/link";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import {
  Utensils,
  BarChart3,
  Code2,
  Bot,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Cpu,
  Layers,
} from "lucide-react";

export function InteractiveBentoSuite() {
  const [activeTab, setActiveTab] = useState<"restaurant" | "bi" | "software" | "ai">("software");

  return (
    <div className="space-y-8">
      {/* Dynamic Pill Switcher */}
      <div className="flex items-center justify-center">
        <div className="inline-flex p-1.5 rounded-2xl bg-[#070B14] border border-white/10 backdrop-blur-md max-w-full overflow-x-auto no-scrollbar gap-1">
          {[
            { id: "software", label: "Custom Software", icon: Code2 },
            { id: "restaurant", label: "Exo Server OS", icon: Utensils },
            { id: "bi", label: "Data Intelligence", icon: BarChart3 },
            { id: "ai", label: "Autonomous AI", icon: Bot },
          ].map((tab) => {
            const Icon = tab.icon;
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
                  isSelected
                    ? "bg-[#1E3A8A] border border-[#00E5FF] text-white shadow-[0_0_20px_rgba(0,229,255,0.3)] scale-[1.02]"
                    : "text-slate-400 hover:text-white hover:bg-white/5 border border-transparent"
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isSelected ? "text-[#00E5FF]" : "text-slate-400"}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Bento Grid Layout with Spotlight Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Main Large Showcase Card */}
        <SpotlightCard className="lg:col-span-8 p-8 sm:p-10 flex flex-col justify-between">
          <div className="space-y-6">
            <div className="flex items-center justify-between gap-4">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1E3A8A]/50 border border-[#00E5FF]/40 text-[#00E5FF] font-mono text-[10px] font-bold uppercase tracking-widest">
                <Sparkles className="w-3 h-3 animate-pulse" />
                CORE ENTERPRISE ENGINE
              </span>
              <span className="text-xs font-mono text-slate-500">EXO ADVANCE LLC</span>
            </div>

            {activeTab === "software" && (
              <div className="space-y-4 animate-in fade-in duration-300">
                <h3 className="text-3xl sm:text-4xl font-black text-white font-sans tracking-tight">
                  Custom Software & Web Platforms
                </h3>
                <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed max-w-2xl font-normal">
                  Tailor-made software engineering on Next.js 16, TypeScript, and serverless architectures. We build proprietary business platforms, dedicated CRM portals, and administrative operating hubs designed to fit your exact operational workflows.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs font-mono text-slate-300">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>High-velocity cloud web applications</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Workflow automation via webhooks & cloud jobs</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Bank-grade security with strict RLS policies</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>99.99% global edge network availability</span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "restaurant" && (
              <div className="space-y-4 animate-in fade-in duration-300">
                <h3 className="text-3xl sm:text-4xl font-black text-white font-sans tracking-tight">
                  Exo Server Restaurant OS
                </h3>
                <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed max-w-2xl font-normal">
                  An all-in-one hospitality point-of-sale and kitchen operating system. Integrates touchscreen self-service ordering kiosks, contactless table QR menus, real-time Kitchen Display Systems (KDS), and waitstaff handhelds.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs font-mono text-slate-300">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#00E5FF] shrink-0" />
                    <span>Interactive self-service ordering kiosks</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#00E5FF] shrink-0" />
                    <span>Real-time Kitchen Display Systems (KDS)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#00E5FF] shrink-0" />
                    <span>Dynamic QR code digital ordering menus</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#00E5FF] shrink-0" />
                    <span>Live shift inventory & table-turn metrics</span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "bi" && (
              <div className="space-y-4 animate-in fade-in duration-300">
                <h3 className="text-3xl sm:text-4xl font-black text-white font-sans tracking-tight">
                  Business Intelligence & Data Pipelines
                </h3>
                <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed max-w-2xl font-normal">
                  Transform millions of scattered operational records into decisive leadership intelligence. We engineer bespoke Power BI dashboards, automated ETL data warehousing pipelines, and predictive profit forecasting.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs font-mono text-slate-300">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
                    <span>Unified C-suite revenue & margin dashboards</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
                    <span>Live KPI threshold monitoring & alert triggers</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
                    <span>PostgreSQL & Supabase data warehousing</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
                    <span>Scheduled automated reporting without manual entry</span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "ai" && (
              <div className="space-y-4 animate-in fade-in duration-300">
                <h3 className="text-3xl sm:text-4xl font-black text-white font-sans tracking-tight">
                  Autonomous AI Agents & Lead Flow
                </h3>
                <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed max-w-2xl font-normal">
                  Intelligent orchestration that analyzes and qualifies prospect inquiries in under 5 seconds. Our engine scores incoming leads (1-100), evaluates commercial intent, and drafts tailored follow-up responses automatically.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs font-mono text-slate-300">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>Automated lead scoring from 0 to 100</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>Instant personalized email follow-ups via Resend</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>Commercial sentiment & urgency analysis</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>Contextual fallback without downtime</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="pt-8 mt-8 border-t border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-mono text-[#00E5FF]">
              <Cpu className="w-4 h-4" />
              <span>INDUSTRIAL HARDENED CODE</span>
            </div>

            <Link
              href={
                activeTab === "restaurant"
                  ? "/restaurant-technology"
                  : activeTab === "bi"
                  ? "/business-intelligence"
                  : activeTab === "software"
                  ? "/software-development"
                  : "/solutions"
              }
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#1E3A8A] hover:bg-[#1E3A8A]/90 text-white font-mono text-xs font-bold uppercase tracking-wider border border-[#00E5FF] transition-all shadow-[0_0_15px_rgba(0,229,255,0.2)] group"
            >
              <span>EXPLORE DETAILS</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#00E5FF] group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </SpotlightCard>

        {/* Right Side Stacked Cards */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          {/* Card 1: Live Interactive Architecture */}
          <SpotlightCard className="p-6 sm:p-7 flex-1">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-[#00E5FF] uppercase font-bold tracking-wider">
                  LIVE TELEMETRY
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              </div>

              <div className="p-4 rounded-xl bg-[#070B14] border border-white/10 font-mono text-xs space-y-2">
                <div className="flex justify-between text-slate-400">
                  <span>Stack Runtime</span>
                  <span className="text-white">Next.js 16 / React 19</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Edge Latency</span>
                  <span className="text-[#00E5FF]">&lt; 28ms Global</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Security Layer</span>
                  <span className="text-emerald-400">Bank-Grade RLS</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>AI Ingestion</span>
                  <span className="text-purple-300">Active</span>
                </div>
              </div>
            </div>
          </SpotlightCard>

          {/* Card 2: Exoskeleton Philosophy */}
          <SpotlightCard className="p-6 sm:p-7 flex-1 border-[#00E5FF]/20 bg-gradient-to-br from-[#0A0F1A] to-[#1E3A8A]/20">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#1E3A8A]/50 border border-[#00E5FF]/40 flex items-center justify-center text-[#00E5FF]">
                <Layers className="w-5 h-5" />
              </div>
              <h4 className="text-lg font-black text-white font-sans">
                Technology as an Exoskeleton
              </h4>
              <p className="text-xs text-[#94A3B8] leading-relaxed font-normal">
                We do not build generic software. We forge an external technological structure that multiplies the power, speed, and competitive resilience of your business.
              </p>
            </div>
          </SpotlightCard>
        </div>
      </div>
    </div>
  );
}
