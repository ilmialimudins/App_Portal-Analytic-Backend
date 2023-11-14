import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SurveyGroup } from './master-survey-group.entity';
import { SurveyGroupService } from './master-survey-group.service';
import { SurveyGroupController } from './master-survey-group.controller';
import { CompanyModule } from '../master-company-ees/master-company-ees.module';

@Module({
  imports: [TypeOrmModule.forFeature([SurveyGroup]), CompanyModule],
  providers: [SurveyGroupService],
  controllers: [SurveyGroupController],
})
export class SurveyGroupModule {}
