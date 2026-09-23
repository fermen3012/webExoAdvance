import React from "react";
import Link from "next/link";
import { ExoLogo } from "@/components/ui/exo-logo";
import { ShieldCheck, Cpu, Database, Utensils } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#070B14] border-t border-[#00E5FF]/15 text-[#64748B] pt-16 pb-12 relative overflow-hidden">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 pb-12 border-b border-white/10">
          {/* Brand Info */}
          <div className="md:col-span-1 flex flex-col gap-4">
            <ExoLogo size="md" />
            <p className="text-xs text-[#64748B] leading-relaxed mt-2">
              Technology engineered as an exoskeleton to strengthen operations, elevate business intelligence, and accelerate growth.
            </p>
            <div className="flex items-center gap-2 text-xs font-mono text-[#00E5FF] mt-2">
              <ShieldCheck className="w-4 h-4 text-[#00E5FF]" />
              <span>Enterprise Grade Platform</span>
            </div>
          </div>

          {/* Solutions & Core Capabilities */}
          <div>
            <h3 className="text-xs font-mono font-bold tracking-widest text-white uppercase mb-4 flex items-center gap-2">
              <Cpu className="w-3.5 h-3.5 text-[#00E5FF]" /> Capabilities
            </h3>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/software-development" className="hover:text-[#00E5FF] transition-colors">
                  Software Development
                </Link>
              </li>
              <li>
                <Link href="/business-intelligence" className="hover:text-[#00E5FF] transition-colors">
                  Business Intelligence & Analytics
                </Link>
              </li>
              <li>
                <Link href="/restaurant-technology" className="hover:text-[#00E5FF] transition-colors">
                  Exo Server Restaurant OS
                </Link>
              </li>
              <li>
                <Link href="/solutions" className="hover:text-[#00E5FF] transition-colors">
                  Custom Platform Architecture
                </Link>
              </li>
            </ul>
          </div>

          {/* Exo Server SaaS Ecosystem */}
          <div>
            <h3 className="text-xs font-mono font-bold tracking-widest text-white uppercase mb-4 flex items-center gap-2">
              <Utensils className="w-3.5 h-3.5 text-[#00E5FF]" /> Exo Server
            </h3>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/restaurant-technology" className="hover:text-[#00E5FF] transition-colors">
                  Self-Service Kiosk Systems
                </Link>
              </li>
              <li>
                <Link href="/restaurant-technology" className="hover:text-[#00E5FF] transition-colors">
                  QR Ordering & Menu Software
                </Link>
              </li>
              <li>
                <Link href="/restaurant-technology" className="hover:text-[#00E5FF] transition-colors">
                  Kitchen Display System (KDS)
                </Link>
              </li>
              <li>
                <Link href="/restaurant-technology" className="hover:text-[#00E5FF] transition-colors">
                  Waitstaff & Sales Operations
                </Link>
              </li>
            </ul>
          </div>

          {/* Company & Contact */}
          <div>
            <h3 className="text-xs font-mono font-bold tracking-widest text-white uppercase mb-4 flex items-center gap-2">
              <Database className="w-3.5 h-3.5 text-[#00E5FF]" /> Organization
            </h3>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/solutions" className="hover:text-[#00E5FF] transition-colors">
                  About Exo Advance
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#00E5FF] transition-colors">
                  Inquiries & Consultations
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#00E5FF] transition-colors">
                  Talk To Our Engineers
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#64748B]">
          <p>© {new Date().getFullYear()} EXO ADVANCE LLC. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="text-[10px] uppercase tracking-widest text-[#00E5FF]/70">
              Technology As An Exoskeleton
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
