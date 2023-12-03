import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TableGradeEmployeeStatus } from './table-mps-gradeemployeestatus.entity';

import { MasterGrade } from '../master-mps-grade/master-mps-grade.entity';
import { MasterEmployeeStatus } from '../master-mps-employeestatus/master-mps-employeestatus.entity';
import { MPSGradeEmployeeStatusService } from './mps-gradeemployeestatus.service';
import { MasterMPSGenderModule } from '../master-mps-gender/master-mps-gender.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      TableGradeEmployeeStatus,
      MasterGrade,
      MasterEmployeeStatus,
    ]),
    MasterMPSGenderModule,
  ],
  providers: [MPSGradeEmployeeStatusService],
  exports: [MPSGradeEmployeeStatusService],
})
export class MPSGradeEmployeeStatusModule {}
