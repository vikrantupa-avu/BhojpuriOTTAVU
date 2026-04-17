import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Queue } from 'bullmq';

interface VideoJobPayload {
  videoId: string;
  inputPath: string;
  outputDir: string;
  with720?: boolean;
}

@Injectable()
export class VideoQueueService implements OnModuleDestroy {
  private readonly queue: Queue<VideoJobPayload>;

  constructor(private readonly configService: ConfigService) {
    const redisUrl = this.configService.get<string>('REDIS_URL', 'redis://localhost:6379');
    this.queue = new Queue<VideoJobPayload>('video:transcode', {
      connection: { url: redisUrl },
    });
  }

  async enqueueTranscode(payload: VideoJobPayload) {
    const job = await this.queue.add('transcode', payload);
    return {
      jobId: job.id,
      queue: 'video:transcode',
      status: 'queued',
    };
  }

  async onModuleDestroy() {
    await this.queue.close();
  }
}
