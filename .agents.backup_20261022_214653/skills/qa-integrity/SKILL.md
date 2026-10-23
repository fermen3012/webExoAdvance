---
name: qa-integrity
description: Procedimientos de control de calidad, verificación de tipos (TypeScript/linters), auditoría de no-regresión y cumplimiento de invariantes.
---

# Skill: Control de Calidad (QA) & Verificación de Integridad

Esta skill define el protocolo de control de calidad previo a la entrega de cualquier desarrollo.

## 1. Alcance y Tareas de Auditoría
- **Verificación de Tipos y Sintaxis:** Ejecución de comandos de comprobación estricta (`tsc --noEmit`, `npm run lint` o equivalente del stack). Cero errores permitidos.
- **Auditoría de Invariantes:** Comprobar que ningún cambio rompa las reglas descritas en `.agents/memory/invariants.json`.
- **Auditoría de Diffs Quirúrgicos:** Verificar que las modificaciones utilicen reemplazos puntuales y que no se haya reescrito código ajeno que ya funcionaba.

## 2. Salida de Reporte de QA
Todo reporte de QA debe incluir:
1. Estado del type-check / compilación (`PASS` / `FAIL`).
2. Estado de invariantes del sistema (`PROTEGIDAS`).
3. Confirmación de no-regresión.
