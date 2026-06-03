# 🍰 Yumm! — Website Bán Đồ Ăn Tích Hợp AI

Website thương mại điện tử bán đồ ăn (bánh, salad, pasta, noodle...) với hệ thống gợi ý sản phẩm bằng AI.

---

## 📋 Yêu cầu hệ thống

| Phần mềm | Phiên bản tối thiểu | Link tải |
|---|---|---|
| **Node.js** | v18+ | [nodejs.org](https://nodejs.org/) |
| **Python** | 3.10+ | [python.org](https://www.python.org/) |
| **MongoDB** | 6.0+ | [mongodb.com](https://www.mongodb.com/try/download/community) |
| **Git** | Bất kỳ | [git-scm.com](https://git-scm.com/) |

---

## 🚀 Hướng dẫn Cài đặt

### Bước 1: Clone dự án

```bash
git clone https://github.com/Page0526/ecommerce-website-AI.git
cd ecommerce-website-AI
```

### Bước 2: Cài MongoDB Local

**Windows** — dùng winget:
```bash
winget install MongoDB.Server --accept-package-agreements
```

**macOS** — dùng Homebrew:
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

**Linux (Ubuntu/Debian):**
```bash
sudo apt install -y mongodb-org
sudo systemctl start mongod
sudo systemctl enable mongod
```

> ✅ Sau khi cài, MongoDB sẽ tự chạy trên `localhost:27017`

### Bước 3: Fix PowerShell (chỉ Windows)

Mở PowerShell với quyền bình thường và chạy:
```powershell
Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
```

### Bước 4: Cài tất cả thư viện

Chạy **1 lệnh duy nhất** để cài toàn bộ:
```bash
npm run install-all
```

Lệnh này sẽ tự động cài:
- Node.js dependencies (backend, frontend, admin)
- Python packages (fastapi, scikit-learn, pandas, uvicorn...)

### Bước 5: Cấu hình Database

File `backend/.env` đã có sẵn cấu hình mặc định:
```env
MONGODB_URI = "mongodb://localhost:27017/food-del"
JWT_SECRET = "random#secret"
STRIPE_SECRET_KEY = "sk_test_..."
```

> Nếu dùng MongoDB Atlas (cloud), đổi `MONGODB_URI` thành connection string Atlas của bạn.

---

## ▶️ Cách chạy

### Chạy toàn bộ (Frontend + Backend + AI)
```bash
npm run app
```

### Chạy Admin Panel (quản lý sản phẩm/đơn hàng)
```bash
npm run seller
```

### Sau khi chạy, truy cập:

| Trang | URL | Mô tả |
|---|---|---|
| 🛒 **Frontend** | http://localhost:5173 | Giao diện mua hàng |
| 🛠️ **Admin** | http://localhost:5174 | Quản lý sản phẩm, đơn hàng |
| ⚙️ **Backend API** | http://localhost:4000 | REST API server |
| 🤖 **AI Model** | http://localhost:4040 | Hệ thống gợi ý sản phẩm |

---

## 📁 Cấu trúc dự án

```
Yumm!/
├── frontend/          ← Giao diện người mua (React + Vite)
│   └── src/
│       ├── components/   (Navbar, Header, Footer, FoodItem...)
│       ├── pages/        (Home, Cart, PlaceOrder, Search...)
│       └── context/      (StoreContext — quản lý state)
│
├── admin/             ← Giao diện quản trị (React + Vite)
│   └── src/
│       ├── components/   (Navbar, Sidebar)
│       └── pages/        (Add, List, Orders)
│
├── backend/           ← API Server (Node.js + Express)
│   ├── config/          (db.js — kết nối MongoDB)
│   ├── controllers/     (food, user, cart, order)
│   ├── models/          (foodModel, userModel, orderModel)
│   ├── routes/          (foodRoute, userRoute, cartRoute, orderRoute)
│   ├── middleware/      (auth.js — xác thực JWT)
│   └── uploads/         (ảnh sản phẩm)
│
└── modelAI/           ← Hệ thống gợi ý AI (Python + FastAPI)
    ├── main.py          (FastAPI server)
    ├── recommend.py     (Thuật toán: Content-Based + Collaborative Filtering)
    └── data/            (Dữ liệu training)
```

---

## 🔌 API Endpoints

### Food `/api/food`
| Method | Endpoint | Mô tả |
|---|---|---|
| GET | `/list` | Lấy tất cả sản phẩm |
| GET | `/:id` | Lấy sản phẩm theo ID |
| GET | `/get?name=...` | Lấy sản phẩm theo tên |
| GET | `/search?search=...` | Tìm kiếm sản phẩm |
| POST | `/add` | Thêm sản phẩm (form-data + image) |
| POST | `/remove` | Xóa sản phẩm |
| POST | `/:id` | Thêm đánh giá (cần token) |

### User `/api/user`
| Method | Endpoint | Mô tả |
|---|---|---|
| POST | `/register` | Đăng ký |
| POST | `/login` | Đăng nhập |
| GET | `/get` | Lấy thông tin user (cần token) |
| POST | `/change` | Cập nhật thông tin (cần token) |

### Cart `/api/cart`
| Method | Endpoint | Mô tả |
|---|---|---|
| POST | `/add` | Thêm vào giỏ (cần token) |
| POST | `/remove` | Xóa khỏi giỏ (cần token) |
| POST | `/get` | Lấy giỏ hàng (cần token) |

### Order `/api/order`
| Method | Endpoint | Mô tả |
|---|---|---|
| POST | `/place` | Đặt hàng (cần token) |
| POST | `/verify` | Xác nhận thanh toán |
| POST | `/userorders` | Đơn hàng của user (cần token) |
| GET | `/list` | Tất cả đơn hàng (admin) |
| POST | `/status` | Cập nhật trạng thái đơn |

### AI `/recommend`
| Method | Endpoint | Mô tả |
|---|---|---|
| GET | `/ping` | Health check |
| GET | `/?item_name=...&user_name=...` | Lấy gợi ý sản phẩm |

---

## 💳 Thanh toán Test (Stripe)

Dự án dùng **Stripe test mode**. Dùng thẻ test để thử thanh toán:

| Thông tin | Giá trị |
|---|---|
| Số thẻ | `4242 4242 4242 4242` |
| Ngày hết hạn | Bất kỳ (tương lai) |
| CVC | Bất kỳ 3 số |

---

## ❓ Lỗi thường gặp

| Lỗi | Nguyên nhân | Cách sửa |
|---|---|---|
| `npm.ps1 cannot be loaded` | PowerShell chặn script | Chạy `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned` |
| `ECONNREFUSED localhost:27017` | MongoDB chưa chạy | Kiểm tra service: `Get-Service MongoDB` (Windows) hoặc `sudo systemctl start mongod` (Linux) |
| `ModuleNotFoundError: sklearn` | Thiếu thư viện Python | Chạy `pip install scikit-learn` |
| `EADDRINUSE port 4000` | Port đang bị chiếm | Chạy `npx kill-port 4000` |
| Ảnh sản phẩm không hiện | File ảnh thiếu trong `uploads/` | Thêm sản phẩm qua Admin panel với ảnh |

---

## 👥 Đóng góp

1. Fork dự án
2. Tạo branch: `git checkout -b feature/ten-tinh-nang`
3. Commit: `git commit -m "Thêm tính năng mới"`
4. Push: `git push origin feature/ten-tinh-nang`
5. Tạo Pull Request