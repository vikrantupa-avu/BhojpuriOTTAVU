import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ContinueWatchingController } from './continue-watching.controller';
import { ContinueWatchingService } from './continue-watching.service';
import { WatchProgress, WatchProgressSchema } from '../watch-progress/schemas/watch-progress.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: WatchProgress.name, schema: WatchProgressSchema }])],
  controllers: [ContinueWatchingController],
  providers: [ContinueWatchingService],
})
export class ContinueWatchingModule {}
