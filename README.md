# Bhojpuri OTT AVU - Cost-Optimized Short-Episode OTT Platform

A mobile-first OTT platform for episodic content (<= 5 minutes per episode), built for **low bandwidth**, **high scalability**, and **strict cost control** on Azure.

## Monorepo Layout

- `mobile/` — React Native (TypeScript) app with modern dark UI.
- `backend/` — NestJS + MongoDB + Redis API.
- `worker/` — BullMQ + FFmpeg transcoding worker for HLS packaging.
- `infra/` — Azure architecture, lifecycle policies, and deployment notes.

## Core Architecture

### Client Delivery
- React Native app uses `react-native-video` to stream HLS (`.m3u8`) from **Azure CDN**.
- No direct Blob URLs are exposed to the app.
- Episodes are loaded lazily; no full-video preloading.

### Backend API (Stateless)
- NestJS APIs serve series metadata, search, watch progress, and continue watching.
- MongoDB stores series, episode metadata, users, and watch progress.
- Redis caches:
  - Continue Watching feed
  - Trending / Home sections
  - Search hot queries (short TTL)

### Async Video Pipeline
1. Raw upload lands in Azure Blob `raw-videos` container.
2. API enqueues a processing job (`video:transcode`) via `POST /api/videos/transcode`.
3. Worker pulls job via BullMQ and executes FFmpeg ladder encoding (240p/480p/720p optional).
4. HLS manifests + segments + thumbnails stored under `processed-videos`.
5. CDN serves manifests/segments with caching and signed URL validation.

## FFmpeg Encoding Profile (Cost First)

### Renditions
- 240p: 300–400 kbps
- 480p: 600–800 kbps (default)
- 720p: <= 1200 kbps (only for high-value content)

### Suggested command pattern
```bash
ffmpeg -i input.mp4 \
  -filter_complex "[0:v]split=3[v240][v480][v720]; \
  [v240]scale=w=426:h=240:force_original_aspect_ratio=decrease[v240out]; \
  [v480]scale=w=854:h=480:force_original_aspect_ratio=decrease[v480out]; \
  [v720]scale=w=1280:h=720:force_original_aspect_ratio=decrease[v720out]" \
  -map "[v240out]" -c:v:0 libx264 -b:v:0 350k -maxrate:v:0 400k -bufsize:v:0 700k -crf 28 \
  -map "[v480out]" -c:v:1 libx264 -b:v:1 700k -maxrate:v:1 800k -bufsize:v:1 1400k -crf 27 \
  -map "[v720out]" -c:v:2 libx264 -b:v:2 1100k -maxrate:v:2 1200k -bufsize:v:2 2200k -crf 26 \
  -map a:0 -c:a aac -b:a 64k -ac 2 \
  -f hls -hls_time 4 -hls_playlist_type vod -hls_flags independent_segments \
  -master_pl_name master.m3u8 \
  -hls_segment_filename "v%v/segment_%03d.ts" \
  -var_stream_map "v:0,a:0 v:1,a:0 v:2,a:0" \
  v%v/index.m3u8
```

## API Surface
- `GET /api/series`
- `GET /api/series/home`
- `GET /api/series/:id`
- `GET /api/episodes/:seriesId`
- `POST /api/watch-progress`
- `GET /api/continue-watching?userId=`
- `GET /api/search?q=`
- `POST /api/videos/transcode`

## Local Development Setup

### 1) Start dependencies (MongoDB + Redis)
```bash
docker compose -f docker-compose.local.yml up -d
```

### 2) Copy env files
```bash
cp .env.example .env
cp backend/.env.example backend/.env
cp worker/.env.example worker/.env
cp mobile/.env.example mobile/.env
```

### 3) Install dependencies
```bash
npm install
```

### 4) Run services in separate terminals
```bash
npm run dev:backend
npm run dev:worker
npm run dev:mobile
```

## Run Plan
- Deploy backend API and worker separately for independent scaling.
- Use horizontal scaling for API pods.
- Use queue depth + job latency alarms for worker autoscaling.
