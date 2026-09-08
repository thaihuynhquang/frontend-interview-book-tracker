# UI SYSTEM DESIGN & COMPONENT LAYOUT GUIDE

Design language, tokens, and component dictionary for the **Frontend Interview Book Tracker**. For architecture/state, see [architecture_guide.md](./architecture_guide.md).

The visual system is a **No Starch Press book-cover** palette — flat, high-chroma, ink black + a single neon spotlight color, hard 2px borders, offset drop-shadows instead of glows. No gradients, no blur, no soft glow anywhere.

## 1. Visual Design Philosophy & Tokens

### 1.1. Dark-First, Flat, High-Contrast
Dark is the `:root` default (`color-scheme: dark`). Light theme flips the same token names under `:root[data-theme="light"]`. Dark theme's spotlight is pure neon yellow (`--primary: #FFE900`) on ink; light theme darkens it to a gold tone (`--primary: #C4B200`) so it stays readable as text on a paper ground, not just as a badge fill.

### 1.2. Color Palette System (`_tokens.css`)
| Token | Dark | Light | Use |
| :--- | :--- | :--- | :--- |
| `--bg-main` | `#0A0A0A` | `#F7F3E8` (paper) | page background |
| `--bg-card` | `#141414` | `#FFFFFF` | card surfaces — contrasts against the paper page ground |
| `--border-color` / `-strong` | `#2A2A2A` / `#4A4A4A` | `#0A0A0A` (both) | 2px hard borders everywhere |
| `--text-primary` / `-secondary` / `-muted` | near-white scale | near-black scale | text |
| `--primary` / `--primary-hover` | `#FFE900` / `#D6C400` | `#C4B200` / `#A89600` | brand spotlight — nav active tab, primary buttons, "done" status |
| `--primary-contrast` | `#0A0A0A` | `#0A0A0A` | text/icon color drawn *on* `--primary` — always ink, both themes |
| `--primary-glow` | `transparent` | `transparent` | kept as a token for compatibility; flat design means no glow |
| `--accent-lime` | `#FFE900` (dup of primary) | `#C4B200` (dup of primary) | "done" status color |
| `--accent-amber` / `--accent-sky` | `#00B7E4` (cyan) | `#0090B4` | "in progress" status color |
| `--accent-rose` / `--accent-purple` | `#EC008C` (magenta) | `#C4006F` | secondary accent |
| `--status-idle` | `#6B6B6B` | `#6B6B6B` | "not started" |

`--primary` used as a *background* (with ink `--primary-contrast` text on top) reads fine at any lightness, so only its use as bare foreground text needed a darker light-theme value — every other token in this table already followed that rule; `--primary` was the one gap, fixed here.

### 1.3. Radius, Shadow, Transition Tokens
- `--radius-{sm,md,lg,full}` all collapse to **2px** — flat, no rounded pill shapes, consistent with the ink-line-art cover aesthetic.
- `--shadow-{sm,md}` are **hard offset shadows**: `2px 2px 0 #000` / `4px 4px 0 #000` (light theme: `#0A0A0A`) — no blur radius, matching a printed-cover drop shadow rather than a soft elevation glow.
- Transitions unchanged (`--transition-fast: 0.15s`, `--transition-normal: 0.25s`).

### 1.4. Spacing & Typography Scale
4px-grid spacing tokens (`--space-3xs`…`--space-3xl`), Inter font family, one type scale for both themes.

## 2. Layered CSS File Breakdown
`@layer reset, base, components, views, utilities` (`main.css`). `_tokens.css` (palette, base layer) · `_reset-base.css` · `_header.css` · `_tabs.css` · `_main-layout.css` (largest — cards, metrics, progress, filter pills, toast) · `_views.css` (view-specific blocks) · `_pomodoro.css` · `_responsive.css`.

## 3. UI Component Dictionary

### 3.1. Header Bar (`.app-header`)
Brand mark: a flat 2px-bordered square, spotlight-yellow fill, ink-black line-art book icon — no gradient. Export/Import/Reset/Lang/Theme icon buttons.

### 3.2. Navigation Tab Bar
5 tabs: Dashboard, Chapters, Pomodoro, Resources, Quit Criteria. Active tab gets the spotlight fill + ink text. Dashboard tab carries the live overall-% badge.

### 3.3. Dashboard View (`<book-view-dashboard>`)
3 metric tiles (Sections read, Flashcards done, Focus hours — no hands-on tile, since this book has no hands-on axis), 1 overall progress bar, 1 "Up next" card, and a per-chapter progress list (published chapters only).

### 3.4. Chapter Card (`.chapter-card`)
2px hard border, header with chapter-number badge (shows `displayNum` — "A" for the appendix — when set, else `num`), title, section/time meta, status badge + %, progress bar, collapsible section list, flashcard deliverable card. No lab card — this book has no hands-on axis.

### 3.5. Section Row (`.item-row`)
Section number, title, subsection tag chips, estimated minutes, and a single "Read" checkbox.

### 3.6. Pomodoro View (`<book-view-pomodoro>`) — own tab
Timer state machine, 25/5·50/5·custom presets, session history, chime + browser notification. Zero coupling to book content.

### 3.7. Deliverable Card (`.deliverable-card`)
Used for **flashcards**. Checkbox + link to `flashcards_guide.md`.

### 3.8. Resource Card (`.resource-card`)
Glossary terms + further-reading links merged into one searchable, chapter-filterable grid. Chapter tag chips render `displayNum` for the appendix ("Ch. A") rather than a raw number.

### 3.9. Quit Criteria Module Card (`.quit-module-card`)
Two-column stop-signal / exit-criteria card per chapter — interview stop/skip guidance and exit criteria.

### 3.10. Toast Notifications (`.toast`)
Transient success/error toast, top-right.

## 4. Icons (`src/utils/icons.ts`)
Inline-SVG icon dictionary (`bookOpen`, `cards`, `pomodoro`, `layers`, `shieldAlert`, ...).
