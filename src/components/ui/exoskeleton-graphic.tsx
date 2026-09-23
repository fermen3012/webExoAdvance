"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export function ExoskeletonGraphic() {
  return (
    <div className="relative w-full aspect-square max-w-[500px] mx-auto flex items-center justify-center">
      {/* Background Architectural Grid Overlay */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-[#1E3A8A]/10 to-transparent border border-[#00E5FF]/20 p-8 backdrop-blur-sm overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-40" />
        
        {/* Glow Spheres */}
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#00E5FF]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-[#1E3A8A]/30 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Rotating Structural Frame Layer 1 */}
      <motion.div
        className="absolute w-[85%] h-[85%]"
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      >
        <svg viewBox="0 0 400 400" className="w-full h-full opacity-60">
          <polygon
            points="200,20 355,110 355,290 200,380 45,290 45,110"
            fill="none"
            stroke="#00E5FF"
            strokeWidth="1.5"
            strokeDasharray="6 6"
          />
          <circle cx="200" cy="20" r="4" fill="#00E5FF" />
          <circle cx="355" cy="110" r="4" fill="#00E5FF" />
          <circle cx="355" cy="290" r="4" fill="#00E5FF" />
          <circle cx="200" cy="380" r="4" fill="#00E5FF" />
          <circle cx="45" cy="290" r="4" fill="#00E5FF" />
          <circle cx="45" cy="110" r="4" fill="#00E5FF" />
        </svg>
      </motion.div>

      {/* Rotating Structural Frame Layer 2 (Counter) */}
      <motion.div
        className="absolute w-[70%] h-[70%]"
        animate={{ rotate: -360 }}
        transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
      >
        <svg viewBox="0 0 300 300" className="w-full h-full opacity-80">
          <polygon
            points="150,15 266,82 266,217 150,285 34,217 34,82"
            fill="none"
            stroke="#1E3A8A"
            strokeWidth="2"
          />
          <line x1="150" y1="15" x2="150" y2="285" stroke="#00E5FF" strokeWidth="1" strokeOpacity="0.4" />
          <line x1="34" y1="82" x2="266" y2="217" stroke="#00E5FF" strokeWidth="1" strokeOpacity="0.4" />
          <line x1="34" y1="217" x2="266" y2="82" stroke="#00E5FF" strokeWidth="1" strokeOpacity="0.4" />
        </svg>
      </motion.div>

      {/* Center Core Exoskeleton Emblem */}
      <motion.div 
        className="relative z-10 w-[55%] h-[55%] bg-[#0A0F1A]/95 rounded-2xl border border-[#00E5FF]/40 shadow-[0_0_40px_rgba(0,229,255,0.3)] flex flex-col items-center justify-center p-6"
        animate={{ scale: [1, 1.03, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="w-28 h-28 relative flex items-center justify-center">
          <Image
            src="/exo-logo-transparent.png"
            alt="Exo Advance Official Emblem"
            width={112}
            height={112}
            className="w-full h-full object-contain filter drop-shadow-[0_0_20px_rgba(0,229,255,0.45)]"
            priority
          />
        </div>
        <div className="mt-2 text-center">
          <p className="text-[11px] font-mono tracking-[0.25em] text-[#00E5FF] font-semibold uppercase">EXOSKELETON</p>
          <p className="text-[9px] font-mono tracking-widest text-[#64748B] uppercase">CORE ARCHITECTURE</p>
        </div>
      </motion.div>

      {/* Floating Data Pill Cards */}
      <motion.div
        className="absolute top-8 left-4 glass-card px-3 py-1.5 rounded-md border border-[#00E5FF]/30 flex items-center gap-2 text-xs font-mono text-white shadow-lg"
        animate={{ y: [-4, 4, -4] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className="w-2 h-2 rounded-full bg-[#00E5FF] animate-pulse" />
        <span className="text-[11px]">SOFTWARE // BUILD</span>
      </motion.div>

      <motion.div
        className="absolute bottom-10 right-4 glass-card px-3 py-1.5 rounded-md border border-[#1E3A8A] flex items-center gap-2 text-xs font-mono text-white shadow-lg"
        animate={{ y: [4, -4, 4] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className="w-2 h-2 rounded-full bg-[#1E3A8A]" />
        <span className="text-[11px]">DATA // UNDERSTAND</span>
      </motion.div>

      <motion.div
        className="absolute top-1/2 -right-4 glass-card px-3 py-1.5 rounded-md border border-[#00E5FF]/30 flex items-center gap-2 text-xs font-mono text-white shadow-lg"
        animate={{ x: [3, -3, 3] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className="w-2 h-2 rounded-full bg-[#00E5FF]" />
        <span className="text-[11px]">AUTOMATION // ADVANCE</span>
      </motion.div>
    </div>
  );
}
