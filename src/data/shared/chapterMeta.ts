export interface ChapterMeta {
  id: string;
  num: number;
  displayNum?: string;
  part: number;
  title: string;
  tbd: boolean;
  flashcardId: string;
  glossaryRefs: string[];
}

export const CHAPTER_META: ChapterMeta[] = [
  { id: "ch-1", num: 1, part: 1, title: "The frontend interview", tbd: false, flashcardId: "fc-ch-1", glossaryRefs: ["term-star-method", "term-take-home-assignment", "term-whiteboard-interview"] },
  { id: "ch-2", num: 2, part: 1, title: "HTML and CSS essentials", tbd: false, flashcardId: "fc-ch-2", glossaryRefs: ["term-semantic-html", "term-separation-of-concerns", "term-controlled-component", "term-web-forms-validation"] },
  { id: "ch-3", num: 3, part: 1, title: "JavaScript and TypeScript deep dive", tbd: false, flashcardId: "fc-ch-3", glossaryRefs: ["term-event-loop", "term-closures", "term-promises", "term-async-await", "term-prototype-chain", "term-hoisting", "term-type-inference", "term-structural-typing", "term-generics", "term-type-narrowing"] },
  { id: "ch-4", num: 4, part: 1, title: "React core principles and patterns", tbd: false, flashcardId: "fc-ch-4", glossaryRefs: ["term-virtual-dom", "term-reconciliation", "term-react-hooks", "term-component-lifecycle", "term-memoization"] },
  { id: "ch-5", num: 5, part: 1, title: "React libraries and toolchain", tbd: false, flashcardId: "fc-ch-5", glossaryRefs: ["term-react-router", "term-meta-framework", "term-css-in-js", "term-i18n-l10n", "term-module-bundler"] },
  { id: "ch-6", num: 6, part: 2, title: "Foundations of distributed system design", tbd: false, flashcardId: "fc-ch-6", glossaryRefs: ["term-load-balancing", "term-caching-strategies", "term-sharding", "term-cap-theorem", "term-data-replication", "term-observability"] },
  { id: "ch-7", num: 7, part: 2, title: "Microservices architecture demystified", tbd: true, flashcardId: "fc-ch-7", glossaryRefs: [] },
  { id: "ch-8", num: 8, part: 3, title: "The RADIO framework for interview success", tbd: true, flashcardId: "fc-ch-8", glossaryRefs: [] },
  { id: "ch-9", num: 9, part: 3, title: "Strategies and techniques for behavioral interviews", tbd: true, flashcardId: "fc-ch-9", glossaryRefs: [] },
  { id: "ch-10", num: 10, part: 3, title: "AI in frontend interviews", tbd: true, flashcardId: "fc-ch-10", glossaryRefs: [] },
  { id: "ch-11", num: 11, displayNum: "A", part: 4, title: "Appendix A: Quick reference", tbd: false, flashcardId: "fc-ch-11", glossaryRefs: ["term-jsx-transpilation", "term-use-api", "term-error-boundary", "term-custom-hook"] },
];
