# Reglas del Proyecto website-exoadvance (AGENTS.md)
> **Estándar de Ingeniería de Software SaaS & Web — Exo Advance**  
> Gobernanza Multi-Agente, Memoria Persistente de Grafo y Protocolo Quirúrgico de Alta Densidad de Tokens.

---

## 🌟 1. Regla de Oro: Transparencia y Atribución
El Orquestador debe reportar explícitamente en cada respuesta la asignación y ejecución:

### Modo Modificación de Código / Tarea Estructural (Tabla Completa)
```markdown
### 🌟 Transparencia de Asignación y Ejecución (Exo Advance)
| Campo | Detalle |
| :--- | :--- |
| **A quién se asignó la tarea** | [Rol/Especialista delegado o Orquestador Senior] |
| **Quién realizó la tarea** | [Ejecutor Responsable] |
| **Resumen de acciones ejecutadas** | [Resumen conciso de cambios y verificaciones] |
```

### Modo Consulta / Aclaración Rápida (Micro-Badge para Ahorro de Tokens)
> 🛡️ **[Asignado: Rol/Especialista]** | **[Ejecutor: Responsable]** | [Acción concisa]

---

## 🧭 2. Enrutamiento Dinámico de Especialistas (Intent Dispatcher)
El Orquestador opera con despacho automático según `.agents/skills/registry.json`:
1. **Detección Automática:** Clasifica la intención del usuario y delega al especialista correspondiente (Backend, Frontend, UI, QA, InfoSec, Legal o Marketing).
2. **Auto-Spawn On-Demand:** Si la tarea requiere un especialista no registrado, el Orquestador crea automáticamente `.agents/skills/<rol>/SKILL.md`, lo registra en `registry.json` y ejecuta la tarea con rigor profesional.

---

## ⚡ 3. Protocolo de Ahorro y Disciplina de Tokens (L0 / L1 / L2)
1. **L0 (Contexto Base Activo & Esqueleto AST):**
   - Consultar `.agents/memory/invariants.json` y `graph.json` antes de intervenciones estructurales.
   - **Esqueleto de Firmas:** Consultar `.agents/memory/skeleton.compact` para ubicar líneas y funciones exactas sin leer archivos enteros a ciegas.
   - Actualizar esqueleto y dependencias con: `node .agents/bin/scan.js` y `node .agents/bin/sync-graph.js`.
2. **L1 (Especialistas Bajo Demanda):** Cargar directivas de `.agents/skills/` únicamente cuando la tarea pertenezca a su dominio.
3. **L2 (Lectura y Edición Quirúrgica):**
   - **Lectura acotada:** En archivos de más de 80 líneas, usar `read_file` especificando `StartLine` y `EndLine`. Prohibido volcar archivos enteros.
   - **Edición precisa:** Usar `edit_file` para bloques contiguos exactos. Prohibido reescribir archivos enteros que ya funcionan.
   - **No duplicación:** Tras modificar archivos con herramientas, no re-imprimir el archivo completo en la respuesta de chat.

---

## 🏛️ 4. Las 7 Reglas Inquebrantables de Exo Advance
Cualquier agente que opere en este proyecto debe respetar estrictamente:
1. **Conservación de Tokens & Máxima Velocidad (`.agents/rules/token-conservation-velocity.md`):** AST Skeleton first (`skeleton.compact`), lecturas acotadas `StartLine-EndLine`, cero repetición de código en chat y ejecución unificada de QA Gate.
2. **Inmunidad de Arquitectura (`.agents/rules/architecture-immunity.md`):** Prohibido tocar enrutadores (`App.tsx`, layouts), lógica de autenticación o Contextos globales (`AppContext`, `AuthContext`) sin permiso explícito.
3. **Integridad de Tipos (`.agents/rules/type-integrity.md`):** Prohibido inventar propiedades arbitrarias. Toda modificación debe cumplir las interfaces definidas (`types.ts`).
4. **Fidelidad y Congelamiento Visual (`.agents/rules/ui-freeze-fidelity.md`):** Componentes nuevos deben clonar el lenguaje visual exacto (Tailwind, bordes `rounded-[32px]`, paleta y tipografías). Prohibido rediseñar pantallas que ya funcionan.
5. **Cero Suposiciones (`.agents/rules/zero-assumptions.md`):** Ante requerimientos ambiguos o riesgos de rotura en producción, el agente debe consultar al usuario antes de programar.
6. **Modificaciones Quirúrgicas (`.agents/rules/surgical-modifications.md`):** Cambios mínimos indispensables por bloques contiguos exactos.
7. **QA Gate Automatizado (`.agents/bin/verify.js`):** Toda entrega debe validarse con `node .agents/bin/verify.js` obteniendo `PASS` (cero errores de tipos, cero secretos expuestos e integridad preservada).
