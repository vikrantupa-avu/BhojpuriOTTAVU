import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Series, SeriesDocument } from '../series/schemas/series.schema';

@Injectable()
export class SearchService {
  constructor(@InjectModel(Series.name) private readonly seriesModel: Model<SeriesDocument>) {}

  async search(query: string) {
    const q = query.trim();
    if (!q) return [];

    return this.seriesModel
      .find({
        $or: [{ title: { $regex: q, $options: 'i' } }, { tags: { $in: [new RegExp(q, 'i')] } }],
      })
      .limit(40)
      .lean();
  }
}
