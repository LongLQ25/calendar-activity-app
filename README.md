# Calendar Activity App

Ứng dụng web quản lý activities theo ngày, xem trên Calendar và theo dõi thống kê ở Dashboard.

> Repo này **lồng thư mục**: source app nằm trong `calendar-activity-app/`.

## Chạy local

```bash
cd calendar-activity-app
npm install
npm run dev
```

Mở: http://localhost:5173

## Build

```bash
cd calendar-activity-app
npm run build
npm run preview
```

## Deploy Vercel (tránh 404)

App là SPA (React Router) nên cần rewrite về `index.html` để tránh 404 khi refresh/đi thẳng vào các route như `/dashboard`.

- Repo đã có cấu hình sẵn cho Vercel ở `vercel.json` (repo root) để build đúng thư mục con và set output `calendar-activity-app/dist`.
- Hoặc trên Vercel bạn có thể set **Root Directory** là `calendar-activity-app` và Output Directory là `dist`.

Xem README chi tiết trong thư mục app: `calendar-activity-app/README.md`.
