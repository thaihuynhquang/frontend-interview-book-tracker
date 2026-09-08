import { getChapters } from "./data/bookData";
import { getState } from "./state/storage";
import type { Chapter, Section } from "./types/appState";
import { CHAPTER_STATUS_COLOR, TOTAL_FLASHCARDS, TOTAL_SECTIONS } from "./constants";

export type ChapterStatus = "notStarted" | "inProgress" | "done";

export interface ChapterProgress {
  chapter: Chapter;
  total: number;
  readCount: number;
  percentage: number;
  estMinutes: number;
  status: ChapterStatus;
  statusColor: string;
}

export interface ProgressStats {
  readPct: number;
  flashcardPct: number;
  overallPct: number;
  readCount: number;
  flashcardDoneCount: number;
  activeChapter: Chapter | null;
  nextSection: Section | null;
  chapterProgresses: ChapterProgress[];
}

function isChapterComplete(chapter: Chapter, state: ReturnType<typeof getState>): boolean {
  if (chapter.tbd) return true;
  return chapter.sections.every((s) => state.read[s.id]);
}

function buildChapterProgress(chapter: Chapter, state: ReturnType<typeof getState>): ChapterProgress {
  const total = chapter.sections.length;

  if (chapter.tbd || total === 0) {
    return {
      chapter,
      total: 0,
      readCount: 0,
      percentage: 0,
      estMinutes: 0,
      status: "notStarted",
      statusColor: CHAPTER_STATUS_COLOR.notStarted,
    };
  }

  let readCount = 0;
  let estMinutes = 0;
  for (const section of chapter.sections) {
    if (state.read[section.id]) readCount++;
    estMinutes += section.estMinutes;
  }

  const percentage = Math.round((readCount / total) * 100);
  const status: ChapterStatus = percentage === 100 ? "done" : percentage > 0 ? "inProgress" : "notStarted";

  return {
    chapter,
    total,
    readCount,
    percentage,
    estMinutes,
    status,
    statusColor: CHAPTER_STATUS_COLOR[status],
  };
}

export function calculateProgress(): ProgressStats {
  const chapters = getChapters();
  const state = getState();

  let readCount = 0;
  for (const chapter of chapters) {
    for (const section of chapter.sections) {
      if (state.read[section.id]) readCount++;
    }
  }

  let flashcardDoneCount = 0;
  for (const chapter of chapters) {
    if (state.flashcardDone[chapter.flashcardId]) flashcardDoneCount++;
  }

  const readPct = (readCount / TOTAL_SECTIONS) * 100;
  const flashcardPct = (flashcardDoneCount / TOTAL_FLASHCARDS) * 100;
  const overallPct = readPct * 0.5 + flashcardPct * 0.5;

  const activeChapter = chapters.find((c) => !isChapterComplete(c, state)) ?? null;
  const nextSection = activeChapter
    ? (activeChapter.sections.find((s) => !state.read[s.id]) ?? null)
    : null;

  const chapterProgresses = chapters.map((c) => buildChapterProgress(c, state));

  return {
    readPct,
    flashcardPct,
    overallPct,
    readCount,
    flashcardDoneCount,
    activeChapter,
    nextSection,
    chapterProgresses,
  };
}
