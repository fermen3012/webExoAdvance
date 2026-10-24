import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  ShieldAlert,
  ShieldCheck,
  Check,
  X,
  TrendingUp,
  DollarSign,
  AlertTriangle,
  ArrowRight,
  PhoneCall,
  MapPin,
  Sparkles,
  HelpCircle,
  Tablet,
  Layers,
  ChevronRight,
} from "lucide-react";
import { ContactForm } from "@/components/sections/contact-form";
import { OrderpointCalculator } from "@/components/sections/orderpoint-calculator";

export const metadata: Metadata = {
  title: "OrderPoint vs Toast POS: Comparativa de Precios y Comisiones (2026)",
  description:
    "Compara OrderPoint vs Toast POS en 2026. Descubre por qué los restaurantes en Florida eligen OrderPoint: 0% comisiones extras por venta, hardware Samsung abierto y sin contratos forzosos.",
  keywords: [
    "OrderPoint vs Toast POS",
    "Toast POS alternative zero commission",
    "Toast POS pricing breakdown 2026",
    "Clover vs Toast alternative",
    "Toast POS contract cancellation",
    "Restaurant POS without contract Florida",
    "Kiosko de autoservicio vs Toast Flex",
    "OrderPoint review",
  ],
  alternates: {
    canonical: "https://www.exoadvancellc.com/orderpoint-vs-toast",
  },
  openGraph: {
    title: "OrderPoint vs Toast POS: La Comparativa de Costos Reales (2026)",
    description:
      "Ahorra hasta $15,000/año eliminando las tarifas ocultas y comisiones forzadas de Toast. Hardware libre Samsung, 0% comisiones y soporte local en Florida.",
    url: "https://www.exoadvancellc.com/orderpoint-vs-toast",
    type: "article",
  },
};

const comparisonMatrix = [
  {
    feature: "Comisión extra retenida por el proveedor POS",
    toast: "2.49% a 3.49% + 15¢ obligatorios por cada cobro",
    orderpoint: "0% (Tú conservas el 100% de tus ventas netas)",
    winner: "orderpoint",
  },
  {
    feature: "Contratos legales de permanencia",
    toast: "2 a 3 años de contrato con costosas penalizaciones",
    orderpoint: "Cero contratos forzosos. Cancela cuando quieras sin multa",
    winner: "orderpoint",
  },
  {
    feature: "Costo de Hardware por Terminal / Estación",
    toast: "$1,400 a $2,200 por terminal Toast Flex propietaria",
    orderpoint: "$799 Kit Llave en Mano (Samsung 11\") o $0 BYOD",
    winner: "orderpoint",
  },
  {
    feature: "Libertad de Procesador de Pagos (Merchant)",
    toast: "Bloqueado exclusivamente al procesador Toast",
    orderpoint: "Libertad total: mantén tu procesador o elige el más barato",
    winner: "orderpoint",
  },
  {
    feature: "Dispositivos para Saloneros / Meseros",
    toast: "$600 a $800 por dispositivo móvil Toast Go",
    orderpoint: "$0 BYOD: Cualquier iPhone o Android sirve como comandero",
    winner: "orderpoint",
  },
  {
    feature: "Pantalla de Cocina (KDS) en Tiempo Real",
    toast: "Cobro recurrente adicional de $25 a $50/mes por pantalla",
    orderpoint: "Incluida en el plan base con latencia < 50ms",
    winner: "orderpoint",
  },
  {
    feature: "Kiosko de Autoservicio con Upselling (+22%)",
    toast: "Hardware especial costoso + add-on mensual",
    orderpoint: "Kit Samsung 11\" blindado con upselling inteligente incluido",
    winner: "orderpoint",
  },
  {
    feature: "Soporte Técnico Presencial en Florida",
    toast: "Llamadas remotas de call center y esperas telefónicas",
    orderpoint: "Atención directa de fundadores e ingenieros en tu local",
    winner: "orderpoint",
  },
];

const faqs = [
  {
    q: "¿Puedo migrar de Toast a OrderPoint sin interrumpir la operación de mi restaurante?",
    a: "Sí. Realizamos la transición en menos de 24 a 48 horas sin detener tu cocina ni tu servicio de sala. Nuestro equipo carga todo tu menú, categorías, modificadores y plano de mesas en paralelo.",
  },
  {
    q: "¿Qué sucede con mis terminales actuales de Toast si me cambio?",
    a: "Toast bloquea su hardware mediante software cautivo para que no funcione con otros sistemas. Sin embargo, con OrderPoint no necesitas reinvertir miles de dólares: nuestro kit completo de Kiosko Samsung de 11 pulgadas cuesta solo $799 USD (o $0 en hardware usando tus propios teléfonos para saloneros). El ahorro en comisiones del primer mes paga prácticamente todo el cambio.",
  },
  {
    q: "¿OrderPoint cobra algún tipo de comisión por transacción oculta?",
    a: "Absolutamente 0%. OrderPoint cobra una tarifa fija y transparente de $99 USD al mes de software. No tocamos ni un solo centavo de tus ingresos por comensal, tarjeta o pedido.",
  },
  {
    q: "¿Tengo que cambiar mi banco o procesador de pagos actual?",
    a: "No. Esa es una de las mayores ventajas frente a Toast. En OrderPoint eres dueño de tu dinero: puedes procesar con tu banco de preferencia, Stripe, Square, Clover o cualquier pasarela que te ofrezca la tasa más competitiva del mercado.",
  },
  {
    q: "¿En qué consiste la demostración presencial de 10 minutos en Florida?",
    a: "Si estás ubicado en Tampa Bay, San Petersburgo, Clearwater, Brandon, Lakeland u Orlando, nuestro fundador Fernando Mendoza lleva el Kiosko físico a tu restaurante. Te mostramos en 10 minutos cómo toma la comanda, cómo imprime y cómo se sincroniza con la cocina sin compromiso de compra.",
  },
];

export default function OrderpointVsToastPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "headline": "OrderPoint vs Toast POS: Comparativa de Costos, Comisiones y Hardware 2026",
        "description": "Análisis comparativo exhaustivo entre OrderPoint y Toast POS. Desglose de comisiones ocultas, costos de terminales y modelo sin contratos en Florida.",
        "author": {
          "@type": "Organization",
          "name": "Exo Advance LLC",
          "url": "https://www.exoadvancellc.com",
        },
        "publisher": {
          "@type": "Organization",
          "name": "Exo Advance LLC",
          "logo": {
            "@type": "ImageObject",
            "url": "https://www.exoadvancellc.com/favicon.ico",
          },
        },
        "datePublished": "2026-10-24",
        "dateModified": "2026-10-24",
        "mainEntityOfPage": "https://www.exoadvancellc.com/orderpoint-vs-toast",
      },
      {
        "@type": "FAQPage",
        "mainEntity": faqs.map((faq) => ({
          "@type": "Question",
          "name": faq.q,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.a,
          },
        })),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="min-h-screen text-white pt-32 pb-24 selection:bg-[#00E5FF] selection:text-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* BREADCRUMB */}
          <nav className="flex items-center gap-2 text-xs font-mono text-[#64748B] mb-8">
            <Link href="/" className="hover:text-white transition-colors">
              Inicio
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
            <Link href="/orderpoint" className="hover:text-[#00E5FF] transition-colors">
              OrderPoint
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
            <span className="text-[#00E5FF]">vs Toast POS</span>
          </nav>

          {/* HERO SECTION */}
          <div className="text-center max-w-4xl mx-auto mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1E3A8A]/50 border border-[#00E5FF]/40 text-[#00E5FF] font-mono text-xs font-semibold mb-6 shadow-[0_0_20px_rgba(0,229,255,0.2)]">
              <Sparkles className="w-4 h-4 text-[#00E5FF]" /> GUÍA COMPARATIVA DE COSTOS REALES 2026
            </div>

            <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white font-sans uppercase leading-tight">
              ORDERPOINT <span className="text-[#00E5FF]">VS</span> TOAST POS
            </h1>

            <p className="text-xl sm:text-2xl font-mono text-[#00E5FF] mt-4 font-bold">
              La Verdadera Comparativa Financiera que Toast No Quiere que Leas
            </p>

            <p className="text-base sm:text-lg text-slate-300 mt-6 max-w-3xl mx-auto leading-relaxed">
              ¿Cansado de contratos forzosos a 3 años, terminales bloqueadas de $1,800 y comisiones del 3.5% que devoran tu margen? Descubre por qué los restauranteros en Florida están sustituyendo Toast por OrderPoint.
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="#demo-form"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#00E5FF] hover:bg-[#00E5FF]/90 text-black font-black text-sm px-8 py-4 rounded-xl shadow-[0_0_25px_rgba(0,229,255,0.4)] hover:shadow-[0_0_35px_rgba(0,229,255,0.6)] transition-all group"
              >
                <span>AGENDAR DEMO DE 10 MIN EN FLORIDA</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href="#comparativa-directa"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#1E3A8A]/50 hover:bg-[#1E3A8A] text-white border border-[#00E5FF]/40 px-6 py-4 rounded-xl text-sm font-mono font-semibold transition-all"
              >
                <span>VER MATRIZ COMPARATIVA</span>
              </a>
            </div>
          </div>

          {/* FINANCIAL SMACKDOWN: REAL DOLLAR COMPARISON CARD */}
          <div className="glass-card p-8 sm:p-12 rounded-3xl border-2 border-[#00E5FF]/30 mb-24 relative overflow-hidden bg-gradient-to-b from-[#1E3A8A]/20 via-[#070B14] to-[#070B14]">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="text-xs font-mono font-bold text-[#00E5FF] tracking-[0.2em] uppercase">
                CASO DE ESTUDIO REAL EN FLORIDA
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-white mt-2 font-sans uppercase">
                Restaurante Promedio: $45,000 USD / mes en Ventas con Tarjeta
              </h2>
              <p className="text-sm text-slate-400 mt-2">
                Comparativa de costos anuales reales con 2 terminales y comanderos de sala.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
              {/* Toast Card */}
              <div className="bg-[#0A0F1A]/90 p-8 rounded-2xl border border-red-500/30 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-xl font-black font-sans text-red-400">TOAST POS</span>
                    <span className="text-xs font-mono bg-red-950/60 text-red-300 border border-red-500/30 px-3 py-1 rounded-full">
                      SISTEMA CERRADO
                    </span>
                  </div>

                  <div className="space-y-4 font-mono text-xs">
                    <div className="flex justify-between pb-3 border-b border-white/5">
                      <span className="text-slate-400">Comisión por procesamiento (2.9% + 15¢):</span>
                      <span className="text-white font-bold">$16,380 USD / año</span>
                    </div>
                    <div className="flex justify-between pb-3 border-b border-white/5">
                      <span className="text-slate-400">2 Terminales propietarias Toast Flex:</span>
                      <span className="text-white font-bold">$3,200 USD (Cautivo)</span>
                    </div>
                    <div className="flex justify-between pb-3 border-b border-white/5">
                      <span className="text-slate-400">Software mensual ($110/mo x 2):</span>
                      <span className="text-white font-bold">$2,640 USD / año</span>
                    </div>
                    <div className="flex justify-between pb-3 border-b border-white/5">
                      <span className="text-slate-400">KDS y add-ons de cocina:</span>
                      <span className="text-white font-bold">$600 USD / año</span>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-red-500/30">
                  <span className="text-xs font-mono text-red-300 uppercase block">Costo Total Estimado Año 1</span>
                  <div className="text-4xl font-black font-mono text-red-400 mt-1">
                    ~$22,820 <span className="text-sm font-sans text-slate-400">USD</span>
                  </div>
                  <p className="text-[11px] text-[#64748B] mt-2">
                    * Además de quedar atado a un contrato legal de permanencia a 3 años.
                  </p>
                </div>
              </div>

              {/* OrderPoint Card */}
              <div className="bg-gradient-to-b from-[#1E3A8A]/40 via-[#070B14] to-[#070B14] p-8 rounded-2xl border-2 border-[#00E5FF] flex flex-col justify-between shadow-[0_0_35px_rgba(0,229,255,0.25)] relative">
                <div className="absolute top-0 right-8 bg-[#00E5FF] text-black font-mono font-black text-[10px] px-3.5 py-1 rounded-b-md uppercase tracking-wider">
                  GANADOR EN RENTABILIDAD
                </div>

                <div>
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-xl font-black font-sans text-[#00E5FF]">ORDERPOINT</span>
                    <span className="text-xs font-mono bg-[#00E5FF]/20 text-[#00E5FF] border border-[#00E5FF]/40 px-3 py-1 rounded-full">
                      0% COMISIÓN
                    </span>
                  </div>

                  <div className="space-y-4 font-mono text-xs">
                    <div className="flex justify-between pb-3 border-b border-white/10">
                      <span className="text-slate-300">Comisión extra OrderPoint:</span>
                      <span className="text-[#00E5FF] font-black">$0 USD (0%)</span>
                    </div>
                    <div className="flex justify-between pb-3 border-b border-white/10">
                      <span className="text-slate-300">1 Kit Kiosko Pro 11&quot; + BYOD camareros:</span>
                      <span className="text-white font-bold">$799 USD (Samsung Libre)</span>
                    </div>
                    <div className="flex justify-between pb-3 border-b border-white/10">
                      <span className="text-slate-300">Software mensual plano ($99/mo):</span>
                      <span className="text-white font-bold">$1,188 USD / año</span>
                    </div>
                    <div className="flex justify-between pb-3 border-b border-white/10">
                      <span className="text-slate-300">Pantalla de Cocina KDS en tiempo real:</span>
                      <span className="text-[#00E5FF] font-bold">INCLUIDA ($0)</span>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-[#00E5FF]/40">
                  <div className="flex items-baseline justify-between">
                    <div>
                      <span className="text-xs font-mono text-[#00E5FF] uppercase block">Costo Total Año 1</span>
                      <div className="text-4xl font-black font-mono text-white mt-1">
                        ~$1,987 <span className="text-sm font-sans text-slate-400">USD</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-mono text-emerald-400 uppercase block">Ahorro Neto Estimado</span>
                      <div className="text-3xl font-black font-mono text-emerald-400 mt-1">
                        +$20,833 <span className="text-xs font-sans text-emerald-300">/ año</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-[11px] text-slate-300 mt-3">
                    Conserva tu propio procesador de pagos bancario y cancela cuando quieras sin penalización.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* THE 3 TRAPS OF TOAST */}
          <div className="mb-24">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <span className="text-xs font-mono font-bold text-red-400 tracking-[0.2em] uppercase flex items-center justify-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-red-400" /> ANÁLISIS DE RIESGO
              </span>
              <h2 className="text-3xl sm:text-5xl font-black text-white mt-2 font-sans uppercase">
                Las 3 Trampas Ocultas del Modelo de Toast
              </h2>
              <p className="text-sm sm:text-base text-[#64748B] mt-4">
                Lo que los representantes comerciales de Toast no mencionan durante la firma del contrato.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="glass-card p-8 rounded-3xl border border-red-500/20 bg-[#070B14]/70">
                <div className="w-12 h-12 rounded-xl bg-red-950/50 border border-red-500/30 flex items-center justify-center text-red-400 mb-6 font-mono font-bold text-lg">
                  01
                </div>
                <h3 className="text-xl font-bold text-white font-sans">El Cerrojo del Procesador Forzado</h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-3 leading-relaxed">
                  Toast te prohíbe usar tu propio procesador de pagos. Si encuentras un banco local con comisiones más bajas, no puedes usarlo. Estás forzado a aceptar sus aumentos unilaterales de tasas.
                </p>
              </div>

              <div className="glass-card p-8 rounded-3xl border border-red-500/20 bg-[#070B14]/70">
                <div className="w-12 h-12 rounded-xl bg-red-950/50 border border-red-500/30 flex items-center justify-center text-red-400 mb-6 font-mono font-bold text-lg">
                  02
                </div>
                <h3 className="text-xl font-bold text-white font-sans">Hardware Propietario Inútil</h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-3 leading-relaxed">
                  Pagas entre $1,400 y $2,200 por cada terminal Toast Flex. Si en algún momento decides cancelar el servicio, ese hardware queda bloqueado y no puede ser reutilizado ni vendido a otros negocios.
                </p>
              </div>

              <div className="glass-card p-8 rounded-3xl border border-red-500/20 bg-[#070B14]/70">
                <div className="w-12 h-12 rounded-xl bg-red-950/50 border border-red-500/30 flex items-center justify-center text-red-400 mb-6 font-mono font-bold text-lg">
                  03
                </div>
                <h3 className="text-xl font-bold text-white font-sans">Contratos Forzosos a 3 Años</h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-3 leading-relaxed">
                  Toast exige firmas de permanencia con cláusulas draconianas de cancelación anticipada que pueden costarte miles de dólares en indemnizaciones legales si decides migrar antes de tiempo.
                </p>
              </div>
            </div>
          </div>

          {/* INTERACTIVE CALCULATOR EMBED */}
          <div className="mb-24">
            <OrderpointCalculator />
          </div>

          {/* DETAILED HEAD-TO-HEAD MATRIX */}
          <div id="comparativa-directa" className="mb-24">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="text-xs font-mono font-bold text-[#00E5FF] tracking-[0.2em] uppercase">
                MATRIZ CARACTERÍSTICA POR CARACTERÍSTICA
              </span>
              <h2 className="text-3xl sm:text-5xl font-black text-white mt-2 font-sans uppercase">
                Comparativa Detallada de Capacidades
              </h2>
            </div>

            <div className="overflow-x-auto pb-4">
              <table className="w-full min-w-[700px] text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="py-4 px-4 text-xs font-mono font-bold text-slate-400 uppercase w-2/5">
                      Característica
                    </th>
                    <th className="py-4 px-4 text-xs font-mono font-bold text-red-400 uppercase w-3/10 bg-red-950/20 border-l border-red-500/20">
                      Toast POS
                    </th>
                    <th className="py-4 px-4 text-xs font-mono font-black text-[#00E5FF] uppercase w-3/10 bg-[#1E3A8A]/30 border-x border-t border-[#00E5FF]/40 rounded-t-xl">
                      OrderPoint POS
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 font-sans text-xs sm:text-sm">
                  {comparisonMatrix.map((item, idx) => (
                    <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-4 px-4 font-semibold text-white">
                        {item.feature}
                      </td>
                      <td className="py-4 px-4 text-slate-400 bg-red-950/10 border-l border-red-500/10">
                        <div className="flex items-start gap-2">
                          <X className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                          <span>{item.toast}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4 font-bold text-[#00E5FF] bg-[#1E3A8A]/15 border-x border-[#00E5FF]/20">
                        <div className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-[#00E5FF] shrink-0 mt-0.5" />
                          <span>{item.orderpoint}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* FLORIDA LOCAL DEMO BANNER */}
          <div className="glass-card p-8 sm:p-12 rounded-3xl border-2 border-[#00E5FF]/40 mb-24 bg-gradient-to-r from-[#1E3A8A]/40 via-[#070B14] to-[#1E3A8A]/30">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00E5FF]/10 border border-[#00E5FF]/40 text-[#00E5FF] font-mono text-xs font-semibold mb-4">
                  <MapPin className="w-3.5 h-3.5" /> DEMOSTRACIÓN FÍSICA EN FLORIDA
                </div>
                <h2 className="text-2xl sm:text-4xl font-black text-white font-sans uppercase">
                  Comprueba la Diferencia en tu Propio Restaurante
                </h2>
                <p className="text-sm sm:text-base text-slate-300 mt-3 leading-relaxed">
                  Llevamos el Kiosko Pro de 11 pulgadas hasta tu restaurante en Tampa Bay, San Petersburgo, Clearwater u Orlando. En solo 10 minutos verás cómo funciona la velocidad de comanda y el upselling automático sin interrumpir tu operación.
                </p>
                <div className="mt-6 flex flex-wrap items-center gap-4 text-xs font-mono text-slate-300">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#00E5FF]" />
                    <span>0% Comisiones por Venta</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#00E5FF]" />
                    <span>Hardware Comercial Samsung®</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#00E5FF]" />
                    <span>Sin Contratos Obligatorios</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-4 flex flex-col items-center justify-center bg-[#070B14]/80 p-6 rounded-2xl border border-white/10 text-center">
                <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                  Contacto Directo Fundadores
                </span>
                <span className="text-lg font-bold text-white mt-1">Fernando Mendoza</span>
                <a
                  href="tel:+17273072089"
                  className="mt-3 inline-flex items-center gap-2 text-[#00E5FF] hover:text-white font-mono font-bold text-base transition-colors"
                >
                  <PhoneCall className="w-4 h-4" />
                  (727) 307-2089
                </a>
                <a
                  href="#demo-form"
                  className="mt-4 w-full inline-flex items-center justify-center gap-2 bg-[#00E5FF] hover:bg-[#00E5FF]/90 text-black text-xs font-mono font-black py-3 px-4 rounded-xl transition-all shadow-[0_0_15px_rgba(0,229,255,0.3)]"
                >
                  SOLICITAR DEMO LOCAL
                </a>
              </div>
            </div>
          </div>

          {/* CONTACT FORM SECTION */}
          <div id="demo-form" className="mb-24 pt-8">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="text-xs font-mono font-bold text-[#00E5FF] tracking-[0.2em] uppercase">
                COMIENZA HOY MISMO
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-white font-sans uppercase mt-2">
                Migra a OrderPoint o Prueba una Demo
              </h2>
              <p className="text-sm text-[#64748B] mt-2">
                Completa el formulario y nuestra asesora comercial Karen Mendoza se pondrá en contacto contigo de inmediato para coordinar tu prueba.
              </p>
            </div>
            <ContactForm defaultService="OrderPoint POS & Kiosk" />
          </div>

          {/* FAQS SECTION */}
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <span className="text-xs font-mono font-bold text-[#00E5FF] tracking-[0.2em] uppercase">
                PREGUNTAS FRECUENTES
              </span>
              <h2 className="text-3xl font-black text-white font-sans uppercase mt-2">
                Dudas Comunes sobre el Cambio de Toast
              </h2>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, idx) => (
                <div
                  key={idx}
                  className="glass-card p-6 rounded-2xl border border-white/10 hover:border-[#00E5FF]/30 transition-all bg-[#070B14]/70"
                >
                  <h3 className="text-base font-bold text-white flex items-start gap-3">
                    <HelpCircle className="w-5 h-5 text-[#00E5FF] shrink-0 mt-0.5" />
                    <span>{faq.q}</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 mt-3 pl-8 leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
