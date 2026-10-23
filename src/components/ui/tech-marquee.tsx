"use client";

import React from "react";

interface TechItem {
  name: string;
  category: string;
}

const technologies: TechItem[] = [
  { name: "Next.js 16", category: "App Router / SSR" },
  { name: "React 19", category: "Modern UI" },
  { name: "TypeScript 5", category: "Type Safety" },
  { name: "Tailwind CSS v4", category: "Modern Styling" },
  { name: "Supabase & Postgres", category: "Cloud Database" },
  { name: "Power BI", category: "Enterprise BI" },
  { name: "OpenAI GPT-4o", category: "AI Orchestration" },
  { name: "Resend API", category: "Transactional Mail" },
  { name: "Stripe & POS", category: "Payments Engine" },
  { name: "Framer Motion", category: "Smooth Physics" },
];

export function TechMarquee() {
  return (
    <div className="relative w-full overflow-hidden py-8 border-y border-white/10 bg-[#070B14]/80 backdrop-blur-md">
      {/* Edge Blur Vignettes */}
      <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-36 bg-gradient-to-r from-[#070B14] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-36 bg-gradient-to-l from-[#070B14] to-transparent z-10 pointer-events-none" />

      {/* Track */}
      <div className="flex w-max animate-marquee space-x-6 sm:space-x-8">
        {[...technologies, ...technologies, ...technologies].map((tech, idx) => (
          <div
            key={idx}
            className="flex items-center gap-2.5 px-4 py-2 rounded-xl bg-white/[0.03] border border-white/10 hover:border-[#00E5FF]/40 transition-colors cursor-default"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#00E5FF] animate-pulse" />
            <span className="font-sans text-xs sm:text-sm font-bold text-white tracking-wide">
              {tech.name}
            </span>
            <span className="text-[10px] font-mono text-[#64748B] uppercase">
              // {tech.category}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
