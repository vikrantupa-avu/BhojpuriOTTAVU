import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type WatchProgressDocument = HydratedDocument<WatchProgress>;

@Schema({ timestamps: true })
export class WatchProgress {
  @Prop({ type: Types.ObjectId, required: true, index: true })
  userId!: Types.ObjectId;

  @Prop({ type: Types.ObjectId, required: true, index: true })
  seriesId!: Types.ObjectId;

  @Prop({ type: Types.ObjectId, required: true, index: true })
  episodeId!: Types.ObjectId;

  @Prop({ required: true })
  positionSeconds!: number;

  @Prop({ required: true })
  durationSeconds!: number;

  @Prop({ required: true })
  completed!: boolean;
}

export const WatchProgressSchema = SchemaFactory.createForClass(WatchProgress);
WatchProgressSchema.index({ userId: 1, episodeId: 1 }, { unique: true });
