import type { QuitCriteriaText } from "../../types/appState";

export const QUIT_CRITERIA_VI: Record<string, QuitCriteriaText> = {
  "ch-1": {
    stopSignal: "Nếu đã trải qua 10+ vòng phỏng vấn và thuộc lòng quy trình, lướt nhanh 1.1–1.3, nhảy thẳng tới 1.5 (AI-powered tools) — phần khả năng mới nhất với bạn.",
    exitCriteria: "Mô tả được cách tiếp cận funneling trong một câu, kể tên 2 cách AI đang thay đổi phỏng vấn frontend.",
  },
  "ch-2": {
    stopSignal: "Nếu đã quen tay dùng semantic element và <label for>, lướt 2.1–2.2, dồn thời gian cho 2.4 (forms) — phần dễ ra đề live-coding nhất.",
    exitCriteria: "Tự build được login form dạng controlled kèm validation client-side đúng, không cần mở docs.",
  },
  "ch-3": {
    stopSignal: "Đây là chương dày nhất (12 section) — nếu mạnh JS nhưng yếu TS, nhảy thẳng tới 3.6, không cần đọc lại 3.1–3.5.",
    exitCriteria: "Vượt cả 2 bài tự đánh giá (3.5 và 3.10) mà không cần tra cứu.",
  },
  "ch-4": {
    stopSignal: "Nếu đã ship React hằng ngày, lướt 4.1–4.2, dồn thời gian cho 4.3 (hooks) và 4.5 (performance) — hai phần interviewer đào sâu nhất.",
    exitCriteria: "Giải thích được vì sao component re-render và fix bằng đúng một trong useMemo/useCallback/React.memo, không dùng cả ba theo mặc định.",
  },
  "ch-5": {
    stopSignal: "Nếu công việc hằng ngày không đụng meta-framework, chỉ lướt 5.1 để lấy từ vựng — đừng cố học Next.js qua section này.",
    exitCriteria: "Kể tên được meta-framework thêm gì trên nền React và nói được 1 trade-off của CSS-in-JS.",
  },
  "ch-6": {
    stopSignal: "Nếu vòng phỏng vấn của bạn không có system design, chỉ lướt lấy từ vựng (6.1–6.2), bỏ qua cơ chế sâu ở 6.4–6.5.",
    exitCriteria: "Vẽ được sơ đồ cơ bản client → load balancer → app servers → cache → database và giải thích mỗi ô trong một câu.",
  },
  "ch-7": {
    stopSignal: "Chưa xuất bản — không áp dụng tiêu chí dừng cụ thể, chỉ theo dõi khi Manning cập nhật MEAP.",
    exitCriteria: "Chưa xác định — cập nhật khi có mục lục chi tiết.",
  },
  "ch-8": {
    stopSignal: "Chưa xuất bản — không áp dụng tiêu chí dừng cụ thể.",
    exitCriteria: "Chưa xác định — cập nhật khi có mục lục chi tiết.",
  },
  "ch-9": {
    stopSignal: "Chưa xuất bản — không áp dụng tiêu chí dừng cụ thể.",
    exitCriteria: "Chưa xác định — cập nhật khi có mục lục chi tiết.",
  },
  "ch-10": {
    stopSignal: "Chưa xuất bản — không áp dụng tiêu chí dừng cụ thể.",
    exitCriteria: "Chưa xác định — cập nhật khi có mục lục chi tiết.",
  },
  "ch-11": {
    stopSignal: "Đây là phụ lục tra cứu, không phải chương kể chuyện — đừng đọc từ đầu tới cuối. Chỉ tra đúng phần cần cho buổi ôn hôm đó.",
    exitCriteria: "Tìm được đúng mục con (JSX, Hooks, lifecycle, hay error handling) trong dưới 30 giây khi cần.",
  },
};
