import type { RouteId } from "./types/appState";

export const STORAGE_KEY = "fi-tracker-state";
export const THEME_KEY = "fi-tracker-theme";
export const LANG_KEY = "fi-tracker-lang";

export const ROUTE_IDS: RouteId[] = [
  "dashboard",
  "chapters",
  "pomodoro",
  "resources",
  "quitcriteria",
];

// Pre-merge saves/backups may still reference retired route ids.
export const LEGACY_ROUTE_ALIASES: Record<string, RouteId> = {
  glossary: "resources",
  labs: "chapters",
};

export const CHAPTER_STATUS_COLOR: Record<"notStarted" | "inProgress" | "done", string> = {
  notStarted: "var(--status-idle)",
  inProgress: "var(--accent-amber)",
  done: "var(--accent-lime)",
};

export const TOTAL_SECTIONS = 49;
export const TOTAL_FLASHCARDS = 7;

export const DEFAULT_POMODORO_WORK_MINUTES = 25;
export const DEFAULT_POMODORO_BREAK_MINUTES = 5;
export const DEFAULT_POMODORO_LONG_BREAK_MINUTES = 15;

export const FLASHCARDS_GUIDE_URL =
  "https://github.com/thaihuynhquang/frontend-interview-book-tracker/blob/main/docs/content/flashcards_guide.md";
