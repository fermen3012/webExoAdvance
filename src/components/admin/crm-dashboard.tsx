"use client";

import React, { useState, useEffect, useCallback } from "react";
import { fetchCRMLeads, LeadWithInteractions } from "@/app/actions/leads";
import { LeadDetailModal } from "./lead-detail-modal";
import { Search, RefreshCw, Users, Sparkles, CheckCircle2, TrendingUp, Filter, MessageSquare, ArrowUpRight, ShieldCheck, LogOut, ChevronRight, Mail, Phone, Calendar } from "lucide-react";
import { useAdminAuth } from "./admin-auth-guard";

interface CRMDashboardProps {
  onLogout?: () => void;
}

export function CRMDashboard({ onLogout: propOnLogout }: CRMDashboardProps) {
  const { onLogout: contextOnLogout } = useAdminAuth();
  const handleLogout = propOnLogout || contextOnLogout;

  const [leads, setLeads] = useState<LeadWithInteractions[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedLead, setSelectedLead] = useState<LeadWithInteractions | null>(null);

  const loadLeads = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    const res = await fetchCRMLeads();
    setIsLoading(false);

    if (res.success) {
      setLeads(res.leads);
      if (selectedLead) {
        const updated = res.leads.find((l) => l.id === selectedLead.id);
        if (updated) setSelectedLead(updated);
      }
    } else {
      setError(res.error || "Failed to connect to Supabase database.");
    }
  }, [selectedLead]);

  useEffect(() => {
    loadLeads();
  }, []);

  // Filtered Leads Calculation
  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      lead.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (lead.company && lead.company.toLowerCase().includes(searchQuery.toLowerCase())) ||
      lead.service.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = selectedStatus === "all" || lead.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  // Analytics Metrics
  const totalLeads = leads.length;
  const aiProcessedCount = leads.filter((l) => l.status === "ai_processed" || l.interactions.some((i) => i.type === "ai_response")).length;
  const qualifiedCount = leads.filter((l) => l.status === "qualified" || l.status === "closed").length;
  
  const scores = leads
    .flatMap((l) => l.interactions)
    .map((i) => i.ai_score)
    .filter((s): s is number => s !== null && s !== undefined);
  const avgScore = scores.length > 0 ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 0;

  return (
    <div className="min-h-screen bg-[#0A0F1A] text-white pt-6 sm:pt-8 pb-20 px-3 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8">
        
        {/* Top Title & Quick Refresh / Logout Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <div className="flex items-center gap-2 text-[#00E5FF] font-mono text-[10px] sm:text-xs tracking-widest uppercase mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>EXO ADVANCE // ENTERPRISE AI CRM ENGINE</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white font-sans tracking-tight">
              Client Leads & AI Agent Center
            </h1>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
            <button
              onClick={loadLeads}
              disabled={isLoading}
              className="flex-1 sm:flex-none bg-[#1E3A8A] hover:bg-[#1E3A8A]/80 border border-[#00E5FF] text-white px-3.5 sm:px-4 py-2.5 rounded-xl font-mono text-[11px] sm:text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer shadow-[0_0_15px_rgba(0,229,255,0.2)] active:scale-95"
            >
              <RefreshCw className={`w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#00E5FF] ${isLoading ? "animate-spin" : ""}`} />
              <span>Refresh Leads</span>
            </button>

            {handleLogout && (
              <button
                onClick={handleLogout}
                type="button"
                className="flex-1 sm:flex-none bg-red-950/40 hover:bg-red-900/60 border border-red-500/40 hover:border-red-500 text-red-300 px-3.5 sm:px-4 py-2.5 rounded-xl font-mono text-[11px] sm:text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer shadow-[0_0_15px_rgba(239,68,68,0.15)] active:scale-95"
              >
                <LogOut className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-red-400" />
                <span>Cerrar Sesión</span>
              </button>
            )}
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <div className="glass-card p-4 sm:p-6 rounded-2xl sm:rounded-[24px] border border-white/10 flex items-center justify-between bg-[#0A0F1A]/80">
            <div>
              <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-widest text-[#64748B]">Total Leads</span>
              <div className="text-2xl sm:text-3xl font-black text-white font-sans mt-1">{totalLeads}</div>
            </div>
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-[#1E3A8A]/40 border border-[#00E5FF]/30 flex items-center justify-center text-[#00E5FF] shrink-0">
              <Users className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
          </div>

          <div className="glass-card p-4 sm:p-6 rounded-2xl sm:rounded-[24px] border border-[#00E5FF]/30 flex items-center justify-between bg-[#1E3A8A]/20">
            <div>
              <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-widest text-[#00E5FF]">AI Processed</span>
              <div className="text-2xl sm:text-3xl font-black text-[#00E5FF] font-sans mt-1">{aiProcessedCount}</div>
            </div>
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-[#00E5FF]/10 border border-[#00E5FF] flex items-center justify-center text-[#00E5FF] shadow-[0_0_15px_rgba(0,229,255,0.3)] shrink-0">
              <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 animate-pulse" />
            </div>
          </div>

          <div className="glass-card p-4 sm:p-6 rounded-2xl sm:rounded-[24px] border border-emerald-500/30 flex items-center justify-between bg-emerald-950/20">
            <div>
              <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-widest text-emerald-400">Qualified</span>
              <div className="text-2xl sm:text-3xl font-black text-emerald-300 font-sans mt-1">{qualifiedCount}</div>
            </div>
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-emerald-500/10 border border-emerald-500 flex items-center justify-center text-emerald-400 shrink-0">
              <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
          </div>

          <div className="glass-card p-4 sm:p-6 rounded-2xl sm:rounded-[24px] border border-purple-500/30 flex items-center justify-between bg-purple-950/20">
            <div>
              <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-widest text-purple-400">Avg AI Score</span>
              <div className="text-2xl sm:text-3xl font-black text-purple-300 font-sans mt-1">{avgScore}/100</div>
            </div>
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-purple-500/10 border border-purple-500 flex items-center justify-center text-purple-400 shrink-0">
              <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
          </div>
        </div>

        {/* Search & Filter Toolbar */}
        <div className="glass-card p-4 sm:p-5 rounded-2xl sm:rounded-[24px] border border-white/10 flex flex-col md:flex-row items-center justify-between gap-3 sm:gap-4 bg-[#0A0F1A]/90">
          {/* Search Box */}
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 text-[#00E5FF] absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, email, company, or service..."
              className="w-full bg-[#0A0F1A] border border-white/10 focus:border-[#00E5FF] rounded-xl pl-11 pr-4 py-2.5 text-xs text-white font-mono placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-[#00E5FF] transition-all"
            />
          </div>

          {/* Status Filter Tabs (Scrollable on small mobile) */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1.5 md:pb-0 font-mono text-xs no-scrollbar flex-nowrap shrink-0">
            {["all", "new", "ai_processed", "contacted", "qualified", "closed", "archived"].map((statusKey) => (
              <button
                key={statusKey}
                onClick={() => setSelectedStatus(statusKey)}
                className={`px-3 sm:px-3.5 py-2 rounded-xl text-[11px] sm:text-xs font-bold uppercase whitespace-nowrap transition-all border cursor-pointer shrink-0 ${
                  selectedStatus === statusKey
                    ? "bg-[#1E3A8A] border-[#00E5FF] text-[#00E5FF] shadow-[0_0_12px_rgba(0,229,255,0.25)]"
                    : "bg-[#0A0F1A] border-white/10 text-slate-400 hover:text-white"
                }`}
              >
                {statusKey.replace("_", " ")}
              </button>
            ))}
          </div>
        </div>

        {/* Error Banner */}
        {error && (
          <div className="p-4 rounded-2xl bg-red-950/40 border border-red-500/40 text-red-300 text-xs font-mono">
            ⚠️ {error}
          </div>
        )}

        {/* Leads Container (Mobile Card View & Desktop Table View) */}
        <div className="glass-card rounded-2xl sm:rounded-[32px] border border-white/10 overflow-hidden shadow-2xl">
          {isLoading ? (
            <div className="py-16 sm:py-20 text-center flex flex-col items-center justify-center gap-3">
              <RefreshCw className="w-8 h-8 text-[#00E5FF] animate-spin" />
              <span className="text-xs font-mono text-slate-400 uppercase tracking-widest">
                Fetching Client Database from Supabase...
              </span>
            </div>
          ) : filteredLeads.length === 0 ? (
            <div className="py-16 sm:py-20 text-center flex flex-col items-center justify-center gap-3 px-4">
              <Users className="w-10 h-10 text-slate-600" />
              <h3 className="text-lg font-bold text-white font-sans">No leads found</h3>
              <p className="text-xs text-slate-400 font-mono max-w-sm">
                No customer leads match your search criteria or database is currently empty.
              </p>
            </div>
          ) : (
            <>
              {/* 1. MOBILE RESPONSIVE CARDS VIEW (Displayed on screens < 768px) */}
              <div className="block md:hidden divide-y divide-white/10">
                {filteredLeads.map((lead) => {
                  const aiInteraction = lead.interactions.find((i) => i.type === "ai_response");
                  const aiScore = aiInteraction?.ai_score;

                  return (
                    <div
                      key={lead.id}
                      onClick={() => setSelectedLead(lead)}
                      className="p-4 sm:p-5 space-y-3.5 hover:bg-white/[0.03] transition-colors cursor-pointer active:bg-white/[0.05]"
                    >
                      {/* Name & Date */}
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h4 className="font-bold text-white text-base font-sans tracking-tight">
                            {lead.full_name}
                          </h4>
                          {lead.company && (
                            <span className="text-xs text-[#00E5FF] font-mono font-medium block">
                              {lead.company}
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] font-mono text-[#64748B] shrink-0">
                          {new Date(lead.created_at).toLocaleDateString()}
                        </span>
                      </div>

                      {/* Contact Info & Service */}
                      <div className="text-xs font-mono space-y-1 text-slate-300">
                        <div className="flex items-center gap-2 truncate">
                          <Mail className="w-3.5 h-3.5 text-[#00E5FF] shrink-0" />
                          <span className="truncate">{lead.email}</span>
                        </div>
                        {lead.phone && (
                          <div className="flex items-center gap-2">
                            <Phone className="w-3.5 h-3.5 text-[#00E5FF] shrink-0" />
                            <span>{lead.phone}</span>
                          </div>
                        )}
                      </div>

                      {/* Badges Row */}
                      <div className="flex items-center gap-2 flex-wrap pt-1 font-mono text-xs">
                        <span className="px-2.5 py-1 rounded-lg bg-[#0A0F1A] border border-white/10 text-slate-300 text-[11px]">
                          {lead.service}
                        </span>

                        <span
                          className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase border ${
                            lead.status === "new"
                              ? "bg-blue-500/20 text-blue-400 border-blue-500/40"
                              : lead.status === "ai_processed"
                              ? "bg-purple-500/20 text-purple-300 border-purple-500/40"
                              : lead.status === "contacted"
                              ? "bg-yellow-500/20 text-yellow-400 border-yellow-500/40"
                              : lead.status === "qualified"
                              ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40"
                              : lead.status === "closed"
                              ? "bg-[#00E5FF]/20 text-[#00E5FF] border-[#00E5FF]/40"
                              : lead.status === "archived"
                              ? "bg-slate-500/20 text-slate-400 border-slate-500/40"
                              : "bg-slate-800 text-slate-400 border-slate-700"
                          }`}
                        >
                          {lead.status.replace("_", " ")}
                        </span>

                        {aiScore !== undefined && aiScore !== null && (
                          <span className="px-2 py-0.5 rounded bg-[#1E3A8A] text-[#00E5FF] font-bold text-[10px]">
                            AI: {aiScore}/100
                          </span>
                        )}
                      </div>

                      {/* Mobile Action Trigger Button */}
                      <div className="pt-2 border-t border-white/5 flex items-center justify-between text-xs font-mono text-[#00E5FF]">
                        <span className="flex items-center gap-1.5 text-slate-400">
                          <MessageSquare className="w-3.5 h-3.5 text-[#00E5FF]" />
                          <span>{lead.interactions.length} interactions</span>
                        </span>
                        <span className="flex items-center gap-1 font-bold">
                          <span>Ver Detalle e Historial IA</span>
                          <ChevronRight className="w-4 h-4" />
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* 2. DESKTOP TABULAR VIEW (Displayed on screens >= 768px) */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-white/10 bg-[#1E3A8A]/20 font-mono text-[11px] text-[#00E5FF] uppercase tracking-wider">
                      <th className="py-4 px-6 font-semibold">Client / Company</th>
                      <th className="py-4 px-6 font-semibold">Service Interest</th>
                      <th className="py-4 px-6 font-semibold">Status</th>
                      <th className="py-4 px-6 font-semibold">AI Lead Score</th>
                      <th className="py-4 px-6 font-semibold">Interactions</th>
                      <th className="py-4 px-6 font-semibold">Date</th>
                      <th className="py-4 px-6 font-semibold text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 font-sans text-sm">
                    {filteredLeads.map((lead) => {
                      const aiInteraction = lead.interactions.find((i) => i.type === "ai_response");
                      const aiScore = aiInteraction?.ai_score;

                      return (
                        <tr
                          key={lead.id}
                          onClick={() => setSelectedLead(lead)}
                          className="hover:bg-white/[0.03] transition-colors cursor-pointer group"
                        >
                          {/* Client / Company */}
                          <td className="py-4 px-6">
                            <div className="font-bold text-white group-hover:text-[#00E5FF] transition-colors">
                              {lead.full_name}
                            </div>
                            <div className="text-xs text-[#64748B] font-mono">
                              {lead.company ? `${lead.company} • ` : ""}{lead.email}
                            </div>
                          </td>

                          {/* Service */}
                          <td className="py-4 px-6">
                            <span className="px-3 py-1 rounded-lg bg-[#0A0F1A] border border-white/10 text-slate-300 text-xs font-mono">
                              {lead.service}
                            </span>
                          </td>

                          {/* Status Pill */}
                          <td className="py-4 px-6">
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-mono font-bold uppercase border ${
                                lead.status === "new"
                                  ? "bg-blue-500/20 text-blue-400 border-blue-500/40"
                                  : lead.status === "ai_processed"
                                  ? "bg-purple-500/20 text-purple-300 border-purple-500/40"
                                  : lead.status === "contacted"
                                  ? "bg-yellow-500/20 text-yellow-400 border-yellow-500/40"
                                  : lead.status === "qualified"
                                  ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40"
                                  : lead.status === "closed"
                                  ? "bg-[#00E5FF]/20 text-[#00E5FF] border-[#00E5FF]/40"
                                  : lead.status === "archived"
                                  ? "bg-slate-500/20 text-slate-400 border-slate-500/40"
                                  : "bg-slate-800 text-slate-400 border-slate-700"
                              }`}
                            >
                              {lead.status.replace("_", " ")}
                            </span>
                          </td>

                          {/* AI Score */}
                          <td className="py-4 px-6 font-mono text-xs">
                            {aiScore !== undefined && aiScore !== null ? (
                              <div className="flex items-center gap-1.5">
                                <span className="font-bold text-[#00E5FF]">{aiScore}/100</span>
                                {aiScore >= 80 && (
                                  <span className="px-1.5 py-0.5 rounded bg-amber-500/20 border border-amber-500/40 text-amber-300 text-[10px]">
                                    HIGH VALUE
                                  </span>
                                )}
                              </div>
                            ) : (
                              <span className="text-slate-600">Pending AI</span>
                            )}
                          </td>

                          {/* Interaction Count */}
                          <td className="py-4 px-6 font-mono text-xs text-slate-300">
                            <div className="flex items-center gap-1.5">
                              <MessageSquare className="w-3.5 h-3.5 text-[#00E5FF]" />
                              <span>{lead.interactions.length} entries</span>
                            </div>
                          </td>

                          {/* Date */}
                          <td className="py-4 px-6 font-mono text-xs text-slate-400">
                            {new Date(lead.created_at).toLocaleDateString()}
                          </td>

                          {/* Action */}
                          <td className="py-4 px-6 text-right">
                            <button className="p-2 rounded-xl bg-white/5 group-hover:bg-[#1E3A8A] group-hover:text-[#00E5FF] text-slate-400 transition-all">
                              <ArrowUpRight className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>

      </div>

      {/* Lead Detail Modal */}
      {selectedLead && (
        <LeadDetailModal
          lead={selectedLead}
          onClose={() => setSelectedLead(null)}
          onRefresh={loadLeads}
        />
      )}
    </div>
  );
}
