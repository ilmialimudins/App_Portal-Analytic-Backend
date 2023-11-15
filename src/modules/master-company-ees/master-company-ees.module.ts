import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company } from './master-company-ees.entity';
import { CompanyService } from './master-company-ees.service';
import { CompanyController } from './master-company-ees.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Company])],
  providers: [CompanyService],
  controllers: [CompanyController],
  exports: [CompanyService, TypeOrmModule.forFeature([Company])],
})
export class CompanyModule {}
