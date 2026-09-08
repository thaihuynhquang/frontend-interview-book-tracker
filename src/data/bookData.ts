import type { Chapter, GlossaryTerm, Resource, QuitCriteriaRow, FlashcardTask, Lang } from "../types/appState";
import { getChaptersVi, getQuitCriteriaVi, getGlossaryVi, getResourcesVi, getFlashcardTasksVi } from "./bookData.vi";
import { getChaptersEn, getQuitCriteriaEn, getGlossaryEn, getResourcesEn, getFlashcardTasksEn } from "./bookData.en";
import { getLangState } from "../state/storage";
import { TOTAL_SECTIONS, TOTAL_FLASHCARDS } from "../constants";

function assertIdSetsMatch(label: string, viIds: string[], enIds: string[]): void {
  if (import.meta.env.PROD) return;
  const viSet = new Set(viIds);
  const enSet = new Set(enIds);
  const diverged = viIds.length !== enIds.length || viIds.some((id) => !enSet.has(id)) || enIds.some((id) => !viSet.has(id));
  if (diverged) {
    console.error(`[bookData] id set mismatch between bookData.vi.ts and bookData.en.ts for ${label}`);
  }
}

function assertContentCounts(): void {
  if (import.meta.env.PROD) return;
  const chapters = getChaptersVi();
  const totalSections = chapters.reduce((sum, c) => sum + c.sections.length, 0);
  if (chapters.length !== 11) {
    console.error(`[bookData] expected 11 chapters, found ${chapters.length}`);
  }
  if (totalSections !== TOTAL_SECTIONS) {
    console.error(`[bookData] expected ${TOTAL_SECTIONS} sections, found ${totalSections}`);
  }
  if (getFlashcardTasksVi().length !== TOTAL_FLASHCARDS) {
    console.error(`[bookData] expected ${TOTAL_FLASHCARDS} flashcard tasks, found ${getFlashcardTasksVi().length}`);
  }
}

assertIdSetsMatch("chapters", getChaptersVi().map((c) => c.id), getChaptersEn().map((c) => c.id));
assertIdSetsMatch("quitCriteria", getQuitCriteriaVi().map((q) => q.id), getQuitCriteriaEn().map((q) => q.id));
assertIdSetsMatch("glossary", getGlossaryVi().map((t) => t.id), getGlossaryEn().map((t) => t.id));
assertContentCounts();

function lang(): Lang {
  return getLangState();
}

export function getChapters(): Chapter[] {
  return lang() === "vi" ? getChaptersVi() : getChaptersEn();
}

export function getQuitCriteriaData(): QuitCriteriaRow[] {
  return lang() === "vi" ? getQuitCriteriaVi() : getQuitCriteriaEn();
}

export function getGlossary(): GlossaryTerm[] {
  return lang() === "vi" ? getGlossaryVi() : getGlossaryEn();
}

export function getResources(): Resource[] {
  return lang() === "vi" ? getResourcesVi() : getResourcesEn();
}

export function getFlashcardTasks(): FlashcardTask[] {
  return lang() === "vi" ? getFlashcardTasksVi() : getFlashcardTasksEn();
}

export function getMetaData(): { totalSections: number; totalFlashcards: number } {
  const chapters = getChapters();
  return {
    totalSections: chapters.reduce((sum, c) => sum + c.sections.length, 0),
    totalFlashcards: getFlashcardTasks().length,
  };
}
