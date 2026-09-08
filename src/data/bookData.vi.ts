import type { Chapter, QuitCriteriaRow, GlossaryTerm, Resource, FlashcardTask } from "../types/appState";
import { CHAPTER_META } from "./shared/chapterMeta";
import { SECTIONS_BY_CHAPTER } from "./shared/sections";
import { GLOSSARY_VI } from "./glossary/vi";
import { QUIT_CRITERIA_VI } from "./quitCriteria/vi";
import { RESOURCES } from "./shared/resources";
import { FLASHCARD_TASKS } from "./shared/flashcards";

const CHAPTER_SUMMARIES_VI: Record<number, string> = {
  1: "Đóng khung cả cuốn sách qua câu chuyện của Jane — một vòng phỏng vấn frontend thực sự trông như thế nào ngày nay, cách tiếp cận \"funneling\" cho kiến thức nền (rộng trước, sâu sau tùy vai trò), lượt đầu ôn lại React fundamentals, và AI đang thay đổi cách chuẩn bị lẫn chính buổi phỏng vấn ra sao.",
  2: "Vì sao semantic HTML vẫn bị hỏi ngay cả trong phỏng vấn nặng React: tách content khỏi presentation, các HTML API mà người phỏng vấn kỳ vọng bạn dùng bên trong component React (không phải né tránh nó), và xây/validate form đúng cách — dạng đề \"build login form\" lặp lại nhiều lần.",
  3: "Phần deep-dive JS/TS mà interviewer hỏi kỹ nhất. Execution và scope của JS (closure, hoisting, event loop), phong cách functional programming, hành vi async (callback → promise → async/await), quản lý bộ nhớ, rồi vì sao TypeScript quan trọng bây giờ — type annotation, type inference, structural typing, generics — kết thúc bằng 2 checkpoint tự đánh giá kỹ năng theo đúng cách Jane tự ôn.",
  4: "Mental model của React đúng như cách interviewer kỳ vọng bạn giải thích: declarative UI, luồng dữ liệu (props xuống, event lên, lift state), các hook có sẵn và cách viết hook riêng, toàn bộ lifecycle của component, và kỹ thuật debug/tối ưu hiệu năng (profiler, memoization, tránh re-render thừa) — thứ phân biệt câu trả lời junior với senior.",
  5: "Ngoài phần lõi: client-side routing và mega-framework (kiểu Next.js), scalable UI pattern cho styling/rendering/data access ở quy mô team, globalization (i18n/l10n/white-labeling) như một chủ đề phỏng vấn, và toolchain React hiện đại (bundler, linting, testing) — thứ bạn cần biết tồn tại dù không tự cấu hình mỗi ngày.",
  6: "Phỏng vấn frontend ngày càng hỏi tư duy hệ thống. Architectural paradigm (monolith vs microservices vs serverless), nền tảng distributed computing, load balancing, chiến lược caching, replication/sharding/partitioning, và cách communication + observability + monitoring khớp với nhau — từ vựng cho vòng \"design a system\".",
  7: "Manning chưa xuất bản (đang MEAP) — chưa có mục lục section. Dự kiến nói về kiến trúc microservices từ góc nhìn frontend engineer.",
  8: "Manning chưa xuất bản (đang MEAP) — chưa có mục lục section. Dự kiến giới thiệu framework RADIO (Requirements, Architecture, Data model, Interface, Optimizations) cho vòng phỏng vấn system design.",
  9: "Manning chưa xuất bản (đang MEAP) — chưa có mục lục section. Dự kiến nói về chiến lược và kỹ thuật cho vòng phỏng vấn behavioral.",
  10: "Manning chưa xuất bản (đang MEAP) — chưa có mục lục section. Dự kiến nói về cách AI đang định hình lại phỏng vấn frontend từ cả hai phía bàn.",
  11: "Phụ lục tra cứu nhanh của cuốn sách: HTML API và thư viện liên quan, quy trình đề xuất TC39, best practice JSX (kể cả cách JSX thật sự transpile), các React Hook thiết yếu cùng use API mới, so sánh lifecycle class component và functional component song song, xử lý lỗi runtime (error boundary, global error hook), và gợi ý cho dev đến từ Angular hoặc Vue.",
};

export function getChaptersVi(): Chapter[] {
  return CHAPTER_META.map((meta) => ({
    id: meta.id,
    num: meta.num,
    displayNum: meta.displayNum,
    part: meta.part,
    title: meta.title,
    summary: CHAPTER_SUMMARIES_VI[meta.num],
    tbd: meta.tbd,
    sections: SECTIONS_BY_CHAPTER[meta.num],
    flashcardId: meta.flashcardId,
    glossaryRefs: meta.glossaryRefs,
  }));
}

export function getQuitCriteriaVi(): QuitCriteriaRow[] {
  return CHAPTER_META.map((meta) => ({
    id: `qc-${meta.id}`,
    chapterId: meta.id,
    stopSignal: QUIT_CRITERIA_VI[meta.id].stopSignal,
    exitCriteria: QUIT_CRITERIA_VI[meta.id].exitCriteria,
  }));
}

export function getGlossaryVi(): GlossaryTerm[] {
  return GLOSSARY_VI;
}

export function getResourcesVi(): Resource[] {
  return RESOURCES;
}

export function getFlashcardTasksVi(): FlashcardTask[] {
  return FLASHCARD_TASKS;
}
