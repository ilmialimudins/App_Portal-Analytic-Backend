import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TableGenderAge } from './table-mps-genderage.entity';
import { MasterAgeGroup } from '../master-mps-agegroup/master-mps-agegroup.entity';
import { MasterMPSGenderModule } from '../master-mps-gender/master-mps-gender.module';
import { MPSGenderAgeService } from './mps-genderage.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([TableGenderAge, MasterAgeGroup]),
    MasterMPSGenderModule,
  ],
  controllers: [],
  providers: [MPSGenderAgeService],
  exports: [MPSGenderAgeService],
})
export class MPSGenderAgeModule {}
