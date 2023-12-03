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
  ],
  controllers: [MPSPropertyController],
  providers: [DownloadMPSService, MPSPropertyService],
})
export class MPSPropertyModule {}
