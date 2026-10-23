"use client";

import React, { useState } from "react";
import Link from "next/link";
import { EXO_PRODUCTS_SERVICES, ProductServiceItem } from "@/lib/products-data";
import {
  Utensils,
  BarChart3,
  Code2,
  Bot,
  CheckCircle2,
  ArrowUpRight,
  Sparkles,
  Search,
  Filter,
  DollarSign,
  Users,
  Layers,
  ChevronRight,
  ExternalLink,
} from "lucide-react";

export function ServicesCatalogTab() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedProduct, setSelectedProduct] = useState<ProductServiceItem | null>(null);

  const filteredProducts = EXO_PRODUCTS_SERVICES.filter((product) => {
    const matchesCategory =
      selectedCategory === "all" || product.category === selectedCategory;
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.program.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.targetClient.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const getCategoryIcon = (category: ProductServiceItem["category"]) => {
    switch (category) {
      case "restaurant":
        return <Utensils className="w-5 h-5 text-[#00E5FF]" />;
      case "bi":
        return <BarChart3 className="w-5 h-5 text-purple-400" />;
      case "software":
        return <Code2 className="w-5 h-5 text-emerald-400" />;
      case "automation":
        return <Bot className="w-5 h-5 text-amber-400" />;
    }
  };

  const getCategoryBadgeClass = (category: ProductServiceItem["category"]) => {
    switch (category) {
      case "restaurant":
        return "bg-[#1E3A8A]/50 text-[#00E5FF] border-[#00E5FF]/40";
      case "bi":
        return "bg-purple-950/50 text-purple-300 border-purple-500/40";
      case "software":
        return "bg-emerald-950/50 text-emerald-300 border-emerald-500/40";
      case "automation":
        return "bg-amber-950/50 text-amber-300 border-amber-500/40";
    }
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-300">
      {/* Top Banner Overview */}
      <div className="glass-card p-6 sm:p-8 rounded-2xl sm:rounded-[32px] border border-[#00E5FF]/20 bg-gradient-to-r from-[#0A0F1A] via-[#1E3A8A]/20 to-[#0A0F1A] flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1E3A8A]/50 border border-[#00E5FF]/40 text-[#00E5FF] font-mono text-[11px] font-bold uppercase tracking-wider">
            <Layers className="w-3.5 h-3.5" />
            <span>CORPORATE CATALOG & CLIENT PROGRAMS</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white font-sans tracking-tight">
            Our Services & Client Solutions
          </h2>
          <p className="text-xs sm:text-sm text-[#64748B] font-mono leading-relaxed">
            Review specifications for each program, technical capabilities, impact metrics, and engagement models to advise prospects directly from the CRM.
          </p>
        </div>

        <div className="flex items-center gap-4 bg-[#0A0F1A]/80 border border-white/10 p-4 rounded-2xl shrink-0">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#64748B] block">Active Programs</span>
            <span className="text-2xl font-black text-white font-sans">{EXO_PRODUCTS_SERVICES.length} Solutions</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-[#1E3A8A]/40 border border-[#00E5FF]/30 flex items-center justify-center text-[#00E5FF]">
            <Sparkles className="w-6 h-6 animate-pulse" />
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="glass-card p-4 sm:p-5 rounded-2xl sm:rounded-[24px] border border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 bg-[#0A0F1A]/90">
        <div className="relative w-full md:w-96">
          <Search className="w-4 h-4 text-[#00E5FF] absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by program, product, or target profile..."
            className="w-full bg-[#0A0F1A] border border-white/10 focus:border-[#00E5FF] rounded-xl pl-11 pr-4 py-2.5 text-xs text-white font-mono placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-[#00E5FF] transition-all"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1.5 md:pb-0 font-mono text-xs no-scrollbar flex-nowrap shrink-0">
          {[
            { id: "all", label: "All Programs" },
            { id: "restaurant", label: "Restaurant OS" },
            { id: "bi", label: "Business Intelligence" },
            { id: "software", label: "Custom Software" },
            { id: "automation", label: "AI Agents" },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-2 rounded-xl text-[11px] sm:text-xs font-bold uppercase whitespace-nowrap transition-all border cursor-pointer shrink-0 ${
                selectedCategory === cat.id
                  ? "bg-[#1E3A8A] border-[#00E5FF] text-[#00E5FF] shadow-[0_0_12px_rgba(0,229,255,0.25)]"
                  : "bg-[#0A0F1A] border-white/10 text-slate-400 hover:text-white"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredProducts.map((prod) => (
          <div
            key={prod.id}
            className="glass-card p-6 sm:p-7 rounded-2xl sm:rounded-[28px] border border-white/10 hover:border-[#00E5FF]/40 transition-all flex flex-col justify-between group bg-[#0A0F1A]/80 shadow-[0_10px_30px_rgba(0,0,0,0.4)]"
          >
            <div className="space-y-4">
              {/* Card Header */}
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-[#070B14] border border-white/10 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    {getCategoryIcon(prod.category)}
                  </div>
                  <div>
                    <span className="text-[10px] font-mono tracking-widest text-[#00E5FF] uppercase block">
                      {prod.program}
                    </span>
                    <h3 className="text-xl font-black text-white font-sans tracking-tight">
                      {prod.name}
                    </h3>
                  </div>
                </div>

                <span
                  className={`text-[10px] font-mono uppercase tracking-wider font-bold px-2.5 py-1 rounded-full border ${getCategoryBadgeClass(
                    prod.category
                  )} shrink-0`}
                >
                  {prod.badge}
                </span>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
                {prod.description}
              </p>

              {/* Target Client Profile */}
              <div className="bg-[#070B14] p-3 rounded-xl border border-white/5 flex items-start gap-2.5">
                <Users className="w-4 h-4 text-[#00E5FF] shrink-0 mt-0.5" />
                <div className="text-[11px] font-mono text-slate-300">
                  <strong className="text-white">Target Profile: </strong>
                  {prod.targetClient}
                </div>
              </div>

              {/* Key Features List */}
              <div className="space-y-2 pt-2">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#64748B] block font-bold">
                  Included Modules & Deliverables:
                </span>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
                  {prod.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#00E5FF] shrink-0 mt-0.5" />
                      <span className="text-[11px] leading-tight">{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Impact Metrics Banner */}
              <div className="grid grid-cols-3 gap-2 pt-3 border-t border-white/10">
                {prod.impactMetrics.map((metric, idx) => (
                  <div key={idx} className="bg-[#070B14] p-2.5 rounded-lg border border-white/5 text-center">
                    <span className="text-[9px] font-mono text-[#64748B] block uppercase tracking-tight">
                      {metric.label}
                    </span>
                    <span className="text-sm font-black text-[#00E5FF] font-sans mt-0.5 block">
                      {metric.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Card Footer Actions */}
            <div className="pt-6 mt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-1.5 text-slate-400 font-mono text-[11px]">
                <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
                <span>{prod.pricingModel}</span>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <Link
                  href={prod.routeHref}
                  target="_blank"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-mono text-xs font-bold transition-all cursor-pointer group/link"
                >
                  <span>Live Page</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#00E5FF] group-hover/link:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
