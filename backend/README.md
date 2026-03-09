# Backend

Shared API for the **web** (PHP site) and **mobile** (React Native) apps.

## Run locally

```bash
cd backend
npm install
npm start
```

API base URL: `http://localhost:3000`

- `GET /api/health` — health check
- `GET /api/classes` — list classes (placeholder)
- `GET /api/classes/:code/students` — students for a class (placeholder; add DB later)

## Next steps

- Add a database (e.g. SQLite, PostgreSQL) and wire these routes to it
- Add auth if needed
- Deploy to your server and point `web` and `mobile` at the API URL
