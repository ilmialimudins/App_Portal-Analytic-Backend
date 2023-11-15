import { Module } from '@nestjs/common';
import { PowerbiEmbeddingService } from './powerbi-embedding.service';
import { PowerbiEmbeddingController } from './powerbi-embedding.controller';

@Module({
  controllers: [PowerbiEmbeddingController],
  providers: [PowerbiEmbeddingService],
})
export class PowerbiEmbeddingModule {}
