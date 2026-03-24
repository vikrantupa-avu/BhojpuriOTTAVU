import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SearchController } from './search.controller';
import { SearchService } from './search.service';
import { Series, SeriesSchema } from '../series/schemas/series.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Series.name, schema: SeriesSchema }])],
  controllers: [SearchController],
  providers: [SearchService],
})
export class SearchModule {}
