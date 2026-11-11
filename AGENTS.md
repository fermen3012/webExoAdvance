# Reglas del Proyecto website-exoadvance (AGENTS.md)
> **Estándar de Ingeniería de Software SaaS & Web — Exo Advance**  
> Gobernanza Multi-Agente, Memoria Persistente de Grafo y Protocolo Quirúrgico de Alta Densidad de Tokens.

> 🚨 **DIRECTIVA SUPREMA DE LENGUAJE (DUAL-STACK PROTOCOL):**
> - **COMUNICACIÓN EN CHAT:** 100% en Español neutro, técnico y profesional con el usuario.
> - **CÓDIGO, DB, APIS Y ARCHIVOS:** 100% en INGLÉS ESTRICTO (`english-first`). Prohibido nombrar variables, funciones, endpoints o tablas en español.
> - **BOOT & RUNTIME POR DEFECTO:** La aplicación DEBE arrancar SIEMPRE en INGLÉS (`locale = 'en'`, `defaultLocale = 'en'`). El español (`'es'`) se activa únicamente si el usuario utiliza el selector de idioma.
> - **PARIDAD I18N OBLIGATORIA:** Toda vista o componente debe consumir diccionarios tipados (`en.json` y `es.json`). CERO texto en español quemado (hardcoded) en código.

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
1. **Detección Automática:** Clasifica la intención del usuario y delega al especialista correspondiente (Backend, Frontend, UI, QA, InfoSec, Legal, Marketing, i18n o Red Team Breaker).
2. **Auto-Spawn On-Demand:** Si la tarea requiere un especialista no registrado, el Orquestador crea automáticamente `.agents/skills/<rol>/SKILL.md`, lo registra en `registry.json` y ejecuta la tarea con rigor profesional.
3. **Fusión Quirúrgica de Subagentes (Modo Táctico para Cuellos de Botella Críticos):** Bajo orden expresa o ante algoritmos/refactorizaciones de alta complejidad, el Orquestador evalúa trazas forenses y diffs entre candidatos aislados, extrayendo y combinando sus fortalezas complementarias (ej. estructura limpia del Candidato A + velocidad de ejecución del Candidato B) y descartando sus debilidades sin desperdiciar tokens en tareas rutinarias.

---

## ⚡ 3. Protocolo de Ahorro y Disciplina de Tokens (L0 / L1 / L2)
1. **L0 (Contexto Base Activo, Esqueleto AST & DB Schema):**
   - Consultar `.agents/memory/invariants.json` y `graph.json` antes de intervenciones estructurales.
   - **Esqueleto de Firmas & DB:** Consultar `.agents/memory/skeleton.compact` (para ubicar líneas de código) y `.agents/memory/db-schema.compact` (para ver tablas SQL/Prisma/RLS reales sin alucinar columnas).
   - **Radar de Radio de Explosión:** Antes de modificar una función o interfaz compartida, ejecutar `node .agents/bin/impact.js <Simbolo>` para visualizar todos los archivos afectados en milisegundos.
   - Actualizar esqueletos y dependencias con: `node .agents/bin/scan.js` y `node .agents/bin/sync-graph.js`.
2. **L1 (Especialistas Bajo Demanda):** Cargar directivas de `.agents/skills/` únicamente cuando la tarea pertenezca a su dominio.
3. **L2 (Lectura y Edición Quirúrgica):**
   - **Lectura acotada:** En archivos de más de 80 líneas, usar `read_file` especificando `StartLine` y `EndLine`. Prohibido volcar archivos enteros.
   - **Edición precisa:** Usar `edit_file` para bloques contiguos exactos. Prohibido reescribir archivos enteros que ya funcionan.
   - **No duplicación:** Tras modificar archivos con herramientas, no re-imprimir el archivo completo en la respuesta de chat.

---

## 🧠 3.1 Protocolo Anti-Amnesia & Memoria Inmunológica
Para evitar la pérdida de contexto entre sesiones o la repetición de bugs pasados:
1. **Inicio de Sesión (Recuperación Inmediata de Contexto & Anticuerpos):**
   - El agente DEBE consultar `.agents/memory/state.json` (<30 líneas, ~150 tokens) y `.agents/memory/antidotes.json` antes de comenzar tareas complejas o diagnosticar errores.
   - Esto reactiva de inmediato el historial de hitos, decisiones y los antídotos verificados contra bugs conocidos.
2. **Cierre de Tarea y Promoción Determinista a Memoria (Candado Anti-Envenenamiento):**
   - **Validación Determinista Previa:** Prohibido inyectar en la memoria permanente (`.agents/memory/state.json`, `invariants.json`, `antidotes.json` o `graph.json`) hitos completados, optimizaciones o reglas que no hayan superado previamente el entorno aislado de pruebas (`node .agents/bin/verify.js` == `PASS`) manteniendo la estructura de datos intacta.
   - Una vez aprobado el QA Gate, el agente DEBE actualizar `.agents/memory/state.json` (y `antidotes.json` si se resolvió un bug complejo):
     - Marcar el hito finalizado en `milestones`.
     - Documentar cualquier optimización verificada o decisión clave en `decisions`.
     - Actualizar la lista de `priorities` para la siguiente sesión.
3. **Preservación Inmune a Actualizaciones:**
   - Tanto `setup.js` como `upgrade.js` ejecutan fusión inteligente (`smartMergeMemory`), garantizando que jamás se sobreescriban los hitos, decisiones, invariantes ni nodos del grafo de conocimiento preexistentes.
   - Se crea automáticamente un respaldo preventivo fechado en `.agents.backup_YYYYMMDD_HHMMSS`.

---

## 🔌 4. Integración MCP (Supabase, Vercel & Git/GitHub Tooling)
El proyecto incluye configuración nativa de **Model Context Protocol (`.mcp.json`)**:
- **Supabase & PostgreSQL MCP:** Permite al agente inspeccionar esquemas de tablas, validar políticas RLS y ejecutar consultas `SELECT` seguras para prototipado sin salir del flujo de trabajo.
- **Vercel MCP:** Permite al agente inspeccionar la salud de builds, consultar logs de error de funciones serverless en vivo y auditar variables de entorno.
- **Git & GitHub MCP:** Permite al agente auditar diffs, realizar commits semánticos y sincronizar con repositorios remotos.
- **Seguridad:** Las credenciales se gestionan exclusivamente mediante variables de entorno en `.env.mcp` (ignorado en git vía `.gitignore`). Prohibido escribir claves reales en `.mcp.json`.

---

## 🏛️ 5. Las 11 Reglas Inquebrantables de Exo Advance
Cualquier agente que opere en este proyecto debe respetar estrictamente:
1. **Conservación de Tokens & Máxima Velocidad (`.agents/rules/token-conservation-velocity.md`):** AST Skeleton first (`skeleton.compact`), lecturas acotadas `StartLine-EndLine`, cero repetición de código en chat y ejecución unificada de QA Gate.
2. **Despliegues y Git Push Bajo Orden Expresa (`.agents/rules/deployment-on-command.md`):** Prohibido hacer push o desplegar en Vercel de forma autónoma. Solo se ejecuta bajo orden directa del usuario tras pasar el QA Gate.
3. **Inmunidad de Arquitectura (`.agents/rules/architecture-immunity.md`):** Prohibido tocar enrutadores (`App.tsx`, layouts), lógica de autenticación o Contextos globales (`AppContext`, `AuthContext`) sin permiso explícito.
4. **Integridad de Tipos (`.agents/rules/type-integrity.md`):** Prohibido inventar propiedades arbitrarias. Toda modificación debe cumplir las interfaces definidas (`types.ts`).
5. **Estética de App Nativa & Física de Movimiento Emil Kowalski (`.agents/rules/ui-freeze-fidelity.md`):** Prohibidos los diseños genéricos de IA y pantallas saturadas. Exigir ergonomía nativa (*Linear / Apple / Raycast*), física de movimiento de alta gama (GPU-only: `transform`/`opacity`, sub-300ms, cero `ease-in`, cero `transition:all`, `0ms` en atajos frecuentes), 35% de espacio limpio y congelamiento de pantallas aprobadas.
6. **Cero Suposiciones (`.agents/rules/zero-assumptions.md`):** Ante requerimientos ambiguos o riesgos de rotura en producción, el agente debe consultar al usuario antes de programar.
7. **Modificaciones Quirúrgicas (`.agents/rules/surgical-modifications.md`):** Cambios mínimos indispensables por bloques contiguos exactos.
8. **QA Gate Automatizado (`.agents/bin/verify.js`):** Toda entrega debe validarse con `node .agents/bin/verify.js` obteniendo `PASS` (cero errores de tipos, cero secretos expuestos e integridad preservada).
9. **Disenso Técnico Objetivo & Rigor Crítico (`.agents/rules/objective-technical-dissent.md`):** Prohibida la complacencia o asentimiento ciego. Si el usuario propone una solución inviable, peligrosa o técnicamente incorrecta, el agente DEBE rebatir con argumentos técnicos sólidos, demostrar por qué tiene la razón con evidencias y presentar la alternativa viable superior.
10. **Arquitectura English-First & Paridad Bilingüe EN/ES (`.agents/rules/english-first-i18n.md`):** Todo desarrollo empieza en inglés (código, nombres de variables, bases de datos y textos primarios de UI). Paridad estricta obligatoria: toda clave en `en.json` debe reflejarse sincronizada y profesionalmente en `es.json`. Cero texto quemado ("hardcoded") en vistas.
11. **Testing Adversarial & Invariantes Universales PBT (`.agents/rules/adversarial-property-testing.md`):** Prohibida la autocomplacencia del desarrollador en lógica crítica (finanzas, auth, parsers, state machines). Todo módulo crítico debe someterse al asedio del `red-team-breaker` mediante Property-Based Testing con `fast-check` (>=100 runs sin fallos) y persistencia de contraejemplos en `antidotes.json`.
