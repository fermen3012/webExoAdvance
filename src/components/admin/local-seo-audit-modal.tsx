"use client";

import React, { useState, useEffect } from "react";
import {
  generateLocalSEOAudit,
  LocalSEOAuditResult,
} from "@/app/actions/local-seo";
import {
  Sparkles,
  MapPin,
  CheckCircle2,
  Copy,
  Check,
  X,
  AlertTriangle,
  TrendingDown,
  DollarSign,
  Loader2,
  Share2,
  ExternalLink,
  Zap,
} from "lucide-react";

export interface ScoutedRestaurantPreset {
  companyName: string;
  city: string;
  county: string;
  pos: string;
  cuisine: string;
}

export const PRESET_SCOUTED_RESTAURANTS: ScoutedRestaurantPreset[] = [
  {
    companyName: "Stefanos Pizza & Pasta",
    city: "Tampa, FL",
    county: "Hillsborough",
    pos: "Clover POS",
    cuisine: "Pizzería e Italiana",
  },
  {
    companyName: "El Churrascaso Grill",
    city: "Tampa, FL",
    county: "Hillsborough",
    pos: "Toast POS",
    cuisine: "Parrillada Latina / Asador",
  },
  {
    companyName: "ROAM Steakhouse & Bar",
    city: "St. Petersburg, FL",
    county: "Pinellas",
    pos: "Clover POS",
    cuisine: "Steakhouse & Cortes Finos",
  },
  {
    companyName: "Burger-ish Bar & Grill",
    city: "St. Pete Beach, FL",
    county: "Pinellas",
    pos: "Clover POS",
    cuisine: "Hamburguesas y Bar Playero",
  },
  {
    companyName: "EggTown Breakfast & Brunch",
    city: "Wesley Chapel, FL",
    county: "Pasco",
    pos: "Toast POS",
    cuisine: "Desayunos & Brunch",
  },
  {
    companyName: "Moschella's Italian Eatery & Market",
    city: "Wesley Chapel, FL",
    county: "Pasco",
    pos: "Clover POS",
    cuisine: "Mercado y Comida Italiana",
  },
  {
    companyName: "Toast Fresh Fast Fun",
    city: "New Port Richey, FL",
    county: "Pasco",
    pos: "Toast POS",
    cuisine: "Desayunos, Brunch & Griego",
  },
  {
    companyName: "Grand Bakery & Cafe",
    city: "New Port Richey, FL",
    county: "Pasco",
    pos: "Clover POS",
    cuisine: "Panadería & Cafetería Artesanal",
  },
  {
    companyName: "Christina's Restaurant",
    city: "New Port Richey, FL",
    county: "Pasco",
    pos: "Clover POS",
    cuisine: "Restaurante Familiar Tradicional",
  },
];

interface LocalSEOAuditModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultRestaurantName?: string;
  defaultCity?: string;
  defaultPOS?: string;
}

export function LocalSEOAuditModal({
  isOpen,
  onClose,
  defaultRestaurantName = "",
  defaultCity = "Tampa, FL",
  defaultPOS = "Toast POS",
}: LocalSEOAuditModalProps) {
  const [restaurantName, setRestaurantName] = useState(defaultRestaurantName);
  const [city, setCity] = useState(defaultCity);
  const [cuisineType, setCuisineType] = useState("Pizzería / Restaurante");
  const [currentPOS, setCurrentPOS] = useState(defaultPOS);
  const [isLoading, setIsLoading] = useState(false);
  const [audit, setAudit] = useState<LocalSEOAuditResult | null>(null);
  const [copiedType, setCopiedType] = useState<"whatsapp" | "email" | null>(null);
  const [indexNowStatus, setIndexNowStatus] = useState<string | null>(null);
  const [isPingingIndexNow, setIsPingingIndexNow] = useState(false);

  // Sync state whenever props change or modal opens
  useEffect(() => {
    if (defaultRestaurantName) {
      setRestaurantName(defaultRestaurantName);
      const match = PRESET_SCOUTED_RESTAURANTS.find(
        (p) => p.companyName.toLowerCase() === defaultRestaurantName.toLowerCase()
      );
      if (match) {
        setCity(match.city);
        setCurrentPOS(match.pos);
        setCuisineType(match.cuisine);
      } else {
        if (defaultCity) setCity(defaultCity);
        if (defaultPOS) setCurrentPOS(defaultPOS);
      }
    } else {
      // Default to first scouted restaurant
      const first = PRESET_SCOUTED_RESTAURANTS[0];
      setRestaurantName(first.companyName);
      setCity(first.city);
      setCurrentPOS(first.pos);
      setCuisineType(first.cuisine);
    }
  }, [defaultRestaurantName, defaultCity, defaultPOS, isOpen]);

  if (!isOpen) return null;

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!restaurantName.trim()) return;

    setIsLoading(true);
    const res = await generateLocalSEOAudit({
      restaurantName,
      city,
      cuisineType,
      currentPOS,
    });
    setIsLoading(false);

    if (res.success && res.audit) {
      setAudit(res.audit);
    }
  };

  const copyToClipboard = (text: string, type: "whatsapp" | "email") => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2000);
  };

  const handlePingIndexNow = async () => {
    setIsPingingIndexNow(true);
    setIndexNowStatus(null);
    try {
      const res = await fetch("/api/seo/indexnow", { method: "POST" });
      const data = await res.json();
      if (data.success) {
        setIndexNowStatus(`✅ IndexNow notificado: ${data.submittedUrls.length} URLs enviadas a Bing/buscadores.`);
      } else {
        setIndexNowStatus("⚠️ Notificación enviada. Ver logs.");
      }
    } catch {
      setIndexNowStatus("⚠️ Error de conexión con IndexNow.");
    } finally {
      setIsPingingIndexNow(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-2.5 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-[#070B14] border border-[#00E5FF]/40 rounded-2xl sm:rounded-3xl max-w-3xl w-full p-4 sm:p-8 shadow-[0_0_50px_rgba(0,229,255,0.2)] relative max-h-[94vh] overflow-y-auto text-white">
        {/* Header */}
        <div className="flex items-start justify-between pb-3 sm:pb-4 border-b border-white/10 gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 sm:gap-2 text-[9px] sm:text-[10px] font-mono text-[#00E5FF] uppercase font-bold tracking-widest mb-1">
              <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              <span>LEAD MAGNET // AUDITORÍA GOOGLE MAPS</span>
            </div>
            <h3 className="text-lg sm:text-2xl font-black font-sans leading-tight">
              Diagnóstico Express de Google Maps &amp; Local SEO
            </h3>
            <p className="text-[11px] sm:text-xs text-[#64748B] mt-1">
              Crea un reporte de 1 página para captar la atención de dueños de restaurantes y ofrecer OrderPoint.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 sm:p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-colors shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 1-Click Prospect Preset Selector */}
        <div className="mt-4 p-3.5 rounded-xl bg-[#1E3A8A]/25 border border-[#00E5FF]/40">
          <label className="block text-[11px] font-mono text-[#00E5FF] uppercase tracking-wider font-bold mb-1.5 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#00E5FF]" />
            <span>Seleccionar de la lista de prospectos detectados:</span>
          </label>
          <select
            value={
              PRESET_SCOUTED_RESTAURANTS.some((p) => p.companyName === restaurantName)
                ? restaurantName
                : "custom"
            }
            onChange={(e) => {
              const val = e.target.value;
              if (val === "custom") {
                setRestaurantName("");
                return;
              }
              const match = PRESET_SCOUTED_RESTAURANTS.find((p) => p.companyName === val);
              if (match) {
                setRestaurantName(match.companyName);
                setCity(match.city);
                setCurrentPOS(match.pos);
                setCuisineType(match.cuisine);
              }
            }}
            className="w-full bg-[#070B14] border border-[#00E5FF]/50 text-white rounded-xl px-3.5 py-2.5 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-[#00E5FF] transition-all cursor-pointer"
          >
            {PRESET_SCOUTED_RESTAURANTS.map((p) => (
              <option key={p.companyName} value={p.companyName}>
                {p.companyName} ({p.city}) — {p.pos}
              </option>
            ))}
            <option value="custom">✍️ Ingresar otro restaurante manualmente...</option>
          </select>
          <p className="text-[10px] text-slate-400 font-mono mt-1.5">
            ⚡ Los datos se autocompletan de inmediato sin que tengas que escribir a mano.
          </p>
        </div>

        {/* Form Inputs */}
        <form onSubmit={handleGenerate} className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 pb-5 border-b border-white/10">
          <div>
            <label className="block text-[11px] font-mono text-slate-400 uppercase tracking-wider font-semibold mb-1">
              Nombre del Restaurante:
            </label>
            <input
              type="text"
              required
              value={restaurantName}
              onChange={(e) => setRestaurantName(e.target.value)}
              placeholder="Ej: Bella Napoli Pizzeria"
              className="w-full bg-[#0A0F1A] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#00E5FF] transition-colors"
            />
          </div>

          <div>
            <label className="block text-[11px] font-mono text-slate-400 uppercase tracking-wider font-semibold mb-1">
              Ciudad en Florida:
            </label>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Ej: Tampa, FL"
              className="w-full bg-[#0A0F1A] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#00E5FF] transition-colors"
            />
          </div>

          <div>
            <label className="block text-[11px] font-mono text-slate-400 uppercase tracking-wider font-semibold mb-1">
              Tipo de Comida / Giro:
            </label>
            <input
              type="text"
              value={cuisineType}
              onChange={(e) => setCuisineType(e.target.value)}
              placeholder="Ej: Taquería Fast-Casual / Pizzería"
              className="w-full bg-[#0A0F1A] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#00E5FF] transition-colors"
            />
          </div>

          <div>
            <label className="block text-[11px] font-mono text-slate-400 uppercase tracking-wider font-semibold mb-1">
              Sistema POS Actual:
            </label>
            <select
              value={currentPOS}
              onChange={(e) => setCurrentPOS(e.target.value)}
              className="w-full bg-[#0A0F1A] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#00E5FF] transition-colors"
            >
              <option value="Toast POS">Toast POS (Comisión 3.5%)</option>
              <option value="Clover POS">Clover Station</option>
              <option value="Square">Square POS</option>
              <option value="Sistema Tradicional">Sistema Tradicional / Sin POS</option>
            </select>
          </div>

          <div className="sm:col-span-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full sm:w-auto bg-[#00E5FF] hover:bg-[#00E5FF]/90 text-black px-6 py-3 sm:py-2.5 rounded-xl text-xs font-mono font-black flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,229,255,0.3)] transition-all cursor-pointer"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-black" />
                  <span>Auditando Perfil y Competencia...</span>
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4 text-black" />
                  <span>Generar Diagnóstico en 1 Clic</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handlePingIndexNow}
              disabled={isPingingIndexNow}
              className="text-[11px] font-mono text-[#00E5FF] hover:underline flex items-center justify-center sm:justify-start gap-1.5 py-1"
            >
              <ExternalLink className="w-3.5 h-3.5 shrink-0" />
              <span>{isPingingIndexNow ? "Notificando IndexNow..." : "IndexNow: Forzar indexación web"}</span>
            </button>
          </div>

          {indexNowStatus && (
            <div className="sm:col-span-2 text-[11px] font-mono text-emerald-400 bg-emerald-950/40 p-2.5 rounded-lg border border-emerald-500/30">
              {indexNowStatus}
            </div>
          )}
        </form>

        {/* Audit Results View */}
        {audit && (
          <div className="mt-6 space-y-6 animate-in fade-in duration-300">
            {/* Top Score & Financial Loss Banner */}
            <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-red-950/40 via-[#0A0F1A] to-purple-950/40 border border-red-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-red-950/60 border border-red-500/50 flex flex-col items-center justify-center font-mono shrink-0">
                  <span className="text-xl sm:text-2xl font-black text-red-400">{audit.auditScore}</span>
                  <span className="text-[8px] sm:text-[9px] text-slate-400 uppercase">/ 100</span>
                </div>
                <div>
                  <h4 className="text-sm sm:text-base font-bold font-sans text-white">{audit.restaurantName}</h4>
                  <p className="text-[11px] sm:text-xs text-slate-400 font-mono flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#00E5FF] shrink-0" />
                    <span>{audit.city} • Visibilidad: </span>
                    <span className="text-red-400 font-bold uppercase">Baja</span>
                  </p>
                </div>
              </div>

              <div className="text-left sm:text-right w-full sm:w-auto border-t sm:border-t-0 pt-3 sm:pt-0 border-white/10">
                <span className="text-[10px] font-mono uppercase text-slate-400 block">Pérdida Mensual Estimada</span>
                <div className="text-xl sm:text-2xl font-black text-red-400 font-mono mt-0.5">
                  -${audit.financialImpact.estimatedMonthlyRevenueLost.toLocaleString("en-US")} <span className="text-xs text-slate-400">USD/mes</span>
                </div>
                <span className="text-[10px] text-slate-400 font-mono block">
                  ~{audit.financialImpact.estimatedMonthlyLostGuests} comensales que eligen a la competencia
                </span>
              </div>
            </div>

            {/* Critical Fixes Grid */}
            <div className="space-y-3">
              <h5 className="text-xs font-mono font-bold uppercase tracking-wider text-[#00E5FF] flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-amber-400" />
                3 Errores Críticos que le Cuestan Ventas:
              </h5>

              <div className="space-y-2.5 font-sans text-xs">
                {audit.criticalFixes.map((item, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-[#0A0F1A] border border-white/5 space-y-1">
                    <div className="font-bold text-white flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-red-950 text-red-400 font-mono text-[10px] flex items-center justify-center shrink-0">
                        {idx + 1}
                      </span>
                      <span>{item.issue}</span>
                    </div>
                    <p className="text-slate-400 pl-7 text-[11px] leading-relaxed">
                      <strong>Impacto:</strong> {item.impact}
                    </p>
                    <p className="text-[#00E5FF] pl-7 text-[11px] leading-relaxed">
                      <strong>Solución OrderPoint:</strong> {item.solution}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Ready-to-Send Hooks (WhatsApp & Email) */}
            <div className="pt-4 border-t border-white/10 space-y-4">
              <h5 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300">
                Copys de Prospección Listos para Enviar (1 Clic):
              </h5>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* WhatsApp Script */}
                <div className="p-4 rounded-xl bg-[#0A0F1A] border border-white/10 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-emerald-400 font-mono flex items-center gap-1.5">
                        <Share2 className="w-3.5 h-3.5" /> Mensaje para WhatsApp:
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-300 font-sans whitespace-pre-wrap leading-relaxed line-clamp-6">
                      {audit.hookScriptWhatsApp}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => copyToClipboard(audit.hookScriptWhatsApp, "whatsapp")}
                    className="mt-3 w-full bg-emerald-600/30 hover:bg-emerald-600/50 text-emerald-300 border border-emerald-500/40 py-2 rounded-lg text-xs font-mono font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                  >
                    {copiedType === "whatsapp" ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span>¡Copiado al Portapapeles!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copiar Mensaje WhatsApp</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Email Script */}
                <div className="p-4 rounded-xl bg-[#0A0F1A] border border-white/10 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-cyan-400 font-mono flex items-center gap-1.5">
                        <Zap className="w-3.5 h-3.5" /> Correo Formal:
                      </span>
                    </div>
                    <div className="text-[10px] font-mono text-slate-400 mb-1">
                      Asunto: <span className="text-white font-semibold">{audit.hookScriptEmail.subject}</span>
                    </div>
                    <p className="text-[11px] text-slate-300 font-sans whitespace-pre-wrap leading-relaxed line-clamp-5">
                      {audit.hookScriptEmail.body}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      copyToClipboard(
                        `Asunto: ${audit.hookScriptEmail.subject}\n\n${audit.hookScriptEmail.body}`,
                        "email"
                      )
                    }
                    className="mt-3 w-full bg-[#1E3A8A]/40 hover:bg-[#1E3A8A] text-[#00E5FF] border border-[#00E5FF]/40 py-2 rounded-lg text-xs font-mono font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                  >
                    {copiedType === "email" ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-[#00E5FF]" />
                        <span>¡Copiado al Portapapeles!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copiar Correo</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
