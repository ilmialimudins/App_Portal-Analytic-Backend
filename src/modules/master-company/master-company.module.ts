import { Module } from '@nestjs/common';
import { MasterCompanyService } from './master-company.service';
import { MasterCompanyController } from './master-company.controller';

@Module({
  providers: [MasterCompanyService],
  controllers: [MasterCompanyController],
})
export class MasterCompanyModule {}
