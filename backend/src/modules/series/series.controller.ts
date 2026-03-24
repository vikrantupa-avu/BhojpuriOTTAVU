import { Controller, Get, Param } from '@nestjs/common';
import { SeriesService } from './series.service';

@Controller('series')
export class SeriesController {
  constructor(private readonly seriesService: SeriesService) {}

  @Get()
  listSeries() {
    return this.seriesService.listSeries();
  }

  @Get('home')
  getHome() {
    return this.seriesService.getHomeSections();
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    return this.seriesService.getSeriesById(id);
  }
}
