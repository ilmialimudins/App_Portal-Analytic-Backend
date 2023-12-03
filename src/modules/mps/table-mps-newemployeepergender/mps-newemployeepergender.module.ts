import { Module } from '@nestjs/common';
import { TableNewEmployeePerGender } from './table-mps-newemployeepergender.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MasterMPSGenderModule } from '../master-mps-gender/master-mps-gender.module';
import { MPSNewEmployeePerGenderService } from './mps-newemployeepergender.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([TableNewEmployeePerGender]),
    MasterMPSGenderModule,
  ],
  providers: [MPSNewEmployeePerGenderService],
  exports: [MPSNewEmployeePerGenderService],
})
export class MPSNewEmployeePerGenderModule {}
