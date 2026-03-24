# CDN Signed URL Strategy

## Goal
Allow playback only through short-lived signed URLs and prevent hotlinking/direct origin use.

## Strategy
- Backend generates JWT-like token with:
  - `videoId`
  - `path` wildcard (`/processed-videos/{videoId}/*`)
  - `exp` (5-15 min)
- CDN edge validates token before serving manifest/segments.
- Refresh token only when playback session is active.

## Cost Benefits
- Prevents abuse traffic and uncontrolled egress.
- Keeps CDN cache key stable while auth is validated.
