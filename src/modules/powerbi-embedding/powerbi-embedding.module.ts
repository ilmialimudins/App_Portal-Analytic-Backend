import { Module } from '@nestjs/common';
import { PowerbiEmbeddingService } from './powerbi-embedding.service';
import { PowerbiEmbeddingController } from './powerbi-embedding.controller';
import { MappingMenuReportModule } from '../mapping-menu-report/mapping-menu-report.module';

@Module({
  imports: [MappingMenuReportModule],
  controllers: [PowerbiEmbeddingController],
  providers: [PowerbiEmbeddingService],
})
export class PowerbiEmbeddingModule {}
