"use client";

import React, { useActionState, useState } from "react";
import { submitLead, LeadSubmissionState } from "@/app/actions/leads";
import { Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

const serviceOptions = [
  "Restaurant Technology",
  "Software Development",
  "Business Intelligence",
  "Custom Software",
  "Other",
];

interface ContactFormProps {
  defaultService?: string;
}

export function ContactForm({ defaultService }: ContactFormProps) {
  const [selectedService, setSelectedService] = useState(defaultService || "");
  const [state, formAction, isPending] = useActionState<LeadSubmissionState | null, FormData>(
    submitLead,
    null
  );

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      {/* Glow Effect Backdrop */}
      <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-[#1E3A8A] via-[#00E5FF]/40 to-[#1E3A8A] opacity-25 blur-xl pointer-events-none" />

      <div className="relative glass-card p-6 sm:p-10 rounded-2xl border border-[#00E5FF]/20 shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
        {state?.success ? (
          <div className="py-12 px-4 text-center flex flex-col items-center justify-center gap-4 animate-in fade-in zoom-in-95 duration-300">
            <div className="w-16 h-16 rounded-full bg-[#00E5FF]/10 border border-[#00E5FF] flex items-center justify-center text-[#00E5FF] shadow-[0_0_25px_rgba(0,229,255,0.4)]">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-white tracking-tight font-sans">
              Thank you.
            </h3>
            <p className="text-[#00E5FF] font-mono text-sm tracking-wide max-w-md">
              Your message has been received. Our team will contact you shortly.
            </p>
          </div>
        ) : (
          <form action={formAction} className="space-y-6">
            {/* Honeypot field (hidden from legitimate visitors) */}
            <div className="hidden" aria-hidden="true">
              <label htmlFor="website_url_hp">Do not fill this field</label>
              <input
                type="text"
                id="website_url_hp"
                name="website_url_hp"
                tabIndex={-1}
                autoComplete="off"
              />
            </div>

            {state?.message && !state.success && (
              <div className="p-4 rounded-lg bg-red-950/40 border border-red-500/40 text-red-300 text-sm flex items-center gap-3">
                <AlertCircle className="w-5 h-5 shrink-0 text-red-400" />
                <span>{state.message}</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Full Name */}
              <div>
                <label className="block text-xs font-mono font-semibold text-[#64748B] uppercase tracking-wider mb-2">
                  Full Name <span className="text-[#00E5FF]">*</span>
                </label>
                <input
                  type="text"
                  name="full_name"
                  required
                  placeholder="Fernando Mendoza"
                  className="w-full bg-[#0A0F1A]/80 border border-white/10 focus:border-[#00E5FF] rounded-lg px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-[#00E5FF] transition-all"
                />
                {state?.errors?.full_name && (
                  <p className="text-xs text-red-400 font-mono mt-1">{state.errors.full_name}</p>
                )}
              </div>

              {/* Company */}
              <div>
                <label className="block text-xs font-mono font-semibold text-[#64748B] uppercase tracking-wider mb-2">
                  Company
                </label>
                <input
                  type="text"
                  name="company"
                  placeholder="ABC Enterprise"
                  className="w-full bg-[#0A0F1A]/80 border border-white/10 focus:border-[#00E5FF] rounded-lg px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-[#00E5FF] transition-all"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Email */}
              <div>
                <label className="block text-xs font-mono font-semibold text-[#64748B] uppercase tracking-wider mb-2">
                  Email Address <span className="text-[#00E5FF]">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="name@company.com"
                  className="w-full bg-[#0A0F1A]/80 border border-white/10 focus:border-[#00E5FF] rounded-lg px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-[#00E5FF] transition-all"
                />
                {state?.errors?.email && (
                  <p className="text-xs text-red-400 font-mono mt-1">{state.errors.email}</p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className="block text-xs font-mono font-semibold text-[#64748B] uppercase tracking-wider mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  placeholder="+1 (727) 555-0123"
                  className="w-full bg-[#0A0F1A]/80 border border-white/10 focus:border-[#00E5FF] rounded-lg px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-[#00E5FF] transition-all"
                />
              </div>
            </div>

            {/* Service Options */}
            <div>
              <label className="block text-xs font-mono font-semibold text-[#64748B] uppercase tracking-wider mb-2">
                I&apos;m interested in <span className="text-[#00E5FF]">*</span>
              </label>
              <input type="hidden" name="service" value={selectedService} />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                {serviceOptions.map((option) => {
                  const isSelected = selectedService === option;
                  return (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setSelectedService(option)}
                      className={`px-3 py-2.5 rounded-lg text-xs font-medium text-left transition-all border ${
                        isSelected
                          ? "bg-[#1E3A8A]/50 border-[#00E5FF] text-[#00E5FF] shadow-[0_0_12px_rgba(0,229,255,0.2)]"
                          : "bg-[#0A0F1A]/60 border-white/10 text-slate-300 hover:border-white/30"
                      }`}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>
              {state?.errors?.service && (
                <p className="text-xs text-red-400 font-mono mt-1">{state.errors.service}</p>
              )}
            </div>

            {/* Project Message */}
            <div>
              <label className="block text-xs font-mono font-semibold text-[#64748B] uppercase tracking-wider mb-2">
                Tell us about your project <span className="text-[#00E5FF]">*</span>
              </label>
              <textarea
                name="message"
                rows={4}
                required
                placeholder="Describe your operational goals, platform needs, or technology requirements..."
                className="w-full bg-[#0A0F1A]/80 border border-white/10 focus:border-[#00E5FF] rounded-lg px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-[#00E5FF] transition-all resize-none"
              />
              {state?.errors?.message && (
                <p className="text-xs text-red-400 font-mono mt-1">{state.errors.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={isPending}
                className="w-full bg-[#1E3A8A] hover:bg-[#1E3A8A]/90 text-white border border-[#00E5FF] py-4 rounded-lg text-xs font-mono font-bold tracking-widest uppercase transition-all duration-200 shadow-[0_0_20px_rgba(0,229,255,0.25)] hover:shadow-[0_0_30px_rgba(0,229,255,0.4)] flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 text-[#00E5FF] animate-spin" />
                    <span>PROCESSING...</span>
                  </>
                ) : (
                  <>
                    <span>SEND MESSAGE</span>
                    <Send className="w-4 h-4 text-[#00E5FF] group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
