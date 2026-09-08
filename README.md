# Frontend Interview Book Tracker

An interactive web tracker for reading progress and flashcard review through the book [*Acing the Frontend Interview*](https://www.manning.com/books/acing-the-frontend-interview) (Manning, MEAP). Cloned from [`vanilla-web-book-tracker`](https://github.com/thaihuynhquang/vanilla-web-book-tracker) and re-pointed at this book — see `docs/` for the full blueprint.

## Run locally

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # type-check + production build to dist/
npm run typecheck # tsc --noEmit only
```

Automatically deployed to GitHub Pages via `.github/workflows/deploy.yml` on push to `main` — see [github_pages_deployment_guide.md](docs/guides/github_pages_deployment_guide.md).

## Architecture

Vanilla TypeScript + native Custom Elements (Light DOM) + layered vanilla CSS + `localStorage`. Zero runtime dependencies. Details in [architecture_guide.md](docs/guides/architecture_guide.md) and [project_structure.md](docs/guides/project_structure.md).

## Documentation map

### `docs/guides/` — technical, app build
| File | Contents |
| :--- | :--- |
| [book_data_model_guide.md](docs/guides/book_data_model_guide.md) | **Read first.** TypeScript schema, id conventions, 11-chapter / 49-section mapping table. |
| [architecture_guide.md](docs/guides/architecture_guide.md) | Overall architecture, tech stack, design patterns, replication blueprint. |
| [project_structure.md](docs/guides/project_structure.md) | Full directory tree, responsibility of each file. |
| [interactive_components_guide.md](docs/guides/interactive_components_guide.md) | PRD/UX — 5 tabs, state contract, acceptance criteria. |
| [ui_system_design_guide.md](docs/guides/ui_system_design_guide.md) | Design tokens (No Starch Press-style palette), CSS `@layer`, component dictionary. |
| [github_pages_deployment_guide.md](docs/guides/github_pages_deployment_guide.md) | CI/CD via GitHub Actions → GitHub Pages. |

### `docs/content/` — book content
| File | Contents |
| :--- | :--- |
| [chapters.md](docs/content/chapters.md) | Map of all 11 chapters: summary, sections, reading time. Chapters 7–10 are MEAP-pending. |
| [flashcards_guide.md](docs/content/flashcards_guide.md) | Workflow for generating flashcards with Gemini/NotebookLM after each chapter. |
| [glossary.md](docs/content/glossary.md) | 37 interview-vocabulary terms by chapter. |
| [resources.md](docs/content/resources.md) | Further reading: articles, videos, tools — by chapter. |
| [quit_criteria_guide.md](docs/content/quit_criteria_guide.md) | Stop/skip matrix and exit criteria for each chapter. |

> Chapter summaries, reading-time estimates, and glossary/resources/quit-criteria content are written from the book's public table of contents, not from the published text — treat them as a study aid, not a substitute for reading the book.

## Progress model

```
Overall % = Read % × 0.5 + Flashcard % × 0.5
```

Computed only across the 7 chapters Manning has published so far (49 sections, 7 flashcard tasks). Chapters 7–10 show a "Coming soon" badge and are excluded from the denominator. This book has no hands-on-lab track, so — unlike the sibling `vanilla-web-book-tracker` — there is no hands-on/lab axis in the formula.
