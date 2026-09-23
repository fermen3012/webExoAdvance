import React from "react";
import { ContactForm } from "@/components/sections/contact-form";
import { ShieldCheck, Clock } from "lucide-react";

export const metadata = {
  title: "Contact Us | Exo Advance LLC",
  description: "Get in touch with Exo Advance LLC. Discuss your enterprise software development, business intelligence, or Exo Server restaurant technology needs.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#0A0F1A] text-white pt-32 pb-24 selection:bg-[#00E5FF] selection:text-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1E3A8A]/50 border border-[#00E5FF]/40 text-[#00E5FF] font-mono text-xs font-semibold mb-6">
            START A CONVERSATION
          </div>
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white font-sans uppercase">
            Let&apos;s talk about <span className="text-[#00E5FF]">your business.</span>
          </h1>
          <p className="text-base sm:text-lg text-[#64748B] mt-4 leading-relaxed font-normal">
            Whether you need custom enterprise software, advanced executive BI analytics, or our flagship Exo Server restaurant OS, our engineering team is ready.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct Info Cards */}
          <div className="lg:col-span-5 space-y-6">
            <div className="glass-card p-6 rounded-2xl border border-white/10">
              <h2 className="text-xs font-mono font-bold text-[#00E5FF] tracking-widest uppercase mb-4">
                EXO ADVANCE HEADQUARTERS
              </h2>
              <div className="space-y-4 text-sm text-slate-300">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#1E3A8A]/50 border border-[#00E5FF]/30 flex items-center justify-center text-[#00E5FF] shrink-0">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-bold text-white">EXO ADVANCE LLC</p>
                    <p className="text-xs text-[#64748B]">Enterprise Technology Solutions</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#1E3A8A]/50 border border-[#00E5FF]/30 flex items-center justify-center text-[#00E5FF] shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-bold text-white">Response Guarantee</p>
                    <p className="text-xs text-[#64748B]">Within 24 business hours</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="glass-card p-6 rounded-2xl border border-white/10 font-mono text-xs text-slate-400 space-y-3">
              <p className="text-[#00E5FF] font-bold">{"// DIRECT INQUIRY DISPATCH"}</p>
              <p>Your inquiry will be logged directly into our Supabase CRM workflow and assigned to a senior solutions engineer.</p>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}
