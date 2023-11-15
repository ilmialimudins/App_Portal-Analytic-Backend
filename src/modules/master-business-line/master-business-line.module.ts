import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BusinessLine } from './master-business-line.entity';
import { BusinessLineService } from './master-business-line.service';
import { BusinessLineController } from './master-business-line.controller';
import { CompanyModule } from '../master-company-ees/master-company-ees.module';

@Module({
  imports: [TypeOrmModule.forFeature([BusinessLine]), CompanyModule],
  providers: [BusinessLineService],
  controllers: [BusinessLineController],
})
export class BusinessLineModule {}
