import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Series, SeriesDocument } from './schemas/series.schema';
import { REDIS } from '../../redis/redis.module';
import Redis from 'ioredis';

@Injectable()
export class SeriesService {
  constructor(
    @InjectModel(Series.name) private readonly seriesModel: Model<SeriesDocument>,
    @Inject(REDIS) private readonly redis: Redis,
  ) {}

  async listSeries() {
    const cacheKey = 'series:list:v1';
    const cached = await this.redis.get(cacheKey);
    if (cached) return JSON.parse(cached);

    const data = await this.seriesModel.find().sort({ createdAt: -1 }).limit(100).lean();
    await this.redis.set(cacheKey, JSON.stringify(data), 'EX', 120);
    return data;
  }

  async getSeriesById(id: string) {
    return this.seriesModel.findById(id).lean();
  }

  async getHomeSections() {
    const [featured, trending, newReleases] = await Promise.all([
      this.seriesModel.find().sort({ createdAt: -1 }).limit(5).lean(),
      this.seriesModel.find({ isTrending: true }).limit(20).lean(),
      this.seriesModel.find({ isNewRelease: true }).sort({ createdAt: -1 }).limit(20).lean(),
    ]);

    return {
      featured,
      trending,
      newReleases,
    };
  }
}
