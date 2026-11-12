"use client";

import React, { useState, useEffect } from "react";
import {
  fetchOutboundProspects,
  approveAndSendOutboundEmail,
  regenerateOutboundAngle,
  OutboundReviewItem,
} from "@/app/actions/outbound";
import { LocalSEOAuditModal } from "./local-seo-audit-modal";
import {
  Sparkles,
  Search,
  Filter,
  CheckCircle2,
  Send,
  RotateCw,
  Trash2,
  ExternalLink,
  ShieldCheck,
  AlertTriangle,
  Building2,
  Mail,
  Zap,
  TrendingUp,
  X,
  Eye,
  DollarSign,
  Loader2,
  Check,
  MapPin,
  Phone,
  Navigation,
} from "lucide-react";

export function OutboundProspectsTab() {
  const [prospects, setProspects] = useState<OutboundReviewItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTier, setSelectedTier] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [selectedCounty, setSelectedCounty] = useState<string>("all");

  // Local SEO Audit Modal State
  const [isAuditModalOpen, setIsAuditModalOpen] = useState(false);
  const [auditTargetName, setAuditTargetName] = useState("");
  const [auditTargetCity, setAuditTargetCity] = useState("Tampa, FL");
  const [auditTargetPOS, setAuditTargetPOS] = useState("Toast POS");

  // Human-in-the-Loop Modal State
  const [reviewingItem, setReviewingItem] = useState<OutboundReviewItem | null>(null);
  const [reviewLocale, setReviewLocale] = useState<"en" | "es">("en");
  const [subjectInput, setSubjectInput] = useState("");
  const [bodyInput, setBodyInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [sendSuccessMessage, setSendSuccessMessage] = useState<string | null>(null);
  const [sendErrorMessage, setSendErrorMessage] = useState<string | null>(null);

  const loadProspects = async () => {
    setIsLoading(true);
    const res = await fetchOutboundProspects();
    setIsLoading(false);
    if (res.success) {
      setProspects(res.prospects);
    }
  };

  useEffect(() => {
    loadProspects();
  }, []);

  const openReviewModal = (item: OutboundReviewItem) => {
    setReviewingItem(item);
    const initialLocale = item.preferredLocale || (item.companyName.toLowerCase().includes("churrascaso") ? "es" : "en");
    setReviewLocale(initialLocale);

    if (item.drafts && item.drafts[initialLocale]) {
      setSubjectInput(item.drafts[initialLocale].subject);
      setBodyInput(item.drafts[initialLocale].body);
    } else {
      setSubjectInput(item.emailDraft.subject);
      setBodyInput(item.emailDraft.body);
    }
    setSendSuccessMessage(null);
    setSendErrorMessage(null);
  };

  const handleSwitchLocale = (targetLocale: "en" | "es") => {
    setReviewLocale(targetLocale);
    if (reviewingItem?.drafts && reviewingItem.drafts[targetLocale]) {
      setSubjectInput(reviewingItem.drafts[targetLocale].subject);
      setBodyInput(reviewingItem.drafts[targetLocale].body);
    }
  };

  const closeReviewModal = () => {
    setReviewingItem(null);
    setSendSuccessMessage(null);
    setSendErrorMessage(null);
  };

  const handleApproveAndSend = async () => {
    if (!reviewingItem) return;
    setIsSending(true);
    setSendSuccessMessage(null);
    setSendErrorMessage(null);

    const res = await approveAndSendOutboundEmail(
      reviewingItem.id,
      subjectInput,
      bodyInput,
      reviewingItem.recipientEmail,
      reviewingItem.companyName
    );

    setIsSending(false);

    if (res.success) {
      setSendSuccessMessage(`Email delivered successfully to ${reviewingItem.recipientEmail}! Message ID: ${res.messageId}`);
      // Update local prospect state to SENT
      setProspects((prev) =>
        prev.map((p) =>
          p.id === reviewingItem.id
            ? {
                ...p,
                status: "SENT",
                sentAt: new Date().toISOString(),
                emailDraft: { ...p.emailDraft, subject: subjectInput, body: bodyInput },
              }
            : p
        )
      );
      setTimeout(() => {
        closeReviewModal();
      }, 1600);
    } else {
      setSendErrorMessage(res.error || "Failed to dispatch email. Check Resend configuration.");
    }
  };

  const handleRegenerate = async (angle: "savings_toast" | "kiosk_upsell" | "kitchen_speed") => {
    if (!reviewingItem) return;
    setIsSending(true);
    const res = await regenerateOutboundAngle(reviewingItem, angle);
    setIsSending(false);
    if (res.success) {
      setSubjectInput(res.subject);
      setBodyInput(res.body);
    }
  };

  const handleDiscard = (id: string) => {
    setProspects((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status: "DISCARDED" } : p))
    );
    if (reviewingItem?.id === id) {
      closeReviewModal();
    }
  };

  // Filter logic
  const filtered = prospects.filter((p) => {
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      p.companyName.toLowerCase().includes(query) ||
      p.domain.toLowerCase().includes(query) ||
      p.contactName.toLowerCase().includes(query) ||
      p.recipientEmail.toLowerCase().includes(query);

    const matchesTier = selectedTier === "all" || p.priorityTier === selectedTier;
    const matchesStatus = selectedStatus === "all" || p.status === selectedStatus;
    const matchesCounty = selectedCounty === "all" || (p.county && p.county.toLowerCase() === selectedCounty.toLowerCase());

    return matchesSearch && matchesTier && matchesStatus && matchesCounty;
  });

  // Metrics
  const totalCount = prospects.length;
  const readyReviewCount = prospects.filter((p) => p.status === "READY_REVIEW").length;
  const sentCount = prospects.filter((p) => p.status === "SENT").length;
  const avgScore =
    totalCount > 0 ? Math.round(prospects.reduce((a, b) => a + b.score, 0) / totalCount) : 0;

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-300">
      {/* Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-[#070B14] p-4 sm:p-5 rounded-2xl border border-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
          <div className="flex items-center justify-between text-[#64748B] mb-2 font-mono text-[10px] sm:text-xs uppercase">
            <span>Scouted Targets</span>
            <Building2 className="w-4 h-4 text-[#00E5FF]" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-white font-mono">{totalCount}</div>
          <p className="text-[10px] sm:text-xs text-[#64748B] mt-1 font-mono">B2B Florida prospects</p>
        </div>

        <div className="bg-[#070B14] p-4 sm:p-5 rounded-2xl border border-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
          <div className="flex items-center justify-between text-[#64748B] mb-2 font-mono text-[10px] sm:text-xs uppercase">
            <span>Pending Review (HITL)</span>
            <Eye className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-amber-400 font-mono">{readyReviewCount}</div>
          <p className="text-[10px] sm:text-xs text-[#64748B] mt-1 font-mono">Requires human sign-off</p>
        </div>

        <div className="bg-[#070B14] p-4 sm:p-5 rounded-2xl border border-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
          <div className="flex items-center justify-between text-[#64748B] mb-2 font-mono text-[10px] sm:text-xs uppercase">
            <span>Delivered via Resend</span>
            <Send className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono">{sentCount}</div>
          <p className="text-[10px] sm:text-xs text-[#64748B] mt-1 font-mono">Personalized outreach sent</p>
        </div>

        <div className="bg-[#070B14] p-4 sm:p-5 rounded-2xl border border-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
          <div className="flex items-center justify-between text-[#64748B] mb-2 font-mono text-[10px] sm:text-xs uppercase">
            <span>Avg Signal Fit</span>
            <Zap className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-purple-400 font-mono">{avgScore} / 100</div>
          <p className="text-[10px] sm:text-xs text-[#64748B] mt-1 font-mono">Observable tech signal match</p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="glass-card p-4 sm:p-5 rounded-2xl border border-white/10 flex flex-col sm:flex-row gap-4 justify-between items-center bg-[#070B14]/80">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search company, domain, contact..."
            className="w-full bg-[#0A0F1A] border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#00E5FF] transition-colors"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
          {/* County Filter */}
          <select
            value={selectedCounty}
            onChange={(e) => setSelectedCounty(e.target.value)}
            className="bg-[#0A0F1A] border border-[#00E5FF]/30 rounded-xl px-3 py-2 text-xs text-[#00E5FF] font-mono focus:outline-none focus:border-[#00E5FF] w-full sm:w-auto"
          >
            <option value="all">📍 All Counties (Florida)</option>
            <option value="Hillsborough">Hillsborough (Tampa)</option>
            <option value="Pinellas">Pinellas (St. Pete / Clearwater)</option>
            <option value="Pasco">Pasco (Wesley Chapel)</option>
          </select>

          {/* Priority Tier Filter */}
          <div className="flex items-center gap-2 w-1/2 sm:w-auto">
            <Filter className="w-3.5 h-3.5 text-slate-500 shrink-0" />
            <select
              value={selectedTier}
              onChange={(e) => setSelectedTier(e.target.value)}
              className="bg-[#0A0F1A] border border-white/10 rounded-xl px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-[#00E5FF] w-full"
            >
              <option value="all">All Tiers</option>
              <option value="tier_1_high">Tier 1 (High Fit 85+)</option>
              <option value="tier_2_medium">Tier 2 (Medium 70-84)</option>
              <option value="tier_3_low">Tier 3 (Low &lt;70)</option>
            </select>
          </div>

          {/* Status Filter */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="bg-[#0A0F1A] border border-white/10 rounded-xl px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-[#00E5FF] w-1/2 sm:w-auto"
          >
            <option value="all">All Statuses</option>
            <option value="READY_REVIEW">Ready for Review</option>
            <option value="SENT">Sent</option>
            <option value="DISCARDED">Discarded</option>
          </select>

          {/* Lead Magnet Auditor Button */}
          <button
            type="button"
            onClick={() => {
              const target = filtered[0] || prospects[0];
              setAuditTargetName(target?.companyName || "");
              setAuditTargetCity(target?.city ? `${target.city}, FL` : "Tampa, FL");
              setAuditTargetPOS(
                target?.signals?.hasToastPOS
                  ? "Toast POS"
                  : target?.signals?.hasCloverPOS
                  ? "Clover POS"
                  : "Toast POS"
              );
              setIsAuditModalOpen(true);
            }}
            className="bg-[#1E3A8A] hover:bg-[#1E3A8A]/80 border border-[#00E5FF] text-white px-3.5 py-2 rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 transition-all shadow-[0_0_15px_rgba(0,229,255,0.25)] shrink-0 cursor-pointer"
          >
            <MapPin className="w-3.5 h-3.5 text-[#00E5FF]" />
            <span className="hidden sm:inline">Auditoría Google Maps</span>
            <span className="sm:hidden">Auditoría Maps</span>
          </button>
        </div>
      </div>

      {/* Prospect List / Table */}
      {isLoading ? (
        <div className="p-16 text-center text-slate-500 font-mono text-xs flex flex-col items-center justify-center gap-3">
          <Loader2 className="w-6 h-6 animate-spin text-[#00E5FF]" />
          <span>Loading scouted outbound targets...</span>
        </div>
      ) : filtered.length === 0 ? (
        <div className="p-12 text-center text-slate-500 font-mono text-xs bg-[#070B14]/60 rounded-2xl border border-white/5">
          No outbound prospects match your filter criteria.
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((item) => (
            <div
              key={item.id}
              className={`p-5 rounded-2xl border transition-all bg-[#070B14] flex flex-col lg:flex-row lg:items-center justify-between gap-5 ${
                item.status === "SENT"
                  ? "border-emerald-500/20 opacity-80"
                  : item.status === "DISCARDED"
                  ? "border-white/5 opacity-50"
                  : "border-white/10 hover:border-[#00E5FF]/40 shadow-[0_4px_25px_rgba(0,0,0,0.4)]"
              }`}
            >
              {/* Left Column: Company & Contact */}
              <div className="space-y-2 lg:max-w-md">
                <div className="flex items-center gap-2.5">
                  <span className="text-sm font-bold text-white font-sans">{item.companyName}</span>
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#64748B] hover:text-[#00E5FF] transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>

                  {/* Priority Pill */}
                  <span
                    className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                      item.priorityTier === "tier_1_high"
                        ? "bg-[#00E5FF]/10 text-[#00E5FF] border border-[#00E5FF]/30"
                        : "bg-purple-950/40 text-purple-300 border border-purple-500/30"
                    }`}
                  >
                    Score {item.score}
                  </span>

                  {item.status === "SENT" && (
                    <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-950/60 text-emerald-300 border border-emerald-500/40 uppercase">
                      Delivered
                    </span>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400 font-mono">
                  {item.county && item.city && (
                    <span className="text-[10px] bg-[#1E3A8A]/50 text-[#00E5FF] border border-[#00E5FF]/30 px-2 py-0.5 rounded font-bold">
                      {item.county} • {item.city}
                    </span>
                  )}
                  {item.phone && (
                    <a
                      href={`tel:${item.phone.replace(/[^0-9+]/g, "")}`}
                      className="inline-flex items-center gap-1 text-emerald-400 hover:text-emerald-300 transition-colors font-bold"
                      title="Llamar directamente a este local"
                    >
                      <Phone className="w-3 h-3" />
                      <span>{item.phone}</span>
                    </a>
                  )}
                  {item.recipientEmail && (
                    <span className="text-slate-400">• {item.recipientEmail}</span>
                  )}
                </div>

                {item.address && (
                  <div className="flex items-center gap-1.5 text-[11px] text-slate-400 font-mono">
                    <Navigation className="w-3 h-3 text-[#00E5FF] shrink-0" />
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${item.companyName} ${item.address}`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-white underline decoration-slate-600 transition-colors truncate"
                      title="Abrir ubicación en Google Maps"
                    >
                      {item.address}
                    </a>
                  </div>
                )}

                {/* Grounded Signals Badges */}
                <div className="flex flex-wrap items-center gap-1.5 pt-1">
                  {item.signals.hasToastPOS && (
                    <span className="text-[10px] font-mono bg-red-950/40 text-red-300 border border-red-500/30 px-2 py-0.5 rounded">
                      Toast POS Detected
                    </span>
                  )}
                  {item.signals.hasCloverPOS && (
                    <span className="text-[10px] font-mono bg-emerald-950/40 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded">
                      Clover Station
                    </span>
                  )}
                  {item.signals.noSelfServiceKiosk && (
                    <span className="text-[10px] font-mono bg-amber-950/40 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded">
                      No Kiosk (+22% Opp)
                    </span>
                  )}
                  {item.signals.runningGoogleAds && (
                    <span className="text-[10px] font-mono bg-blue-950/40 text-blue-300 border border-blue-500/30 px-2 py-0.5 rounded">
                      Active Google Ads
                    </span>
                  )}
                  {item.signals.monthlyEstimatedLoss && (
                    <span className="text-[10px] font-mono bg-rose-950/50 text-rose-300 border border-rose-500/30 px-2 py-0.5 rounded font-bold">
                      -${item.signals.monthlyEstimatedLoss}/mo Commission Loss
                    </span>
                  )}
                </div>
              </div>

              {/* Middle Column: Email Draft Preview */}
              <div className="lg:max-w-md bg-[#0A0F1A] p-3.5 rounded-xl border border-white/5 space-y-1">
                <div className="text-[11px] font-mono text-slate-400">
                  <span className="text-slate-500">Subject: </span>
                  <span className="text-white font-semibold">{item.emailDraft.subject}</span>
                </div>
                <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                  {item.emailDraft.body}
                </p>
                <div className="text-[10px] font-mono text-[#64748B] pt-1 flex items-center justify-between">
                  <span>Signal: {item.emailDraft.groundedSignal}</span>
                  <span>{item.emailDraft.wordCount} words</span>
                </div>
              </div>

              {/* Right Column: Actions */}
              <div className="flex items-center gap-2 shrink-0">
                {item.status === "SENT" ? (
                  <button
                    onClick={() => openReviewModal(item)}
                    className="bg-[#1E3A8A]/40 hover:bg-[#1E3A8A]/70 text-slate-200 border border-white/10 px-3.5 py-2 rounded-xl text-xs font-mono font-semibold flex items-center gap-1.5 transition-all"
                  >
                    <Eye className="w-3.5 h-3.5 text-[#00E5FF]" />
                    <span>View Sent Email</span>
                  </button>
                ) : item.status === "DISCARDED" ? (
                  <button
                    onClick={() =>
                      setProspects((prev) =>
                        prev.map((p) => (p.id === item.id ? { ...p, status: "READY_REVIEW" } : p))
                      )
                    }
                    className="bg-white/5 hover:bg-white/10 text-slate-400 px-3 py-2 rounded-xl text-xs font-mono transition-all"
                  >
                    Restore
                  </button>
                ) : (
                  <>
                    <button
                      type="button"
                      onClick={() => {
                        setAuditTargetName(item.companyName);
                        setAuditTargetCity(item.city ? `${item.city}, FL` : "Tampa, FL");
                        setAuditTargetPOS(
                          item.signals?.hasToastPOS
                            ? "Toast POS"
                            : item.signals?.hasCloverPOS
                            ? "Clover POS"
                            : "Toast POS"
                        );
                        setIsAuditModalOpen(true);
                      }}
                      className="p-2.5 rounded-xl bg-[#1E3A8A]/30 hover:bg-[#1E3A8A]/70 border border-[#00E5FF]/30 hover:border-[#00E5FF] text-[#00E5FF] transition-all"
                      title="Generar Auditoría Google Maps en 1 Clic"
                    >
                      <MapPin className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => openReviewModal(item)}
                      className="bg-[#00E5FF] hover:bg-[#00E5FF]/90 text-black px-4 py-2.5 rounded-xl text-xs font-mono font-black flex items-center gap-1.5 transition-all shadow-[0_0_15px_rgba(0,229,255,0.3)] active:scale-95"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-black" />
                      <span>Review & Approve</span>
                    </button>
                    <button
                      onClick={() => handleDiscard(item.id)}
                      className="p-2.5 rounded-xl bg-white/5 hover:bg-red-950/40 border border-white/10 hover:border-red-500/40 text-slate-400 hover:text-red-400 transition-all"
                      title="Discard prospect"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* HUMAN-IN-THE-LOOP REVIEW & EDIT MODAL */}
      {reviewingItem && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-[#070B14] border border-[#00E5FF]/40 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-[0_0_50px_rgba(0,229,255,0.15)] relative max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-start justify-between pb-4 border-b border-white/10">
              <div>
                <div className="inline-flex items-center gap-2 text-[10px] font-mono text-[#00E5FF] uppercase font-bold tracking-widest mb-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>HUMAN-IN-THE-LOOP QUALITY GATE</span>
                </div>
                <h3 className="text-xl font-black text-white font-sans">
                  {reviewingItem.companyName}
                </h3>
                <p className="text-xs text-[#64748B] font-mono mt-0.5">
                  Recipient: <span className="text-slate-300 font-bold">{reviewingItem.contactName}</span> ({reviewingItem.recipientEmail})
                </p>
              </div>
              <button
                onClick={closeReviewModal}
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Notification messages */}
            {sendSuccessMessage && (
              <div className="mt-4 p-4 rounded-xl bg-emerald-950/50 border border-emerald-500/50 text-emerald-300 text-xs font-mono flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{sendSuccessMessage}</span>
              </div>
            )}

            {sendErrorMessage && (
              <div className="mt-4 p-4 rounded-xl bg-red-950/50 border border-red-500/50 text-red-300 text-xs font-mono flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
                <span>{sendErrorMessage}</span>
              </div>
            )}

            {/* Pre-Send Gate Audit Bar */}
            <div className="my-5 p-3.5 rounded-xl bg-[#0A0F1A] border border-white/10 flex flex-wrap items-center justify-between gap-3 text-[11px] font-mono text-slate-300">
              <div className="flex items-center gap-1.5 text-emerald-400">
                <Check className="w-3.5 h-3.5" />
                <span>Zero AI Clichés</span>
              </div>
              <div className="flex items-center gap-1.5 text-emerald-400">
                <Check className="w-3.5 h-3.5" />
                <span>Word Count &lt; 120 words</span>
              </div>
              <div className="flex items-center gap-1.5 text-emerald-400">
                <Check className="w-3.5 h-3.5" />
                <span>Signal-Grounded</span>
              </div>
            </div>

            {/* Automatic Language Selector Bar */}
            <div className="mb-5 p-3.5 rounded-2xl bg-[#0A0F1A] border border-[#00E5FF]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-semibold block">
                  Idioma del Mensaje
                </span>
                <span className="text-[11px] font-mono text-[#00E5FF] flex items-center gap-1.5 mt-0.5">
                  <Sparkles className="w-3 h-3 text-[#00E5FF]" />
                  <span>
                    Auto-detectado:{" "}
                    <strong className="text-white">
                      {reviewingItem.preferredLocale === "es"
                        ? "Español 🇪🇸 (Gastronomía Latina / Empatía Cultural)"
                        : "English 🇺🇸 (Standard Market / Números Directos)"}
                    </strong>
                  </span>
                </span>
              </div>

              <div className="flex items-center gap-1.5 bg-[#070B14] p-1 rounded-xl border border-white/10 shrink-0">
                <button
                  type="button"
                  onClick={() => handleSwitchLocale("en")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                    reviewLocale === "en"
                      ? "bg-[#1E3A8A] text-[#00E5FF] border border-[#00E5FF]/40 shadow-[0_0_10px_rgba(0,229,255,0.2)]"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  <span>🇺🇸 English</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleSwitchLocale("es")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                    reviewLocale === "es"
                      ? "bg-[#1E3A8A] text-[#00E5FF] border border-[#00E5FF]/40 shadow-[0_0_10px_rgba(0,229,255,0.2)]"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  <span>🇪🇸 Español</span>
                </button>
              </div>
            </div>

            {/* Angle Selector */}
            <div className="mb-5 space-y-2">
              <label className="block text-[11px] font-mono text-slate-400 uppercase tracking-wider font-semibold">
                Regenerate with High-Converting Angle:
              </label>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => handleRegenerate("savings_toast")}
                  className="px-3 py-1.5 rounded-lg bg-[#1E3A8A]/40 hover:bg-[#1E3A8A] text-slate-200 border border-[#00E5FF]/30 text-xs font-mono font-medium flex items-center gap-1.5 transition-all"
                >
                  <DollarSign className="w-3 h-3 text-[#00E5FF]" />
                  <span>Savings vs Toast/Clover</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleRegenerate("kiosk_upsell")}
                  className="px-3 py-1.5 rounded-lg bg-[#1E3A8A]/40 hover:bg-[#1E3A8A] text-slate-200 border border-[#00E5FF]/30 text-xs font-mono font-medium flex items-center gap-1.5 transition-all"
                >
                  <TrendingUp className="w-3 h-3 text-[#00E5FF]" />
                  <span>Kiosk Upsell (+22%)</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleRegenerate("kitchen_speed")}
                  className="px-3 py-1.5 rounded-lg bg-[#1E3A8A]/40 hover:bg-[#1E3A8A] text-slate-200 border border-[#00E5FF]/30 text-xs font-mono font-medium flex items-center gap-1.5 transition-all"
                >
                  <Zap className="w-3 h-3 text-[#00E5FF]" />
                  <span>Kitchen Speed KDS</span>
                </button>
              </div>
            </div>

            {/* In-Line Editable Subject & Body */}
            <div className="space-y-4">
              <div>
                <label className="block text-[11px] font-mono text-slate-400 uppercase tracking-wider font-semibold mb-1.5">
                  Subject Line:
                </label>
                <input
                  type="text"
                  value={subjectInput}
                  onChange={(e) => setSubjectInput(e.target.value)}
                  className="w-full bg-[#0A0F1A] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white font-mono focus:outline-none focus:border-[#00E5FF] transition-all"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-[11px] font-mono text-slate-400 uppercase tracking-wider font-semibold">
                    Email Body:
                  </label>
                  <span className="text-[10px] font-mono text-[#64748B]">
                    {bodyInput.split(/\s+/).filter(Boolean).length} words
                  </span>
                </div>
                <textarea
                  rows={6}
                  value={bodyInput}
                  onChange={(e) => setBodyInput(e.target.value)}
                  className="w-full bg-[#0A0F1A] border border-white/10 rounded-xl p-4 text-xs sm:text-sm text-slate-200 leading-relaxed focus:outline-none focus:border-[#00E5FF] transition-all"
                />
              </div>
            </div>

            {/* Modal Actions */}
            <div className="mt-6 pt-5 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => handleDiscard(reviewingItem.id)}
                className="w-full sm:w-auto text-xs font-mono text-red-400 hover:text-red-300 transition-colors py-2 px-3"
              >
                Discard Prospect
              </button>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={closeReviewModal}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-white/10 text-xs font-mono text-slate-300 hover:text-white transition-colors"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  disabled={isSending || reviewingItem.status === "SENT"}
                  onClick={handleApproveAndSend}
                  className="w-full sm:w-auto bg-[#00E5FF] hover:bg-[#00E5FF]/90 disabled:opacity-50 text-black px-6 py-2.5 rounded-xl text-xs font-mono font-black flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,229,255,0.4)] transition-all"
                >
                  {isSending ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-black" />
                      <span>Delivering via Resend...</span>
                    </>
                  ) : reviewingItem.status === "SENT" ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-black" />
                      <span>Already Delivered</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 text-black" />
                      <span>Approve &amp; Send Now</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* LOCAL SEO / GOOGLE MAPS AUDIT LEAD MAGNET MODAL */}
      <LocalSEOAuditModal
        isOpen={isAuditModalOpen}
        onClose={() => setIsAuditModalOpen(false)}
        defaultRestaurantName={auditTargetName}
        defaultCity={auditTargetCity}
        defaultPOS={auditTargetPOS}
      />
    </div>
  );
}
