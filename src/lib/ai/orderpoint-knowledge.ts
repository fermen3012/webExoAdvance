/**
 * Official OrderPoint Product Knowledge Base (Exo Advance LLC)
 * Source: Official Product Flyer (Florida HQ)
 */

export const ORDERPOINT_DATA = {
  productName: "OrderPoint — Restaurant Cloud POS & Kiosk",
  tagline: "Elige la Solución Perfecta para Automatizar tu Restaurante",
  coreDifferentiators: [
    "0% Comisiones por pedido",
    "Sin contratos forzosos (Mes a mes)",
    "Modo Bilingüe Automático (Español e Inglés nativo para meseros y comensales)",
    "Cero filas en caja y cero carreras a la cocina",
    "Cocina 100% coordinada con KDS en vivo en milisegundos",
  ],
  packages: {
    salonYCocina: {
      name: "Módulo Salón & Cocina (Exo Server)",
      target: "Restaurantes con servicio a la mesa y meseros",
      setupPrice: 450,
      monthlyPrice: 99,
      hardwareCost: 0,
      hardwareModel: "Modelo BYOD ($0 en Hardware): Meseros usan sus propios teléfonos (iPhone o Android)",
      features: [
        "Pantalla de Cocina (KDS) en Vivo sincronizada en milisegundos con alertas visuales de comandas",
        "Mapeo de Mesas Interactivo con monitoreo de comandas activas y total acumulado por mesa",
        "Personalizador de Comandas con notas rápidas ('Sin Cebolla', 'Término Medio', 'Salsa Aparte')",
        "Digitalización 100% de tu Menú (cargamos fotos, precios, ingredientes y categorías por ti)",
        "Capacitación Presencial o en vivo para tu equipo de meseros y cocineros",
        "Hardware $0: Usa las tablets, TVs o teléfonos que ya tienes",
      ],
    },
    kioskoPro: {
      name: "Kiosko de Autoservicio Pro 11\"",
      target: "Mostrador, Fast Casual y pedidos rápidos",
      setupPrice: 799,
      monthlyPrice: 99,
      hardwareIncluded: [
        "Tablet Samsung Galaxy Tab A9+ 11\" HD (alta resistencia para jornadas continuas de 12h)",
        "Soporte Metálico Antirrobo blindado de acero con cerradura de llave para mostrador",
        "Impresora Térmica 80mm de alto flujo con auto-corte de papel de comandas y Bluetooth",
      ],
      features: [
        "Venta Sugerida Automática (+22% en ticket promedio al ofrecer extras y bebidas)",
        "Envío Directo a Cocina sincronizado a pantalla KDS o ticket impreso",
        "Hardware Industrial: El equipo es 100% tuyo sin rentas ni ataduras",
        "Opción BYOD Kiosko: solo $150 setup si el cliente ya tiene su propia tablet",
      ],
    },
    pantallasExtra: {
      monthlyPerScreen: 10.99,
      description: "Kioskos o pantallas KDS extra: Solo costo del hardware + $10.99 USD/mes por pantalla extra (sin cargos ocultos)",
    },
  },
  comparison: {
    cloverToastPrice: "$1,400 a $2,200 USD por cada terminal propietaria con contratos forzosos",
    orderpointAdvantage: "Hardware $0 para meseros (BYOD) o Kiosko completo $799 tuyo, 0% comisiones y sin permanencia",
  },
  directContact: {
    rep: "Fernando Mendoza",
    phone: "(727) 307-2089",
    email: "contact@exoadvancellc.com",
    territory: "Florida (Demostración presencial en tu restaurante o por videollamada)",
  },
};

export const ORDERPOINT_KNOWLEDGE_PROMPT_ES = `
BIBLIA DE PRODUCTO ORDERPOINT (EXO ADVANCE LLC):
- Producto: OrderPoint — Restaurant Cloud POS & Kiosk.
- Lema: "Sin contratos forzosos • 0% comisiones por pedido".
- Ahorro vs competencia: Terminales Clover/Toast cuestan $1,400 - $2,200 c/u con contratos obligatorios. En OrderPoint los meseros usan sus propios celulares ($0 hardware) y no hay contratos forzosos.
- Paquete 1: Módulo Salón & Cocina (Exo Server) para restaurantes con mesas. $450 Setup único + $99/mes. Hardware $0 (BYOD iPhone/Android). Pantalla de cocina KDS en vivo en milisegundos, mapeo interactivo de mesas, notas rápidas ("Sin cebolla"), digitalización 100% del menú y capacitación en vivo.
- Paquete 2: Kiosko de Autoservicio Pro 11" para mostrador/fast casual. $799 Kit Completo Llave en Mano + $99/mes. Incluye Samsung Galaxy Tab A9+ 11" HD, soporte metálico blindado antirrobo con llave e impresora térmica 80mm auto-corte. Venta sugerida automática (+22% en ticket promedio). Equipo 100% del cliente sin rentas. (Si ya tienen tablet, opción BYOD por solo $150 setup).
- Pantallas adicionales: Solo costo de hardware + $10.99/mes por pantalla extra.
- Modo Bilingüe Automático: Pantallas y comandas en Español e Inglés nativo.
- Cierre: Demo presencial en Florida en su propio restaurante de 10 minutos (o videollamada). Teléfono directo: (727) 307-2089.
`;

export const ORDERPOINT_KNOWLEDGE_PROMPT_EN = `
ORDERPOINT PRODUCT KNOWLEDGE BASE (EXO ADVANCE LLC):
- Product: OrderPoint — Restaurant Cloud POS & Kiosk.
- Tagline: "No mandatory contracts • 0% commissions per order".
- Savings vs competitors: Clover/Toast terminals cost $1,400 - $2,200 each with locked-in contracts. With OrderPoint, servers use their own phones ($0 hardware) and there are no contracts.
- Package 1: Dining Room & Kitchen Module (Exo Server) for table service. $450 one-time setup + $99/month. $0 Hardware (BYOD iPhone/Android). Live Kitchen KDS screen synced in milliseconds, interactive table mapping, quick modifier notes ("No onions", "Medium rare"), 100% menu digitization, and live staff training.
- Package 2: Self-Service Kiosk Pro 11" for counter & fast casual. $799 Complete Turnkey Kit + $99/month. Includes Samsung Galaxy Tab A9+ 11" HD tablet, armored steel anti-theft counter mount with key lock, and 80mm auto-cut thermal Bluetooth printer. Automated upsell (+22% higher average ticket). Industrial hardware 100% owned by the client with zero equipment rentals. (BYOD option available for only $150 setup if they already have a tablet).
- Extra screens: Hardware cost only + $10.99/month per extra screen.
- Automatic Bilingual Mode: Screens and kitchen tickets in native Spanish and English.
- Closing: 10-minute on-site live demo at their restaurant in Florida (or video call). Direct phone: (727) 307-2089.
`;
