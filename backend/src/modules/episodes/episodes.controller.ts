import { Controller, Get, Param } from '@nestjs/common';
import { EpisodesService } from './episodes.service';

@Controller('episodes')
export class EpisodesController {
  constructor(private readonly episodesService: EpisodesService) {}

  @Get(':seriesId')
  getBySeriesId(@Param('seriesId') seriesId: string) {
    return this.episodesService.listBySeries(seriesId);
  }
}
