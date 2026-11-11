# Regla Inquebrantable: Arquitectura English-First & Paridad Bilingüe Obligatoria (EN/ES)
> Estándar de Ingeniería de Software SaaS & Web — Exo Advance

**Estado:** INQUEBRANTABLE (Core Invariant)

Para garantizar la escala global, la consistencia del código y la calidad corporativa de todos los productos de Exo Advance, todo desarrollo debe regirse estrictamente por este protocolo de internacionalización:

## 1. Código Fuente 100% en Inglés (English-First Codebase)
- **Nomenclatura Técnica Exclusiva:** Nombres de variables, funciones, clases, componentes, interfaces TypeScript, esquemas de bases de datos (tablas, columnas, funciones SQL), rutas de archivos y nombres de carpetas deben escribirse **única y exclusivamente en inglés profesional** (`invoiceId`, `calculateTotal`, `useAuthSession`, `orderStatus`).
- **Comentarios y Commits:** Comentarios de código, documentación técnica (JSDoc), mensajes de commit semánticos y notas de arquitectura se redactan siempre en inglés.

## 2. Textos de Interfaz (UI) en Inglés como Idioma Primario (`en`)
- **Desarrollo Primario en Inglés:** Toda nueva vista, pantalla, formulario, botón, notificación o mensaje de error debe concebirse, maquetarse y redactarse **primero en inglés natural y profesional**.
- **Prohibido el Texto "Hardcoded":** Ninguna cadena de texto visible para el usuario final debe incrustarse de forma estática en el código (JSX/TSX/HTML). Todas las cadenas deben gestionarse mediante claves de traducción tipadas (ej. `t('checkout.payment_button')` o diccionarios estructurados).
- **Idioma de Arranque por Defecto (Runtime Boot):** La aplicación o interfaz DEBE arrancar SIEMPRE en inglés por defecto (`useState<Locale>('en')`, `defaultLocale: 'en'`). El español (`'es'`) es la variante accesible mediante el selector de idioma. Prohibido inicializar la app en `'es'`.
- **Datos Iniciales, Mocks y Formularios en Inglés:** Todos los valores por defecto de estados iniciales, formularios, catálogos de prueba o mocks deben escribirse en inglés por defecto (`'Luxury Wedding'`, no `'Boda de Autor'`).

## 3. Paridad Bilingüe Obligatoria con Español (`es`)
- **Sincronización Total de Claves:** Toda clave de traducción agregada o modificada en inglés (`en.json` o diccionario `en`) debe tener de inmediato su equivalente exacto en español (`es.json` o diccionario `es`).
- **Traducción Profesional y Neutral:** Las traducciones al español deben ser neutras, elegantes y adaptadas al contexto de software empresarial y SaaS B2B/B2C, evitando traducciones literales o robóticas.
- **Variables Dinámicas:** Preservar la interpolación de variables y plurales ICU intactos en ambos idiomas (ej. `{userName}`, `{count}`).
