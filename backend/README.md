# Backend (NestJS)

## Modules
- `series` → listing, home sections, series details.
- `episodes` → series episodes listing.
- `watch-progress` → upsert playback progress.
- `continue-watching` → cached resume feed via Redis.
- `search` → instant title/tag search.
- `auth` → phone OTP request flow stub (Firebase-ready).

## Redis Keys
- `series:list:v1` (120s)
- `continue:<userId>` (90s)

## API Mapping
- `GET /api/series`
- `GET /api/series/:id`
- `GET /api/episodes/:seriesId`
- `POST /api/watch-progress`
- `GET /api/continue-watching?userId=`
- `GET /api/search?q=`
