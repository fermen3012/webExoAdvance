# Regla Inquebrantable 11: Testing Adversarial & Invariantes Universales (Property-Based Testing)
> Estándar de Ingeniería de Software SaaS & Web — Exo Advance

**Estado:** INQUEBRANTABLE (Core Invariant)

Para erradicar los puntos ciegos y el sesgo de confirmación cuando una IA escribe y valida su propio código, todo desarrollo en este proyecto debe regirse por este protocolo de verificación adversarial:

---

## 1. Scope Gating (Aplicación Exclusiva a Lógica Crítica)
El testing adversarial y Property-Based Testing (PBT) se reserva exclusivamente para módulos donde un fallo cause pérdida de dinero, brechas de seguridad o corrupción de datos:
- **Ámbitos Obligatorios:** Cálculos monetarios, facturación, pasarelas de pago, autenticación, autorización RBAC, sanitización de datos de entrada (parsers/validadores Zod), máquinas de estado y operaciones concurrentes.
- **Ámbitos Excluidos:** Componentes visuales de presentación, estilos Tailwind CSS, animación, maquetación o textos estáticos.

---

## 2. Prohibición de Autocomplacencia (Protocolo Prover-Verifier)
- **Separación de Funciones:** El agente que implementa la funcionalidad (Builder) no debe basarse únicamente en sus propios tests unitarios de "camino feliz".
- **Desafío Adversarial:** Antes de marcar un módulo crítico como completado, debe convocarse la skill `red-team-breaker` para modelar y ejecutar invariantes universales con **`fast-check`**.
- La tarea no se considera lista hasta que la suite adversarial (`*.property.test.ts`) soporte al menos **100 permutaciones aleatorias sin fallos**.

---

## 3. Estándar Técnico de Invariantes (`fast-check`)
1. **Nomenclatura:** Todos los archivos de pruebas de propiedades deben nombrarse con sufijo `*.property.test.ts` o `*.pbt.test.ts` y ubicarse junto al módulo correspondiente o en `tests/property/`.
2. **Idioma 100% en Inglés (Regla 10):** Nombres de suites, aserciones y mensajes de error deben redactarse estrictamente en inglés técnico (`describe('Transaction Invariants', ...)`).
3. **Validación de Propiedades Reales:**
   - **Invariantes Universales:** Salidas finitas, no negativas, tipos coherentes bajo combinaciones caóticas.
   - **Idempotencia:** Ejecución repetida idéntica no genera efectos colaterales duplicados.
   - **Round-Trip:** `deserialize(serialize(x)) === x`.

---

## 4. Gestión de Contraejemplos y Memoria Inmunológica
Cuando el motor PBT detecte una falla mediante reducción automática (*shrinking*):
1. **Aislamiento Inmediato:** El contraejemplo mínimo reproducible debe registrarse como un test unitario de regresión explícito.
2. **Inyección en Memoria:** El caso debe documentarse en `.agents/memory/antidotes.json` (síntoma, causa raíz y antídoto verificado) para prevenir amnesia en sesiones futuras.
3. **Parche Quirúrgico:** La corrección del Builder debe ser defensiva y acotada, sin romper contratos de tipos preexistentes.

---

## 5. Preservación de la Inmunidad de Arquitectura (Regla 3)
Si un test adversarial revela un fallo en archivos arquitectónicos protegidos (`App.tsx`, `layout.tsx`, `AuthContext`), el agente **NO tiene autorización para reescribirlos unilateralmente**. Debe presentar el contraejemplo al usuario y solicitar aprobación antes de modificar la arquitectura base (Regla 6: Cero Suposiciones).
