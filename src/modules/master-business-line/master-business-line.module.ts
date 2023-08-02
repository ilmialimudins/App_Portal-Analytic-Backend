import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BusinessLine } from './master-business-line.entity';
import { BusinessLineService } from './master-business-line.service';
import { BusinessLineController } from './master-business-line.controller';

@Module({
  imports: [TypeOrmModule.forFeature([BusinessLine])],
  providers: [BusinessLineService],
  controllers: [BusinessLineController],
})
export class BusinessLineModule {}
