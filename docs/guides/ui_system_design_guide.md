# UI SYSTEM DESIGN & COMPONENT LAYOUT GUIDE

Design language, tokens, and component dictionary for the **Frontend Interview Book Tracker**. For architecture/state, see [architecture_guide.md](./architecture_guide.md).

The visual system follows the **OccupySaaS protest-poster** language — paper and ink, wide uppercase display type, square corners, thick rules and solid offset shadows with press feedback — recoloured around a single **poster yellow (`#F9E279`)** instead of OccupySaaS red. Readability comes first: yellow is only ever a *fill* with ink text on top, never bare text on a light ground.

## 1. Visual Design Philosophy & Tokens

### 1.1. Light-First Paper, Dark Ink Variant
Light is the `:root` default (`color-scheme: light`); dark flips the same token names under `:root[data-theme="dark"]`. The saved/OS-preferred theme is applied via `data-theme` on `<html>`.

### 1.2. Color Palette System (`_tokens.css`)
| Token | Light | Dark | Use |
| :--- | :--- | :--- | :--- |
| `--bg-main` / `--bg-glass` | `#F7F5EF` (paper) | `#121110` | page background, sticky top bar |
| `--bg-card` | `#FFFFFF` | `#1C1A16` | card surfaces |
| `--bg-card-hover` | `#FDF3C4` (yellow tint) | `#28251F` | surface-card header bands |
| `--ink` / `--border-color` | `#1A1814` | `#000` / `#F4EFE0` | rules and borders |
| `--text-primary` / `-secondary` / `-muted` | `#1A1814` / `#4A463D` / `#5F5A4E` | `#F4EFE0` / `#D4CDB9` / `#A9A28F` | text (muted ≥ 6.3:1) |
| `--primary` / `--primary-hover` | `#F9E279` / `#F2D24B` | `#F9E279` / `#FBEAA0` | **fills only** — active tab, marquee, buttons, metric icon, selection, progress stripes |
| `--primary-contrast` | `#1A1814` | `#14130F` | text drawn on `--primary` (13.7:1) |
| `--primary-text` / `-hover` | `#6B4E00` / `#4D3800` | `#F9E279` / `#FCEFB4` | yellow-family *foreground*: links, outlined numerals, tags, subtitle (7:1 on paper) |
| `--primary-strong` | `#D9A800` | `#F9E279` | decorative strokes: pomodoro ring, inner card frames, tab hover underline |
| `--shadow-accent` | ink | `--primary` | accent offset shadows (ink on paper, yellow on dark) |
| `--focus-ring` | `#1D4FBF` | `--primary` | `:focus-visible` outlines — yellow would vanish on paper |
| `--on-accent` | `#FFFFFF` | `#14130F` | text on lime/amber/sky/rose fills |
| `--accent-lime` | `#1F6B3A` | `#6DD391` | "done" status |
| `--accent-amber` | `#A14A00` | `#FFAE5E` | "in progress" status |
| `--accent-sky` / `--accent-purple` | `#1D4FBF` / `#5A3D99` | `#8DB2FF` / `#C2A8FF` | info / resource badges |
| `--accent-rose` | `#A3195B` | `#FF8AB8` | danger: reset hover, delete, error toast |
| `--status-idle` | `#5F5A4E` | `#A9A28F` | "not started" |

All text/background pairs meet WCAG AA (≥ 4.5:1); most exceed 6:1.

### 1.3. Border, Radius, Shadow, Transition Tokens
- `--radius-{sm,md,lg}` are **0** (square corners); `--radius-full` stays for the pomodoro ring.
- `--border-thin` (2px), `--border-thick` (3px), `--rule` (4px) solid ink lines.
- Offset shadows have no blur. Interactive elements lift on hover (`translate(-2px,-2px)` + larger shadow) and press on `:active`.
- Transitions: `--transition-fast: 0.12s`, `--transition-normal: 0.2s`.

### 1.4. Spacing & Typography
4px-grid spacing tokens (`--space-3xs`…`--space-3xl`). Fonts: **Archivo** (variable width; headings use `wdth` 125 via `--wdth-display`, uppercase, weight 900), **JetBrains Mono** for labels, numbers and badges, **Permanent Marker** for hand-lettered accents (next-section title, quit-card titles). A faint paper-grain SVG overlay sits on `body::before`.

## 2. Layered CSS File Breakdown
`@layer reset, base, components, views, utilities` (`main.css`). `_tokens.css` (palette, base layer) · `_reset-base.css` · `_header.css` · `_tabs.css` · `_main-layout.css` (largest — cards, metrics, progress, filter pills, toast) · `_views.css` (view-specific blocks) · `_pomodoro.css` · `_responsive.css`.

## 3. UI Component Dictionary

### 3.1. Header Bar (`.app-header`)
Brand mark: ink square with a 3px poster-yellow frame, paper-coloured line-art book and a yellow check mark; tilted -4°, straightens on hover. A decorative yellow slogan marquee (`.app-marquee`, `aria-hidden`, paused under `prefers-reduced-motion`) runs under the top bar. Export/Import/Reset/Lang/Theme icon buttons. `.app-header` and `.nav-tabs-container` share one sticky owner, `.app-topbar`, so the tab bar always sticks flush under the header regardless of header height. At `max-width: 768px` the all-icon `.header-actions` row wraps to its own line, left-aligned under the brand, instead of squeezing against it.

### 3.2. Navigation Tab Bar
5 tabs: Dashboard, Chapters, Pomodoro, Resources, Quit Criteria. Active tab gets a solid yellow fill + ink text and a 4px ink underline; its badge inverts to ink with yellow text. Dashboard tab carries the live overall-% badge.

### 3.3. Dashboard View (`<book-view-dashboard>`)
3 metric tiles (Sections read, Flashcards done, Focus hours — no hands-on tile, since this book has no hands-on axis), 1 overall progress bar, 1 "Up next" card, and a per-chapter progress list (published chapters only).

### 3.4. Chapter Card (`.chapter-card`)
4px rule border with offset shadow, header with an outlined display numeral chapter-number badge (shows `displayNum` — "A" for the appendix — when set, else `num`), title, section/time meta, status badge + %, progress bar, collapsible section list, flashcard deliverable card. No lab card — this book has no hands-on axis. Title has `min-width: 8rem` (plus `overflow-wrap: anywhere` fallback) so the header row wraps the status badge to its own line on narrow screens instead of breaking the title mid-word — same fix on the Dashboard's per-chapter progress rows.

### 3.5. Section Row (`.item-row`)
Section number, title, subsection tag chips, estimated minutes, and a single "Read" checkbox. Title and badge follow the same narrow-screen wrap fix as §3.4: `min-width: 8rem` + `overflow-wrap: anywhere` on the title, `flex-shrink: 0` on the badge.

### 3.6. Pomodoro View (`<book-view-pomodoro>`) — own tab
Timer state machine, 25/5·50/5·custom presets, session history, chime + browser notification. Zero coupling to book content.

### 3.7. Deliverable Card (`.deliverable-card`)
Used for **flashcards**. Checkbox + link to `flashcards_guide.md`.

### 3.8. Resource Card (`.resource-card`)
Glossary terms + further-reading links merged into one searchable, chapter-filterable grid. Chapter tag chips render `displayNum` for the appendix ("Ch. A") rather than a raw number.

### 3.9. Quit Criteria Module Card (`.quit-module-card`)
Placard-style card per chapter: slight alternating rotation, inner yellow frame, marker-font title, stop-signal and exit-criteria boxes.

### 3.10. Toast Notifications (`.toast`)
Transient success/error toast, top-right.

## 4. Icons (`src/utils/icons.ts`)
Inline-SVG icon dictionary (`bookOpen`, `cards`, `pomodoro`, `layers`, `shieldAlert`, ...).
