# Regla Inquebrantable: Estética de App Nativa, Física de Movimiento (Emil Kowalski) & Cero Saturación
> Estándar de Diseño de Software SaaS & Web — Exo Advance

**Estado:** INQUEBRANTABLE (Core Invariant)

1. **Prohibidos los Diseños Genéricos de IA y la Saturación Visual:**
   - Queda estrictamente prohibido generar plantillas genéricas (ej. filas monótonas de 4 tarjetas KPI llenas de iconos chillones, gradientes morados/rosas típicos de IA o pantallas sobrecargadas de texto y bordes pesados).
   - **Regla de Aire y Revelación Progresiva:** Mantener al menos un 35% de espacio limpio (whitespace). Mostrar solo de 2 a 3 datos clave por bloque y ocultar detalles secundarios en *Drawers* laterales, *Bottom Sheets*, *Popovers* o *Command Palettes (`Cmd+K`)*.
   - **Paleta Desaturada y Elegante:** Usar superficies neutras refinadas (tonos grafito/obsidian profundos o marfil cálido) con bordes sutiles de `1px` (`border-white/[0.08]` o `border-black/[0.06]`) y **un solo color de acento intencional**, evitando colores primarios saturados por defecto.

2. **Física de Animación Rigurosa (Estándar Emil Kowalski):**
   - **Filtro de Frecuencia:** Acciones de alta frecuencia (atajos de teclado, abrir paleta `Cmd+K` tipo Raycast) se muestran instantáneamente (**`0ms`, cero animación** para no entorpecer la memoria muscular). Elementos ocasionales (modales, drawers) usan tiempos sub-300ms (`200ms–350ms`).
   - **Solo Propiedades GPU (120 FPS):** Animar **únicamente `transform` y `opacity`**. Prohibido animar `width`, `height`, `margin`, `padding`, `top` o `left` para evitar tirones de rendimiento (*layout thrashing*).
   - **Prohibición de `ease-in` y `transition: all`:** Prohibido usar `ease-in` en interfaces (retrasa la respuesta visual perceptible). Usar siempre curvas de desaceleración rápida o resortes (`cubic-bezier(0.16, 1, 0.3, 1)` o *Springs*). Especificar siempre la propiedad exacta (`transition-transform`, `transition-opacity`).
   - **Protección Móvil:** Desactivar hovers pegajosos en dispositivos táctiles mediante `@media (hover: hover) and (pointer: fine)`.
   - **Sensación Táctil:** Presión física inmediata en botones (`active:scale-[0.97]` en `100–160ms`) y paneles translúcidos con `backdrop-blur-xl`.

3. **Congelamiento Visual en Pantallas Ya Aprobadas:**
   - Cuando una pantalla existente ya está validada en producción, su estructura y estilo quedan protegidos: prohibido romper o alterar su diseño sin solicitud explícita del usuario.
