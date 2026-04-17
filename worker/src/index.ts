import 'dotenv/config';
import { Queue, Worker } from 'bullmq';
import Redis from 'ioredis';
import { config } from './config';
import { transcodeToHls, generateThumbnail } from './ffmpeg';

interface VideoJobPayload {
  videoId: string;
  inputPath: string;
  outputDir: string;
  with720?: boolean;
}

const connection = new Redis(config.redisUrl, { maxRetriesPerRequest: null });

export const videoQueue = new Queue<VideoJobPayload>('video:transcode', { connection });

new Worker<VideoJobPayload>(
  'video:transcode',
  async (job) => {
    const { inputPath, outputDir, with720 } = job.data;
    await transcodeToHls(inputPath, `${outputDir}/master.m3u8`, Boolean(with720));
    await generateThumbnail(inputPath, `${outputDir}/thumbnail.jpg`);

    return {
      masterManifestPath: `${outputDir}/master.m3u8`,
      thumbnailPath: `${outputDir}/thumbnail.jpg`,
    };
  },
  {
    connection,
    concurrency: 2,
  },
);
