import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MasterGender } from './master-mps-gender.entity';
import { MasterMPSGenderService } from './master-mps-gender.service';

@Module({
  imports: [TypeOrmModule.forFeature([MasterGender])],
  controllers: [],
  providers: [MasterMPSGenderService],
  exports: [MasterMPSGenderService],
})
export class MasterMPSGenderModule {}
