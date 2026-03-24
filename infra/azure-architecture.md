# Azure Infrastructure Blueprint (No Azure Media Services)

## Services
- **Azure Blob Storage**
  - `raw-videos` (Hot tier)
  - `processed-videos` (Hot tier)
  - Lifecycle policy to move stale objects to Cool
- **Azure CDN**
  - Mandatory edge for all manifests/segments/thumbnails
  - Origin: Blob static endpoint/private endpoint
- **Azure Container Apps / AKS**
  - `api-service` (NestJS, stateless)
  - `worker-service` (BullMQ + FFmpeg)
- **Azure Cache for Redis**
  - Continue watching cache, home payload cache, search cache
- **Azure Queue / Redis Queue**
  - Work dispatch for video transcoding jobs
- **Azure Monitor + Log Analytics**
  - Cost, error rate, queue lag, egress alerts

## Delivery Rule
1. App requests signed CDN URL from API.
2. API returns short-lived URL/token.
3. Player fetches `master.m3u8` from CDN.
4. Segments cached at edge; origin hit minimized.

## Security
- No direct client read on Blob containers.
- SAS/internal auth used between services.
- CDN token auth + WAF rules.

## Scaling
- API autoscale on RPS/CPU.
- Worker autoscale on queue depth and job age.
- Redis sized for cache hit ratio > 80% on home endpoints.
