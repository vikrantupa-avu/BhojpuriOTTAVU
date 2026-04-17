import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class EnqueueTranscodeDto {
  @IsString()
  videoId!: string;

  @IsString()
  inputPath!: string;

  @IsString()
  outputDir!: string;

  @IsOptional()
  @IsBoolean()
  with720?: boolean;
}
