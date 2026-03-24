import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { WatchProgress, WatchProgressDocument } from './schemas/watch-progress.schema';
import { UpsertProgressDto } from './dto/upsert-progress.dto';
import { REDIS } from '../../redis/redis.module';
import Redis from 'ioredis';

@Injectable()
export class WatchProgressService {
  constructor(
    @InjectModel(WatchProgress.name) private readonly progressModel: Model<WatchProgressDocument>,
    @Inject(REDIS) private readonly redis: Redis,
  ) {}

  async upsertProgress(dto: UpsertProgressDto) {
    const updated = await this.progressModel.findOneAndUpdate(
      { userId: dto.userId, episodeId: dto.episodeId },
      dto,
      { upsert: true, new: true, setDefaultsOnInsert: true },
    );

    await this.redis.del(`continue:${dto.userId}`);
    return updated;
  }
}
