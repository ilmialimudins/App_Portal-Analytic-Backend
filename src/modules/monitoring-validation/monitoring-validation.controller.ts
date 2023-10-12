import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MonitoringValidation } from './monitoring-validation.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MonitoringValidationController {
  constructor(
    @InjectRepository(MonitoringValidation)
    private monitoringValidationRepository: Repository<MonitoringValidation>,
  ) {}

  async getMonitoringValidation() {
    try {
      // const query = await this.monitoringValidationRepository
      // .createQueryBuilder('monitoringvalidation')
      // .
    } catch (error) {
      throw error;
    }
  }
}
