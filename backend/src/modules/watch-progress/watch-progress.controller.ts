import { Body, Controller, Post } from '@nestjs/common';
import { WatchProgressService } from './watch-progress.service';
import { UpsertProgressDto } from './dto/upsert-progress.dto';

@Controller('watch-progress')
export class WatchProgressController {
  constructor(private readonly watchProgressService: WatchProgressService) {}

  @Post()
  upsert(@Body() dto: UpsertProgressDto) {
    return this.watchProgressService.upsertProgress(dto);
  }
}
