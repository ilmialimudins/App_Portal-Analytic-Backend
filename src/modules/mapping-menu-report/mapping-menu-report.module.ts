import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MappingMenuReport } from './mapping-menu-report.entity';
import { MappingMenuReportService } from './mapping-menu-report.service';
import { MappingMenuReportController } from './mapping-menu-report.controller';

@Module({
  imports: [TypeOrmModule.forFeature([MappingMenuReport])],
  providers: [MappingMenuReportService],
  controllers: [MappingMenuReportController],
  exports: [MappingMenuReportService],
})
export class MappingMenuReportModule {}
