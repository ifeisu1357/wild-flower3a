## WILDFLOWER 野花網站

這是 `wild-flower.co` 的前端程式碼，使用 React + Vite + Tailwind CSS 建置。

### 開發環境

**需求：**

- Node.js（建議 LTS）

**啟動步驟：**

1. 安裝依賴：

   ```bash
   npm install
   ```

2. 建立 `.env.local`（可參考 `.env.example`），設定 PostHog 追蹤（可選）：

   ```env
   VITE_PUBLIC_POSTHOG_KEY="YOUR_POSTHOG_PROJECT_TOKEN"
   VITE_PUBLIC_POSTHOG_HOST="https://us.i.posthog.com"
   ```

3. 啟動開發伺服器：

   ```bash
   npm run dev
   ```

4. 打開瀏覽器前往顯示的本機網址（預設為 `http://localhost:3000`）。

### 部署

目前部署在 **Cloudflare Pages**，由 GitHub repo 自動建置：

- Build command: `npm run build`
- Build output: `dist`

Production 環境的環境變數同樣使用：

- `VITE_PUBLIC_POSTHOG_KEY`
- `VITE_PUBLIC_POSTHOG_HOST`