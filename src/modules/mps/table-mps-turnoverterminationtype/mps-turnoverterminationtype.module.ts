import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TableTurnOverTerminationType } from './table-mps-turnoverterminationtype.entity';
import { MasterTerminationType } from '../master-mps-terminationtype/master-mps-terminationtype.entity';
import { MasterGrade } from '../master-mps-grade/master-mps-grade.entity';
import { MasterMPSGenderModule } from '../master-mps-gender/master-mps-gender.module';
import { MPSTurnOverTerminationTypeService } from './mps-turnoverterminationtype.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      TableTurnOverTerminationType,
      MasterTerminationType,
      MasterGrade,
    ]),
    MasterMPSGenderModule,
  ],
  providers: [MPSTurnOverTerminationTypeService],
  controllers: [],
  exports: [MPSTurnOverTerminationTypeService],
})
export class MPSTurnOverTerminationTypeModule {}
