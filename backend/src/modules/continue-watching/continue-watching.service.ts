import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { REDIS } from '../../redis/redis.module';
import Redis from 'ioredis';
import { WatchProgress, WatchProgressDocument } from '../watch-progress/schemas/watch-progress.schema';
import { Series, SeriesDocument } from '../series/schemas/series.schema';

@Injectable()
export class ContinueWatchingService {
  constructor(
    @InjectModel(WatchProgress.name) private readonly progressModel: Model<WatchProgressDocument>,
    @InjectModel(Series.name) private readonly seriesModel: Model<SeriesDocument>,
    @Inject(REDIS) private readonly redis: Redis,
  ) {}

  async getContinueWatching(userId: string) {
    const cacheKey = `continue:${userId}`;
    const cached = await this.redis.get(cacheKey);
    if (cached) return JSON.parse(cached);

    const progressItems = await this.progressModel
      .find({ userId, completed: false })
      .sort({ updatedAt: -1 })
      .limit(20)
      .lean();

    const uniqueSeriesIds = [...new Set(progressItems.map((item) => String(item.seriesId)))].filter((id) =>
      Types.ObjectId.isValid(id),
    );

    const seriesDocs = uniqueSeriesIds.length
      ? await this.seriesModel.find({ _id: { $in: uniqueSeriesIds } }).lean()
      : [];

    const seriesById = new Map(seriesDocs.map((series) => [String(series._id), series]));

    const items = progressItems
      .map((progress) => {
        const series = seriesById.get(String(progress.seriesId));
        if (!series) return null;

        return {
          _id: String(series._id),
          title: series.title,
          description: series.description,
          thumbnailUrl: series.thumbnailUrl,
          heroBannerUrl: series.heroBannerUrl,
          tags: series.tags,
          categories: series.categories,
          progress: {
            episodeId: String(progress.episodeId),
            positionSeconds: progress.positionSeconds,
            durationSeconds: progress.durationSeconds,
          },
        };
      })
      .filter((item): item is NonNullable<typeof item> => item !== null);

    await this.redis.set(cacheKey, JSON.stringify(items), 'EX', 90);
    return items;
  }
}
