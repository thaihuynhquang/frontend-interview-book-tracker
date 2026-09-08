import type { QuitCriteriaText } from "../../types/appState";

export const QUIT_CRITERIA_EN: Record<string, QuitCriteriaText> = {
  "ch-1": {
    stopSignal: "If you've already done 10+ interview loops and know the process cold, skim 1.1–1.3 and jump straight to 1.5 (AI-powered tools) — that's the part most likely to be new.",
    exitCriteria: "You can describe the funneling approach in one sentence and name 2 ways AI tools are changing frontend interviews.",
  },
  "ch-2": {
    stopSignal: "If you already reach for semantic elements and <label for> by habit, skim 2.1–2.2 and spend your time on 2.4 (forms), the section most likely to show up as a live-coding prompt.",
    exitCriteria: "You can build a controlled login form with working client-side validation from memory, no docs open.",
  },
  "ch-3": {
    stopSignal: "This is the densest chapter (12 sections) — if you're strong on JS but shaky on TS, skip straight to 3.6 and don't re-read 3.1–3.5.",
    exitCriteria: "Both self-assessments (3.5 and 3.10) pass without looking anything up.",
  },
  "ch-4": {
    stopSignal: "If you already ship React daily, skim 4.1–4.2 and spend the time on 4.3 (hooks) and 4.5 (performance) — the two areas interviewers probe deepest.",
    exitCriteria: "You can explain why a component re-renders and fix it with the right one of useMemo/useCallback/React.memo, not all three by default.",
  },
  "ch-5": {
    stopSignal: "If your day job doesn't touch meta-frameworks, skim 5.1 for vocabulary only — don't try to learn Next.js from this section.",
    exitCriteria: "You can name what a meta-framework adds on top of React and describe one CSS-in-JS trade-off out loud.",
  },
  "ch-6": {
    stopSignal: "If system design isn't in your interview loop, skim for vocabulary (6.1–6.2) and skip the deep mechanics in 6.4–6.5.",
    exitCriteria: "You can sketch a basic client → load balancer → app servers → cache → database diagram and explain each box in one sentence.",
  },
  "ch-7": {
    stopSignal: "Not yet published — no specific stop criterion applies, just watch for the Manning MEAP update.",
    exitCriteria: "Not yet defined — update once a detailed outline exists.",
  },
  "ch-8": {
    stopSignal: "Not yet published — no specific stop criterion applies.",
    exitCriteria: "Not yet defined — update once a detailed outline exists.",
  },
  "ch-9": {
    stopSignal: "Not yet published — no specific stop criterion applies.",
    exitCriteria: "Not yet defined — update once a detailed outline exists.",
  },
  "ch-10": {
    stopSignal: "Not yet published — no specific stop criterion applies.",
    exitCriteria: "Not yet defined — update once a detailed outline exists.",
  },
  "ch-11": {
    stopSignal: "This is a reference appendix, not a narrative chapter — don't read it front to back. Look up only the section relevant to what you're prepping that day.",
    exitCriteria: "You can find the right subsection (JSX, Hooks, lifecycle, or error handling) in under 30 seconds when you need it.",
  },
};
