# PROJECT DIRECTORY STRUCTURE

Directory tree and file responsibilities for the **Frontend Interview Book Tracker** app, as implemented in `src/`.

---

## 1. Overview Directory Tree

```
frontend-interview-book-tracker/
├── index.html
├── package.json / package-lock.json / tsconfig.json / vite.config.ts
├── .github/workflows/deploy.yml
├── public/
│   └── favicon.svg
├── docs/
│   ├── content/    chapters.md · glossary.md · resources.md · quit_criteria_guide.md · flashcards_guide.md
│   └── guides/     book_data_model_guide.md · architecture_guide.md · project_structure.md
│                    ui_system_design_guide.md · interactive_components_guide.md · github_pages_deployment_guide.md
└── src/
    ├── main.ts             bootstrap: header buttons, icons, router
    ├── router.ts            hash router over RouteId
    ├── renderer.ts           pub/sub re-render mechanism
    ├── progress.ts           progress math — readPct*0.5 + flashcardPct*0.5
    ├── nav-badge.ts
    ├── toast.ts
    ├── constants.ts          storage keys, route ids, TOTAL_SECTIONS/TOTAL_FLASHCARDS
    ├── types/appState.ts     domain + state interfaces
    ├── state/storage.ts      AppState singleton + mutators
    ├── actions/backup.ts     export/import JSON
    ├── i18n/                 strings.ts (vi/en) · index.ts (t()) · dom.ts
    ├── utils/                icons.ts · audio.ts · notification.ts · html.ts
    ├── views/
    │   ├── index.ts
    │   ├── base.ts                    BookView custom-element base class
    │   ├── helpers.ts                 shared HTML builders (filter chips, cards, search)
    │   ├── book-view-dashboard.ts
    │   ├── book-view-chapters.ts
    │   ├── book-view-pomodoro.ts
    │   ├── book-view-resources.ts
    │   └── book-view-quitcriteria.ts
    ├── styles/               main.css + _tokens/_reset-base/_header/_tabs/_main-layout/_views/_pomodoro/_responsive
    └── data/
        ├── bookData.ts               language-switching facade + dev assertions
        ├── bookData.en.ts / .vi.ts   chapter summaries + composition
        ├── shared/
        │   ├── chapterMeta.ts        11 chapters — id, num, displayNum, part, title, tbd, flashcardId, glossaryRefs
        │   ├── sections.ts           49 sections across 7 published chapters
        │   ├── resources.ts          language-neutral further-reading links
        │   └── flashcards.ts         derived from chapterMeta (published chapters only)
        ├── glossary/{en,vi}.ts       37 interview-vocabulary terms
        └── quitCriteria/{en,vi}.ts   per-chapter stop-signal / exit-criteria
```

## 2. Directory Responsibilities

### `.github/`
`workflows/deploy.yml` — builds and deploys `dist/` to GitHub Pages on push to `main` (see `github_pages_deployment_guide.md`).

### `docs/content/`
Hand-authored source-of-truth for book content — transcribed into `src/data/**`. See individual files for detail. **No `labs.md`**: this book has no hands-on lab track.

### `docs/guides/`
Technical documentation for the app itself: data model, architecture, directory layout, design tokens, PRD, deployment.

### `src/`
See the tree above. The split between `src/data/shared/` (language-neutral: chapter meta, sections, resources, flashcard derivation) and `src/data/{glossary,quitCriteria}/{en,vi}.ts` (language-specific prose) mirrors the id-parity contract in `book_data_model_guide.md` §4 — shared files can't drift between languages because there's only one copy.
