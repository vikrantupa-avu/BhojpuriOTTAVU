import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SeriesModule } from './series/series.module';
import { EpisodesModule } from './episodes/episodes.module';
import { SearchModule } from './search/search.module';
import { WatchProgressModule } from './watch-progress/watch-progress.module';
import { ContinueWatchingModule } from './continue-watching/continue-watching.module';
import { AuthModule } from './auth/auth.module';
import { RedisModule } from '../redis/redis.module';
import { VideoQueueModule } from './video-queue/video-queue.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        uri: config.get<string>('MONGODB_URI', 'mongodb://localhost:27017/ott'),
      }),
    }),
    RedisModule,
    AuthModule,
    SeriesModule,
    EpisodesModule,
    SearchModule,
    WatchProgressModule,
    ContinueWatchingModule,
    VideoQueueModule,
  ],
})
export class AppModule {}
