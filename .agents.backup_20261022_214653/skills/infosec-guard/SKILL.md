---
name: infosec-guard
description: Directivas de ciberseguridad, protección de datos sensibles (PII), auditoría de permisos y mitigación de vulnerabilidades web (OWASP).
---

# Skill: Ciberseguridad & Protección de Datos

Esta skill establece las directivas defensivas obligatorias para proteger el proyecto contra vulnerabilidades comunes.

## 1. Protección de Datos y Privacidad
- **Mínimo Privilegio:** Restringir el acceso a datos únicamente a los usuarios con permisos verificados.
- **Protección de Datos PII:** Cifrado en tránsito (HTTPS) y en reposo para información personal sensible.
- **Sanitización de Entradas:** Sanitizar y validar cualquier dato proveniente del usuario antes de procesarlo o renderizarlo para evitar Cross-Site Scripting (XSS).

## 2. Gestión Segura de Secretos
- Ninguna clave privada, token de servicio o secreto debe existir en el código fuente.
- Utilizar variables de entorno y verificar que archivos `.env*` estén debidamente incluidos en `.gitignore`.

## 3. Prevención de IDOR (Insecure Direct Object Reference)
- Antes de modificar o eliminar un recurso (`/api/resource/:id`), validar que el recurso pertenezca activamente al usuario o cuenta autenticada.
