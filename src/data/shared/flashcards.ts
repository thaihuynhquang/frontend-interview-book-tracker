import type { FlashcardTask } from "../../types/appState";
import { CHAPTER_META } from "./chapterMeta";

export const FLASHCARD_TASKS: FlashcardTask[] = CHAPTER_META.filter((meta) => !meta.tbd).map((meta) => ({
  id: meta.flashcardId,
  chapterId: meta.id,
}));
