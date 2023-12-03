import { Module } from '@nestjs/common';
import { TableOutsourcingPerGender } from './table-mps-outsourcingpergender.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MasterMPSGenderModule } from '../master-mps-gender/master-mps-gender.module';
import { MPSOutsourcingPerGenderService } from './mps-outsourcingpergender.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([TableOutsourcingPerGender]),
    MasterMPSGenderModule,
  ],
  providers: [MPSOutsourcingPerGenderService],
  exports: [MPSOutsourcingPerGenderService],
})
export class MPSOutsourcingPerGenderModule {}
