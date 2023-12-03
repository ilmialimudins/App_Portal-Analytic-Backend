import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MasterEducation } from '../master-mps-education/master-mps-education.entity';
import { MasterMPSGenderModule } from '../master-mps-gender/master-mps-gender.module';
import { MPSEducationService } from './mps-education.service';
import { TableEducation } from './table-mps-education.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([MasterEducation, TableEducation]),
    MasterMPSGenderModule,
  ],
  controllers: [],
  providers: [MPSEducationService],
  exports: [MPSEducationService],
})
export class MPSEducationModule {}
