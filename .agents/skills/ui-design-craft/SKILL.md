---
name: ui-design-craft
description: Native-grade UI/UX architecture, Emil Kowalski motion physics, anti-saturation visual hierarchy, progressive disclosure, and bespoke design craft (Linear, Apple Human Interface & Raycast standard).
---

# Skill: Native-Feel UI Craft, Motion Physics & Anti-Saturation Systems

Governs visual originality, native application ergonomics, motion choreography, and clutter-free information density across all Exo Advance products.

## 1. Anti-Generic AI Aesthetic & De-Saturation Mandate
- **Strict Ban on Generic AI Templates:** Never generate cookie-cutter SaaS layouts (e.g., 4 identical colorful KPI cards in a row, generic purple-to-pink gradients, or overused stock hero sections).
- **Low-Saturation Sophistication:** Avoid raw, hyper-saturated default Tailwind primaries (`bg-blue-500`, `bg-red-500`, `bg-green-500`). Use refined, low-saturation tonal surfaces (deep obsidian/zinc `#090A0F`, warm alabaster `#F8F9FA`, slate neutrals) paired with **a single intentional optical accent color**.
- **35% Minimum Negative Space (Anti-Clutter):** Never crowd a viewport. Limit primary data points per card to 2–3 key metrics. Move secondary actions, filters, and metadata into progressive disclosure patterns (**Slide-over Drawers, Popovers, Bottom Sheets, or `Cmd+K` Command Palettes**).

## 2. Native Application Feel (Desktop & Mobile OS Ergonomics)
- **App-Shell Viewport Architecture:** Prefer fixed application shells (`h-dvh overflow-hidden` with independent, smooth-scrolling internal panes) over long, chaotic web pages.
- **Tactile Hardware-Like Controls:** Every interactive element must feel physical:
  - Subtle 1px specular borders (`border-white/[0.08]` in dark mode, `border-black/[0.06]` in light mode) with inner highlight hairlines (`shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)]`).
  - Tactile press physics (`active:scale-[0.97]`, `transition-transform duration-150`).
  - Translucent Frosted Layers (`backdrop-blur-xl bg-background/75`) for sticky headers, floating docks, and modals.
  - Sticky-Hover Immunity: Gate hover interactions behind `@media (hover: hover) and (pointer: fine)` so mobile taps never leave sticky hover states.

## 3. Emil Kowalski Motion Physics & Interaction Standards
- **Frequency Gate (Should it animate?):**
  - **High-frequency (100+ times/day, e.g. keyboard shortcuts, Cmd+K toggles):** Zero animation (`0ms`). Instant display. Never delay user muscle memory.
  - **Medium-frequency (hover, tab switching):** Near-imperceptible micro-transitions (`<120ms`) or none.
  - **Occasional (modals, drawers, toasts):** Natural motion (`200ms–350ms`).
  - **Rare / First-time (onboarding, checkout success):** Full delight budget.
- **Strict GPU-Only Animations:**
  - Animate **ONLY `transform` and `opacity`**.
  - **Strictly prohibit animating layout properties** (`width`, `height`, `top`, `left`, `margin`, `padding`) to prevent layout thrashing and maintain 120 FPS.
- **Strict Ban on `ease-in` and Unbounded `transition: all`:**
  - Never use `ease-in` for UI animations. Use punchy `ease-out` or custom spring curves (`cubic-bezier(0.16, 1, 0.3, 1)` or `type: "spring", stiffness: 380, damping: 30`).
  - Never write `transition: all`. Specify exact properties (`transition-transform`, `transition-opacity`).
- **Sub-300ms Timing Budgets:**
  - Button press feedback: `100–160ms`.
  - Tooltips & popovers: `125–200ms`.
  - Dropdowns & selects: `150–250ms`.
  - Modals & slide-overs: `200–350ms`.
- **Interruptibility & Stagger:**
  - Animated UI elements must be interruptible (re-targeting cleanly mid-flight instead of restarting keyframes from zero).
  - Staggered entrances for cards and lists: `30ms–50ms` delay per item (`translateY(8px) -> 0`).

## 4. Visual Freeze on Approved Production Screens
- When editing an existing project with an established design system, preserve and clone its validated tokens while applying native-grade motion and spacing discipline to new modules.
- Maintain WCAG 2.1 AA contrast ratios and minimum `44x44px` touch targets on mobile viewports.
