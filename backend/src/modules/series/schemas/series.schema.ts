import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type SeriesDocument = HydratedDocument<Series>;

@Schema({ timestamps: true })
export class Series {
  @Prop({ required: true, index: true })
  title!: string;

  @Prop({ required: true })
  description!: string;

  @Prop({ type: [String], default: [] })
  tags!: string[];

  @Prop({ type: [String], default: [] })
  categories!: string[];

  @Prop({ required: true })
  thumbnailUrl!: string;

  @Prop({ required: true })
  heroBannerUrl!: string;

  @Prop({ default: false })
  isTrending!: boolean;

  @Prop({ default: false })
  isNewRelease!: boolean;
}

export const SeriesSchema = SchemaFactory.createForClass(Series);
