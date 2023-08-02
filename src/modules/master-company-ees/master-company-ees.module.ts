import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MasterCompanyEES } from './master-company-ees.entity';
import { MasterCompanyEESService } from './master-company-ees.service';
import { MasterCompanyEESController } from './master-company-ees.controller';

@Module({
  imports: [TypeOrmModule.forFeature([MasterCompanyEES])],
  providers: [MasterCompanyEESService],
  controllers: [MasterCompanyEESController],
})
export class MasterCompanyEESModule {}
