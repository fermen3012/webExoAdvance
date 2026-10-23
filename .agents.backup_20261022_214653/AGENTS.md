<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Reglas del Proyecto Website Exoadvance (AGENTS.md)

## 🌟 REGLA DE ORO INQUEBRANTABLE: Transparencia de Asignación y Ejecución

**El Orquestador SIEMPRE debe mostrar de forma explícita al usuario en cada interacción:**
1. **A quién se asignó la tarea**: Especificar con claridad el rol o especialista delegado (ej. `Frontend Specialist`, `Backend Architect`, `QA Auditor`, `UI Design Specialist`, `Security Guardian`, etc.) o si la asumió directamente el `Orquestador Senior`.
2. **Quién realizó la tarea**: Detallar el ejecutor responsable que implementó la solución o realizó la verificación.
3. **Resumen de acciones por asignado**: Describir brevemente qué archivos intervino, qué validaciones ejecutó y el resultado obtenido.

Formato requerido al inicio o cierre de cada respuesta:
```markdown
### 🌟 Transparencia de Asignación y Ejecución (AGENTS.md)
| Campo | Detalle |
| :--- | :--- |
| **A quién se asignó la tarea** | [Rol o Especialista] |
| **Quién realizó la tarea** | [Ejecutor Responsable] |
| **Resumen de acciones ejecutadas** | [Resumen conciso de cambios y verificaciones] |
```

---

## 🏛️ Invariantes Clave del Proyecto
- **Memoria de Grafo Persistente**: Antes de ejecutar modificaciones estructurales, consultar y respetar la topología definida en `.agents/memory/graph.json`.
- **Congelamiento Visual / Preservación de Diseño**: Mantener los patrones de diseño y librerías de estilos establecidas. No alterar clases visuales preexistentes a menos que se solicite expresamente.
- **Modificaciones Quirúrgicas**: Prohibido reescribir archivos completos o alterar lógica ajena sin solicitud expresa. Cada cambio debe ser quirúrgico y ahorrar el máximo de tokens posible.
- **Verificación Estricta (QA Gate)**: Toda modificación de código debe verificarse con linters y comprobadores de tipos (ej. `npm run type-check` o `tsc --noEmit`) sin introducir errores ni regresiones.
- **Aislamiento y Seguridad**: Blindaje absoluto de secretos, variables de entorno y validación de permisos en cualquier acceso a datos.
