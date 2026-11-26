# Cinema API – mã nguồn demo 90 phút (Node.js, Express, MongoDB, Mongoose)

Mỗi thư mục trong `checkpoints/` là trạng thái hoàn chỉnh của dự án **sau** một bước trong kịch bản.
Sinh viên bị lỗi hoặc chậm → copy checkpoint tương ứng, chạy tiếp cùng lớp.

| Checkpoint | Sau bước | Nội dung |
|---|---|---|
| [01-hello](#01-hello) | 3 | Server Express đầu tiên: `/`, `/api/health` |
| [02-routes](#02-routes) | 4 | `req.params`, `req.query`, 404 |
| [03-middleware](#03-middleware) | 5 | `express.json()`, logger, 404, xử lý lỗi |
| [04-crud-memory](#04-crud-memory) | 6 | CRUD đầy đủ trên mảng trong bộ nhớ + `movies.http` |
| [05-router](#05-router) | 7 | Tách `routes/`, `controllers/`, `middlewares/` |
| [06-mongoose-connect](#06-mongoose-connect) | 9 | `.env`, `dotenv`, `connectDB()` |
| [07-mongoose-crud](#07-mongoose-crud) | 10 | Schema/Model `Movie`, controller dùng Model |
| [08-final](#08-final) | 11 (+ mở rộng) | Lỗi Mongoose → 400/409, tìm kiếm, phân trang, `Showtime` + `populate`, `npm run seed` |

## Yêu cầu

- Node.js ≥ 20 (cần `node --watch` và top-level `await`). Đã kiểm thử với Node 22, Express 5.3, Mongoose 8.24, MongoDB 8.
- Từ checkpoint 06: một cluster MongoDB Atlas (bản Free) hoặc MongoDB cài trên máy.
- Postman Desktop hoặc tiện ích **REST Client** của VS Code để gọi API.

## Cách chạy chung

```bash
cd checkpoints/<tên-checkpoint>
npm install
npm run dev            # node --watch: tự khởi động lại khi sửa code
```

Server chạy tại `http://localhost:3000`. Dừng server: `Ctrl + C`.

Từ 06 trở đi cần thêm file `.env` trước khi chạy:

```bash
cp .env.example .env   # Windows PowerShell: copy .env.example .env
```

Mở `.env`, thay `MONGODB_URI` bằng connection string Atlas của bạn (đã điền user, mật khẩu, giữ `/cinema` ở cuối để dùng database `cinema`).

---

## 01-hello

**Mục tiêu:** dựng server Express đầu tiên.

**Cấu trúc:**

```
01-hello/
├── package.json     "type": "module", script dev/start
└── src/app.js
```

**Chạy:** `npm install` → `npm run dev`. Terminal in `Server chạy tại http://localhost:3000`.

**Thử:**

| Request | Kết quả mong đợi |
|---|---|
| `GET http://localhost:3000/` | Chuỗi `Xin chào từ Express!` |
| `GET http://localhost:3000/api/health` | `{ "status": "ok", "time": "..." }` |

Có thể mở thẳng hai đường dẫn này trên trình duyệt.

**Điểm cần nắm:** `express()` tạo app, `app.get(path, handler)` khai báo route, `res.send` trả chuỗi, `res.json` trả JSON, `app.listen` mở cổng.

---

## 02-routes

**Mục tiêu:** đọc dữ liệu từ đường dẫn (`req.params`) và chuỗi truy vấn (`req.query`).

**Thay đổi so với 01:** thêm mảng `movies` (2 phim) và 2 route trong `src/app.js`.

**Thử:**

| Request | Kết quả mong đợi |
|---|---|
| `GET /api/movies` | Mảng 2 phim |
| `GET /api/movies?genre=Hài` | Chỉ phim thể loại Hài |
| `GET /api/movies/2` | Phim có `id` 2 |
| `GET /api/movies/999` | `404` – `{ "message": "Không tìm thấy phim" }` |

**Điểm cần nắm:** `req.params.id` luôn là chuỗi nên phải `Number(...)` trước khi so sánh; dùng `return res.status(404)...` để dừng handler.

---

## 03-middleware

**Mục tiêu:** hiểu chuỗi middleware và thứ tự đặt chúng.

**Thay đổi so với 02:** trong `src/app.js` thêm theo thứ tự:

1. `app.use(express.json())` – đọc body JSON vào `req.body`.
2. Middleware logger tự viết – in giờ, method, URL rồi gọi `next()`.
3. Route `GET /api/boom` cố tình ném lỗi.
4. Middleware 404 (đặt **sau** mọi route).
5. Middleware xử lý lỗi 4 tham số `(err, req, res, next)` (đặt **cuối cùng**).

**Thử:**

| Request | Kết quả mong đợi |
|---|---|
| Bất kỳ request nào | Terminal in một dòng log |
| `GET /api/khong-co` | `404` – `Không tìm thấy đường dẫn` |
| `GET /api/boom` | `500` – `Có gì đó hỏng rồi!`, terminal in stack lỗi |

**Thử nghiệm thêm:** xóa `next()` trong logger → request bị treo; chuyển middleware 404 lên trước các route → mọi request đều 404.

---

## 04-crud-memory

**Mục tiêu:** API CRUD đầy đủ trên mảng trong bộ nhớ.

**Thay đổi so với 03:** thêm `POST`, `PUT`, `DELETE`; biến `nextId` cấp id mới; hàm `findIndex` dùng chung. Thêm file `movies.http`.

**Các endpoint:**

| Method | Đường dẫn | Mã trả về |
|---|---|---|
| GET | `/api/movies?genre=` | 200 |
| GET | `/api/movies/:id` | 200 / 404 |
| POST | `/api/movies` | 201 / 400 (thiếu `title` hoặc `genre`) |
| PUT | `/api/movies/:id` | 200 / 404 |
| DELETE | `/api/movies/:id` | 204 / 404 |

**Thử:** mở `movies.http` trong VS Code, bấm *Send Request* lần lượt từ 1 đến 9, hoặc dùng thư mục *1 · Mảng trong bộ nhớ* trong Postman.
Body POST phải có header `Content-Type: application/json`.

**Lưu ý:** dữ liệu nằm trong RAM – sửa code (server tự khởi động lại) hoặc tắt server là mất phim vừa tạo, id quay về 3.

---

## 05-router

**Mục tiêu:** tách mã theo trách nhiệm, API giữ nguyên như 04.

**Cấu trúc mới:**

```
src/
├── app.js                       ghép middleware + router
├── routes/movies.js             khai báo đường dẫn → hàm controller
├── controllers/movieController.js  logic xử lý (list, getOne, create, update, remove)
└── middlewares/
    ├── logger.js
    └── errorHandler.js          notFound + errorHandler
```

**Điểm cần nắm:** `app.use("/api/movies", movieRoutes)` gắn router vào tiền tố, nên trong router chỉ viết `"/"` và `"/:id"`. Logger dùng `req.originalUrl` để in đủ đường dẫn.

**Thử:** chạy lại toàn bộ `movies.http` – kết quả phải giống hệt 04.

---

## 06-mongoose-connect

**Mục tiêu:** kết nối MongoDB bằng Mongoose, đọc cấu hình từ `.env`.

**Thay đổi so với 05:**

- `package.json` thêm `dotenv`, `mongoose`.
- `.env.example` – mẫu biến môi trường (`PORT`, `MONGODB_URI`).
- `src/db.js` – hàm `connectDB()`.
- `src/app.js` – dòng đầu `import "dotenv/config"`; cuối file `await connectDB()` rồi mới `app.listen`.

Controller **vẫn dùng mảng** – bước này chỉ kiểm tra kết nối.

**Chạy:**

```bash
cp .env.example .env    # dán connection string vào MONGODB_URI
npm install
npm run dev
```

**Kết quả mong đợi:** terminal in `Đã kết nối MongoDB: cinema` rồi `Server chạy tại ...`.

**Lỗi thường gặp:**

| Thông báo | Nguyên nhân |
|---|---|
| `The uri parameter ... must be a string, got "undefined"` | Chưa tạo `.env`, hoặc đặt sai thư mục (phải cùng cấp `package.json`) |
| `bad auth : authentication failed` | Sai user/mật khẩu; mật khẩu có ký tự đặc biệt cần mã hóa URL |
| `querySrv ...` / timeout | Chưa thêm IP vào *Network Access* trên Atlas, hoặc mạng chặn |

---

## 07-mongoose-crud

**Mục tiêu:** thay mảng bằng Model `Movie`, dữ liệu lưu thật trong MongoDB.

**Thay đổi so với 06:**

- `src/models/Movie.js` – Schema: `title` (bắt buộc, `trim`), `genres` (mảng chuỗi), `duration` (bắt buộc, ≥ 30), `ageRating` (`P|K|T13|T16|T18`, mặc định `P`), `isShowing` (mặc định `true`), `timestamps`.
- `src/controllers/movieController.js` – các hàm `async` dùng `Movie.find`, `findById`, `create`, `findByIdAndUpdate` (`new: true`, `runValidators: true`), `findByIdAndDelete`.
- Lọc thể loại đổi sang trường `genres`: `GET /api/movies?genre=Hài`.

**Thử** (file `movies.http` mới hoặc Postman thư mục *2 · MongoDB*):

1. Gửi request 2 (tạo phim) → `201`, bản ghi có `_id`, `createdAt`, `title` đã bị cắt khoảng trắng.
2. Copy `_id` dán vào dòng `@id = ...` ở đầu file (Postman tự lưu vào biến `movieId`).
3. Gửi request 3, 4, 9 để đọc, sửa, xóa.
4. Mở Compass/Atlas → database `cinema` → collection `movies` để thấy dữ liệu.

**Chưa hoàn thiện (để sửa ở bước 11):** request 5 (sai Schema) và 6 (id `abc`) đang trả `500` kèm thông báo lỗi gốc. Express 5 tự chuyển lỗi của hàm `async` vào `errorHandler`, nên không cần `try/catch`.

---

## 08-final

**Mục tiêu:** hoàn thiện xử lý lỗi và mở rộng API.

**Thay đổi so với 07:**

- `src/middlewares/errorHandler.js` – đổi lỗi thành mã HTTP đúng:

  | Lỗi | Mã |
  |---|---|
  | `ValidationError` (sai Schema) | 400, gộp các thông báo |
  | `CastError` (id sai định dạng) | 400 – `Id không hợp lệ` |
  | `code 11000` (trùng khóa unique) | 409 |
  | Body không phải JSON hợp lệ | 400 |
  | Lỗi khác | 500 – `Lỗi server` (không lộ chi tiết) |

- `GET /api/movies` hỗ trợ `q` (tìm theo tên, không phân biệt hoa thường), `genre`, `page`, `limit` (mặc định 6, tối đa 50); trả về `{ items, total, page, pages }`.
- `src/models/Showtime.js` – suất chiếu tham chiếu `Movie` qua `ObjectId` (`ref: "Movie"`), có `startAt`, `room`, `bookedSeats`.
- `src/routes/showtimes.js`, `src/controllers/showtimeController.js` – `GET /api/showtimes?movieId=` (dùng `populate` lấy `title`, `duration`, `ageRating` của phim) và `POST /api/showtimes`.
- `scripts/seed.js` + script `npm run seed` – xóa dữ liệu cũ, nạp 7 phim và 3 suất chiếu mẫu.

**Chạy:**

```bash
cp .env.example .env
npm install
npm run seed      # in "Đã nạp 7 phim và 3 suất chiếu"
npm run dev
```

**Thử:**

| Request | Kết quả mong đợi |
|---|---|
| `GET /api/movies` | 6 phim mới nhất, `total: 7`, `pages: 2` |
| `GET /api/movies?page=2` | Phim còn lại |
| `GET /api/movies?q=đèn&page=1&limit=2` | Các phim có chữ "đèn" trong tên |
| `GET /api/movies?genre=Hài` | Phim có `Hài` trong `genres` |
| `POST /api/movies` body `{ "title": "", "duration": 10, "ageRating": "X" }` | `400` kèm danh sách lỗi |
| `GET /api/movies/abc` | `400` – `Id không hợp lệ` |
| `GET /api/showtimes` | 3 suất chiếu, trường `movie` là object phim đầy đủ |
| `POST /api/showtimes` body `{ "movie": "<_id phim>", "startAt": "2026-12-02T19:00:00+07:00", "room": "Phòng 1" }` | `201` |

**Lưu ý:** `npm run seed` xóa sạch `movies` và `showtimes` trước khi nạp – `_id` cũ không còn dùng được.

---

## Gọi thử API bằng Postman

1. Cài **Postman Desktop** (bản web không gọi được `localhost` nếu chưa cài Postman Agent).
2. Postman → **Import** → kéo file `postman/cinema-api.postman_collection.json` vào.
3. Collection có 2 thư mục: *1 · Mảng trong bộ nhớ* (dùng với 04, 05, 06) và *2 · MongoDB* (dùng với 07, 08).
4. Biến `base` = `http://localhost:3000/api`. Request *Tạo phim (lưu movieId)* tự lưu `_id` vào biến `movieId`.

Các file `movies.http` dùng với tiện ích REST Client của VS Code.

## mongosh-demo.js

Các lệnh MongoDB gốc dùng ở bước 8 (trước checkpoint 06): mở MongoDB Compass → kết nối cluster → tab **Mongosh** → dán từng khối lệnh:

1. `use cinema` – chọn database.
2. `insertOne` – thêm 2 phim.
3. `find` – đọc tất cả, lọc `duration >= 100`, lọc theo `genres` bằng `$in`.
4. `updateOne` với `$set` – sửa một phim.
5. `deleteOne` – xóa một phim.
6. `deleteMany({})` – dọn sạch collection trước khi sang Mongoose.
