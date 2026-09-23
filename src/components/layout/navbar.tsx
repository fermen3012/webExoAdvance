"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ExoLogo } from "@/components/ui/exo-logo";
import { Menu, X, ArrowUpRight } from "lucide-react";

const navItems = [
  { label: "Solutions", href: "/solutions" },
  { label: "Exo Server", href: "/restaurant-technology" },
  { label: "Business Intelligence", href: "/business-intelligence" },
  { label: "Software Development", href: "/software-development" },
  { label: "Contact", href: "/contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0A0F1A]/90 backdrop-blur-md border-b border-[#00E5FF]/15 py-3 shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <Link href="/" className="group focus:outline-none">
            <ExoLogo size="md" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3 py-2 text-xs lg:text-sm font-medium tracking-wide transition-colors relative ${
                    isActive
                      ? "text-[#00E5FF]"
                      : "text-[#64748B] hover:text-white"
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-[#00E5FF] shadow-[0_0_8px_#00E5FF]" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Primary CTA */}
          <div className="hidden md:flex items-center">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-[#1E3A8A]/40 hover:bg-[#1E3A8A]/70 text-white border border-[#00E5FF]/40 hover:border-[#00E5FF] px-4 py-2 rounded-md text-xs font-mono tracking-wider font-semibold transition-all duration-200 shadow-[0_0_15px_rgba(0,229,255,0.15)] hover:shadow-[0_0_25px_rgba(0,229,255,0.3)] group"
            >
              <span>LET&apos;S TALK</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#00E5FF] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-[#64748B] hover:text-white hover:bg-[#0F172A] border border-white/10 transition-colors focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0A0F1A]/95 backdrop-blur-xl border-b border-[#00E5FF]/20 px-4 pt-4 pb-6 mt-3 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col gap-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-3 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-[#1E3A8A]/40 text-[#00E5FF] border-l-2 border-[#00E5FF]"
                      : "text-slate-300 hover:bg-[#0F172A] hover:text-white"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
            <div className="pt-4 border-t border-white/10 mt-2">
              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 w-full bg-[#1E3A8A] hover:bg-[#1E3A8A]/90 text-white border border-[#00E5FF] py-3 rounded-md text-xs font-mono font-bold tracking-wider"
              >
                LET&apos;S TALK
                <ArrowUpRight className="w-4 h-4 text-[#00E5FF]" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
