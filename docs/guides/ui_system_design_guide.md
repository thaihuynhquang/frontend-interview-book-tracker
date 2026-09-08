# UI SYSTEM DESIGN & COMPONENT LAYOUT GUIDE

Design language, tokens, and component dictionary for the **Frontend Interview Book Tracker**. For architecture/state, see [architecture_guide.md](./architecture_guide.md).

The visual system is a re-skin of the sibling `vanilla-web-book-tracker` (same CSS layer structure, same component classes) with one deliberate departure: a **No Starch Press book-cover** palette — flat, high-chroma, ink black + a single neon spotlight color, hard 2px borders, offset drop-shadows instead of glows. No gradients, no blur, no soft glow anywhere.

## 1. Visual Design Philosophy & Tokens

### 1.1. Dark-First, Flat, High-Contrast
Dark is the `:root` default (`color-scheme: dark`). Light theme flips the same token names under `:root[data-theme="light"]`. Both themes keep the same spotlight color (`--primary: #FFE900`, neon yellow) over a pure ink/paper ground — the badge/button *background* never changes between themes, only the page ground and text do.

### 1.2. Color Palette System (`_tokens.css`)
| Token | Dark | Light | Use |
| :--- | :--- | :--- | :--- |
| `--bg-main` | `#0A0A0A` | `#FFFFFF` | page background |
| `--bg-card` | `#141414` | `#FFFFFF` | card surfaces |
| `--border-color` / `-strong` | `#2A2A2A` / `#4A4A4A` | `#0A0A0A` (both) | 2px hard borders everywhere |
| `--text-primary` / `-secondary` / `-muted` | near-white scale | near-black scale | text |
| `--primary` / `--primary-hover` | `#FFE900` / `#D6C400` | same | brand spotlight — nav active tab, primary buttons, "done" status |
| `--primary-contrast` | `#0A0A0A` | `#0A0A0A` | text/icon color drawn *on* `--primary` — always ink, both themes |
| `--primary-glow` | `transparent` | `transparent` | kept as a token for compatibility; flat design means no glow |
| `--accent-lime` | `#FFE900` (dup of primary) | `#C4B200` | "done" status color |
| `--accent-amber` / `--accent-sky` | `#00B7E4` (cyan) | `#0090B4` | "in progress" status color |
| `--accent-rose` / `--accent-purple` | `#EC008C` (magenta) | `#C4006F` | secondary accent |
| `--status-idle` | `#6B6B6B` | `#6B6B6B` | "not started" |

All token *names* are unchanged from the sibling app — only values changed — so every consuming CSS rule in `_main-layout.css`/`_views.css`/`_pomodoro.css` needed zero edits beyond a global `1px solid` → `2px solid` border-width bump.

### 1.3. Radius, Shadow, Transition Tokens
- `--radius-{sm,md,lg,full}` all collapse to **2px** — flat, no rounded pill shapes, consistent with the ink-line-art cover aesthetic.
- `--shadow-{sm,md}` are **hard offset shadows**: `2px 2px 0 #000` / `4px 4px 0 #000` (light theme: `#0A0A0A`) — no blur radius, matching a printed-cover drop shadow rather than a soft elevation glow.
- Transitions unchanged (`--transition-fast: 0.15s`, `--transition-normal: 0.25s`).

### 1.4. Spacing & Typography Scale
Unchanged from the sibling app — 4px-grid spacing tokens (`--space-3xs`…`--space-3xl`), Inter font family, the same type scale.

## 2. Layered CSS File Breakdown
`@layer reset, base, components, views, utilities` (`main.css`). `_tokens.css` (palette, base layer) · `_reset-base.css` · `_header.css` · `_tabs.css` · `_main-layout.css` (largest — cards, metrics, progress, filter pills, toast) · `_views.css` (view-specific blocks) · `_pomodoro.css` · `_responsive.css`.

## 3. UI Component Dictionary

### 3.1. Header Bar (`.app-header`)
Brand mark: a flat 2px-bordered square, spotlight-yellow fill, ink-black line-art book icon (no gradient, unlike the sibling app's two-tone gradient badge). Export/Import/Reset/Lang/Theme icon buttons.

### 3.2. Navigation Tab Bar
5 tabs: Dashboard, Chapters, Pomodoro, Resources, Quit Criteria. Active tab gets the spotlight fill + ink text. Dashboard tab carries the live overall-% badge.

### 3.3. Dashboard View (`<book-view-dashboard>`)
3 metric tiles (Sections read, Flashcards done, Focus hours — no hands-on tile, since this book has no hands-on axis), 1 overall progress bar, 1 "Up next" card, and a per-chapter progress list (published chapters only).

### 3.4. Chapter Card (`.chapter-card`)
2px hard border, header with chapter-number badge (shows `displayNum` — "A" for the appendix — when set, else `num`), title, section/time meta, status badge + %, progress bar, collapsible section list, flashcard deliverable card. **No lab card** — removed along with the hands-on axis.

### 3.5. Section Row (`.item-row`)
Section number, title, subsection tag chips, estimated minutes, and a single "Read" checkbox (the sibling app's second "Hands-on" checkbox is gone).

### 3.6. Pomodoro View (`<book-view-pomodoro>`) — own tab
Unchanged from the sibling app: timer state machine, 25/5·50/5·custom presets, session history, chime + browser notification. Zero coupling to book content.

### 3.7. Deliverable Card (`.deliverable-card`)
Now used for **flashcards only** (the sibling app also used it for labs). Checkbox + link to `flashcards_guide.md`.

### 3.8. Resource Card (`.resource-card`)
Glossary terms + further-reading links merged into one searchable, chapter-filterable grid. Chapter tag chips render `displayNum` for the appendix ("Ch. A") rather than a raw number.

### 3.9. Quit Criteria Module Card (`.quit-module-card`)
Two-column stop-signal / exit-criteria card per chapter, unchanged in structure from the sibling app — only the content differs (interview stop/skip guidance instead of reading stop/skip guidance).

### 3.10. Toast Notifications (`.toast`)
Unchanged.

## 4. Icons (`src/utils/icons.ts`)
Same inline-SVG dictionary as the sibling app, unmodified — every icon used here (`bookOpen`, `cards`, `pomodoro`, `layers`, `shieldAlert`, ...) already existed.
