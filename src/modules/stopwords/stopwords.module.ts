import { Module } from '@nestjs/common';
import { StopwordsService } from './stopwords.service';
import { StopwordsController } from './stopwords.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Stopwords } from './stopwords.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Stopwords])],
  providers: [StopwordsService],
  controllers: [StopwordsController],
})
export class StopwordsModule {}
