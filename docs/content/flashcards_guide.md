# FLASHCARDS — QUY TRÌNH ÔN TẬP BẰNG GEMINI / NOTEBOOKLM

Đây là **quy trình**, không phải kho dữ liệu flashcard. App chỉ lưu một checkbox mỗi chương (`fc-ch-{n}` — xem `book_data_model_guide.md`), xác nhận "đã tạo và đã ôn bộ flashcard của chương này". Nội dung thẻ (câu hỏi/đáp án) sống ở Gemini/NotebookLM, không đưa vào `localStorage`.

---

## 1. Vì sao không lưu nội dung thẻ trong app

- Tránh trùng lặp: NotebookLM/Gemini đã là nơi lưu, xuất, và ôn tập tốt hơn một custom flashcard UI tự viết.
- Tracker chỉ cần trả lời 1 câu: "chương này đã có bộ thẻ ôn chưa, đã ôn ít nhất 1 lần chưa" — đúng tinh thần nhẹ-nhàng-không-over-engineer của app.

## 2. Quy trình tạo bộ thẻ sau mỗi chương

1. **Đọc xong** toàn bộ section của 1 chương (tất cả checkbox `read` trong chương đã tick ở tab Chapters).
2. Copy nội dung chương (ảnh chụp trang sách, ghi chú tay, hoặc bản tóm tắt bạn tự viết) vào **NotebookLM** như 1 nguồn, hoặc dán trực tiếp vào **Gemini** (gemini.google.com) nếu chỉ cần nhanh.
3. Dùng prompt mẫu bên dưới để sinh bộ thẻ.
4. Ôn thử ngay tại chỗ (NotebookLM có chế độ Flashcards có sẵn; Gemini thì đọc qua và tự hỏi-đáp).
5. Tick `fc-ch-{n}` ở cuối chương tương ứng trong tab **Chapters** của tracker.

## 3. Prompt mẫu (song ngữ)

### Prompt cho NotebookLM (dùng tính năng Studio → Flashcards có sẵn)
Chỉ cần add nguồn (PDF/ảnh/ghi chú chương) rồi bấm "Flashcards" trong Studio — NotebookLM tự sinh thẻ từ nguồn, không cần prompt tay.

### Prompt cho Gemini (khi không dùng NotebookLM)
```
Bạn là trợ lý ôn tập phỏng vấn frontend. Dựa trên nội dung chương sau đây của sách "Acing the Frontend Interview"
(chương {số chương}: {tên chương}), hãy tạo 10-15 flashcard ôn tập theo định dạng:

Q: <câu hỏi ngắn, đúng kiểu interviewer thật sự hỏi — không phải định nghĩa sách giáo khoa>
A: <câu trả lời 1-3 câu, có ví dụ code ngắn nếu liên quan JS/TS/React>

Yêu cầu:
- Ưu tiên câu hỏi kiểu "tại sao chọn X thay vì Y" hoặc "code này in ra gì" hơn là định nghĩa suông.
- Với chương JS/TS/React, ít nhất 3 câu hỏi có đoạn code ngắn để đọc/đoán kết quả.
- Với chương 6 (system design), ít nhất 2 câu hỏi dạng "thiết kế X, đánh đổi là gì".
- Câu hỏi bằng tiếng Việt, thuật ngữ kỹ thuật giữ nguyên tiếng Anh (closure, reconciliation, sharding...).

Nội dung chương:
<dán nội dung/ghi chú ở đây>
```

## 4. Tiêu chí "đạt" để tick `fc-ch-{n}`

- [ ] Bộ thẻ có ít nhất 10 câu cho chương thường, ít nhất 15 câu cho chương 3 (JS/TS deep dive) và chương 6 (system design).
- [ ] Đã ôn qua ít nhất 1 lượt toàn bộ thẻ (không cần đúng 100%, chỉ cần đã tự kiểm tra).
- [ ] Với chương có bảng "Quit Criteria" (`quit_criteria_guide.md`), ít nhất 1 thẻ hỏi trực tiếp về `exitCriteria` của chương đó — nối flashcard với tiêu chí "đủ giỏi để qua vòng".

## 5. Gợi ý lịch ôn (spaced, không bắt buộc)

| Lần ôn | Khi nào |
| :--- | :--- |
| Lần 1 | Ngay sau khi tạo thẻ (cùng ngày đọc xong chương) |
| Lần 2 | +2 ngày |
| Lần 3 | +7 ngày |
| Lần 4 | Trước ngày phỏng vấn thật, ôn lại toàn bộ thẻ của các chương liên quan tới vòng sắp tới |

App không track các lần ôn lại này — đây là gợi ý kỷ luật cá nhân, không phải state cần lưu.

## 6. Danh sách 7 task flashcard

Chỉ 7 chương đã có nội dung xuất bản (ch-1 tới ch-6 và Appendix A) mới có flashcard task — chương 7-10 chưa xuất bản (MEAP) nên không tính vào mẫu số progress.

| id | Chương |
| :--- | :--- |
| fc-ch-1 | The frontend interview |
| fc-ch-2 | HTML and CSS essentials |
| fc-ch-3 | JavaScript and TypeScript deep dive |
| fc-ch-4 | React core principles and patterns |
| fc-ch-5 | React libraries and toolchain |
| fc-ch-6 | Foundations of distributed system design |
| fc-ch-11 | Appendix A: Quick reference |
