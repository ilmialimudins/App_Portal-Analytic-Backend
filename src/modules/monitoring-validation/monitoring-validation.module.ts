import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MonitoringValidation } from './monitoring-validation.entity';
import { MonitoringValidationService } from './monitoring-validation.service';
import { MonitoringValidationController } from './monitoring-validation.controller';

@Module({
  imports: [TypeOrmModule.forFeature([MonitoringValidation])],
  providers: [MonitoringValidationService],
  controllers: [MonitoringValidationController],
})
export class MonitoringValidationModule {}
