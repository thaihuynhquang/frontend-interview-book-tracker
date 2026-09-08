# BOOK DATA MODEL GUIDE

**Read first.** TypeScript schema, id conventions, and the 11-chapter / 49-section mapping for *Acing the Frontend Interview* (Manning, MEAP).

## 1. Source of truth files

| File | Holds |
| :--- | :--- |
| `src/data/shared/chapterMeta.ts` | Chapter list — id, num, displayNum, part, title, tbd, flashcardId, glossaryRefs |
| `src/data/shared/sections.ts` | `SECTIONS_BY_CHAPTER` — every section/subsection, keyed by `chapter.num` |
| `src/data/bookData.{en,vi}.ts` | Per-language chapter summaries; composes `Chapter[]` from the two shared files above |
| `src/data/glossary/{en,vi}.ts` | `GlossaryTerm[]` — interview vocabulary, id `term-<slug>` |
| `src/data/shared/resources.ts` | `Resource[]` — language-neutral further-reading links |
| `src/data/quitCriteria/{en,vi}.ts` | Per-chapter stop-signal / exit-criteria text |
| `src/data/shared/flashcards.ts` | `FlashcardTask[]` — derived from `CHAPTER_META.filter(m => !m.tbd)` |
| `src/data/bookData.ts` | Language-switching facade (`getChapters()`, `getGlossary()`, ...) + dev-only assertion checks |

## 2. TypeScript interfaces

```ts
interface SubSection { num: string; title: string; }

interface Section {
  id: string;           // ch-<N>-s<index>
  num: string;           // "3.7" or "A.4"
  title: string;
  subsections: SubSection[];
  estMinutes: number;    // estimated reading time
}

interface Chapter {
  id: string;             // ch-<N>
  num: number;            // internal ordinal, 1-11 (Appendix A = 11)
  displayNum?: string;    // "A" for Appendix A, undefined otherwise
  part: number;           // 1 Frontend foundations · 2 Beyond the frontend · 3 Interview strategies · 4 Appendixes
  title: string;
  summary: string;
  tbd: boolean;           // true = not yet published by Manning (MEAP)
  sections: Section[];
  flashcardId: string;    // fc-ch-<N>
  glossaryRefs: string[]; // term ids referenced by this chapter
}

interface FlashcardTask { id: string; chapterId: string; }

interface GlossaryTerm {
  id: string;         // term-<kebab-case>
  name: string;
  chapterIds: string[];
  description: string;
  mdnUrl: string;      // reference link — MDN when it exists, else TS Handbook / React docs / Wikipedia
  specUrl?: string;
}

type ResourceType = "mdn" | "spec" | "article" | "video" | "demo" | "tool";
interface Resource { id: string; chapterId: string; title: string; url: string; type: ResourceType; }

interface QuitCriteriaRow { id: string; chapterId: string; stopSignal: string; exitCriteria: string; }
interface QuitCriteriaText { stopSignal: string; exitCriteria: string; }
```

There is **no `Lab` type** in this app — the source book (interview prep, not a hands-on coding book) has no lab exercises, so there is no `handsOn`/`labDone` state axis or lab-card UI.

## 3. State keys written to `localStorage` (`AppState`)

```ts
interface AppState {
  read: Record<string, boolean>;          // keyed by section id
  flashcardDone: Record<string, boolean>; // keyed by flashcardId
  activeTab: RouteId;
  theme: Theme;
  lang: Lang;
  pomodoroSettings: PomodoroSettings;
  pomodoroSessions: PomodoroSession[];
}
```

Storage keys (`src/constants.ts`): `fi-tracker-state`, `fi-tracker-theme`, `fi-tracker-lang`.

## 4. Id conventions (do not deviate)

| Entity | Pattern | Example |
| :--- | :--- | :--- |
| Chapter | `ch-<N>` | `ch-3`, `ch-11` (Appendix A) |
| Section | `ch-<N>-s<index>` | `ch-3-s7` |
| Flashcard task | `fc-ch-<N>` | `fc-ch-6` |
| Quit-criteria row | `qc-ch-<N>` | `qc-ch-1` |
| Resource | `res-ch-<N>-<K>` | `res-ch-4-2` |
| Glossary term | `term-<kebab-case>` | `term-event-loop` |

`state.read` and `state.flashcardDone` are keyed by these ids — **changing an id invalidates every user's saved progress**. Appendix A keeps `num: 11` internally (so ids stay `ch-11-s*`) and only changes its *display* label via `displayNum: "A"`.

## 5. Full chapter → section id map

### Part 1 — Frontend foundations

**Chapter 1 — `ch-1` — "The frontend interview"** (7 sections)
`ch-1-s1`…`ch-1-s7` = 1.1 Jane's interview · 1.2 The interview process · 1.3 The funneling approach to web development fundamentals · 1.4 Walking through React fundamentals · 1.5 AI-powered tools and trends in frontend interviews · 1.6 Frontend interview tools · 1.7 Summary.

**Chapter 2 — `ch-2` — "HTML and CSS essentials"** (5 sections)
`ch-2-s1`…`ch-2-s5` = 2.1 The importance of semantic HTML · 2.2 Separating content from presentation · 2.3 Leveraging HTML APIs in React development · 2.4 Working with HTML forms · 2.5 Summary.

**Chapter 3 — `ch-3` — "JavaScript and TypeScript deep dive"** (12 sections, heaviest chapter)
`ch-3-s1`…`ch-3-s12` = 3.1 JavaScript execution and scope · 3.2 Functional programming and functionality · 3.3 Asynchronous behavior in JavaScript · 3.4 Memory management and code architecture · 3.5 Jane's JavaScript interview skill assessment · 3.6 The rising significance of TypeScript · 3.7 Type system · 3.8 Functions, classes, and advanced types · 3.9 Type safety and tools · 3.10 Jane's TypeScript interview skill assessment · 3.11 TypeScript: Current trends and future outlook · 3.12 Summary.

**Chapter 4 — `ch-4` — "React core principles and patterns"** (6 sections)
`ch-4-s1`…`ch-4-s6` = 4.1 Declarative UI: The React way · 4.2 Data flow and state management · 4.3 Built-in hooks and custom hooks · 4.4 React component lifecycle and patterns · 4.5 Debugging and enhancing application performance · 4.6 Summary.

**Chapter 5 — `ch-5` — "React libraries and toolchain"** (5 sections)
`ch-5-s1`…`ch-5-s5` = 5.1 React routing and mega-frameworks · 5.2 Scalable UI patterns · 5.3 Globalization: i18n, l10n, and white labeling · 5.4 React toolchain · 5.5 Summary.

### Part 2 — Beyond the frontend

**Chapter 6 — `ch-6` — "Foundations of distributed system design"** (7 sections)
`ch-6-s1`…`ch-6-s7` = 6.1 Architectural paradigms · 6.2 Distributed computing fundamentals · 6.3 Load distribution and balancing · 6.4 Caching strategies · 6.5 Data replication, sharding, and partitioning · 6.6 Communication, observability, and monitoring · 6.7 Summary.

**Chapter 7 — `ch-7` — "Microservices architecture demystified"** — `tbd: true`, 0 sections (MEAP).

### Part 3 — Interview strategies

**Chapter 8 — `ch-8` — "The RADIO framework for interview success"** — `tbd: true`.
**Chapter 9 — `ch-9` — "Strategies and techniques for behavioral interviews"** — `tbd: true`.
**Chapter 10 — `ch-10` — "AI in frontend interviews"** — `tbd: true`.

### Appendixes

**Chapter 11 — `ch-11` — "Appendix A: Quick reference"** (`displayNum: "A"`, 7 sections)
`ch-11-s1`…`ch-11-s7` = A.1 HTML APIs and related libraries · A.2 The TC39 process · A.3 JSX best practices (A.3.1, A.3.2) · A.4 Essential React Hooks and the use API (A.4.1–A.4.4) · A.5 React's component lifecycle (A.5.1, A.5.2) · A.6 Handling runtime errors (A.6.1, A.6.2) · A.7 React resources for Angular and Vue developers.

## 6. Counts (for verification)

- 11 chapters total, 7 with content (`tbd: false`) + 4 pending (`tbd: true`).
- `TOTAL_SECTIONS = 49` (7+5+12+6+5+7+7 across the 7 published chapters).
- `TOTAL_FLASHCARDS = 7` — one per published chapter; pending chapters get **no** flashcard task, so they never drag progress below 100% once everything published is done.
- 37 glossary terms, id-parity enforced between `en.ts`/`vi.ts` by `assertIdSetsMatch()` in `bookData.ts`.

## 7. Updating this file when Manning publishes chapters 7–10

1. Add the section list to `SECTIONS_BY_CHAPTER[<num>]` in `sections.ts`.
2. Flip `tbd: false` in `chapterMeta.ts` for that chapter — it then automatically gets a flashcard task (see `flashcards.ts`) and counts toward `TOTAL_SECTIONS`/`TOTAL_FLASHCARDS`.
3. Update `TOTAL_SECTIONS`/`TOTAL_FLASHCARDS` in `src/constants.ts` to match.
4. Write real `summary`, `glossaryRefs`, quit-criteria text, and any new glossary/resource entries.
5. Update the tables in this file and in `docs/content/chapters.md`.
