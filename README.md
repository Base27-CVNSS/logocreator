<p align="center">
  <img src="./public/og-image.png" alt="LogoCreator" width="100%" />
</p>

<h1 align="center">🎨 LogoCreator — Trình tạo logo AI tiếng Việt</h1>

<p align="center">
  <strong>Từ ý tưởng → logo → chỉnh sửa → bộ nhận diện thương hiệu trong một quy trình trực quan.</strong>
</p>

<p align="center">
  <a href="https://www.logo-creator.io/">🌐 Bản gốc trực tuyến</a> ·
  <a href="https://github.com/Base27-CVNSS/logocreator">🇻🇳 Kho Việt hóa</a> ·
  <a href="https://github.com/Nutlope/logocreator">🔗 Upstream</a>
</p>

---

## ✨ LogoCreator là gì?

**LogoCreator** là ứng dụng web tạo logo bằng AI. Người dùng nhập tên thương hiệu, mô tả ý tưởng, chọn cấu trúc logo, phong cách, màu sắc và mức chi tiết; hệ thống gửi yêu cầu tới mô hình tạo ảnh trên **Together AI**, nhận kết quả rồi cho phép tiếp tục chỉnh sửa, lưu lịch sử và xây dựng bộ nhận diện.

Bản trong kho `Base27-CVNSS/logocreator` tập trung vào **Việt hóa trải nghiệm sử dụng** nhưng giữ nguyên các key kỹ thuật, tên model và hợp đồng API để tránh làm thay đổi hành vi sinh ảnh.

> **Nguyên tắc Việt hóa:** dịch phần người dùng nhìn thấy; không dịch `logoType`, tên style nội bộ, tên model, biến môi trường, endpoint hoặc payload kỹ thuật.

---

## 🚀 Điểm nổi bật

| Hạng mục | Khả năng |
|---|---|
| 🤖 Sinh logo bằng AI | Tạo nhiều phương án logo từ tên thương hiệu và mô tả |
| 🎯 Kiểu logo | Biểu tượng + tên, icon, wordmark, monogram, emblem, abstract |
| 🧩 Phong cách | Minimal, Geometric, Gradient, Mascot, Hand-drawn, Luxury, Retro, 3D |
| 🎨 Màu sắc | Chọn màu thương hiệu, màu nền hoặc để AI tự chọn |
| 🖼️ Logo tham chiếu | Tải logo mẫu để AI đọc phong cách/màu và dùng làm cảm hứng |
| 🌐 Nhập thương hiệu | Có thể lấy tên/màu từ website hoặc logo có sẵn |
| ✏️ Chỉnh sửa tiếp | Dùng mô hình image-edit để yêu cầu thay đổi logo bằng ngôn ngữ tự nhiên |
| 📦 Brand Kit | Tạo các tài sản nhận diện và đóng gói để tải xuống |
| 🕘 Lịch sử cục bộ | Logo được lưu trên thiết bị bằng IndexedDB |
| 🔑 BYOK | Có thể dùng API key Together AI của riêng bạn |
| 🌗 Sáng/tối | Giao diện responsive, hỗ trợ chế độ sáng và tối |
| 🇻🇳 Tiếng Việt | Metadata, onboarding, API key, preset, loại logo, trợ năng và UI chính được bản địa hóa |

---

## 🧠 Bản chất và nguyên lý hoạt động

LogoCreator **không phải một phần mềm vẽ vector truyền thống**. Nó là lớp điều phối giữa giao diện thiết kế và các mô hình AI tạo/chỉnh sửa hình ảnh.

```text
Người dùng
   │
   ├─ Tên thương hiệu
   ├─ Mô tả ý tưởng
   ├─ Kiểu logo / phong cách
   ├─ Màu / nền / chi tiết
   └─ Ảnh tham chiếu (tùy chọn)
   │
   ▼
Next.js UI
   │
   ├─ Chuẩn hóa tham số
   ├─ Quản lý lượt tạo / API key
   ├─ Gọi API route phía máy chủ
   └─ Quản lý lịch sử cục bộ
   │
   ▼
Next.js API Routes
   │
   ├─ /api/generate-logo
   ├─ /api/edit-logo
   ├─ /api/read-reference
   ├─ /api/import-brand
   └─ /api/credits
   │
   ▼
Together AI
   │
   ├─ FLUX.2 Pro → tạo ảnh
   └─ FLUX Kontext / image edit → chỉnh sửa
   │
   ▼
PNG / SVG / Brand Kit
```

### Luồng tạo logo

1. Người dùng cấu hình ý tưởng trong giao diện.
2. Frontend tạo payload từ các lựa chọn.
3. API route kiểm tra cấu hình, lượt sử dụng và API key.
4. Yêu cầu được gửi tới mô hình ảnh trên Together AI.
5. Kết quả base64 được chuyển thành `Blob`/object URL ở trình duyệt.
6. Logo được hiển thị trong gallery và lưu vào IndexedDB.
7. Người dùng có thể tạo biến thể, chỉnh sửa hoặc xây dựng Brand Kit.

---

## 🏗️ Kiến trúc mã nguồn

```text
logocreator/
├── app/
│   ├── api/                    # API routes: generate/edit/import/reference/credits
│   ├── components/             # Thành phần giao diện
│   │   ├── ApiKeyDialog.tsx
│   │   ├── BrandKitModal.tsx
│   │   ├── Gallery.tsx
│   │   ├── GenerationModal.tsx
│   │   ├── HistoryDashboard.tsx
│   │   ├── VietnameseLocalization.tsx
│   │   └── ...
│   ├── hooks/                  # Hook cho brand kit và trạng thái ứng dụng
│   ├── lib/                    # Pricing, preset, history DB, brand utilities...
│   ├── layout.tsx              # Metadata, theme, auth, ngôn ngữ vi
│   └── page.tsx                # Luồng điều phối chính của creator
├── hooks/                      # Hook UI dùng chung
├── lib/                        # Tiện ích dùng chung
├── public/                     # Ảnh, style thumbnails, tài nguyên tĩnh
├── scripts/                    # Script hỗ trợ tạo tài nguyên
├── .env.example
├── package.json
└── README.md
```

### Stack kỹ thuật

- **Next.js App Router + TypeScript** — framework ứng dụng.
- **React 19** — UI và state.
- **Tailwind CSS** — styling.
- **Radix UI** — dialog/select/primitive trợ năng.
- **Framer Motion** — animation.
- **Together AI** — hạ tầng inference cho mô hình ảnh.
- **Upstash Redis** — rate limiting tùy chọn.
- **Clerk** — đăng nhập tùy chọn.
- **IndexedDB + localStorage** — lịch sử logo và cấu hình cục bộ phía trình duyệt.

---

## 🇻🇳 Kiến trúc Việt hóa

Code gốc chưa tổ chức theo một framework i18n tập trung; nhiều chuỗi tiếng Anh nằm trực tiếp trong các component lớn. Bản Việt hóa áp dụng hai lớp:

### Lớp 1 — Dịch trực tiếp các bề mặt quan trọng

Các phần như:

- metadata SEO và `lang="vi"`;
- màn hình chào mừng;
- cấu hình API key;
- loại logo và mô tả cấu trúc;
- preset/gợi ý sáng tạo;
- chuyển chế độ sáng/tối;

được Việt hóa trực tiếp trong source.

### Lớp 2 — Compatibility localization

`app/components/VietnameseLocalization.tsx` xử lý các chuỗi UI cũ còn phân tán bằng ánh xạ **exact-match** trên text/`placeholder`/`title`/`aria-label`.

Thiết kế này có ba mục tiêu:

1. Không chạm vào key kỹ thuật và payload API.
2. Không thay đổi prompt hệ thống hoặc tên model ngoài ý muốn.
3. Cho phép chuyển dần sang hệ thống i18n dictionary chính thức ở các phiên bản sau.

> Hướng phát triển dài hạn nên là tách toàn bộ chuỗi UI sang `locales/vi.json` và dùng một lớp i18n chính thức thay vì duy trì compatibility layer.

---

## ⚙️ Cài đặt

### Yêu cầu

- Node.js **20.9+**
- `pnpm`
- API key Together AI nếu muốn dùng khóa riêng

### 1. Clone

```bash
git clone https://github.com/Base27-CVNSS/logocreator.git
cd logocreator
```

### 2. Cài dependency

```bash
pnpm install
```

### 3. Tạo file môi trường

```bash
cp .env.example .env.local
```

Windows PowerShell:

```powershell
Copy-Item .env.example .env.local
```

### 4. Cấu hình tối thiểu

```env
TOGETHER_API_KEY=your_together_api_key
```

Các biến tùy chọn:

```env
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_SITE_URL=
```

- **Upstash**: dùng khi cần rate limiting phía máy chủ.
- **Clerk**: bật đăng nhập/tài khoản.
- **NEXT_PUBLIC_SITE_URL**: URL canonical cho bản triển khai của bạn; nếu bỏ trống, ứng dụng dùng URL mặc định của dự án gốc.

### 5. Chạy development

```bash
pnpm dev
```

Mở:

```text
http://localhost:3000
```

### 6. Build production

```bash
pnpm build
pnpm start
```

---

## 🔐 Quyền riêng tư và API key

Ở chế độ BYOK, API key được nhập từ trình duyệt và được ứng dụng lưu cục bộ để sử dụng cho yêu cầu tiếp theo. Logo/lịch sử cũng có thành phần lưu cục bộ trên thiết bị.

Khuyến nghị khi triển khai công khai:

- không commit `.env.local`;
- không hard-code API key vào frontend;
- bật rate limiting nếu endpoint công khai;
- kiểm tra chính sách lưu trữ/truyền dữ liệu của nhà cung cấp inference;
- dùng HTTPS ở production.

---

## 🧪 Lệnh phát triển

```bash
pnpm dev      # chạy dev server
pnpm build    # build production
pnpm start    # chạy production build
pnpm lint     # kiểm tra lint
```

---

## 🗺️ Đề xuất phát triển tiếp

- [ ] Chuyển compatibility localization sang i18n dictionary chính thức.
- [ ] Thêm nút chuyển **Tiếng Việt / English**.
- [ ] Chuẩn hóa toàn bộ thông báo lỗi API sang error code + bản dịch UI.
- [ ] Thêm lựa chọn kích thước ảnh tới giới hạn model hỗ trợ.
- [ ] Thêm export SVG/vector ổn định hơn cho logo phức tạp.
- [ ] Thêm bộ preset riêng cho thương hiệu Việt Nam.
- [ ] Thêm template avatar, favicon, social card và bộ nhận diện mạng xã hội.
- [ ] Thêm test e2e cho luồng tạo → chỉnh sửa → brand kit → download.

---

## 🔗 Nguồn gốc và ghi công

Kho này là bản fork/Việt hóa dựa trên dự án:

- **Upstream:** `Nutlope/logocreator`
- **Tên dự án:** LogoCreator
- **Công nghệ cốt lõi:** Next.js + Together AI + FLUX

Mục tiêu của bản fork là giúp người dùng và lập trình viên Việt Nam dễ tiếp cận, nghiên cứu và triển khai giao diện tiếng Việt hơn, đồng thời giữ nguyên kiến trúc kỹ thuật cốt lõi của upstream.

### ⚖️ Lưu ý giấy phép

Tại thời điểm Việt hóa, kho hiện tại không có tệp `LICENSE` ở thư mục gốc. Vì vậy **không nên tự gắn MIT hoặc giấy phép khác cho toàn bộ mã nguồn nếu chưa xác minh quyền cấp phép từ upstream**. Hãy kiểm tra điều khoản của dự án gốc và các dependency trước khi phân phối lại hoặc sử dụng thương mại.

---

<p align="center">
  <strong>🎨 LogoCreator tiếng Việt — biến mô tả thành nhận diện thương hiệu bằng AI.</strong>
</p>
