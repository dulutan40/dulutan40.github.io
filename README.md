# dulutan40.github.io

Monorepo for the **Course Grades** project. Everything lives in this repo:

| Sub-project | Role |
|-------------|------|
| **web/** | PHP website (front-end). Deployed to your host via GitHub Actions. |
| **backend/** | Node/Express API shared by the website and the mobile app. |
| **mobile/** | React Native (Expo) app – same backend as web. |

## Quick start

- **Website:** Put the contents of `web/` on your PHP server (or run `php -S localhost:8000` inside `web/`).
- **Backend:** `cd backend && npm install && npm start` → API at `http://localhost:3000`.
- **Mobile:** `cd mobile && npm install && npx expo start` → run on simulator or device.

**Deploy:** The workflow (`.github/workflows/deploy.yml`) deploys the **web/** folder to both GoDaddy and InfinityFree. Add the secrets listed at the top of that file (including `INFINITYFREE_FTP_SERVER`, `INFINITYFREE_FTP_USERNAME`, `INFINITYFREE_FTP_PASSWORD` for InfinityFree; host is usually `ftpupload.net`).

## Layout

```
.
├── web/          # PHP site (index.php, style.css, scripts.js)
├── backend/      # Express API (src/index.js)
├── mobile/       # Expo app (app/, app.json)
├── .cursor/
├── .github/
└── README.md
```

See each subfolder’s `README.md` for details.
