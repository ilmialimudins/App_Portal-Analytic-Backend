import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReplaceWordcloud } from './replace-wordcloud.entity';
import { ReplaceWordcloudService } from './replace-wordcloud.service';
import { ReplaceWordcloudController } from './replace-wordcloud.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ReplaceWordcloud])],
  providers: [ReplaceWordcloudService],
  controllers: [ReplaceWordcloudController],
})
export class ReplaceWordcloudModule {}
