import { Controller, Get, Query } from '@nestjs/common';
import { ContinueWatchingService } from './continue-watching.service';

@Controller('continue-watching')
export class ContinueWatchingController {
  constructor(private readonly continueWatchingService: ContinueWatchingService) {}

  @Get()
  get(@Query('userId') userId: string) {
    return this.continueWatchingService.getContinueWatching(userId);
  }
}
