"use client";

import React, { useState } from "react";
import { LeadWithInteractions, updateLeadStatusAction, addLeadNoteAction, triggerAIReplyAction } from "@/app/actions/leads";
import { X, Sparkles, MessageSquare, Clock, Building, Mail, Phone, Send, RefreshCw } from "lucide-react";

interface LeadDetailModalProps {
  lead: LeadWithInteractions | null;
  onClose: () => void;
  onRefresh: () => void;
}

const statusOptions = [
  { value: "new", label: "New Lead", color: "bg-blue-500/20 text-blue-400 border-blue-500/40" },
  { value: "ai_processed", label: "AI Processed", color: "bg-purple-500/20 text-purple-400 border-purple-500/40" },
  { value: "contacted", label: "Contacted", color: "bg-yellow-500/20 text-yellow-400 border-yellow-500/40" },
  { value: "qualified", label: "Qualified", color: "bg-emerald-500/20 text-emerald-400 border-emerald-500/40" },
  { value: "closed", label: "Closed / Won", color: "bg-[#00E5FF]/20 text-[#00E5FF] border-[#00E5FF]/40" },
  { value: "archived", label: "Archived", color: "bg-slate-500/20 text-slate-400 border-slate-500/40" },
];

export function LeadDetailModal({ lead, onClose, onRefresh }: LeadDetailModalProps) {
  const [newNote, setNewNote] = useState("");
  const [isAddingNote, setIsAddingNote] = useState(false);
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  if (!lead) return null;

  const currentStatusObj = statusOptions.find((s) => s.value === lead.status) || statusOptions[0];

  const handleStatusChange = async (newStatus: string) => {
    setIsUpdatingStatus(true);
    setFeedback(null);
    const res = await updateLeadStatusAction(lead.id, newStatus);
    setIsUpdatingStatus(false);
    if (res.success) {
      setFeedback("Status updated successfully.");
      onRefresh();
    } else {
      setFeedback(`Error: ${res.error}`);
    }
  };

  const handleAddNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNote.trim()) return;
    setIsAddingNote(true);
    setFeedback(null);
    const res = await addLeadNoteAction(lead.id, newNote);
    setIsAddingNote(false);
    if (res.success) {
      setNewNote("");
      setFeedback("Internal note added.");
      onRefresh();
    } else {
      setFeedback(`Error: ${res.error}`);
    }
  };

  const handleTriggerAI = async () => {
    setIsGeneratingAI(true);
    setFeedback(null);
    const res = await triggerAIReplyAction(lead.id);
    setIsGeneratingAI(false);
    if (res.success) {
      setFeedback("AI Agent generated a fresh response.");
      onRefresh();
    } else {
      setFeedback(`Error: ${res.error}`);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-[#0A0F1A] border border-[#00E5FF]/30 rounded-2xl sm:rounded-[32px] shadow-[0_25px_60px_rgba(0,0,0,0.9)] overflow-hidden flex flex-col max-h-[92vh] sm:max-h-[90vh]">
        
        {/* Header Bar */}
        <div className="px-4 sm:px-8 py-4 sm:py-5 border-b border-white/10 bg-[#1E3A8A]/30 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#00E5FF]/10 border border-[#00E5FF]/40 flex items-center justify-center text-[#00E5FF] shrink-0">
              <Building className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black text-white font-sans tracking-tight leading-tight">
                {lead.full_name}
              </h2>
              <p className="text-[11px] sm:text-xs text-[#00E5FF] font-mono">
                {lead.company ? `${lead.company} // ` : ""}{lead.service}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-all cursor-pointer shrink-0"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="p-4 sm:p-8 space-y-6 sm:space-y-8 overflow-y-auto font-sans">
          {feedback && (
            <div className="p-3 rounded-xl bg-[#00E5FF]/10 border border-[#00E5FF]/40 text-[#00E5FF] font-mono text-xs flex items-center justify-between">
              <span>{feedback}</span>
              <button onClick={() => setFeedback(null)} className="text-xs text-white hover:underline cursor-pointer">
                Dismiss
              </button>
            </div>
          )}

          {/* Lead Meta Grid & Status Control */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
            <div className="glass-card p-4 rounded-2xl border border-white/10 flex flex-col gap-2">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#64748B]">Contact Info</span>
              <div className="text-xs space-y-1 text-slate-200">
                <div className="flex items-center gap-2 truncate">
                  <Mail className="w-3.5 h-3.5 text-[#00E5FF] shrink-0" />
                  <a href={`mailto:${lead.email}`} className="hover:underline truncate">{lead.email}</a>
                </div>
                {lead.phone && (
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-[#00E5FF] shrink-0" />
                    <a href={`tel:${lead.phone}`} className="hover:underline">{lead.phone}</a>
                  </div>
                )}
                <div className="flex items-center gap-2 text-[#64748B] font-mono text-[10px] sm:text-[11px] pt-1">
                  <Clock className="w-3.5 h-3.5 shrink-0" />
                  <span>Submitted: {new Date(lead.created_at).toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div className="glass-card p-4 rounded-2xl border border-white/10 flex flex-col justify-between gap-2">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#64748B]">Current Lead Status</span>
              <div className="flex items-center gap-2">
                <select
                  value={lead.status}
                  disabled={isUpdatingStatus}
                  onChange={(e) => handleStatusChange(e.target.value)}
                  className={`w-full text-xs font-mono font-bold px-3 py-2.5 rounded-xl border ${currentStatusObj.color} bg-[#0A0F1A] focus:outline-none cursor-pointer min-h-[42px]`}
                >
                  {statusOptions.map((s) => (
                    <option key={s.value} value={s.value} className="bg-[#0A0F1A] text-white">
                      {s.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="glass-card p-4 rounded-2xl border border-[#00E5FF]/20 flex flex-col justify-between gap-2 bg-[#1E3A8A]/20 sm:col-span-2 md:col-span-1">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#00E5FF]">AI Agent Control</span>
                <Sparkles className="w-4 h-4 text-[#00E5FF] animate-pulse" />
              </div>
              <button
                onClick={handleTriggerAI}
                disabled={isGeneratingAI}
                className="w-full bg-[#1E3A8A] hover:bg-[#1E3A8A]/80 border border-[#00E5FF] text-white py-2.5 rounded-xl font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 min-h-[42px]"
              >
                {isGeneratingAI ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 text-[#00E5FF] animate-spin" />
                    <span>Processing AI...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5 text-[#00E5FF]" />
                    <span>Generate AI Reply</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Original Inquiry Message */}
          <div className="glass-card p-4 sm:p-5 rounded-2xl border border-white/10 bg-[#0A0F1A]/80">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#00E5FF] block mb-2">
              ORIGINAL CUSTOMER INQUIRY
            </span>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans whitespace-pre-wrap">
              "{lead.message}"
            </p>
          </div>

          {/* Interaction Timeline */}
          <div>
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-white flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-[#00E5FF]" />
                <span>Interactions Timeline & AI History ({lead.interactions.length})</span>
              </h3>
            </div>

            <div className="space-y-3 sm:space-y-4">
              {lead.interactions.length === 0 ? (
                <div className="text-xs font-mono text-[#64748B] p-4 text-center glass-card rounded-xl">
                  No interactions recorded yet. Click "Generate AI Reply" to run the AI agent.
                </div>
              ) : (
                lead.interactions.map((item) => {
                  const isAI = item.type === "ai_response";
                  const isNote = item.type === "note";
                  const isStatus = item.type === "status_change";

                  return (
                    <div
                      key={item.id}
                      className={`glass-card p-4 sm:p-5 rounded-2xl border ${
                        isAI
                          ? "border-[#00E5FF]/40 bg-[#1E3A8A]/10 shadow-[0_0_15px_rgba(0,229,255,0.1)]"
                          : isNote
                          ? "border-yellow-500/30 bg-yellow-950/10"
                          : "border-white/10 bg-[#0A0F1A]"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2 gap-2 flex-wrap sm:flex-nowrap">
                        <div className="flex items-center gap-2 font-mono text-xs">
                          {isAI && (
                            <span className="px-2.5 py-0.5 rounded-full bg-[#00E5FF]/20 border border-[#00E5FF] text-[#00E5FF] font-bold text-[10px] uppercase flex items-center gap-1">
                              <Sparkles className="w-3 h-3" /> AI Agent Response
                            </span>
                          )}
                          {isNote && (
                            <span className="px-2.5 py-0.5 rounded-full bg-yellow-500/20 border border-yellow-500/40 text-yellow-400 font-bold text-[10px] uppercase">
                              Internal Staff Note
                            </span>
                          )}
                          {isStatus && (
                            <span className="px-2.5 py-0.5 rounded-full bg-purple-500/20 border border-purple-500/40 text-purple-300 font-bold text-[10px] uppercase">
                              System Log
                            </span>
                          )}
                          {!isAI && !isNote && !isStatus && (
                            <span className="px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 font-bold text-[10px] uppercase">
                              {item.type}
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] font-mono text-[#64748B]">
                          {new Date(item.created_at).toLocaleString()}
                        </span>
                      </div>

                      {item.sentiment && (
                        <div className="mb-3 flex items-center gap-2 sm:gap-3 font-mono text-xs flex-wrap">
                          <span className="text-slate-400">Sentiment:</span>
                          <span className="px-2 py-0.5 rounded bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-[10px] sm:text-[11px]">
                            {item.sentiment}
                          </span>
                          {item.ai_score !== null && (
                            <>
                              <span className="text-slate-400">Score:</span>
                              <span className="px-2 py-0.5 rounded bg-[#1E3A8A] text-[#00E5FF] font-bold text-[10px] sm:text-[11px]">
                                {item.ai_score}/100
                              </span>
                            </>
                          )}
                        </div>
                      )}

                      <p className="text-xs text-slate-200 leading-relaxed font-mono whitespace-pre-wrap">
                        {item.content}
                      </p>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Add Internal Staff Note Form */}
          <form onSubmit={handleAddNote} className="glass-card p-4 sm:p-5 rounded-2xl border border-white/10 space-y-3">
            <label className="block text-xs font-mono font-bold text-[#64748B] uppercase tracking-wider">
              Add Internal Staff Note
            </label>
            <textarea
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              rows={2}
              placeholder="Type internal follow-up notes, call logs, or task reminders..."
              className="w-full bg-[#0A0F1A] border border-white/10 focus:border-[#00E5FF] rounded-xl p-3 text-xs text-white font-mono placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-[#00E5FF]"
            />
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isAddingNote || !newNote.trim()}
                className="w-full sm:w-auto bg-[#1E3A8A] hover:bg-[#1E3A8A]/80 border border-[#00E5FF] text-white px-5 py-2.5 rounded-xl text-xs font-mono font-bold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 min-h-[42px]"
              >
                <Send className="w-3.5 h-3.5 text-[#00E5FF]" />
                <span>Save Note</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
