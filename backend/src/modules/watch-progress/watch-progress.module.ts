import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { WatchProgress, WatchProgressSchema } from './schemas/watch-progress.schema';
import { WatchProgressController } from './watch-progress.controller';
import { WatchProgressService } from './watch-progress.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: WatchProgress.name, schema: WatchProgressSchema }])],
  controllers: [WatchProgressController],
  providers: [WatchProgressService],
  exports: [WatchProgressService],
})
export class WatchProgressModule {}
