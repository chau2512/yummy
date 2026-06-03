# Test Planning - Yummy

## 1. Mục tiêu
Kiểm tra dự án Yummy hoạt động đúng ở các phần chính:
- Frontend người dùng
- Backend API
- AI recommendation service
- Admin panel
- MongoDB database
- Các luồng nghiệp vụ chính: đăng ký, đăng nhập, xem món, giỏ hàng, đặt hàng, quản lý sản phẩm và đơn hàng

## 2. Phạm vi test

### In scope
- Frontend: http://localhost:5173
- Admin: http://localhost:5174
- Backend API: http://localhost:4000
- AI Model: http://localhost:4040
- MongoDB local: localhost:27017

### Out of scope
- Deploy production
- Performance/load test nâng cao
- Security audit chuyên sâu
- Thanh toán Stripe thật

## 3. Điều kiện trước khi test
- Đã clone repo về máy
- Đã cài Node.js, Python, MongoDB
- Đã chạy `npm install` cho root, backend, frontend, admin
- Đã cài Python dependencies trong `modelAI/requirements.txt`
- MongoDB đang chạy ở `localhost:27017`
- Backend, frontend, admin và AI service chạy thành công

## 4. Smoke Test

| ID | Test case | Steps | Expected result |
|---|---|---|---|
| ST-01 | Mở frontend | Truy cập `http://localhost:5173` | Trang chủ hiển thị, không trắng trang |
| ST-02 | Backend chạy | Truy cập `http://localhost:4000` hoặc gọi API | Server phản hồi, không crash |
| ST-03 | AI service chạy | Gọi `http://localhost:4040/ping` | Nhận response hợp lệ |
| ST-04 | MongoDB kết nối | Kiểm tra log backend | Không còn lỗi `ECONNREFUSED localhost:27017` |

## 5. Test Frontend người dùng

| ID | Test case | Steps | Expected result |
|---|---|---|---|
| FE-01 | Xem trang chủ | Mở frontend | Banner, menu, danh sách món hiển thị đúng |
| FE-02 | Xem danh mục món | Chọn từng category | Danh sách món lọc đúng theo category |
| FE-03 | Tìm kiếm món | Nhập từ khóa tìm kiếm | Hiển thị kết quả phù hợp |
| FE-04 | Xem chi tiết món | Click vào một món | Hiển thị đúng tên, ảnh, giá, mô tả |
| FE-05 | Thêm vào giỏ hàng | Click add item | Số lượng/tổng tiền trong cart cập nhật |
| FE-06 | Cập nhật giỏ hàng | Tăng, giảm, xóa sản phẩm | Cart cập nhật đúng |
| FE-07 | Responsive UI | Test desktop/mobile size | Layout không vỡ |

## 6. Test User/Auth

| ID | Test case | Steps | Expected result |
|---|---|---|---|
| AU-01 | Đăng ký user mới | Nhập name, email, password | Tạo tài khoản thành công |
| AU-02 | Đăng ký email trùng | Dùng email đã tồn tại | Hiển thị lỗi phù hợp |
| AU-03 | Đăng nhập đúng | Nhập email/password đúng | Login thành công, lưu token |
| AU-04 | Đăng nhập sai | Nhập sai password | Hiển thị lỗi |
| AU-05 | Lấy thông tin user | Gọi API cần token | Trả về thông tin user |

## 7. Test Cart và Order

| ID | Test case | Steps | Expected result |
|---|---|---|---|
| CO-01 | Add cart khi đã login | Thêm món vào cart | Cart lưu đúng vào DB |
| CO-02 | Remove cart item | Xóa món khỏi cart | Cart cập nhật đúng |
| CO-03 | Xem cart | Mở trang cart | Danh sách món và tổng tiền đúng |
| CO-04 | Đặt hàng | Điền thông tin đặt hàng | Order được tạo thành công |
| CO-05 | Xem order của user | Vào trang order/userorders | Hiển thị đơn hàng của user |
| CO-06 | Verify thanh toán test | Thực hiện flow test payment | Trạng thái thanh toán cập nhật đúng hoặc trả lỗi hợp lệ |

## 8. Test Admin Panel

| ID | Test case | Steps | Expected result |
|---|---|---|---|
| AD-01 | Mở admin | Truy cập `http://localhost:5174` | Admin UI hiển thị |
| AD-02 | Thêm sản phẩm | Nhập tên, mô tả, giá, ảnh, category | Sản phẩm được thêm vào DB |
| AD-03 | Xem list sản phẩm | Mở trang list | Hiển thị danh sách sản phẩm |
| AD-04 | Xóa sản phẩm | Xóa một sản phẩm test | Sản phẩm biến mất khỏi list/frontend |
| AD-05 | Xem đơn hàng | Mở trang orders | Hiển thị danh sách đơn hàng |
| AD-06 | Cập nhật trạng thái đơn | Đổi trạng thái order | Trạng thái lưu đúng sau refresh |

## 9. Test Backend API

### Food API
- `GET /api/food/list`
- `GET /api/food/:id`
- `GET /api/food/search?search=...`
- `POST /api/food/add`
- `POST /api/food/remove`

### User API
- `POST /api/user/register`
- `POST /api/user/login`
- `GET /api/user/get`
- `POST /api/user/change`

### Cart API
- `POST /api/cart/add`
- `POST /api/cart/remove`
- `POST /api/cart/get`

### Order API
- `POST /api/order/place`
- `POST /api/order/verify`
- `POST /api/order/userorders`
- `GET /api/order/list`
- `POST /api/order/status`

## 10. Test AI Recommendation

| ID | Test case | Steps | Expected result |
|---|---|---|---|
| AI-01 | Health check | Gọi `/ping` | Response OK |
| AI-02 | Recommend theo item | Gọi `/?item_name=...` | Trả danh sách gợi ý hợp lệ |
| AI-03 | Recommend theo user | Gọi `/?user_name=...` | Trả danh sách gợi ý hợp lệ |
| AI-04 | Input không tồn tại | Gọi item/user không tồn tại | Không crash, trả response hợp lệ |
| AI-05 | Tích hợp frontend | Kiểm tra nơi frontend dùng recommendation | UI hiển thị dữ liệu hoặc fallback phù hợp |

## 11. Test dữ liệu cần chuẩn bị
- 1 user thường
- 1 admin hoặc tài khoản quản trị nếu dự án có phân quyền
- 3-5 sản phẩm mẫu
- 1-2 ảnh sản phẩm để upload
- 1 đơn hàng test
- Một số từ khóa tìm kiếm

## 12. Rủi ro hiện tại
- Nếu MongoDB chưa chạy, các tính năng DB sẽ lỗi
- Backend có thể chạy nhưng CRUD/login/order không hoạt động nếu DB mất kết nối
- AI service có thể có warning từ numpy/sklearn, cần kiểm tra response thực tế
- Stripe chỉ nên test bằng test card, không dùng thanh toán thật

## 13. Thứ tự test khuyến nghị
1. Bật MongoDB
2. Chạy toàn bộ app
3. Smoke test service
4. Test Backend API cơ bản
5. Test Frontend user flow
6. Test Cart/Order
7. Test Admin CRUD
8. Test AI recommendation
9. Regression test sau khi sửa lỗi

## 14. Tiêu chí pass
- Các service chạy đúng port
- Frontend và admin không trắng trang
- Backend không lỗi 500 ở luồng chính
- MongoDB kết nối ổn định
- User đăng ký/đăng nhập được
- Cart và order hoạt động
- Admin thêm/xóa sản phẩm được
- AI trả response hợp lệ
