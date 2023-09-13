import { Module } from '@nestjs/common';
import { MasterCompanyService } from './master-company.service';
import { MasterCompanyController } from './master-company.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MasterEESCompany } from './master-company.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MasterEESCompany])],
  providers: [MasterCompanyService],
  controllers: [MasterCompanyController],
  exports: [MasterCompanyService],
})
export class MasterCompanyModule {}
