"use client";

import React, { useState } from "react";
import { DollarSign, TrendingUp, Sparkles, ArrowRight, ShieldCheck, Check } from "lucide-react";

export function OrderpointCalculator() {
  const [monthlyVolume, setMonthlyVolume] = useState<number>(45000);
  const [terminals, setTerminals] = useState<number>(2);

  // Competitor standard fees (Toast/Clover typical model):
  // ~2.9% average card processing markups/take rate + $99/mo software per station + proprietary hardware lock-in
  const competitorAnnualFees = Math.round(
    monthlyVolume * 12 * 0.028 + terminals * 99 * 12 + terminals * 1400 * 0.33
  );

  // OrderPoint model:
  // 0% extra transaction commission from us (flat software $99/mo base + $10.99/mo extra screen + open Samsung hardware)
  const orderpointAnnualCost = Math.round(
    99 * 12 + (terminals > 1 ? (terminals - 1) * 10.99 * 12 : 0) + 799 * terminals * 0.33
  );

  const estimatedAnnualSavings = Math.max(0, competitorAnnualFees - orderpointAnnualCost);

  return (
    <div id="calculator" className="relative glass-card p-6 sm:p-10 lg:p-12 rounded-3xl border border-[#00E5FF]/30 shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
      {/* Decorative gradient glow */}
      <div className="absolute -top-24 -right-24 w-72 h-72 bg-[#00E5FF]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-3xl mx-auto text-center mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1E3A8A]/50 border border-[#00E5FF]/40 text-[#00E5FF] font-mono text-xs font-semibold mb-4">
          <DollarSign className="w-3.5 h-3.5" /> CALCULADORA DE RETORNO Y AHORRO REAL
        </div>
        <h3 className="text-2xl sm:text-4xl font-black text-white font-sans uppercase">
          ¿Cuánto Dinero Estás Regalando en Comisiones al Año?
        </h3>
        <p className="text-sm sm:text-base text-[#64748B] mt-3">
          Descubre cuánto dinero ahorra tu restaurante al eliminar las tarifas ocultas de Toast y Clover con OrderPoint.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Controls Column */}
        <div className="lg:col-span-6 space-y-8 bg-[#070B14]/70 p-6 sm:p-8 rounded-2xl border border-white/10">
          {/* Slider: Monthly Card Sales */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <label className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider">
                Ventas Mensuales con Tarjeta
              </label>
              <span className="text-lg font-mono font-black text-[#00E5FF]">
                ${monthlyVolume.toLocaleString("en-US")} USD
              </span>
            </div>
            <input
              type="range"
              min={10000}
              max={200000}
              step={5000}
              value={monthlyVolume}
              onChange={(e) => setMonthlyVolume(Number(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#00E5FF]"
            />
            <div className="flex justify-between text-[11px] font-mono text-[#64748B] mt-2">
              <span>$10,000/mes</span>
              <span>$100,000/mes</span>
              <span>$200,000+/mes</span>
            </div>
          </div>

          {/* Terminal / Kiosk Count */}
          <div>
            <label className="block text-xs font-mono font-bold text-slate-300 uppercase tracking-wider mb-3">
              Puntos de Venta o Kioskos en tu Local
            </label>
            <div className="grid grid-cols-5 gap-2">
              {[1, 2, 3, 4, 5].map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => setTerminals(num)}
                  className={`py-2.5 rounded-xl font-mono text-xs font-bold transition-all border ${
                    terminals === num
                      ? "bg-[#00E5FF] text-black border-[#00E5FF] shadow-[0_0_15px_rgba(0,229,255,0.4)]"
                      : "bg-[#0A0F1A] text-slate-400 border-white/10 hover:border-slate-500 hover:text-white"
                  }`}
                >
                  {num} {num === 1 ? "Punto" : "Puntos"}
                </button>
              ))}
            </div>
          </div>

          {/* Quick value props */}
          <div className="pt-4 border-t border-white/10 space-y-2">
            <div className="flex items-center gap-2 text-xs text-slate-300">
              <Check className="w-4 h-4 text-[#00E5FF] shrink-0" />
              <span>0% de comisiones extras retenidas por OrderPoint.</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-300">
              <Check className="w-4 h-4 text-[#00E5FF] shrink-0" />
              <span>Hardware libre Samsung® (sin terminales cautivas de $1,800).</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-300">
              <Check className="w-4 h-4 text-[#00E5FF] shrink-0" />
              <span>Sin contratos obligatorios de permanencia a 2 o 3 años.</span>
            </div>
          </div>
        </div>

        {/* Results Card */}
        <div className="lg:col-span-6 bg-gradient-to-b from-[#1E3A8A]/40 via-[#0A0F1A] to-[#0A0F1A] p-6 sm:p-8 rounded-2xl border-2 border-[#00E5FF]/40 flex flex-col justify-between shadow-[0_0_30px_rgba(0,229,255,0.15)] relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-[#00E5FF] text-black font-mono font-black text-[10px] px-3 py-1 rounded-bl-lg uppercase tracking-wider">
            AHORRO NETO ESTIMADO
          </div>

          <div>
            <span className="text-xs font-mono text-[#00E5FF] font-bold uppercase tracking-widest flex items-center gap-1.5 mb-2">
              <TrendingUp className="w-4 h-4" /> RETORNO FINANCIERO INMEDIATO
            </span>
            <div className="text-4xl sm:text-6xl font-black text-white font-mono tracking-tight mt-1">
              ${estimatedAnnualSavings.toLocaleString("en-US")}
              <span className="text-base sm:text-lg text-[#00E5FF] font-normal font-sans ml-2">/ año</span>
            </div>
            <p className="text-xs text-[#64748B] mt-2 leading-relaxed">
              Dinero limpio que regresa a tu cuenta bancaria cada año en vez de pagarlo en comisiones ocultas y alquiler forzado de terminales.
            </p>
          </div>

          <div className="mt-8 space-y-3 pt-6 border-t border-white/10 font-mono text-xs">
            <div className="flex justify-between text-slate-400">
              <span>Costo estimado Toast / Clover:</span>
              <span className="text-red-400 font-bold">~${competitorAnnualFees.toLocaleString("en-US")}/año</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Costo OrderPoint (Software + Hardware):</span>
              <span className="text-[#00E5FF] font-bold">~${orderpointAnnualCost.toLocaleString("en-US")}/año</span>
            </div>
          </div>

          <div className="mt-8">
            <a
              href="#demo-form"
              className="w-full inline-flex items-center justify-center gap-2 bg-[#00E5FF] hover:bg-[#00E5FF]/90 text-black font-black text-sm px-6 py-4 rounded-xl transition-all shadow-[0_0_20px_rgba(0,229,255,0.4)] hover:shadow-[0_0_30px_rgba(0,229,255,0.6)] group"
            >
              <span>AGENDAR DEMO DE 10 MINUTOS EN FLORIDA</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <p className="text-center text-[11px] text-[#64748B] mt-3">
              Prueba el kiosko físico en tu restaurante en Tampa Bay / Florida Central sin compromiso.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
