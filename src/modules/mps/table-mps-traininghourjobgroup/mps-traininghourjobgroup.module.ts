import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TableTrainingHourJobGroup } from './table-mps-traininghourjobgroup.entity';
import { MasterJobGroup } from '../master-mps-jobgroup/master-mps-jobgroup.entity';
import { MPSTraningHourJobGroupService } from './mps-traininghourjobgroup.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([TableTrainingHourJobGroup, MasterJobGroup]),
  ],
  providers: [MPSTraningHourJobGroupService],
  exports: [MPSTraningHourJobGroupService],
})
export class MPSTrainingHourJobGroupModule {}
