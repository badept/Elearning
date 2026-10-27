# AcaSys – eLearning Admin

## Chạy website

Mở thư mục dự án trong VS Code, chọn **Live Server** tại `index.html`.
Trang chủ tự động chuyển đến giao diện **Danh sách học viên**; không cần chọn màn hình từ trang danh sách liên kết.

## Cấu trúc

- `index.html`: Điểm vào, tự chuyển tới trang danh sách học viên.
- `shared/css/base.css`: Reset, nền tảng giao diện và các class dùng chung giữa nhiều tính năng.
- `features/students/`: Danh sách và chi tiết học viên, dùng chung `css/students.css`.
- `features/programs/`: Danh sách và chi tiết chương trình, dùng chung `css/programs.css`.
- `features/courses/`: Danh sách và chi tiết khóa học, dùng chung `css/courses.css`.
- `features/training-projects/`: Danh sách và chi tiết dự án đào tạo, dùng chung `css/training-projects.css`.
- `features/schedules/`: Danh sách và chi tiết lịch học/thi. Mỗi lịch thi gắn đúng một bài học.
- `features/learning-paths/`: Thiết lập Level, bài thi bắt buộc và phân bổ học viên theo lộ trình.
- `features/scope/`: Màn hình tổng quan phạm vi, sử dụng `css/scope.css`.

Mỗi thư mục tính năng đặt các trang HTML ở cấp đầu và chia tài nguyên vào `css/`, `js/`. HTML chỉ giữ cấu trúc và class; toàn bộ style tĩnh lẫn các biến thể màu theo trạng thái đều nằm trong stylesheet. Các liên kết nội bộ dùng đường dẫn tương đối giữa các thư mục tính năng.

Các liên kết giữa Học viên, Chương trình, Khóa học và Dự án đào tạo đã được đổi từ tên `.dc.html` cũ sang file HTML tương ứng. Những nút thao tác không có chức năng trong bản thiết kế gốc vẫn cần lập trình thêm nghiệp vụ.

## Luồng nghiệp vụ chính

1. Tạo dự án, tiêu chí đào tạo, chương trình, khóa học và bài học.
2. Tạo lịch thi từ một bài học; chọn nhiều tiêu chí và cấu hình ngưỡng đạt, số lượt thi.
3. Đưa khóa học/bài học và các lịch thi bắt buộc vào từng Level của lộ trình.
4. Gán học viên vào lộ trình. Hệ thống dùng phần trăm cao nhất hợp lệ của mỗi lịch thi để xét đạt.
5. Chỉ nâng Level hoặc cấp chứng chỉ khi học viên đạt toàn bộ lịch thi bắt buộc trong phạm vi được cấu hình.
6. Điểm trung bình theo tiêu chí chỉ phục vụ báo cáo, không dùng để kết luận đạt/rớt.

**Lưu ý:** Đây là prototype giao diện, chưa tích hợp API/backend. Các điểm nghiệp vụ chưa chốt trong tài liệu được hiển thị là “cần xác nhận”, không tự tạo quy tắc giả định.
