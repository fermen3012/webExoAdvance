---
name: i18n-localization-engine
description: World-class internationalization (i18n) and localization standards for SaaS. Enforces English-first codebase architecture, strict dual-locale parity (EN/ES), ICU message formatting, and typed dictionaries.
---

# Skill: i18n Localization Engine & English-First SaaS Architecture

Governs language architecture, dual-locale parity (English/Spanish), dynamic parameter formatting, and localized application routing across all Exo Advance projects.

## 1. English-First Engineering Paradigm
- **Codebase Uniformity:** All symbols (types, components, state, database tables, and API routes) must be authored exclusively in English.
- **Primary Locale:** English (`en`) serves as the canonical source of truth for all copy, validation error messages, and customer notifications.

## 2. Dual-Locale Contract & Parity (EN ↔ ES)
- **Zero Orphaned Keys:** Every translation key declared in `en.json` (or primary locale module) must possess a matching key in `es.json` with accurate contextual translation.
- **ICU Message Syntax:** Use standard ICU formatting for plurals, dates, numbers, and currencies:
  ```json
  "cart_summary": "{itemCount, plural, =0 {No items} one {# item} other {# items}} in your cart"
  ```
- **Contextual Business Spanish:** Translations to Spanish must employ neutral Latin American/US Hispanic business terminology:
  - *Billing* -> *Facturación* (not *Cobranza*)
  - *Workspace* -> *Espacio de trabajo*
  - *Settings* -> *Configuración*
  - *Deploy* -> *Desplegar*

## 3. Implementation Patterns for Modern Stacks
- **Next.js App Router:** Leverage `next-intl` or typed server dictionary modules (`getDictionary(locale)`).
- **Type-Safe Translations:** Enforce TypeScript typing over translation keys to prevent typos at compile time:
  ```typescript
  type TranslationKeys = typeof import('./locales/en.json');
  ```
- **Locale Resolution:** Resolve user locale gracefully: URL prefix (`/[locale]/...`) > Cookie (`NEXT_LOCALE`) > Accept-Language Header > Default to `'en'`.
