import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company } from './master-company-ees.entity';
import { CompanyService } from './master-company-ees.service';
import { CompanyController } from './master-company-ees.controller';
import { AccessUserModule } from '../access-user/access-user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Company]), AccessUserModule],
  providers: [CompanyService],
  controllers: [CompanyController],
  exports: [CompanyService, TypeOrmModule.forFeature([Company])],
})
export class CompanyModule {}
