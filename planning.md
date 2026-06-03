# Planning phân chia file code theo người thực hiện — Website ecommerce Yumm! With AI

## 1. Tóm tắt phân công

Dự án có 2 thành viên trong báo cáo:

| Thành viên | Vai trò chính | Phạm vi phụ trách |
|---|---|---|
| Trần Hữu Hoàng Châu | Frontend khách hàng + Backend nghiệp vụ chính | Giao diện mua hàng, giỏ hàng, đặt hàng, đăng nhập, API food/cart/order/user |
| Nguyễn Hoàng Nhật Bảo | Admin + AI Recommendation + CSDL/kiểm thử | Trang quản trị, mô hình gợi ý AI, dữ liệu, kiểm thử tích hợp |

Mục tiêu phân chia: mỗi người phụ trách trọn một nhóm chức năng có liên quan trực tiếp, hạn chế đụng file lẫn nhau nhưng vẫn có điểm phối hợp rõ ràng ở API.

---

## 2. Bảng phân chia chức năng và file code

| Người thực hiện | Chức năng | File/thư mục code phụ trách | Công việc cụ thể | Kết quả bàn giao |
|---|---|---|---|---|
| Trần Hữu Hoàng Châu | Giao diện người dùng mua hàng | `D:\yummy\frontend\src\App.jsx`, `D:\yummy\frontend\src\main.jsx`, `D:\yummy\frontend\src\App.css`, `D:\yummy\frontend\src\index.css` | Cấu hình route, layout tổng thể, kết nối các trang người dùng | Website khách hàng chạy được tại `http://localhost:5173` |
| Trần Hữu Hoàng Châu | Trang chủ, danh mục và hiển thị món ăn | `D:\yummy\frontend\src\pages\Home\Home.jsx`, `D:\yummy\frontend\src\components\Header\Header.jsx`, `D:\yummy\frontend\src\components\ExploreMenu\ExploreMenu.jsx`, `D:\yummy\frontend\src\components\FoodDisplay\FoodDisplay.jsx`, `D:\yummy\frontend\src\components\FoodItem\FoodItem.jsx` | Hiển thị banner, danh mục, danh sách món ăn, nút thêm/xóa món khỏi giỏ | Người dùng xem và chọn món ăn được |
| Trần Hữu Hoàng Châu | Giỏ hàng và đặt hàng | `D:\yummy\frontend\src\pages\Cart\Cart.jsx`, `D:\yummy\frontend\src\pages\PlaceOrder\PlaceOrder.jsx`, `D:\yummy\frontend\src\pages\Verify\Verify.jsx`, `D:\yummy\frontend\src\pages\MyOrders\MyOrders.jsx` | Xử lý giỏ hàng, thanh toán Stripe, xác nhận đơn, xem đơn hàng của người dùng | Người dùng đặt hàng và theo dõi đơn hàng được |
| Trần Hữu Hoàng Châu | Đăng nhập, hồ sơ, đánh giá, tìm kiếm | `D:\yummy\frontend\src\components\LoginPopup\LoginPopup.jsx`, `D:\yummy\frontend\src\pages\Profile\Profile.jsx`, `D:\yummy\frontend\src\pages\Rating\Rating.jsx`, `D:\yummy\frontend\src\pages\Search\Search.jsx`, `D:\yummy\frontend\src\context\StoreContext.jsx` | Quản lý token, thông tin user, tìm kiếm món, gửi đánh giá | Hoàn thiện luồng tài khoản và tương tác người dùng |
| Trần Hữu Hoàng Châu | Backend API người dùng/sản phẩm/giỏ hàng/đơn hàng | `D:\yummy\backend\server.js`, `D:\yummy\backend\controllers\userController.js`, `D:\yummy\backend\controllers\foodController.js`, `D:\yummy\backend\controllers\cartController.js`, `D:\yummy\backend\controllers\orderController.js` | Xử lý logic đăng ký, đăng nhập, món ăn, giỏ hàng, đơn hàng, thanh toán | REST API backend chạy tại `http://localhost:4000` |
| Trần Hữu Hoàng Châu | Route, middleware và cấu hình backend | `D:\yummy\backend\routes\userRoute.js`, `D:\yummy\backend\routes\foodRoute.js`, `D:\yummy\backend\routes\cartRoute.js`, `D:\yummy\backend\routes\orderRoute.js`, `D:\yummy\backend\middleware\auth.js`, `D:\yummy\backend\config\db.js` | Định nghĩa endpoint, xác thực JWT, kết nối MongoDB | API có phân quyền và kết nối CSDL ổn định |
| Nguyễn Hoàng Nhật Bảo | Thiết kế CSDL | `D:\yummy\backend\models\userModel.js`, `D:\yummy\backend\models\foodModel.js`, `D:\yummy\backend\models\orderModel.js` | Thiết kế schema user, food, order; đảm bảo dữ liệu phù hợp frontend/admin/AI | CSDL MongoDB đáp ứng nghiệp vụ đặt món |
| Nguyễn Hoàng Nhật Bảo | Trang quản trị sản phẩm và đơn hàng | `D:\yummy\admin\src\App.jsx`, `D:\yummy\admin\src\pages\Add\Add.jsx`, `D:\yummy\admin\src\pages\List\List.jsx`, `D:\yummy\admin\src\pages\Orders\Orders.jsx` | Thêm món ăn, xem danh sách món, xóa món, xem/cập nhật trạng thái đơn hàng | Admin panel chạy được tại `http://localhost:5174` |
| Nguyễn Hoàng Nhật Bảo | Layout admin | `D:\yummy\admin\src\components\Navbar\Navbar.jsx`, `D:\yummy\admin\src\components\Sidebar\Sidebar.jsx`, `D:\yummy\admin\src\index.css`, các file `.css` trong `D:\yummy\admin\src` | Xây dựng giao diện quản trị, menu điều hướng, styling | Admin panel dễ dùng và đúng chức năng |
| Nguyễn Hoàng Nhật Bảo | AI Recommendation | `D:\yummy\modelAI\main.py`, `D:\yummy\modelAI\recommend.py`, `D:\yummy\modelAI\fetch_data.py`, `D:\yummy\modelAI\data\data.csv`, `D:\yummy\modelAI\data\cake_list.csv` | Xây dựng API gợi ý món ăn, xử lý dữ liệu, thuật toán khuyến nghị | AI service chạy tại `http://localhost:4040` |
| Nguyễn Hoàng Nhật Bảo | Dữ liệu mẫu, script hỗ trợ và kiểm thử | `D:\yummy\backend\seed_data.js`, `D:\yummy\backend\test_api.js`, `D:\yummy\backend\search.js`, `D:\yummy\modelAI\test.py` | Chuẩn bị dữ liệu, kiểm thử API backend, kiểm thử AI, kiểm thử tìm kiếm | Có dữ liệu test và báo cáo kiểm thử cơ bản |

---

## 3. Kế hoạch thực hiện theo giai đoạn

| Giai đoạn | Thời gian đề xuất | Người thực hiện | Nội dung |
|---|---:|---|---|
| Giai đoạn 1 | Tuần 1 | Trần Hữu Hoàng Châu | Xác định yêu cầu chức năng, phi chức năng; chuẩn hóa route frontend/backend |
| Giai đoạn 2 | Tuần 2 | Nguyễn Hoàng Nhật Bảo | Phân tích hệ thống, thiết kế CSDL user/food/order, chuẩn bị dữ liệu mẫu |
| Giai đoạn 3 | Tuần 3 | Nguyễn Hoàng Nhật Bảo | Thiết kế UX/UI admin và phần cấu trúc dữ liệu cho AI recommendation |
| Giai đoạn 4 | Tuần 4 | Trần Hữu Hoàng Châu | Xây dựng giao diện người dùng: trang chủ, món ăn, giỏ hàng, đặt hàng, tài khoản |
| Giai đoạn 5 | Tuần 5 | Trần Hữu Hoàng Châu | Xây dựng backend: API user, food, cart, order, JWT, thanh toán Stripe |
| Giai đoạn 6 | Tuần 6 | Nguyễn Hoàng Nhật Bảo | Xây dựng admin panel, AI recommendation, kiểm thử backend/frontend/admin/AI |
| Giai đoạn 7 | Cuối kỳ | Cả hai | Tích hợp toàn hệ thống, sửa lỗi, hoàn thiện báo cáo và demo |

---

## 4. Điểm phối hợp giữa hai thành viên

| Điểm phối hợp | Người chính | Người phối hợp | Ghi chú |
|---|---|---|---|
| API sản phẩm `/api/food` | Trần Hữu Hoàng Châu | Nguyễn Hoàng Nhật Bảo | Backend cần phục vụ cả frontend khách hàng và admin panel |
| API đơn hàng `/api/order` | Trần Hữu Hoàng Châu | Nguyễn Hoàng Nhật Bảo | Frontend tạo đơn, admin cập nhật trạng thái |
| Schema món ăn `foodModel` | Nguyễn Hoàng Nhật Bảo | Trần Hữu Hoàng Châu | Cần thống nhất field: name, description, price, image, category, ratings |
| AI recommendation `/recommend` | Nguyễn Hoàng Nhật Bảo | Trần Hữu Hoàng Châu | Frontend cần gọi được API gợi ý món ăn |
| Kiểm thử tích hợp | Nguyễn Hoàng Nhật Bảo | Trần Hữu Hoàng Châu | Test đủ 4 service: frontend, admin, backend, modelAI |

---

## 5. Test cases cần thực hiện

| Nhóm test | Người phụ trách | Kịch bản kiểm thử |
|---|---|---|
| Frontend khách hàng | Trần Hữu Hoàng Châu | Xem danh sách món, lọc danh mục, tìm kiếm món, thêm/xóa giỏ hàng |
| Tài khoản người dùng | Trần Hữu Hoàng Châu | Đăng ký, đăng nhập, xem/cập nhật hồ sơ, lưu token |
| Đặt hàng | Trần Hữu Hoàng Châu | Tạo đơn, chuyển Stripe test, verify thanh toán, xem đơn hàng |
| Admin | Nguyễn Hoàng Nhật Bảo | Thêm món có ảnh, xóa món, xem danh sách đơn, đổi trạng thái đơn |
| Backend API | Nguyễn Hoàng Nhật Bảo | Test endpoint user/food/cart/order bằng `test_api.js` hoặc Postman |
| AI Recommendation | Nguyễn Hoàng Nhật Bảo | Gọi `/recommend?item_name=...&user_name=...`, kiểm tra kết quả gợi ý |
| Tích hợp toàn hệ thống | Cả hai | Chạy `npm run app` và `npm run seller`, kiểm tra luồng từ khách hàng đến admin |

---

## 6. Giả định và mặc định

- Planning bám theo nội dung báo cáo `baocaodoan.docx` và cấu trúc code hiện có trong `D:\yummy`.
- Báo cáo có 2 thành viên: Trần Hữu Hoàng Châu và Nguyễn Hoàng Nhật Bảo.
- Châu phụ trách chính frontend khách hàng và backend nghiệp vụ vì trong kế hoạch báo cáo có phần "Xây dựng UX/UI" và "Xây dựng Back-end".
- Bảo phụ trách chính thiết kế hệ thống/CSDL, admin, AI và kiểm thử vì trong báo cáo có phần "Phân tích thiết kế hệ thống, xây dựng CSDL", "Thiết kế UX/UI" và "Kiểm thử".
- Các file ảnh trong `D:\yummy\frontend\src\assets` và `D:\yummy\backend\uploads` được xem là tài nguyên dùng chung, không cần phân riêng từng file ảnh.
