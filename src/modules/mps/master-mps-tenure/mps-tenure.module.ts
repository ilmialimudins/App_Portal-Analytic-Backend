import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MasterTenure } from './master-mps-tenure.entity';
import { TableTenure } from '../table-mps-tenure/table-mps-tenure.entity';
import { MasterMPSGenderModule } from '../master-mps-gender/master-mps-gender.module';
import { MPSTenureService } from './mps-tenure.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([MasterTenure, TableTenure]),
    MasterMPSGenderModule,
  ],
  controllers: [],
  providers: [MPSTenureService],
  exports: [MPSTenureService],
})
export class MPSTenureModule {}
