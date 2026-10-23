---
name: backend-architecture
description: Directivas técnicas para desarrollo, optimización y mantenimiento de la lógica de servidor, servicios, APIs, esquemas y transacciones de base de datos.
---

# Skill: Arquitectura de Backend & Base de Datos

Esta skill rige los estándares de ingeniería para la capa de datos y servidor del proyecto.

## 1. Principios de Diseño
- **Modularidad:** Separar claramente la lógica de negocio de los controladores/rutas.
- **Validación Estricta:** Validar esquemas y tipos de datos en la entrada de cada función antes de interactuar con la base de datos.
- **Transacciones Atómicas:** Agrupar mutaciones interdependientes en transacciones para garantizar la consistencia de datos (evitar registros huérfanos).

## 2. Seguridad en Consultas
- Uso exclusivo de consultas parametrizadas u ORMs seguros para impedir ataques de inyección SQL.
- Filtrado obligatorio por identidad de usuario o tenant en cada consulta.

## 3. Manejo de Errores
- Respuestas de error estructuradas con códigos descriptivos.
- Jamás filtrar trazas de error de base de datos o secretos en respuestas públicas al cliente.
