import { Module } from '@nestjs/common';
import { TableApplicantPerGender } from './table-mps-applicantpergender.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MasterMPSGenderModule } from '../master-mps-gender/master-mps-gender.module';
import { MPSApplicantPerGenderService } from './mps-applicantpergender.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([TableApplicantPerGender]),
    MasterMPSGenderModule,
  ],
  providers: [MPSApplicantPerGenderService],
  exports: [MPSApplicantPerGenderService],
})
export class MPSApplicantPerGenderModule {}
