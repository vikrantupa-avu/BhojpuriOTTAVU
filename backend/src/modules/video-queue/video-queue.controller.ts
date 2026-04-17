import { Body, Controller, Post } from '@nestjs/common';
import { VideoQueueService } from './video-queue.service';
import { EnqueueTranscodeDto } from './dto/enqueue-transcode.dto';

@Controller('videos')
export class VideoQueueController {
  constructor(private readonly videoQueueService: VideoQueueService) {}

  @Post('transcode')
  enqueue(@Body() dto: EnqueueTranscodeDto) {
    return this.videoQueueService.enqueueTranscode(dto);
  }
}
