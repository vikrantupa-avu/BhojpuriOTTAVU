import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { REDIS } from '../../redis/redis.module';
import Redis from 'ioredis';
import { WatchProgress, WatchProgressDocument } from '../watch-progress/schemas/watch-progress.schema';

@Injectable()
export class ContinueWatchingService {
  constructor(
    @InjectModel(WatchProgress.name) private readonly progressModel: Model<WatchProgressDocument>,
    @Inject(REDIS) private readonly redis: Redis,
  ) {}

  async getContinueWatching(userId: string) {
    const cacheKey = `continue:${userId}`;
    const cached = await this.redis.get(cacheKey);
    if (cached) return JSON.parse(cached);

    const items = await this.progressModel
      .find({ userId, completed: false })
      .sort({ updatedAt: -1 })
      .limit(20)
      .lean();

    await this.redis.set(cacheKey, JSON.stringify(items), 'EX', 90);
    return items;
  }
}
