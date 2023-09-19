import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ngram } from './ngram.entity';
import { NgramService } from './ngram.service';
import { NgramController } from './ngram.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Ngram])],
  controllers: [NgramController],
  providers: [NgramService],
})
export class NgramModule {}
