import React from "react";
import { Check, Sparkles, ArrowRight, ShieldCheck, Tablet, UtensilsCrossed, Monitor } from "lucide-react";

export function OrderpointPricing() {
  return (
    <div id="pricing" className="w-full">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="text-xs font-mono font-bold text-[#00E5FF] tracking-[0.2em] uppercase">
          PRECIOS TRANSPARENTES • SIN LETRA PEQUEÑA
        </span>
        <h2 className="text-3xl sm:text-5xl font-black text-white mt-2 font-sans uppercase">
          Planes Diseñados para Multiplicar tu Rentabilidad
        </h2>
        <p className="text-sm sm:text-base text-[#64748B] mt-4">
          Sin comisiones abusivas por venta, sin contratos de permanencia a 3 años y con soporte directo en Florida.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto items-stretch">
        {/* Plan 1: Salón & Cocina */}
        <div className="glass-card p-8 sm:p-10 rounded-3xl border border-white/10 hover:border-[#00E5FF]/40 transition-all flex flex-col justify-between bg-[#070B14]/60">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-[#1E3A8A]/50 border border-[#00E5FF]/30 flex items-center justify-center text-[#00E5FF]">
                <UtensilsCrossed className="w-6 h-6" />
              </div>
              <span className="text-xs font-mono font-bold text-slate-400 bg-white/5 border border-white/10 px-3 py-1 rounded-full">
                MODALIDAD BYOD
              </span>
            </div>

            <h3 className="text-2xl font-black text-white font-sans uppercase">
              Módulo Salón & Cocina
            </h3>
            <p className="text-xs text-[#64748B] mt-2">
              Ideal para restaurantes que buscan automatizar la comanda de mesas y acelerar la cocina usando sus propios dispositivos móviles.
            </p>

            <div className="mt-6 pb-6 border-b border-white/10">
              <div className="flex items-baseline gap-2">
                <span className="text-4xl sm:text-5xl font-black text-white font-mono">$450</span>
                <span className="text-xs font-mono text-slate-400">Setup Único</span>
              </div>
              <div className="text-sm font-mono text-[#00E5FF] mt-1 font-semibold">
                + $99 USD / mes de suscripción
              </div>
            </div>

            <ul className="mt-6 space-y-3.5 text-xs text-slate-300">
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-[#00E5FF] shrink-0 mt-0.5" />
                <span><strong>$0 en hardware forzado:</strong> Usa cualquier iPhone o Android para camareros.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-[#00E5FF] shrink-0 mt-0.5" />
                <span><strong>Pantalla de Cocina KDS:</strong> Monitor de comandas en tiempo real (&lt;50ms de latencia).</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-[#00E5FF] shrink-0 mt-0.5" />
                <span><strong>Digitalización Total:</strong> Cargamos tu menú completo, categorías y plano de mesas.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-[#00E5FF] shrink-0 mt-0.5" />
                <span><strong>Capacitación en Vivo:</strong> Entrenamiento a tu equipo de meseros y cocina.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-[#00E5FF] shrink-0 mt-0.5" />
                <span><strong>Cero Comisiones:</strong> No retenemos porcentaje de tus ventas.</span>
              </li>
            </ul>
          </div>

          <div className="mt-8 pt-6 border-t border-white/10">
            <a
              href="#demo-form"
              className="w-full inline-flex items-center justify-center gap-2 bg-[#1E3A8A]/50 hover:bg-[#1E3A8A] text-white border border-[#00E5FF]/40 hover:border-[#00E5FF] py-3.5 px-6 rounded-xl text-xs font-mono font-bold tracking-wider transition-all"
            >
              <span>ELEGIR MÓDULO SALÓN</span>
              <ArrowRight className="w-4 h-4 text-[#00E5FF]" />
            </a>
          </div>
        </div>

        {/* Plan 2: Kiosko de Autoservicio Pro 11" (RECOMENDADO) */}
        <div className="relative glass-card p-8 sm:p-10 rounded-3xl border-2 border-[#00E5FF] flex flex-col justify-between bg-gradient-to-b from-[#1E3A8A]/30 via-[#070B14] to-[#070B14] shadow-[0_0_40px_rgba(0,229,255,0.2)]">
          <div className="absolute -top-3.5 right-8 bg-[#00E5FF] text-black font-mono font-black text-[10px] px-3.5 py-1 rounded-full uppercase tracking-wider flex items-center gap-1 shadow-[0_0_15px_#00E5FF]">
            <Sparkles className="w-3 h-3" /> MÁS POPULAR • LLAVE EN MANO
          </div>

          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-[#00E5FF]/20 border border-[#00E5FF] flex items-center justify-center text-[#00E5FF] shadow-[0_0_20px_rgba(0,229,255,0.4)]">
                <Tablet className="w-6 h-6" />
              </div>
              <span className="text-xs font-mono font-bold text-[#00E5FF] bg-[#00E5FF]/10 border border-[#00E5FF]/30 px-3 py-1 rounded-full">
                SAMSUNG® 11&quot; INCLUIDO
              </span>
            </div>

            <h3 className="text-2xl font-black text-white font-sans uppercase">
              Kiosko Autoservicio Pro 11&quot;
            </h3>
            <p className="text-xs text-slate-300 mt-2">
              El kit de hardware blindado y software que elimina filas, agiliza la caja y aumenta el ticket promedio hasta +22% en automático.
            </p>

            <div className="mt-6 pb-6 border-b border-white/10">
              <div className="flex items-baseline gap-2">
                <span className="text-4xl sm:text-5xl font-black text-[#00E5FF] font-mono">$799</span>
                <span className="text-xs font-mono text-slate-300">Kit Completo (1 solo pago)</span>
              </div>
              <div className="text-sm font-mono text-white mt-1 font-semibold flex items-center gap-2">
                <span>+ $99 USD / mes</span>
                <span className="text-xs text-slate-400 font-normal">(o $150 setup si aportas tu propia tablet)</span>
              </div>
            </div>

            <ul className="mt-6 space-y-3.5 text-xs text-slate-200">
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-[#00E5FF] shrink-0 mt-0.5" />
                <span><strong>Tablet Samsung Galaxy Tab A9+ de 11&quot;:</strong> Pantalla de alta nitidez táctil grado comercial.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-[#00E5FF] shrink-0 mt-0.5" />
                <span><strong>Soporte Blindado de Acero:</strong> Base para mostrador reforzada con llave de seguridad.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-[#00E5FF] shrink-0 mt-0.5" />
                <span><strong>Impresora Térmica 80mm:</strong> Impresión ultrarrápida de tickets y comandas.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-[#00E5FF] shrink-0 mt-0.5" />
                <span><strong>Upselling Inteligente:</strong> Sugerencias automáticas de combos, bebidas y postres.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-[#00E5FF] shrink-0 mt-0.5" />
                <span><strong>Sin Contratos:</strong> Cancela en cualquier momento sin penalizaciones.</span>
              </li>
            </ul>
          </div>

          <div className="mt-8 pt-6 border-t border-white/10">
            <a
              href="#demo-form"
              className="w-full inline-flex items-center justify-center gap-2 bg-[#00E5FF] hover:bg-[#00E5FF]/90 text-black py-4 px-6 rounded-xl text-xs font-mono font-black tracking-wider transition-all shadow-[0_0_20px_rgba(0,229,255,0.4)] hover:shadow-[0_0_30px_rgba(0,229,255,0.6)]"
            >
              <span>SOLICITAR KIT KIOSKO PRO</span>
              <ArrowRight className="w-4 h-4 text-black" />
            </a>
          </div>
        </div>
      </div>

      {/* Pantallas adicionales & Nota de hardware */}
      <div className="mt-12 max-w-4xl mx-auto bg-[#070B14]/80 p-6 rounded-2xl border border-white/10 text-center">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-xs font-mono text-slate-300">
          <div className="flex items-center gap-2">
            <Monitor className="w-4 h-4 text-[#00E5FF]" />
            <span><strong>Pantallas Adicionales:</strong> Solo costo de hardware + <strong>$10.99 USD / mes</strong></span>
          </div>
          <span className="hidden sm:inline text-slate-600">•</span>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#00E5FF]" />
            <span><strong>Instalación Presencial:</strong> Disponible en Tampa, St. Petersburg, Orlando y Florida Central</span>
          </div>
        </div>
      </div>
    </div>
  );
}
