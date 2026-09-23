import React from "react";
import { Code2, Cpu, Layers, ShieldCheck, Zap, Server, Globe } from "lucide-react";
import { ContactForm } from "@/components/sections/contact-form";

export const metadata = {
  title: "Custom Software Development | Exo Advance LLC",
  description: "Enterprise software engineering, custom web applications, business platforms, and API automations engineered by Exo Advance LLC.",
};

export default function SoftwareDevelopmentPage() {
  return (
    <div className="min-h-screen bg-[#0A0F1A] text-white pt-32 pb-24 selection:bg-[#00E5FF] selection:text-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Header */}
        <div className="text-center max-w-4xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1E3A8A]/50 border border-[#00E5FF]/40 text-[#00E5FF] font-mono text-xs font-semibold mb-6">
            <Code2 className="w-4 h-4" /> CUSTOM ENTERPRISE ENGINEERING
          </div>
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white font-sans uppercase">
            Technology built around <span className="text-[#00E5FF]">your business.</span>
          </h1>
          <p className="text-base sm:text-lg text-[#64748B] mt-6 max-w-2xl mx-auto leading-relaxed font-normal">
            We build tailor-made software systems engineered to fit your exact operational workflows, eliminating friction and boosting speed across your entire enterprise.
          </p>
        </div>

        {/* Engineering Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {[
            {
              icon: Globe,
              title: "Custom Web Applications",
              description: "High-performance Next.js 16 web applications built with TypeScript, React, and responsive enterprise UI component systems.",
            },
            {
              icon: Server,
              title: "Business Operating Systems",
              description: "Internal management platforms tailored for inventory control, employee workflow scheduling, CRM lead tracking, and administrative operations.",
            },
            {
              icon: Zap,
              title: "Workflow Automation",
              description: "Eliminate repetitive manual tasks with automated cloud functions, event-driven webhooks, and seamless multi-service integrations.",
            },
            {
              icon: Layers,
              title: "API & System Integrations",
              description: "Connect legacy databases, payment gateways, CRM engines, and third-party SaaS tools into a cohesive technological backbone.",
            },
            {
              icon: ShieldCheck,
              title: "Enterprise Data Security",
              description: "Bank-grade Row Level Security (RLS), encrypted authentication workflows, and strict compliance-ready permission structures.",
            },
            {
              icon: Cpu,
              title: "Cloud & Edge Architectures",
              description: "Global deployment on Vercel and Supabase cloud infrastructure ensuring lightning-fast low latency and 99.99% system availability.",
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

        {/* Tech Stack Banner */}
        <div className="glass-card p-8 sm:p-12 rounded-3xl border border-[#00E5FF]/30 mb-20">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-xs font-mono font-bold text-[#00E5FF] tracking-[0.25em] uppercase mb-2">
              OUR TECHNOLOGY STACK
            </h2>
            <h3 className="text-3xl font-black text-white font-sans mb-8">
              Modern, High-Speed Full-Stack Architecture
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 font-mono text-xs text-slate-300">
              <div className="p-4 bg-[#070B14] rounded-xl border border-white/10">Next.js 16 / React 19</div>
              <div className="p-4 bg-[#070B14] rounded-xl border border-white/10">TypeScript</div>
              <div className="p-4 bg-[#070B14] rounded-xl border border-white/10">Tailwind CSS</div>
              <div className="p-4 bg-[#070B14] rounded-xl border border-white/10">Supabase & PostgreSQL</div>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="mt-16">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-3xl font-black text-white font-sans uppercase">
              Discuss Your Software Project
            </h2>
            <p className="text-sm text-[#64748B] mt-2">
              Share your project vision with our senior full-stack engineers.
            </p>
          </div>
          <ContactForm defaultService="Software Development" />
        </div>
      </div>
    </div>
  );
}
