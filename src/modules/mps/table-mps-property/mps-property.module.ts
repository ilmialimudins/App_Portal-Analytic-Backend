import { Module } from '@nestjs/common';
import { MPSPropertyController } from './mps-property.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TableProperty } from './table-mps-property.entity';
import { CompanyModule } from 'src/modules/master-company-ees/master-company-ees.module';
import { DownloadMPSService } from './download-mps.service';
import { MPSPropertyService } from './mps-property.service';
import { MPSGradeEmployeeStatusModule } from '../table-mps-gradeemployeestatus/mps-gradeemployeestatus.module';
import { MPSEducationModule } from '../table-mps-education/mps-education.module';
import { MPSGenderAgeModule } from '../table-mps-genderage/mps-genderage.module';
import { MPSTenureModule } from '../master-mps-tenure/mps-tenure.module';
import { MPSTurnOverTerminationTypeModule } from '../table-mps-turnoverterminationtype/mps-turnoverterminationtype.module';
import { MPSEmployeeByGenderModule } from '../table-mps-employeebygender/mps-employeebygender.module';
import { MPSApplicantPerGenderModule } from '../table-mps-applicantpergender/mps-applicantpergender.module';
import { MPSOutsourcingPerGenderModule } from '../table-mps-outsourcingpergender/mps-outsourcingpergender.module';
import { MPSNewEmployeePerGenderModule } from '../table-mps-newemployeepergender/mps-newemployeepergender.module';
import { MPSTrainingHourJobGroupModule } from '../table-mps-traininghourjobgroup/mps-traininghourjobgroup.module';
import { MPSTraningHourGenderModule } from '../table-mps-traininghourgender/mps-traninghourgender.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([TableProperty]),
    CompanyModule,
    MPSGradeEmployeeStatusModule,
    MPSEducationModule,
    MPSGenderAgeModule,
    MPSTenureModule,
    MPSTurnOverTerminationTypeModule,
    MPSEmployeeByGenderModule,
    MPSApplicantPerGenderModule,
    MPSOutsourcingPerGenderModule,
    MPSNewEmployeePerGenderModule,
    MPSTrainingHourJobGroupModule,
    MPSTraningHourGenderModule,
  ],
  controllers: [MPSPropertyController],
  providers: [DownloadMPSService, MPSPropertyService],
})
export class MPSPropertyModule {}
