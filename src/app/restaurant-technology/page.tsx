import React from "react";
import { Utensils, MonitorCheck, QrCode, Layers, LineChart, CheckCircle2, Boxes } from "lucide-react";
import { ContactForm } from "@/components/sections/contact-form";

export const metadata = {
  title: "Exo Server Restaurant OS | Exo Advance LLC",
  description: "Discover Exo Server, the operating system for modern restaurants featuring self-service kiosks, QR ordering, KDS, waitstaff apps, and analytics.",
};

const features = [
  {
    icon: MonitorCheck,
    title: "Self-Service Kiosks",
    description: "Empower guests to customize orders, pay seamlessly, and eliminate order line bottlenecks during peak hours.",
  },
  {
    icon: QrCode,
    title: "QR Ordering & Digital Menu",
    description: "Instant table-side QR menu ordering without requiring app downloads. Dynamic pricing and live item availability.",
  },
  {
    icon: Layers,
    title: "Kitchen Display System (KDS)",
    description: "Replace noisy paper tickets with real-time kitchen screens. Color-coded order timing, course control, and station routing.",
  },
  {
    icon: Utensils,
    title: "Waitstaff Mobile Ordering",
    description: "Handheld ordering devices for servers to send tickets directly from table to kitchen, cutting turn times in half.",
  },
  {
    icon: Boxes,
    title: "Order & Sales POS Hub",
    description: "Centralized order stream managing dine-in, takeout, and delivery channels from a single unified server instance.",
  },
  {
    icon: LineChart,
    title: "Restaurant Business Analytics",
    description: "Live dashboard tracking hourly sales, top-performing dish margins, table turn rates, and labor performance metrics.",
  },
];

export default function RestaurantTechnologyPage() {
  return (
    <div className="min-h-screen bg-[#0A0F1A] text-white pt-32 pb-24 selection:bg-[#00E5FF] selection:text-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Header */}
        <div className="text-center max-w-4xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1E3A8A]/50 border border-[#00E5FF]/40 text-[#00E5FF] font-mono text-xs font-semibold mb-6">
            <Utensils className="w-4 h-4" /> FLAGSHIP RESTAURANT OS
          </div>
          <h1 className="text-5xl sm:text-7xl font-black tracking-tight text-white font-sans uppercase">
            EXO <span className="text-[#00E5FF]">SERVER</span>
          </h1>
          <p className="text-xl sm:text-2xl font-mono text-[#00E5FF] mt-3">
            The operating system for modern restaurants.
          </p>
          <p className="text-base sm:text-lg text-[#64748B] mt-6 max-w-2xl mx-auto leading-relaxed">
            Engineered to streamline kitchen speed, increase average guest spend, and give restaurant owners total operational control over their dining rooms.
          </p>
        </div>

        {/* Product Architecture Showcase */}
        <div className="glass-card p-8 sm:p-12 rounded-3xl border border-[#00E5FF]/30 mb-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-xs font-mono font-bold text-[#00E5FF] tracking-[0.2em] uppercase">
              SUITE CAPABILITIES
            </h2>
            <h3 className="text-3xl font-black text-white mt-2 font-sans">
              Complete Hospitality Ecosystem
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((item, idx) => (
              <div
                key={idx}
                className="bg-[#070B14] p-6 rounded-2xl border border-white/10 hover:border-[#00E5FF]/50 transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-[#1E3A8A]/50 border border-[#00E5FF]/30 flex items-center justify-center text-[#00E5FF] mb-5">
                  <item.icon className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-bold text-white mb-2 font-sans">{item.title}</h4>
                <p className="text-xs text-[#64748B] leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24">
          <div>
            <span className="text-xs font-mono text-[#00E5FF] font-bold uppercase tracking-widest">
              OPERATIONAL IMPACT
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white mt-2 font-sans">
              Why Top Hospitality Operators Choose Exo Server
            </h2>
            <p className="text-sm text-[#64748B] mt-4 leading-relaxed">
              Traditional restaurant POS systems are clunky, slow, and expensive. Exo Server is built with modern full-stack web technology to deliver real-time speed, hardware independence, and zero downtime.
            </p>
            <ul className="mt-6 space-y-4">
              {[
                "Accelerates ticket throughput by up to 35% in high-volume kitchens",
                "Boosts guest check size through smart automated kiosk upselling",
                "Reduces labor pressure on service staff with mobile & QR ordering",
                "Integrates directly with enterprise accounting & BI analytics",
              ].map((bullet, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-slate-200">
                  <CheckCircle2 className="w-5 h-5 text-[#00E5FF] shrink-0 mt-0.5" />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="glass-card p-8 rounded-3xl border border-[#00E5FF]/20">
            <h3 className="text-xs font-mono font-bold text-[#00E5FF] uppercase mb-4">EXO SERVER PLATFORM DIAGNOSTICS</h3>
            <div className="space-y-4 font-mono text-xs">
              <div className="p-4 bg-[#070B14] rounded-xl border border-white/10 flex justify-between items-center">
                <span className="text-slate-300">Sync Latency</span>
                <span className="text-[#00E5FF] font-bold">&lt; 50ms Real-time</span>
              </div>
              <div className="p-4 bg-[#070B14] rounded-xl border border-white/10 flex justify-between items-center">
                <span className="text-slate-[#64748B]">Offline Backup Engine</span>
                <span className="text-[#00E5FF] font-bold">Enabled</span>
              </div>
              <div className="p-4 bg-[#070B14] rounded-xl border border-white/10 flex justify-between items-center">
                <span className="text-slate-300">Security Encryption</span>
                <span className="text-[#00E5FF] font-bold">TLS 1.3 / RLS Protected</span>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form for Demo Inquiry */}
        <div className="mt-16">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-3xl font-black text-white font-sans uppercase">
              Schedule an Exo Server Demo
            </h2>
            <p className="text-sm text-[#64748B] mt-2">
              Transform your restaurant operations today. Contact our engineering team for a personalized demo.
            </p>
          </div>
          <ContactForm defaultService="Restaurant Technology" />
        </div>
      </div>
    </div>
  );
}
