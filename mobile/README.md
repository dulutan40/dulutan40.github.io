# Mobile (React Native / Expo)

Front-end app for the same backend as the website. Built with **Expo** (React Native).

## First-time setup

1. Add app icons to `assets/` (optional for dev):
   - `icon.png` (1024×1024)
   - `splash-icon.png`, `adaptive-icon.png`, `favicon.png`
   Or use Expo’s defaults for local development.

2. Install and run:

```bash
cd mobile
npm install
npx expo start
```

Then open in iOS Simulator, Android emulator, or Expo Go on a device.

## Scripts

- `npm start` — start Expo dev server
- `npm run ios` — open iOS simulator
- `npm run android` — open Android emulator
- `npm run web` — run in browser

## Backend

Point the app at your backend API (e.g. `http://localhost:3000` or your deployed URL) when you add API calls. Same API as the `web/` project.
