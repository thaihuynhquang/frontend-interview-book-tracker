# ARCHITECTURE & REPLICATION GUIDE

Technical architecture, stack, design patterns, and data flow for the **Frontend Interview Book Tracker** app. Reference for anyone extending `src/`.

> This app has no hands-on-lab track, since the source book (*Acing the Frontend Interview*, Manning) has none — progress is tracked purely on reading and flashcard review.

## 1. Architectural Overview

Vanilla TypeScript + native Custom Elements (Light DOM, no Shadow DOM) + layered vanilla CSS + `localStorage`. Zero runtime dependencies — `typescript` and `vite` are the only `devDependencies`. No framework, no virtual DOM, no build-time templating: every view is a class extending `HTMLElement` that sets `this.innerHTML` from a template-string builder function.

## 2. Tech Stack Details

| Layer | Choice |
| :--- | :--- |
| Language | TypeScript, strict mode, `noUnusedLocals`/`noUnusedParameters` |
| Bundler | Vite 6, `base: "./"` (relative paths for GitHub Pages) |
| UI | Native Custom Elements (`customElements.define`), Light DOM |
| Styling | Plain CSS, `@layer reset, base, components, views, utilities` |
| State | Module-level singleton object + `localStorage`, no external store |
| i18n | Flat key-value maps (`vi`/`en`), `data-i18n` attributes for static markup |
| Tests | None — the only correctness net is the dev-only assertion block in `bookData.ts` |

## 3. Project Directory Structure

See `project_structure.md` for the full tree.

### High-level modules
- **Bootstrap** (`main.ts`) — wires header buttons, applies theme/lang, starts the router.
- **Router** (`router.ts`) — hash router over `RouteId`, toggles `[data-view].hidden` + `.active` nav tab.
- **Renderer** (`renderer.ts`) — a 17-line pub/sub: any state mutation calls `renderAll()`, which notifies every registered view to `refresh()`.
- **State** (`state/storage.ts`) — one `AppState` object, every mutator ends with `saveState()`.
- **Progress** (`progress.ts`) — pure functions computing per-chapter and overall percentages from `AppState` + `getChapters()`.
- **Views** (`views/*.ts`) — one Custom Element per tab, each pulling from `data/bookData.ts` + `state/storage.ts` and rendering an HTML string.
- **Data** (`data/**`) — the book's content, structurally separate from the app's plumbing (see `book_data_model_guide.md`).

## 4. Core Design Patterns & Architecture Principles

### Pattern 1: Data-Driven UI Architecture
Every view is a pure function of `(bookData, appState)` — call `refresh()` and the DOM is rebuilt from scratch via `innerHTML`. No incremental diffing except one targeted optimization (`patchChapterCard` in `book-view-chapters.ts`) that swaps a single chapter card instead of the whole view, to avoid losing `content-visibility` sizing on unrelated cards.

### Pattern 2: Light-DOM Custom Elements Pattern & Lifecycle Management
`BookView` (`views/base.ts`) is the shared base class: on `connectedCallback` it registers `refresh()` with the renderer and skips work while `[hidden]`. No Shadow DOM — styles are global and layered, which keeps this book-tracker app CSS trivially shareable with a design system.

### Pattern 3: Unidirectional Data Flow & Observer Re-render Loop
Event handler → state mutator (`toggleRead`, `toggleFlashcardDone`, ...) → `saveState()` → `renderAll()` → every registered view's `refresh()`. No component-local state beyond ephemeral UI state (selected filter chip, collapsed accordion) kept as private class fields.

### Pattern 4: Two-Axis Progress Engine (`src/progress.ts`)
```
overallPct = readPct * 0.5 + flashcardPct * 0.5
readPct = readCount / TOTAL_SECTIONS * 100
flashcardPct = flashcardDoneCount / TOTAL_FLASHCARDS * 100
```
Two axes, not three — the source book has no hands-on lab track, so there is no `handsOnPct`/`deliverablesPct` term. `TOTAL_SECTIONS`/`TOTAL_FLASHCARDS` only count the 7 published chapters — the 4 MEAP-pending chapters are excluded from both the numerator and denominator so they can never depress the percentage.

### Pattern 5: Modular Layered CSS System with CSS Custom Properties
`@layer reset, base, components, views, utilities`. All colors, spacing, radii, shadows are tokens in `_tokens.css`; components never hardcode a hex value. This app's palette is a flat, high-contrast "No Starch Press cover" style — ink black + neon yellow spotlight, 2px hard borders, offset drop-shadows instead of glows — swapped in purely by changing token *values*, not names (see `ui_system_design_guide.md`).

## 5. Step-by-Step Blueprint for AI Agents

Replicating this app's architecture for a different book:

1. **Bootstrap repo** — set up `index.html`, config files, `.github/`, `public/`, `src/`, `docs/` per this document.
2. **Decide the progress axes** — does the book have hands-on labs? If yes, add a `handsOn`/`labDone` axis alongside `read`/`flashcardDone`; if no (like this one), keep it to `read`/`flashcardDone` only.
3. **Write `chapterMeta.ts` + `sections.ts`** from the book's real TOC — this fixes every id downstream.
4. **Update `constants.ts`** — storage key prefix, `TOTAL_SECTIONS`, `TOTAL_FLASHCARDS` (or whatever axis totals apply).
5. **Write `bookData.{en,vi}.ts`, glossary, resources, quitCriteria`** content.
6. **Re-skin `_tokens.css`** — same token names, new values.
7. **Update `index.html`** — title, brand mark, theme-color metas.
8. **Verify** — `npm run typecheck`, `npm run build`, then `npm run dev` and check the console is free of `[bookData]` assertion errors.

## 6. Verification Checklist

- [ ] `npm run typecheck` — no errors.
- [ ] `npm run build` — succeeds, `dist/` produced.
- [ ] Console on `npm run dev` — no `[bookData] expected …` or `id set mismatch` errors (confirms chapter/section/flashcard counts and vi↔en id parity).
- [ ] Toggling `read`/flashcard checkboxes moves the dashboard % by the expected amount (see `interactive_components_guide.md` §3).
- [ ] Export → Reset → Import round-trips progress correctly.
- [ ] Theme and language toggles persist across reload.
