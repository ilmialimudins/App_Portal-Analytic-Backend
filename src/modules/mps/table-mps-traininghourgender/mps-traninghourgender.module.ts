import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TableTrainingHourGender } from './table-mps-traininghourgender.entity';
import { MasterMPSGenderModule } from '../master-mps-gender/master-mps-gender.module';
import { MPSTraningHourGenderService } from './mps-traninghourgender.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([TableTrainingHourGender]),
    MasterMPSGenderModule,
  ],
  providers: [MPSTraningHourGenderService],
  exports: [MPSTraningHourGenderService],
})
export class MPSTraningHourGenderModule {}
