import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Episode, EpisodeDocument } from './schemas/episode.schema';

@Injectable()
export class EpisodesService {
  constructor(@InjectModel(Episode.name) private readonly episodeModel: Model<EpisodeDocument>) {}

  async listBySeries(seriesId: string) {
    return this.episodeModel.find({ seriesId }).sort({ episodeNumber: 1 }).lean();
  }
}
