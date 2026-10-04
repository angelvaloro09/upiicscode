---
name: Technical Precision Dark
colors:
  surface: '#131315'
  surface-dim: '#131315'
  surface-bright: '#39393b'
  surface-container-lowest: '#0e0e10'
  surface-container-low: '#1b1b1d'
  surface-container: '#201f21'
  surface-container-high: '#2a2a2c'
  surface-container-highest: '#353437'
  on-surface: '#e5e1e4'
  on-surface-variant: '#d9c0c8'
  inverse-surface: '#e5e1e4'
  inverse-on-surface: '#303032'
  outline: '#a28b92'
  outline-variant: '#544248'
  surface-tint: '#ffb0cf'
  primary: '#ffb0cf'
  on-primary: '#63013b'
  primary-container: '#a33b6e'
  on-primary-container: '#ffd1e1'
  inverse-primary: '#9f386b'
  secondary: '#c7c5cd'
  on-secondary: '#303036'
  secondary-container: '#4b4b51'
  on-secondary-container: '#bcbbc2'
  tertiary: '#4ae176'
  on-tertiary: '#003915'
  tertiary-container: '#007130'
  on-tertiary-container: '#65f98b'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#ffd9e5'
  primary-fixed-dim: '#ffb0cf'
  on-primary-fixed: '#3d0023'
  on-primary-fixed-variant: '#811f52'
  secondary-fixed: '#e4e1e9'
  secondary-fixed-dim: '#c7c5cd'
  on-secondary-fixed: '#1b1b21'
  on-secondary-fixed-variant: '#46464c'
  tertiary-fixed: '#6bff8f'
  tertiary-fixed-dim: '#4ae176'
  on-tertiary-fixed: '#002109'
  on-tertiary-fixed-variant: '#005321'
  background: '#131315'
  on-background: '#e5e1e4'
  surface-variant: '#353437'
typography:
  headline-xl:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-xl-mobile:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.015em
  headline-lg:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.015em
  headline-md:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '500'
    lineHeight: 28px
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  body-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
  label-code-lg:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
  label-code-md:
    fontFamily: JetBrains Mono
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 18px
  label-code-sm:
    fontFamily: JetBrains Mono
    fontSize: 11px
    fontWeight: '500'
    lineHeight: 14px
    letterSpacing: 0.04em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  gutter: 1rem
  gutter-mobile: 0.75rem
  margin: 1.5rem
  margin-mobile: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 0.75rem
  space-lg: 1rem
  space-xl: 1.5rem
---

## Brand & Style
The design system reflects an institutional, high-focus competitive programming and evaluation environment tailored for technical rigor. Combining modern minimalist software utility with academic prestige, it eliminates decorative noise to prioritize sustained reading comprehension, precise code inspection, and instantaneous verdict parsing.

- **Target Audience:** Engineering students, competitive programming competitors, algorithm evaluators, and academic judges.
- **Emotional Response:** Intense focus, institutional pride, absolute clarity, and calm stability during time-critical problem-solving.
- **Visual Aesthetic:** Minimalist developer workspace meets institutional discipline. Defined by deep warm-charcoal canvases, subtle structured boundary definitions, clean monospaced telemetry, and a carefully balanced, accessible institutional red accent.

## Colors
The color architecture is built specifically for deep dark mode ergonomics to counter eye fatigue during long coding contests.

- **Canvas & Surface Architecture:**
  - Base Canvas (`surface-base`): `#121214` (Deep warm charcoal foundation).
  - Canvas Secondary (`surface-recessed`): `#18181B` (Sidebar, shell chrome, and split-pane backgrounds).
  - Elevated Container Level 1 (`surface-elevated`): `#202024` (Cards, submission panels, modular workspaces).
  - Elevated Container Level 2 (`surface-overlay`): `#27272A` (Dropdowns, modals, hover states, active tabs).
- **Outlines & Dividers:**
  - Subtle Structural Border: `#323238` (Strict 1px separation across all modular views).
  - Focused / Interactive Border: `#52525B` (Keyboard navigation, hovered borders).
- **Brand Accent:**
  - Guinda Calibrado (`primary`): `#A33B6E` (Institutionally anchored, lightened intentionally to satisfy WCAG 2.1 AA 4.5:1 text-contrast ratios against `#121214` and `#202024`).
  - Guinda State / Subtle: `rgba(163, 59, 110, 0.16)` (Used for badges, selections, and subtle glow highlights).
- **Typography & Content Values:**
  - Text High-Contrast: `#EDEDEF` (Headings, active metrics, primary statements; >10:1 ratio against base).
  - Text Muted / Secondary: `#A1A1AA` (Labels, metadata, secondary instructions; strictly >4.5:1 ratio).
  - Text Disabled: `#71717A`.
- **Verdict & Diagnostic Semantics (JetBrains Mono driven):**
  - Accepted (AC): `#22C55E` / Background: `rgba(34, 197, 94, 0.12)`
  - Wrong Answer / Runtime Error (WA/RTE): `#EF4444` / Background: `rgba(239, 68, 68, 0.12)`
  - Time / Memory Limit Exceeded (TLE/MLE): `#F59E0B` / Background: `rgba(245, 158, 11, 0.12)`
  - Compilation Error / Pending: `#A1A1AA` / Background: `rgba(161, 161, 170, 0.12)`

## Typography
The system adopts an intentional, zero-serif typographic dichotomy designed specifically for technical workflows:

- **Inter:** The structural UI backbone. Selected for its neutral geometry, legible numerals, and exceptional micro-readability in complex dashboard layouts. Used across navigational elements, problem descriptions, metadata, forms, and general interface content.
- **JetBrains Mono:** The technical data backbone. Dedicated exclusively to source code editors, input/output test vectors, execution runtimes (`ms`), memory footprints (`KB/MB`), competitive rankings, and judge verdicts (`ACCEPTED`, `WRONG ANSWER`).
- Text hierarchy prioritizes contrast and legibility over decorative sizing: headlines are restrained to avoid dominating limited screen real estate on code-heavy views.

## Layout & Spacing
The layout follows a fluid-dense workbench paradigm structured around multi-pane developer workflows:

- **Layout Grid Model:** Fluid 12-column grid system with strict side-by-side or stacked split panes (problem statement on the left, interactive code editor and console output on the right).
- **Responsive Adaptations:**
  - **Desktop (>= 1200px):** Bi-directional split view enabled. Problem context and code terminal coexist with a persistent 16px gutter. Outer canvas margins: 24px (`1.5rem`).
  - **Tablet (768px - 1199px):** Adaptive collapsible sidebar with tabbed problem/code switcher. Gutters reduce to 16px. Outer margins: 20px.
  - **Mobile (< 768px):** Single-column stacked stack. Problem description and code submission reflow into an anchored bottom-sheet or tab bar navigation. Gutters drop to 12px (`0.75rem`), outer margins to 16px (`1rem`).
- **Spacing Rhythm:** Based on a 4px/8px mathematical base unit to maintain alignment across monospaced outputs and compact form inputs.

## Elevation & Depth
In alignment with an austere, academic, and distraction-free programming suite, exaggerated drop shadows and luminous blurs are completely avoided.

- **Tonal Layering Principle:** Depth is conveyed purely through chromatic stepped surfaces:
  - Base background sits deepest at `#121214`.
  - Recessed split areas rest at `#18181B`.
  - Work panels and submission blocks rise to `#202024`.
  - Modals and contextual flyouts hover at `#27272A`.
- **Low-Contrast Outlines ("Ghost Borders"):** Every card, panel, and data table utilizes a crisp, non-distracting `1px solid #323238` border.
- **Shadows:** Standard components have no drop shadow (`box-shadow: none`). Floating overlays (e.g., autocompletion menus, modal dialogs) use a subtle, neutral ambient drop: `0px 8px 24px rgba(0, 0, 0, 0.45)` with no colorful ambient wash.

## Shapes
The visual identity embraces a disciplined "Soft" curvature (`roundedness: 1`), conveying technical reliability, sharp efficiency, and calm precision without feeling aggressive or overly playful.

- **Base Elements (Buttons, Inputs, Badges, Tabs):** `0.25rem` (4px). Matches the crisp baseline of monospaced code grids.
- **Containers (Panels, Cards, Terminal Windows):** `0.5rem` (8px). Softens the modular interface while preserving maximum internal space.
- **Modals & Dialogs:** `0.75rem` (12px).
- **Interactive Checkboxes:** `2px` border radius for strict geometric clarity.

## Components

- **Buttons:**
  - *Primary Button:* Solid `#A33B6E` background with `#EDEDEF` text. Hover state shifts to `#B6457E`; active state scales subtly down to `#8E335F`. No external drop shadow. Border radius `4px`.
  - *Secondary / Neutral Button:* `#202024` background with `1px solid #323238` and `#EDEDEF` text. Hover state brightens to `#27272A` with `#52525B` border.
  - *Ghost / Monospace Button:* Transparent background with `#A1A1AA` text, turning `#EDEDEF` on hover. Used for run tests, reset template, and clipboard copy.
- **Inputs & Editor Fields:**
  - Input field surfaces set to `#18181B` enclosed by `1px solid #323238`. Text colored `#EDEDEF`, placeholder in `#71717A`.
  - Focused state replaces the default border with a crisp `1px solid #A33B6E` accompanied by zero spread or glow.
- **Cards & Data Panels:**
  - Built with `#202024` surface and bounded by `1px solid #323238`.
  - Header separators inside cards use `1px solid #323238` with padding `space-md` (`0.75rem`).
- **Verdict Chips & Status Badges:**
  - Monospaced badges utilizing `label-code-sm` (`JetBrains Mono`, 11px, medium weight, uppercase).
  - Padding: `2px 8px` with `4px` corner radius.
  - Tinted translucent fills matching the outcome: e.g., Accepted (`rgba(34, 197, 94, 0.12)` background with `#22C55E` text and border `rgba(34, 197, 94, 0.25)`).
- **Checkboxes & Radios:**
  - `16px` structural boxes. Surface: `#18181B` with `1px solid #323238`.
  - Active check fills with `#A33B6E` and renders a clean `#EDEDEF` checkmark.
- **Code Inspection & Terminal Blocks:**
  - Surface: `#121214` embedded inside `#202024` panel structures.
  - Typography: `JetBrains Mono` at `13px` (`label-code-md`) with `18px` line-height for clean line numbering.
  - Active line highlight: `rgba(255, 255, 255, 0.03)`. Line numbers rendered in `#52525B`.
- **Leaderboard & Metric Lists:**
  - Striped or bordered rows using `1px solid #202024` divider lines. Hover row state triggers `#18181B`.
  - Runtimes and score deltas formatted in `JetBrains Mono` aligned cleanly to tabular numbers (`font-variant-numeric: tabular-nums`).