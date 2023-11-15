import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BusinessGroup } from './master-business-group.entity';
import { BusinessGroupService } from './master-business-group.service';
import { BusinessGroupController } from './master-business-group.controller';
import { CompanyModule } from '../master-company-ees/master-company-ees.module';

@Module({
  imports: [TypeOrmModule.forFeature([BusinessGroup]), CompanyModule],
  providers: [BusinessGroupService],
  controllers: [BusinessGroupController],
})
export class BusinessGroupModule {}
