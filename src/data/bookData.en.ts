import type { Chapter, QuitCriteriaRow, GlossaryTerm, Resource, FlashcardTask } from "../types/appState";
import { CHAPTER_META } from "./shared/chapterMeta";
import { SECTIONS_BY_CHAPTER } from "./shared/sections";
import { GLOSSARY_EN } from "./glossary/en";
import { QUIT_CRITERIA_EN } from "./quitCriteria/en";
import { RESOURCES } from "./shared/resources";
import { FLASHCARD_TASKS } from "./shared/flashcards";

const CHAPTER_SUMMARIES_EN: Record<number, string> = {
  1: "Frames the whole book through Jane's story — what a frontend interview loop actually looks like today, the funneling approach to fundamentals (breadth first, then depth on what the role needs), a first pass at React fundamentals, and how AI-powered tools are changing prep and the interview itself.",
  2: "Why semantic HTML still gets asked about even in React-heavy interviews: separating content from presentation, the HTML APIs interviewers expect you to reach for inside a React component (not around it), and building/validating forms correctly — a recurring \"build a login form\" style prompt.",
  3: "The core JS/TS deep dive interviewers probe hardest. JS execution and scope (closures, hoisting, the event loop), functional programming style, async behavior (callbacks → promises → async/await), memory management, then why TypeScript matters now — type annotations, inference, structural typing, generics — ending with two \"assess yourself\" skill checkpoints modeled on Jane's own prep.",
  4: "React's mental model as an interviewer expects you to explain it: declarative UI, data flow (props down, events up, lifting state), the built-in hooks plus writing your own, the full component lifecycle, and the debugging/performance techniques (profiler, memoization, avoiding unnecessary re-renders) that separate a junior answer from a senior one.",
  5: "Beyond the core: client-side routing and meta-frameworks (Next.js-style), scalable UI patterns for styling/rendering/data access at team scale, globalization (i18n/l10n/white-labeling) as an interview topic, and the modern React toolchain (bundlers, linting, testing) you're expected to know exists even if you don't configure it daily.",
  6: "Frontend interviews increasingly probe systems thinking. Architectural paradigms (monolith vs. microservices vs. serverless), distributed computing fundamentals, load balancing, caching strategies, replication/sharding/partitioning, and how communication + observability + monitoring fit together — the vocabulary for a \"design a system\" round.",
  7: "Not yet published by Manning (MEAP in progress) — no section outline exists yet. Expected to cover microservices architecture from a frontend engineer's perspective.",
  8: "Not yet published by Manning (MEAP in progress) — no section outline exists yet. Expected to introduce the RADIO framework (Requirements, Architecture, Data model, Interface, Optimizations) for system design interviews.",
  9: "Not yet published by Manning (MEAP in progress) — no section outline exists yet. Expected to cover behavioral interview strategy and technique.",
  10: "Not yet published by Manning (MEAP in progress) — no section outline exists yet. Expected to cover how AI tools are reshaping frontend interviews on both sides of the table.",
  11: "The book's quick-reference appendix: HTML APIs and related libraries, the TC39 proposal process, JSX best practices (including how JSX actually transpiles), the essential React Hooks plus the new use API, class vs. functional component lifecycle side by side, handling runtime errors (error boundaries, global error hooks), and pointers for developers coming from Angular or Vue.",
};

export function getChaptersEn(): Chapter[] {
  return CHAPTER_META.map((meta) => ({
    id: meta.id,
    num: meta.num,
    displayNum: meta.displayNum,
    part: meta.part,
    title: meta.title,
    summary: CHAPTER_SUMMARIES_EN[meta.num],
    tbd: meta.tbd,
    sections: SECTIONS_BY_CHAPTER[meta.num],
    flashcardId: meta.flashcardId,
    glossaryRefs: meta.glossaryRefs,
  }));
}

export function getQuitCriteriaEn(): QuitCriteriaRow[] {
  return CHAPTER_META.map((meta) => ({
    id: `qc-${meta.id}`,
    chapterId: meta.id,
    stopSignal: QUIT_CRITERIA_EN[meta.id].stopSignal,
    exitCriteria: QUIT_CRITERIA_EN[meta.id].exitCriteria,
  }));
}

export function getGlossaryEn(): GlossaryTerm[] {
  return GLOSSARY_EN;
}

export function getResourcesEn(): Resource[] {
  return RESOURCES;
}

export function getFlashcardTasksEn(): FlashcardTask[] {
  return FLASHCARD_TASKS;
}
