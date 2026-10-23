---
name: frontend-architecture
description: Directivas técnicas para desarrollo de componentes de interfaz, gestión de estado, hooks y optimización de rendimiento de cliente.
---

# Skill: Arquitectura de Frontend & Cliente

Esta skill define las mejores prácticas para el desarrollo de la interfaz de usuario y la experiencia de usuario.

## 1. Principios de Componentes
- **Componentes Pequeños y Reutilizables:** Evitar componentes masivos monolíticos. Descomponer vistas complejas en subcomponentes atómicos.
- **Separación de Responsabilidades:** Mantener los componentes visuales libres de llamadas directas y orquestar el acceso a datos a través de hooks o servicios dedicados.

## 2. Gestión de Estado
- Estado local para lo efímero (modales, toggles, campos de formulario).
- Almacén global (Context / Zustand / Redux) únicamente para datos que trascienden múltiples pantallas (sesión, carrito, configuración).

## 3. Rendimiento
- Carga perezosa (lazy loading / dynamic imports) en componentes pesados.
- Optimización de imágenes y recursos estáticos.
