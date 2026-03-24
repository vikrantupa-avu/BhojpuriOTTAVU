import { IsBoolean, IsMongoId, IsNumber, Max } from 'class-validator';

export class UpsertProgressDto {
  @IsMongoId()
  userId!: string;

  @IsMongoId()
  seriesId!: string;

  @IsMongoId()
  episodeId!: string;

  @IsNumber()
  @Max(300)
  positionSeconds!: number;

  @IsNumber()
  @Max(300)
  durationSeconds!: number;

  @IsBoolean()
  completed!: boolean;
}
