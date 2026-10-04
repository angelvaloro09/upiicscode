---
name: Academic Technical Minimal
colors:
  surface: '#fcf8fb'
  surface-dim: '#dcd9dc'
  surface-bright: '#fcf8fb'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f6f3f5'
  surface-container: '#f0edef'
  surface-container-high: '#eae7ea'
  surface-container-highest: '#e4e2e4'
  on-surface: '#1b1b1d'
  on-surface-variant: '#534248'
  inverse-surface: '#303032'
  inverse-on-surface: '#f3f0f2'
  outline: '#867278'
  outline-variant: '#d8c0c7'
  surface-tint: '#983f68'
  primary: '#52032f'
  on-primary: '#ffffff'
  primary-container: '#6f1d46'
  on-primary-container: '#f187b3'
  inverse-primary: '#ffb0ce'
  secondary: '#5b5f64'
  on-secondary: '#ffffff'
  secondary-container: '#dde0e6'
  on-secondary-container: '#5f6368'
  tertiary: '#002f03'
  on-tertiary: '#ffffff'
  tertiary-container: '#004808'
  on-tertiary-container: '#75b86b'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffd9e5'
  primary-fixed-dim: '#ffb0ce'
  on-primary-fixed: '#3e0022'
  on-primary-fixed-variant: '#7b2750'
  secondary-fixed: '#dfe3e8'
  secondary-fixed-dim: '#c3c7cc'
  on-secondary-fixed: '#181c20'
  on-secondary-fixed-variant: '#43474c'
  tertiary-fixed: '#aef4a1'
  tertiary-fixed-dim: '#93d787'
  on-tertiary-fixed: '#002202'
  on-tertiary-fixed-variant: '#0f5212'
  background: '#fcf8fb'
  on-background: '#1b1b1d'
  surface-variant: '#e4e2e4'
typography:
  headline-xl:
    fontFamily: Inter
    fontSize: 36px
    fontWeight: '600'
    lineHeight: 44px
    letterSpacing: -0.02em
  headline-xl-mobile:
    fontFamily: Inter
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.015em
  headline-md:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 24px
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 26px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 22px
  body-sm:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 20px
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
  label-sm:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '500'
    lineHeight: 18px
  code-md:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 22px
  code-sm:
    fontFamily: JetBrains Mono
    fontSize: 12.5px
    fontWeight: '500'
    lineHeight: 18px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1.25rem
  margin: 1.5rem
  margin-desktop: 2.5rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

This design system is engineered specifically for university-level computing education within an engineering and interdisciplinary context. It prioritizes clarity, cognitive calm, and academic rigor over gamification. The visual language strictly avoids dopamine-driven patterns: no streaks, no experience points, no loud celebratory animations, and no unnecessary telemetry stats. 

The aesthetic is grounded in modern academic minimalism. It merges the institutional dignity of classical public engineering institutions with clean, high-precision developer tool design. Every screen evokes focus, serious study, and structural order. The interface acts as an invisible, high-efficiency frame for problem solving, code composition, and algorithmic analysis.

## Colors

The palette is strictly controlled to maintain an uncluttered, high-contrast, editorial reading experience:

- **Canvas & Background (`#FBFBFA`)**: A warm bone tone that softens eye strain during long problem-solving and grading sessions compared to harsh pure white.
- **Surfaces & Cards (`#FFFFFF`)**: Pure white reserved for elevated cards, code blocks, problem description panes, and elevated modals.
- **Borders & Dividers (`#E7E6E2`)**: A subtle, warm-gray boundary line applied with 1px precision to separate content sections without visual noise.
- **Primary Text (`#1E1E20`)**: Deep charcoal for all headlines, code problem statements, and primary information, providing clear readability without the harshness of pure black.
- **Secondary & Muted Text (`#5F6368`)**: Slate gray for metadata, submission timestamps, hints, and secondary labels. Every instance is locked to a minimum size of 13px to strictly uphold WCAG AA contrast (≥ 4.5:1) against both the canvas and white cards.
- **Brand Accent (`#6F1D46`)**: Institutional IPN Guinda. Used with extreme restraint: reserved exclusively for primary interaction buttons, active navigation indicator lines or pills, and delicate focal points. It must never be applied to large background fields or full headers.
- **Brand Accent Hover (`#581637`)**: Deepened guinda for hovered and focused states.
- **Feedback & Verdict States**:
  - Accepted (AC): `#1B7C3A` (Subtle green text on `#F0FDF4` surface)
  - Wrong Answer / Runtime Error (WA/RTE): `#C5221F` (Dark red text on `#FEF2F2` surface)
  - Time Limit Exceeded (TLE): `#B45309` (Amber text on `#FFFBEB` surface)

## Typography

Typography enforces an uncompromising separation between interface guidance and source code:

1. **System Interface Font (`Inter`)**: Exclusively governs all UI text, page headings, problem summaries, academic metadata (e.g., student matrícula, semester periods, academic groups), navigation anchors, and status badges. Serif fonts are strictly prohibited across the entire design system to maintain an austere, modern technical posture.
2. **Monospace Font (`JetBrains Mono`)**: Strict boundary enforcement. It must appear only inside the code editor, in-line variable representations (`foo_bar`), input/output test case blocks, judge verdict chips (e.g., `AC`, `WA`, `TLE`), and execution telemetry (e.g., `42 ms`, `12.4 MB`).

Font sizes under 13px are disallowed for general UI prose to guarantee instant legibility under high-density classroom displays and low-light laboratory monitors.

## Layout & Spacing

The layout is built around focused horizontal scanning, anchored by a prominent, single top bar with zero permanent left sidebars. This maximizes the horizontal canvas for split-screen coding (e.g., problem specifications on the left, integrated code editor on the right).

- **Global Top Navigation**: Height locked to 64px, spanning full width with a crisp bottom border in `#E7E6E2`. 
  - **Left**: Primary text brand mark alongside dedicated slots for the IPN and UPIICSA identity insignias.
  - **Center**: Direct contextual academic destinations: "Materias" and "Tareas".
  - **Right**: Dark/light theme toggle, academic period badge, and student avatar/matrícula indicator.
- **Main Container**: Centered layout for course and problem listings with a max-width of 1200px. Split-pane problem environments extend fluidly up to 1600px with a persistent 50/50 or 40/60 horizontal partition.
- **Rhythm**: All paddings and component gaps follow a strict 4px base increment, standardizing component inner paddings to 16px (`space-md`) and card separations to 20px–24px.

## Elevation & Depth

Visual hierarchy is communicated through structural line discipline and tonal contrast rather than layered drop shadows:

- **Surface Tiers**: Base canvas sits on `#FBFBFA`. Content cards, code panels, and workspace tabs sit on `#FFFFFF`.
- **Borders over Shadows**: Spatial definition is created using 1px solid borders in `#E7E6E2`. Shadows are almost invisible: a single subtle elevation (`0 1px 2px rgba(30, 30, 32, 0.04)`) is used for floating dropdown menus, popovers, and student profile flyouts.
- **Focus Rings**: Active interactive inputs and selected cards use a clean 1.5px outline in `#6F1D46` with a soft offset, omitting heavy neon glows.
- **Editor Hierarchy**: Code submission panels use an embedded, flush appearance with clear 1px line delimiters separating test cases, stdin/stdout consoles, and source code buffers.

## Shapes

The design system uses a consistent, disciplined corner radius:

- Standard controls (buttons, input fields, test case items, and chips) use an 8px radius.
- Cards, problem panels, modal dialogs, and code editor viewports use a 10px radius (`rounded-lg`).
- Avatar containers and compact status pips use pill rounding (`9999px`).
- Sharp 0px corners are reserved for contiguous split-pane dividing gutters.

## Components

### Buttons
- **Primary**: Background `#6F1D46`, text `#FFFFFF`, radius 8px. Hover state shifts to `#581637`. Used exclusively for primary submissions ("Enviar Solución", "Iniciar Tarea").
- **Secondary / Outline**: Background `#FFFFFF`, border 1px solid `#E7E6E2`, text `#1E1E20`. Hover background `#F4F4F2`.
- **Ghost**: Zero background or border, text `#5F6368`. Hover text `#1E1E20` with a subtle `#F4F4F2` surface.

### Navigation Links
- Regular links use `#5F6368` in `label-md`. Active links switch to `#6F1D46` with a 2px bottom indicator bar or a subtle rounded background accent (`rgba(111, 29, 70, 0.08)`).

### Input Fields & Selects
- Background `#FFFFFF`, 1px solid `#E7E6E2`, radius 8px, padding 10px 14px. Focus state shifts border to `#6F1D46` without thick halos. Placeholder text uses `#5F6368` at 13px.

### Cards & Problem Containers
- Background `#FFFFFF`, border 1px solid `#E7E6E2`, radius 10px. No shadows in static states. Hover on selectable course cards introduces a 1px border transition to `#6F1D46` and a minimal shadow (`0 2px 4px rgba(30,30,32,0.06)`).

### Chips & Badges
- **General Metadata**: Background `#F4F4F2`, text `#5F6368`, font `Inter`, 13px, radius 6px.
- **Judge Verdict Badges**: Monospaced (`JetBrains Mono`, 12.5px), bold, radius 6px, uppercase:
  - `AC` (Accepted): Green border and text (`#1B7C3A`), light background (`#F0FDF4`).
  - `WA` (Wrong Answer): Red border and text (`#C5221F`), light background (`#FEF2F2`).
  - `TLE` (Time Limit Exceeded): Amber border and text (`#B45309`), light background (`#FFFBEB`).

### Code Blocks & Test Cases
- Container `#FFFFFF`, 1px solid `#E7E6E2`, radius 8px. Header bar `#FBFBFA` with subtle execution metrics (`JetBrains Mono`, 12.5px, `#5F6368`). Code line numbers aligned in `#5F6368` with zero background distraction.