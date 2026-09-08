# QUIT CRITERIA — MA TRẬN DỪNG/SKIP & EXIT CRITERIA THEO CHƯƠNG

Nguồn nội dung cho `QuitCriteriaRow[]` (xem schema ở **[book_data_model_guide.md](../guides/book_data_model_guide.md)**). Mỗi chương có 2 cột — **Stop Signal** ("khi nào nên dừng/skip chương này") và **Exit Criteria** ("khi nào coi là đủ giỏi để đi tiếp"). 11 dòng, khớp với 11 chương trong `chapterMeta.ts` (id `qc-ch-{n}`).

| Chương | Stop Signal (tóm tắt) | Exit Criteria (tóm tắt) |
| :-- | :--- | :--- |
| 1. The frontend interview | Đã qua 10+ vòng phỏng vấn → lướt 1.1–1.3, tập trung 1.5 | Mô tả được funneling approach + 2 cách AI thay đổi phỏng vấn |
| 2. HTML and CSS essentials | Quen semantic HTML → lướt 2.1–2.2, tập trung 2.4 | Tự build controlled login form + validation không cần tra docs |
| 3. JavaScript and TypeScript deep dive | Mạnh JS yếu TS → nhảy thẳng 3.6 | Vượt cả 2 self-assessment (3.5, 3.10) |
| 4. React core principles and patterns | Ship React hằng ngày → tập trung 4.3, 4.5 | Giải thích + fix re-render đúng 1 trong 3 kỹ thuật memo |
| 5. React libraries and toolchain | Không đụng meta-framework → chỉ lấy từ vựng 5.1 | Kể tên được điểm khác biệt meta-framework + 1 trade-off CSS-in-JS |
| 6. Foundations of distributed system design | Không có vòng system design → chỉ lấy từ vựng 6.1–6.2 | Vẽ được sơ đồ client → LB → server → cache → DB |
| 7. Microservices architecture demystified | *Chưa xuất bản* | *Chưa xác định* |
| 8. The RADIO framework for interview success | *Chưa xuất bản* | *Chưa xác định* |
| 9. Strategies and techniques for behavioral interviews | *Chưa xuất bản* | *Chưa xác định* |
| 10. AI in frontend interviews | *Chưa xuất bản* | *Chưa xác định* |
| Appendix A — Quick reference | Đây là phụ lục tra cứu, không đọc từ đầu tới cuối | Tìm đúng mục con trong dưới 30 giây |

Nội dung đầy đủ (câu chữ song ngữ) nằm ở `src/data/quitCriteria/{en,vi}.ts`.
