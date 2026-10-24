import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  Utensils,
  Tablet,
  CheckCircle2,
  ShieldCheck,
  TrendingUp,
  Clock,
  Sparkles,
  ArrowRight,
  PhoneCall,
  MapPin,
  HelpCircle,
  Layers,
  Zap,
} from "lucide-react";
import { ContactForm } from "@/components/sections/contact-form";
import { OrderpointCalculator } from "@/components/sections/orderpoint-calculator";
import { OrderpointComparison } from "@/components/sections/orderpoint-comparison";
import { OrderpointPricing } from "@/components/sections/orderpoint-pricing";

export const metadata: Metadata = {
  title: "OrderPoint | Restaurant Cloud POS & Self-Service Kiosks Florida",
  description:
    "OrderPoint Restaurant Cloud POS & 11\" Self-Service Kiosks. 0% transaction commission, no binding contracts, Samsung hardware, and live 10-minute on-site demos in Florida.",
  keywords: [
    "OrderPoint",
    "OrderPoint Restaurant POS",
    "Kiosko de autoservicio restaurante Florida",
    "Toast POS alternative zero commission",
    "Clover POS alternative",
    "Restaurant Cloud POS",
    "Self-service kiosk Tampa Miami",
    "Kitchen Display System KDS",
    "Exo Advance restaurant technology",
  ],
  alternates: {
    canonical: "https://www.exoadvancellc.com/orderpoint",
  },
  openGraph: {
    title: "OrderPoint | Cloud POS & Self-Service Kiosk for Restaurants",
    description:
      "Boost average order value by +22% and eliminate order bottlenecks with OrderPoint. 0% commission, Samsung hardware, no long-term contracts.",
    url: "https://www.exoadvancellc.com/orderpoint",
    type: "website",
  },
};

const faqs = [
  {
    q: "¿Tengo que cambiar mi procesador de pagos o banco actual?",
    a: "No. En OrderPoint no te obligamos a procesar con un banco exclusivo ni cobramos comisiones extras por transacción. Puedes mantener tu procesador actual o elegir el que mejores tasas te ofrezca.",
  },
  {
    q: "¿Existen contratos forzosos de permanencia a 2 o 3 años?",
    a: "Cero ataduras. El servicio es mensual ($99 USD/mes) y puedes cancelar cuando desees sin penalizaciones. Creemos en retenerte por la calidad del software, no por un contrato legal.",
  },
  {
    q: "¿Qué sucede si se cae la conexión a internet en el restaurante?",
    a: "OrderPoint cuenta con arquitectura resiliente con respaldo local activo: tus saloneros pueden seguir enviando comandas a la cocina y el kiosko almacena pedidos en cola para sincronizarse automáticamente apenas regrese la red.",
  },
  {
    q: "¿En qué consiste la demo presencial de 10 minutos en Florida?",
    a: "Si tu restaurante está en Tampa Bay, San Petersburgo, Clearwater, Orlando o Florida Central, nuestro fundador Fernando Mendoza lleva el kiosko físico de 11 pulgadas a tu local. En solo 10 minutos verás cómo funciona en vivo, sin interrumpir tu servicio.",
  },
  {
    q: "¿Cuánto tiempo toma la instalación y digitalización del menú?",
    a: "Tu sistema puede estar 100% operativo en 24 a 48 horas. Nuestro equipo técnico digitaliza todo tu menú con fotos, modificadores, extras, precios y diagrama de mesas.",
  },
  {
    q: "¿Puedo usar mis propios teléfonos o tablets para los saloneros?",
    a: "Sí. OrderPoint soporta el modelo BYOD (Bring Your Own Device). Cualquier teléfono iPhone o Android sirve como comandero de mano para tus saloneros sin costo adicional de hardware.",
  },
];

export default function OrderpointPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "name": "OrderPoint Restaurant Cloud POS & Kiosk",
        "operatingSystem": "Android, iOS, Web",
        "applicationCategory": "BusinessApplication",
        "offers": {
          "@type": "Offer",
          "price": "99.00",
          "priceCurrency": "USD",
          "priceSpecification": {
            "@type": "UnitPriceSpecification",
            "price": "99.00",
            "priceCurrency": "USD",
            "unitText": "MONTH",
          },
        },
        "description": "Operating system and self-service kiosks for modern restaurants. 0% extra commissions, BYOD support, KDS kitchen screens, and Samsung 11-inch hardware.",
      },
      {
        "@type": "LocalBusiness",
        "name": "Exo Advance LLC - OrderPoint Division",
        "telephone": "+1-727-307-2089",
        "email": "contact@exoadvancellc.com",
        "url": "https://www.exoadvancellc.com/orderpoint",
        "areaServed": {
          "@type": "State",
          "name": "Florida",
        },
        "address": {
          "@type": "PostalAddress",
          "addressRegion": "FL",
          "addressCountry": "US",
        },
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
          {/* HERO SECTION */}
          <div className="text-center max-w-4xl mx-auto mb-20">
            {/* Florida Demo & Flagship Badge */}
            <div className="inline-flex flex-wrap items-center justify-center gap-2 px-4 py-2 rounded-full bg-[#1E3A8A]/50 border border-[#00E5FF]/40 text-[#00E5FF] font-mono text-xs font-semibold mb-6 shadow-[0_0_20px_rgba(0,229,255,0.2)]">
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#00E5FF]" /> FLAGSHIP RESTAURANT CLOUD OS
              </span>
              <span className="text-slate-500">•</span>
              <span className="flex items-center gap-1 text-white">
                <MapPin className="w-3.5 h-3.5 text-[#00E5FF]" /> DEMO EN VIVO EN FLORIDA
              </span>
            </div>

            <h1 className="text-5xl sm:text-7xl font-black tracking-tight text-white font-sans uppercase">
              ORDER<span className="text-[#00E5FF]">POINT</span>
            </h1>

            <p className="text-xl sm:text-3xl font-mono text-[#00E5FF] mt-3 font-bold">
              Kioskos de Autoservicio & POS Cloud para Restaurantes
            </p>

            <p className="text-base sm:text-lg text-slate-300 mt-6 max-w-3xl mx-auto leading-relaxed">
              Aumenta tu ticket promedio <strong className="text-white font-bold">+22%</strong> con ventas sugeridas, elimina las filas en mostrador y ahorra miles de dólares al año: <strong className="text-[#00E5FF]">0% comisiones por transacción</strong>, sin contratos obligatorios y con hardware comercial Samsung®.
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
                href="#calculator"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#1E3A8A]/50 hover:bg-[#1E3A8A] text-white border border-[#00E5FF]/40 px-6 py-4 rounded-xl text-sm font-mono font-semibold transition-all"
              >
                <span>CALCULAR MI AHORRO VS TOAST</span>
              </a>
            </div>

            {/* Value Trust Anchors */}
            <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono text-slate-300 max-w-3xl mx-auto">
              <div className="p-3 bg-[#070B14] rounded-xl border border-white/10 flex items-center justify-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#00E5FF]" />
                <span>0% Comisión</span>
              </div>
              <div className="p-3 bg-[#070B14] rounded-xl border border-white/10 flex items-center justify-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#00E5FF]" />
                <span>Sin Contratos</span>
              </div>
              <div className="p-3 bg-[#070B14] rounded-xl border border-white/10 flex items-center justify-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#00E5FF]" />
                <span>Samsung® 11&quot;</span>
              </div>
              <div className="p-3 bg-[#070B14] rounded-xl border border-white/10 flex items-center justify-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#00E5FF]" />
                <span>Soporte Local</span>
              </div>
            </div>
          </div>

          {/* HARDWARE BREAKDOWN SHOWCASE */}
          <div className="glass-card p-8 sm:p-12 rounded-3xl border border-[#00E5FF]/30 mb-24">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs font-mono font-bold text-[#00E5FF] tracking-[0.2em] uppercase">
                EQUIPAMIENTO DE ALTO RENDIMIENTO
              </span>
              <h2 className="text-3xl font-black text-white mt-2 font-sans uppercase">
                Kit Kiosko Pro 11&quot; &amp; Ecosistema Móvil
              </h2>
              <p className="text-sm text-[#64748B] mt-2">
                Diseñado para operar en ambientes de alto tráfico: cocinas exigentes y mostradores rápidos.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-[#070B14] p-6 rounded-2xl border border-white/10 hover:border-[#00E5FF]/40 transition-all">
                <div className="w-12 h-12 rounded-xl bg-[#1E3A8A]/50 border border-[#00E5FF]/30 flex items-center justify-center text-[#00E5FF] mb-4">
                  <Tablet className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white font-sans">Samsung Galaxy Tab A9+ 11&quot;</h3>
                <p className="text-xs text-[#64748B] mt-2 leading-relaxed">
                  Pantalla táctil ultra-brillante de 11 pulgadas. Fluidez total para que tus comensales armen sus combos en segundos.
                </p>
              </div>

              <div className="bg-[#070B14] p-6 rounded-2xl border border-white/10 hover:border-[#00E5FF]/40 transition-all">
                <div className="w-12 h-12 rounded-xl bg-[#1E3A8A]/50 border border-[#00E5FF]/30 flex items-center justify-center text-[#00E5FF] mb-4">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white font-sans">Soporte Blindado con Llave</h3>
                <p className="text-xs text-[#64748B] mt-2 leading-relaxed">
                  Carcasa de acero sólido de grado comercial. Máxima protección antivandálica con cerradura física para tu mostrador.
                </p>
              </div>

              <div className="bg-[#070B14] p-6 rounded-2xl border border-white/10 hover:border-[#00E5FF]/40 transition-all">
                <div className="w-12 h-12 rounded-xl bg-[#1E3A8A]/50 border border-[#00E5FF]/30 flex items-center justify-center text-[#00E5FF] mb-4">
                  <Zap className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white font-sans">Impresora Térmica 80mm</h3>
                <p className="text-xs text-[#64748B] mt-2 leading-relaxed">
                  Disparo de tickets de pago y comandas de cocina a alta velocidad. Cero cartuchos de tinta requeridos.
                </p>
              </div>

              <div className="bg-[#070B14] p-6 rounded-2xl border border-white/10 hover:border-[#00E5FF]/40 transition-all">
                <div className="w-12 h-12 rounded-xl bg-[#1E3A8A]/50 border border-[#00E5FF]/30 flex items-center justify-center text-[#00E5FF] mb-4">
                  <Layers className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white font-sans">Comandero BYOD Móvil</h3>
                <p className="text-xs text-[#64748B] mt-2 leading-relaxed">
                  Tus saloneros toman la orden en cualquier teléfono iPhone o Android y viaja en menos de 50ms directo a la cocina.
                </p>
              </div>
            </div>
          </div>

          {/* CALCULATOR SECTION */}
          <div className="mb-24">
            <OrderpointCalculator />
          </div>

          {/* COMPARISON SECTION */}
          <div className="mb-24">
            <OrderpointComparison />
          </div>

          {/* PRICING SECTION */}
          <div className="mb-24">
            <OrderpointPricing />
          </div>

          {/* FLORIDA LOCAL DEMO BANNER */}
          <div className="glass-card p-8 sm:p-12 rounded-3xl border-2 border-[#00E5FF]/40 mb-24 bg-gradient-to-r from-[#1E3A8A]/40 via-[#070B14] to-[#1E3A8A]/30">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00E5FF]/10 border border-[#00E5FF]/40 text-[#00E5FF] font-mono text-xs font-semibold mb-4">
                  <MapPin className="w-3.5 h-3.5" /> COBERTURA LOCAL DIRECTA EN FLORIDA
                </div>
                <h2 className="text-2xl sm:text-4xl font-black text-white font-sans uppercase">
                  Prueba el Kiosko Físico en tu Propio Local (10 Minutos)
                </h2>
                <p className="text-sm sm:text-base text-slate-300 mt-3 leading-relaxed">
                  ¿Tu restaurante está en Tampa Bay, San Petersburgo, Clearwater, Brandon o Florida Central? Llevamos el equipo de demostración hasta tu negocio. En 10 minutos verás la velocidad de comanda y el upselling automático sin interrumpir tus turnos de servicio.
                </p>
                <div className="mt-6 flex flex-wrap items-center gap-4 text-xs font-mono text-slate-300">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#00E5FF]" />
                    <span>Sin costo ni compromiso</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#00E5FF]" />
                    <span>Prueba con tus propios platillos</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#00E5FF]" />
                    <span>Atención directa de fundadores</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-4 flex flex-col items-center justify-center bg-[#070B14]/80 p-6 rounded-2xl border border-white/10 text-center">
                <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                  Contacto Directo en Florida
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
                  SOLICITAR VISITA LOCAL
                </a>
              </div>
            </div>
          </div>

          {/* CONTACT & LEAD CAPTURE FORM */}
          <div id="demo-form" className="mb-24 pt-8">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="text-xs font-mono font-bold text-[#00E5FF] tracking-[0.2em] uppercase">
                EMPIEZA HOY MISMO
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-white font-sans uppercase mt-2">
                Solicita tu Demostración de OrderPoint
              </h2>
              <p className="text-sm text-[#64748B] mt-2">
                Déjanos los datos de tu restaurante. Nuestra especialista comercial Karen Mendoza te responderá de inmediato y coordinaremos tu demostración.
              </p>
            </div>
            <ContactForm defaultService="OrderPoint POS & Kiosk" />
          </div>

          {/* FAQS SECTION */}
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <span className="text-xs font-mono font-bold text-[#00E5FF] tracking-[0.2em] uppercase">
                RESOLVEMOS TUS DUDAS
              </span>
              <h2 className="text-3xl font-black text-white font-sans uppercase mt-2">
                Preguntas Frecuentes de Restauranteros
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
