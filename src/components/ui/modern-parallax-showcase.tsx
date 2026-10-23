"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Link from "next/link";
import {
  Utensils,
  BarChart3,
  Code2,
  Bot,
  ArrowRight,
  Sparkles,
  Layers,
  ShieldCheck,
  TrendingUp,
  Cpu,
  Boxes,
} from "lucide-react";

export function ModernParallaxShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Smooth physics spring for buttery smooth Framer-grade inertia
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 25,
    restDelta: 0.001,
  });

  // Layer transforms for spatial depth (multi-plane parallax)
  const yBgText = useTransform(smoothProgress, [0, 1], [-80, 80]);
  const yCard1 = useTransform(smoothProgress, [0, 1], [60, -60]);
  const yCard2 = useTransform(smoothProgress, [0, 1], [110, -90]);
  const yCard3 = useTransform(smoothProgress, [0, 1], [40, -40]);
  const rotateCard1 = useTransform(smoothProgress, [0, 1], [-2, 2]);
  const rotateCard2 = useTransform(smoothProgress, [0, 1], [2, -2]);

  return (
    <section
      ref={containerRef}
      className="relative py-28 sm:py-36 overflow-hidden bg-[#070B14] border-b border-white/10"
    >
      {/* Dynamic Background Parallax Lighting Orbs */}
      <motion.div
        className="absolute top-1/3 left-1/4 w-96 h-96 bg-[#00E5FF]/10 rounded-full blur-[140px] pointer-events-none"
        style={{ y: yBgText }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] bg-[#1E3A8A]/30 rounded-full blur-[160px] pointer-events-none"
        style={{ y: yCard2 }}
      />

      {/* Massive Background Parallax Typography (Framer Architectural Style) */}
      <motion.div
        style={{ y: yBgText }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none opacity-[0.035] whitespace-nowrap text-[14vw] font-black font-sans uppercase tracking-tighter text-white"
      >
        EXO ADVANCE
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1E3A8A]/50 border border-[#00E5FF]/40 text-[#00E5FF] font-mono text-xs font-semibold mb-4 shadow-[0_0_15px_rgba(0,229,255,0.15)]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>KINETIC ARCHITECTURE // PARALLAX LAYER</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight font-sans">
            Systems Engineered with <span className="text-[#00E5FF]">Operational Depth</span>
          </h2>

          <p className="text-base text-[#94A3B8] mt-4 leading-relaxed font-normal">
            Visualize how our software layers, data telemetry, and cloud hardware dynamically interlock to empower your business.
          </p>
        </div>

        {/* 3-Column Parallax Grid with Variable Speeds */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-start">
          {/* Card 1: Exo Server OS (Parallax Plane 1) */}
          <motion.div
            style={{ y: yCard1, rotateZ: rotateCard1 }}
            className="glass-card p-7 sm:p-8 rounded-[30px] border border-[#00E5FF]/30 shadow-[0_20px_50px_rgba(0,0,0,0.6)] relative group hover:border-[#00E5FF]/60 transition-colors bg-[#0A0F1A]/90"
          >
            <div className="w-12 h-12 rounded-2xl bg-[#1E3A8A]/50 border border-[#00E5FF]/40 flex items-center justify-center text-[#00E5FF] mb-6 shadow-[0_0_20px_rgba(0,229,255,0.25)]">
              <Utensils className="w-6 h-6" />
            </div>

            <span className="text-[10px] font-mono tracking-widest text-[#00E5FF] uppercase block font-bold">
              LAYER 01 // FRONT-LINE EXECUTION
            </span>
            <h3 className="text-2xl font-black text-white font-sans mt-1 mb-3">
              Exo Server Restaurant OS
            </h3>
            <p className="text-xs text-[#94A3B8] leading-relaxed mb-6">
              Self-service kiosks and real-time KDS synchronized with microsecond latency. Eliminate floor bottlenecks with zero hardware lock-in.
            </p>

            <div className="p-3.5 rounded-xl bg-[#070B14] border border-white/5 font-mono text-xs space-y-2 mb-6">
              <div className="flex justify-between text-slate-400">
                <span>Speed Boost</span>
                <span className="text-[#00E5FF] font-bold">-45% Queue Time</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Kitchen Sync</span>
                <span className="text-emerald-400">Zero Lost Tickets</span>
              </div>
            </div>

            <Link
              href="/restaurant-technology"
              className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#00E5FF] hover:text-white uppercase tracking-wider transition-colors group/link"
            >
              <span>View POS Ecosystem</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          {/* Card 2: Executive Data Intelligence (Parallax Plane 2 - Fast) */}
          <motion.div
            style={{ y: yCard2, rotateZ: rotateCard2 }}
            className="glass-card p-7 sm:p-8 rounded-[30px] border border-purple-500/30 shadow-[0_20px_50px_rgba(0,0,0,0.6)] relative group hover:border-purple-500/60 transition-colors bg-[#0A0F1A]/90 md:-mt-8"
          >
            <div className="w-12 h-12 rounded-2xl bg-purple-950/50 border border-purple-500/40 flex items-center justify-center text-purple-400 mb-6 shadow-[0_0_20px_rgba(168,85,247,0.25)]">
              <BarChart3 className="w-6 h-6" />
            </div>

            <span className="text-[10px] font-mono tracking-widest text-purple-400 uppercase block font-bold">
              LAYER 02 // REAL-TIME DECISION ENGINE
            </span>
            <h3 className="text-2xl font-black text-white font-sans mt-1 mb-3">
              Power BI & Data Pipelines
            </h3>
            <p className="text-xs text-[#94A3B8] leading-relaxed mb-6">
              Executive telemetry without manual spreadsheets. Unified dashboards that reveal location margins and profitability instantly.
            </p>

            <div className="p-3.5 rounded-xl bg-[#070B14] border border-white/5 font-mono text-xs space-y-2 mb-6">
              <div className="flex justify-between text-slate-400">
                <span>ETL Pipelines</span>
                <span className="text-purple-300 font-bold">Automated Daily</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Executive Visibility</span>
                <span className="text-white">100% C-Suite</span>
              </div>
            </div>

            <Link
              href="/business-intelligence"
              className="inline-flex items-center gap-2 text-xs font-mono font-bold text-purple-400 hover:text-white uppercase tracking-wider transition-colors group/link"
            >
              <span>View BI Dashboards</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          {/* Card 3: Custom Architecture & AI (Parallax Plane 3) */}
          <motion.div
            style={{ y: yCard3 }}
            className="glass-card p-7 sm:p-8 rounded-[30px] border border-emerald-500/30 shadow-[0_20px_50px_rgba(0,0,0,0.6)] relative group hover:border-emerald-500/60 transition-colors bg-[#0A0F1A]/90"
          >
            <div className="w-12 h-12 rounded-2xl bg-emerald-950/50 border border-emerald-500/40 flex items-center justify-center text-emerald-400 mb-6 shadow-[0_0_20px_rgba(16,185,129,0.25)]">
              <Code2 className="w-6 h-6" />
            </div>

            <span className="text-[10px] font-mono tracking-widest text-emerald-400 uppercase block font-bold">
              LAYER 03 // TAILORED CLOUD PLATFORM
            </span>
            <h3 className="text-2xl font-black text-white font-sans mt-1 mb-3">
              Custom Engineering & AI
            </h3>
            <p className="text-xs text-[#94A3B8] leading-relaxed mb-6">
              Scalable cloud platforms on Next.js 16 with autonomous AI agents that qualify incoming inquiries in less than 5 seconds.
            </p>

            <div className="p-3.5 rounded-xl bg-[#070B14] border border-white/5 font-mono text-xs space-y-2 mb-6">
              <div className="flex justify-between text-slate-400">
                <span>Availability</span>
                <span className="text-emerald-400 font-bold">99.99% Global Edge</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>AI Ingestion</span>
                <span className="text-white">&lt; 5s Response</span>
              </div>
            </div>

            <Link
              href="/software-development"
              className="inline-flex items-center gap-2 text-xs font-mono font-bold text-emerald-400 hover:text-white uppercase tracking-wider transition-colors group/link"
            >
              <span>View Custom Dev</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
