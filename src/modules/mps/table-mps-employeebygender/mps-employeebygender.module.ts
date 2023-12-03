import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TableEmployeeByGender } from './table-mps-employeebygender.entity';
import { MasterMPSGenderModule } from '../master-mps-gender/master-mps-gender.module';
import { MPSEmployeeByGenderService } from './mps-employeebygender.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([TableEmployeeByGender]),
    MasterMPSGenderModule,
  ],
  providers: [MPSEmployeeByGenderService],
  exports: [MPSEmployeeByGenderService],
})
export class MPSEmployeeByGenderModule {}
