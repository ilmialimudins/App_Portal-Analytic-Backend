import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MasterReport } from './master-report.entity';
import { MasterReportService } from './master-report.service';
import { MasterReportController } from './master-report.controller';

@Module({
  imports: [TypeOrmModule.forFeature([MasterReport])],
  providers: [MasterReportService],
  controllers: [MasterReportController],
})
export class MasterReportModule {}
