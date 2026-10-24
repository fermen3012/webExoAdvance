import React from "react";
import { Check, X, ShieldAlert, Sparkles } from "lucide-react";

const comparisonRows = [
  {
    feature: "Comisión extra por transacción cobrada por el POS",
    orderpoint: "0% (Conserva el 100% de tus ventas)",
    toast: "2.49% a 3.49% + 15¢ por transacción",
    clover: "2.3% a 3.5% + tarifas de procesamiento",
    square: "2.6% a 3.3% + 10¢ - 15¢ por transacción",
  },
  {
    feature: "Costo de Hardware por Terminal / Kiosko",
    orderpoint: "Kit Llave en Mano $799 (Samsung 11\") o $0 BYOD",
    toast: "$1,400 a $2,200 por terminal propietaria",
    clover: "$1,300 a $1,800 por estación Clover Station",
    square: "$799 a $1,200 por terminal Square Register",
  },
  {
    feature: "Libertad de Hardware (BYOD)",
    orderpoint: "Total (Usa iPhone, Android o tablets Samsung)",
    toast: "Bloqueado (Solo hardware cerrado Toast)",
    clover: "Bloqueado (Solo hardware cerrado Clover)",
    square: "Parcial (Solo iPad o terminales Square)",
  },
  {
    feature: "Contratos Forzosos de Permanencia",
    orderpoint: "Cero contratos (Cancela cuando quieras)",
    toast: "Contratos de 2 a 3 años con penalizaciones",
    clover: "Contratos de 2 a 4 años mediante distribuidores",
    square: "Sin contrato formal",
  },
  {
    feature: "Kiosko de Autoservicio con Upselling Inteligente",
    orderpoint: "Incluido (+22% en ticket promedio)",
    toast: "Costo adicional costoso por terminal",
    clover: "Limitado vía apps de terceros",
    square: "No optimizado para autoservicio de restaurante",
  },
  {
    feature: "Pantalla de Cocina (KDS) en Tiempo Real",
    orderpoint: "Incluida (< 50ms de sincronización instantánea)",
    toast: "$25 - $50/mes por pantalla adicional",
    clover: "Requiere apps externas y licencias",
    square: "$20/mes por pantalla KDS",
  },
  {
    feature: "Instalación y Soporte Directo en Florida",
    orderpoint: "Presencial en tu local en 24-48h por ingenieros",
    toast: "Llamadas remotas de call center genérico",
    clover: "Intermediarios bancarios y soporte tercerizado",
    square: "Solo soporte telefónico / chat estándar",
  },
];

export function OrderpointComparison() {
  return (
    <div className="w-full">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <span className="text-xs font-mono font-bold text-[#00E5FF] tracking-[0.2em] uppercase">
          COMPARATIVA DE MERCADO B2B
        </span>
        <h2 className="text-3xl sm:text-5xl font-black text-white mt-2 font-sans uppercase">
          OrderPoint vs El Resto del Mercado
        </h2>
        <p className="text-sm sm:text-base text-[#64748B] mt-4">
          Compara punto a punto por qué los dueños de restaurantes en Florida están reemplazando sus sistemas cerrados por OrderPoint.
        </p>
      </div>

      <div className="overflow-x-auto pb-4">
        <table className="w-full min-w-[760px] text-left border-collapse">
          <thead>
            <tr className="border-b border-white/10">
              <th className="py-4 px-4 text-xs font-mono font-bold text-slate-400 uppercase w-2/6">
                Característica Clave
              </th>
              <th className="py-4 px-4 text-xs font-mono font-black text-[#00E5FF] uppercase bg-[#1E3A8A]/30 border-x border-t border-[#00E5FF]/40 rounded-t-xl w-1/4">
                <div className="flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-[#00E5FF]" />
                  <span>ORDERPOINT</span>
                </div>
              </th>
              <th className="py-4 px-4 text-xs font-mono font-bold text-slate-300 uppercase w-1/6">
                Toast POS
              </th>
              <th className="py-4 px-4 text-xs font-mono font-bold text-slate-300 uppercase w-1/6">
                Clover POS
              </th>
              <th className="py-4 px-4 text-xs font-mono font-bold text-slate-300 uppercase w-1/6">
                Square POS
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 font-sans text-xs sm:text-sm">
            {comparisonRows.map((row, idx) => (
              <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                <td className="py-4 px-4 font-semibold text-white">
                  {row.feature}
                </td>
                <td className="py-4 px-4 font-bold text-[#00E5FF] bg-[#1E3A8A]/15 border-x border-[#00E5FF]/20">
                  <div className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#00E5FF] shrink-0 mt-0.5" />
                    <span>{row.orderpoint}</span>
                  </div>
                </td>
                <td className="py-4 px-4 text-[#64748B]">
                  {row.toast}
                </td>
                <td className="py-4 px-4 text-[#64748B]">
                  {row.clover}
                </td>
                <td className="py-4 px-4 text-[#64748B]">
                  {row.square}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
