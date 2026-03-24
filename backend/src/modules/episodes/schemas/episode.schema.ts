import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type EpisodeDocument = HydratedDocument<Episode>;

@Schema({ timestamps: true })
export class Episode {
  @Prop({ type: Types.ObjectId, required: true, index: true })
  seriesId!: Types.ObjectId;

  @Prop({ required: true })
  title!: string;

  @Prop({ required: true })
  episodeNumber!: number;

  @Prop({ required: true, max: 300 })
  durationSeconds!: number;

  @Prop({ required: true })
  hlsManifestUrl!: string;

  @Prop({ required: true })
  thumbnailUrl!: string;

  @Prop({ default: 0 })
  introEndSecond!: number;
}

export const EpisodeSchema = SchemaFactory.createForClass(Episode);
EpisodeSchema.index({ seriesId: 1, episodeNumber: 1 }, { unique: true });
