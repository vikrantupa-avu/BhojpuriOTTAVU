import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ContinueWatchingController } from './continue-watching.controller';
import { ContinueWatchingService } from './continue-watching.service';
import { WatchProgress, WatchProgressSchema } from '../watch-progress/schemas/watch-progress.schema';
import { Series, SeriesSchema } from '../series/schemas/series.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: WatchProgress.name, schema: WatchProgressSchema },
      { name: Series.name, schema: SeriesSchema },
    ]),
  ],
  controllers: [ContinueWatchingController],
  providers: [ContinueWatchingService],
})
export class ContinueWatchingModule {}
