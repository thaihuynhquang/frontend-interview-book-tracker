import type { Section, SubSection } from "../../types/appState";

function sub(num: string, title: string): SubSection {
  return { num, title };
}

function section(
  chapterNum: number,
  index: number,
  num: string,
  title: string,
  subsections: SubSection[],
  estMinutes: number,
): Section {
  return { id: `ch-${chapterNum}-s${index}`, num, title, subsections, estMinutes };
}

const ch1: Section[] = [
  section(1, 1, "1.1", "Jane's interview", [], 8),
  section(1, 2, "1.2", "The interview process", [], 10),
  section(1, 3, "1.3", "The funneling approach to web development fundamentals", [], 12),
  section(1, 4, "1.4", "Walking through React fundamentals", [], 15),
  section(1, 5, "1.5", "AI-powered tools and trends in frontend interviews", [], 10),
  section(1, 6, "1.6", "Frontend interview tools", [], 8),
  section(1, 7, "1.7", "Summary", [], 3),
];

const ch2: Section[] = [
  section(2, 1, "2.1", "The importance of semantic HTML", [], 10),
  section(2, 2, "2.2", "Separating content from presentation", [], 10),
  section(2, 3, "2.3", "Leveraging HTML APIs in React development", [], 15),
  section(2, 4, "2.4", "Working with HTML forms", [], 15),
  section(2, 5, "2.5", "Summary", [], 3),
];

const ch3: Section[] = [
  section(3, 1, "3.1", "JavaScript execution and scope", [], 18),
  section(3, 2, "3.2", "Functional programming and functionality", [], 15),
  section(3, 3, "3.3", "Asynchronous behavior in JavaScript", [], 22),
  section(3, 4, "3.4", "Memory management and code architecture", [], 18),
  section(3, 5, "3.5", "Jane's JavaScript interview skill assessment", [], 10),
  section(3, 6, "3.6", "The rising significance of TypeScript", [], 8),
  section(3, 7, "3.7", "Type system—type annotations, type inference, and type safety", [], 20),
  section(3, 8, "3.8", "Functions, classes, and advanced types", [], 18),
  section(3, 9, "3.9", "Type safety and tools", [], 12),
  section(3, 10, "3.10", "Jane's TypeScript interview skill assessment", [], 10),
  section(3, 11, "3.11", "TypeScript: Current trends and future outlook", [], 8),
  section(3, 12, "3.12", "Summary", [], 3),
];

const ch4: Section[] = [
  section(4, 1, "4.1", "Declarative UI: The React way", [], 12),
  section(4, 2, "4.2", "Data flow and state management", [], 18),
  section(4, 3, "4.3", "Built-in hooks and custom hooks", [], 22),
  section(4, 4, "4.4", "React component lifecycle and patterns", [], 18),
  section(4, 5, "4.5", "Debugging and enhancing application performance", [], 15),
  section(4, 6, "4.6", "Summary", [], 3),
];

const ch5: Section[] = [
  section(5, 1, "5.1", "React routing and mega-frameworks", [], 15),
  section(5, 2, "5.2", "Scalable UI patterns: styling, rendering, and data access", [], 18),
  section(5, 3, "5.3", "Globalization: i18n, l10n, and white labeling", [], 12),
  section(5, 4, "5.4", "React toolchain", [], 12),
  section(5, 5, "5.5", "Summary", [], 3),
];

const ch6: Section[] = [
  section(6, 1, "6.1", "Architectural paradigms", [], 12),
  section(6, 2, "6.2", "Distributed computing fundamentals", [], 18),
  section(6, 3, "6.3", "Load distribution and balancing", [], 15),
  section(6, 4, "6.4", "Caching strategies", [], 15),
  section(6, 5, "6.5", "Data replication, sharding, and partitioning", [], 20),
  section(6, 6, "6.6", "Communication, observability, and monitoring", [], 18),
  section(6, 7, "6.7", "Summary", [], 3),
];

// Appendix A: Quick reference — displayed with chapter.num 11 internally.
const ch11: Section[] = [
  section(11, 1, "A.1", "HTML APIs and related libraries", [], 10),
  section(11, 2, "A.2", "The TC39 process", [], 8),
  section(11, 3, "A.3", "JSX best practices", [
    sub("A.3.1", "Understanding JSX Transpilation"),
    sub("A.3.2", "Best Practices for JSX"),
  ], 12),
  section(11, 4, "A.4", "Essential React Hooks and the use API", [
    sub("A.4.1", "React Hook learning list"),
    sub("A.4.2", "Custom Hooks: best practices"),
    sub("A.4.3", "The use API"),
    sub("A.4.4", "Comparison between the use API and Hooks"),
  ], 18),
  section(11, 5, "A.5", "React's component lifecycle", [
    sub("A.5.1", "React class component lifecycle"),
    sub("A.5.2", "React functional component lifecycle"),
  ], 12),
  section(11, 6, "A.6", "Handling runtime errors", [
    sub("A.6.1", "Error boundaries"),
    sub("A.6.2", "Global error hooks"),
  ], 12),
  section(11, 7, "A.7", "React resources for Angular and Vue developers", [], 8),
];

export const SECTIONS_BY_CHAPTER: Record<number, Section[]> = {
  1: ch1,
  2: ch2,
  3: ch3,
  4: ch4,
  5: ch5,
  6: ch6,
  7: [],
  8: [],
  9: [],
  10: [],
  11: ch11,
};
