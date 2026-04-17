import { Module } from '@nestjs/common';
import { VideoQueueController } from './video-queue.controller';
import { VideoQueueService } from './video-queue.service';

@Module({
  controllers: [VideoQueueController],
  providers: [VideoQueueService],
})
export class VideoQueueModule {}
