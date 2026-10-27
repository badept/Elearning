# Module Lịch học/thi

Module này dùng để xem và vận hành lịch đã được thiết lập từ nội dung khóa học. Nội dung gốc vẫn được quản lý ở module Khóa học.

## Luồng nghiệp vụ

1. Tại chi tiết khóa học, chọn đúng một bài học và tạo lịch thi.
2. Chọn nhiều tiêu chí đào tạo để phục vụ báo cáo.
3. Cấu hình ngưỡng đạt, thời gian, số lượt thi tối đa và tùy chọn dừng khi đã đạt.
4. Gán lịch thi làm yêu cầu bắt buộc cho Level trong module Lộ trình.
5. Học viên làm bài; hệ thống lấy phần trăm cao nhất trong các lượt hợp lệ để xét đạt lịch thi.
6. Khi toàn bộ lịch thi bắt buộc đạt, hệ thống mới xét Level và chứng chỉ theo cấu hình lộ trình.

## Bốn khu vực thao tác

- **Thông tin lịch:** mã, tên, dự án, loại lịch, khóa học/bài thi, thời gian, quy định thi và điều kiện áp dụng.
- **Học viên tham gia:** tìm, chọn, khóa hoặc mở quyền truy cập theo từng học viên hoặc hàng loạt.
- **Link đăng nhập:** link dùng chung và bốn cách xác thực gồm tài khoản hệ thống, tài khoản dự án, mã/số điện thoại và mã nhân viên.
- **Cấu hình:** nhắc lịch, báo cáo quản lý, giám sát thi và thông tin học viên được xem sau khi nộp bài. Nâng Level do module Lộ trình xét.

## Đối chiếu cấu hình hệ thống cũ

Giao diện mới giữ đủ nghiệp vụ của màn hình cũ nhưng bỏ menu 8 bước và toàn bộ tab hướng dẫn:

- `Thông tin lịch thi` được gom vào khu vực **Thông tin lịch**, không bắt người dùng chuyển qua nhiều bước để nhập dữ liệu liên quan.
- `Học viên` là một khu vực trực tiếp với danh sách và trạng thái quyền truy cập rõ ràng.
- `Link đăng nhập theo lịch` hiển thị từng cách đăng nhập cùng tác động của nó.
- `Cấu hình` gom nhắc lịch, giám sát và hiển thị kết quả sau thi.
- `Cấu hình → Rà soát → Phê duyệt → Phát hành → Đóng lịch` vẫn là quy trình trạng thái ở đầu trang.

## Nguyên tắc dữ liệu ERP

- Lưu snapshot cấu hình tại thời điểm phát hành để báo cáo lịch sử không bị thay đổi theo nội dung gốc.
- Tách `schedule`, `schedule_item`, `schedule_audience_rule`, `enrollment`, `attempt`, `attendance`, `completion`, `certificate` và `approval_log`.
- Mọi thao tác nhạy cảm như đổi điểm, gỡ học viên và mở lại lịch đều cần audit log. Quyền cấp thêm lượt sau khi hết lượt vẫn là điểm cần nghiệp vụ xác nhận.
- Bộ lọc học viên ở module này chỉ dùng để tìm enrollment; hồ sơ học viên vẫn thuộc module Học viên.
- Một lịch thi gắn đúng một bài học nhưng có thể gắn nhiều tiêu chí. Điểm trung bình tiêu chí chỉ dùng báo cáo.
