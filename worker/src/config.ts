export const config = {
  redisUrl: process.env.REDIS_URL ?? 'redis://localhost:6379',
  ffmpegPath: process.env.FFMPEG_PATH ?? 'ffmpeg',
  ffprobePath: process.env.FFPROBE_PATH ?? 'ffprobe',
  tempDir: process.env.WORKER_TEMP_DIR ?? '/tmp/ott',
  output240Bitrate: process.env.OUTPUT_240_BITRATE ?? '350k',
  output480Bitrate: process.env.OUTPUT_480_BITRATE ?? '700k',
  output720Bitrate: process.env.OUTPUT_720_BITRATE ?? '1100k',
};
