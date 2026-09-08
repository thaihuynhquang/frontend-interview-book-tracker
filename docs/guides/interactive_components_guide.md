# PRODUCT REQUIREMENT DOCUMENT (PRD): INTERACTIVE UI COMPONENTS & USER FLOW SPECIFICATIONS

PRD and interaction spec for the **Frontend Interview Book Tracker**'s 5 tabs and state contract.

## 1. Purpose & Interactive Design Principles

Every interactive element writes to `AppState` (`src/state/storage.ts`) and immediately triggers a full re-render (`renderAll()`), except the two documented incremental-patch exceptions (chapter card patch in `book-view-chapters.ts`, search-input value preservation in `bindSearch`). No component keeps state the user would expect to survive a reload outside `AppState`.

## 2. Global Features & Navigation Bar Specifications (PRD-01)

### 2.1. Theme Switcher (Dark/Light Mode)
Toggle button in header; persists to `fi-tracker-theme`; sets `data-theme` on `<html>` before first paint via inline detection in `state/storage.ts`.

### 2.2. Language Switcher (VI/EN)
Toggle button; persists to `fi-tracker-lang`; re-runs `applyStaticTranslations()` + `renderAll()`. Chapter/section **titles stay in English** in both languages (they're the book's official TOC wording) — only summaries, glossary, resources labels, and quit-criteria text translate.

### 2.3. Export Backup
Downloads `frontend-interview-tracker-backup-<date>.json` — the full `AppState` object.

### 2.4. Import Backup
Validates shape (`isValidAppState` in `actions/backup.ts`) before replacing state — no `handsOn`/`labDone` fields to validate (removed from the schema).

### 2.5. Progress Reset
Confirm dialog → `resetProgress()` clears `read` and `flashcardDone`, preserves `activeTab`/`theme`/`lang`.

### 2.6. Hash Router & Dynamic Navigation Badge
`router.ts` toggles `[data-view].hidden`; Dashboard tab shows a live `overallPct` badge, updated via `registerRenderListener(updateNavBadge)`.

## 3. Dashboard View Specifications (PRD-02)

### 3.1. Metric Tiles
3 tiles: Sections read (`readCount`/`TOTAL_SECTIONS`), Flashcards done (`flashcardDoneCount`), Focus hours (from Pomodoro sessions). No hands-on tile — this book has no hands-on axis.

### 3.2. Progress Overview Card
Single bar showing `overallPct = readPct * 0.5 + flashcardPct * 0.5`.

### 3.3. Active Chapter & Next Focus Card
Shows the first incomplete published chapter and its next unread section, with a one-click "Mark as read" button. When every published chapter is complete, shows an all-done state (chapters still pending MEAP publication don't block this).

### 3.4. Per-Chapter Progress List
One row per **published** chapter (`tbd: false`) — pending chapters are excluded so they don't clutter a list the user can't act on yet.

## 4. Chapters View Specifications (PRD-03)

### 4.1. Chapter Cards with Collapsible Section List
Chapter-number badge shows `displayNum` when set (Appendix A shows "A", not "11"). Cards for `tbd: true` chapters render a compact variant: number badge, title, a "Coming soon" status badge, the TBD notice text, and still a flashcard card (so the user can pre-plan, even though the chapter can't be completed yet).

### 4.2. Section Checklist (Read only)
Each section row has exactly one checkbox — **Read**. There is no hands-on axis: this is an interview-prep book with no coding exercises baked into the text.

### 4.3. Collapsible Section List
Unchanged: a toggle button collapses/expands the section list per chapter, state kept in a `Set<string>` on the view instance (not persisted).

## 5. Chapter Deliverable Specifications (PRD-04)

### 5.1. Flashcard Task Checklist
One checkbox per published chapter, linking to `flashcards_guide.md`. There is no lab checklist — this book has no hands-on lab track.

## 6. Resources View Specifications (PRD-06)

### 6.1. Search & Chapter Filter
Unchanged: live-filters glossary terms + resource links by text match and chapter chip. Chapter chips render `displayNum` for the appendix.

### 6.2. Card Links
Each card has a primary "Open link"/MDN link and, for glossary terms with a `specUrl`, a secondary Spec link.

## 7. Quit Criteria View Specifications (PRD-07)

### 7.1. Combined Decision Matrix
One card per chapter (all 11, including pending ones with placeholder text), two boxes: Stop Signal, Exit Criteria.

### 7.2. Real-Time Search
Unchanged: filters by chapter title + both text fields.

## 8. Acceptance Criteria & Component Interaction Matrix

| Action | State mutation | Re-render scope |
| :--- | :--- | :--- |
| Toggle section read | `toggleRead(sectionId)` | patched chapter card + nav badge |
| Toggle flashcard done | `toggleFlashcardDone(flashcardId)` | patched chapter card + nav badge |
| Change filter chip | local view state only | full view refresh |
| Toggle theme/lang | `setThemeState`/`setLangState` | full app re-render |
| Export/Import/Reset | `actions/backup.ts` / `resetProgress()` | full app re-render + toast |

## 9. Pomodoro View Specifications (PRD-08, own tab, tracked but not weighted)
Timer, presets, session history, chime, browser notification. `pomodoroSessions` contributes to the dashboard's "Focus hours" tile only — it is not part of `overallPct`.
