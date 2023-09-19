import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SurveyGroup } from './master-survey-group.entity';
import { SurveyGroupService } from './master-survey-group.service';
import { SurveyGroupController } from './master-survey-group.controller';

@Module({
  imports: [TypeOrmModule.forFeature([SurveyGroup])],
  providers: [SurveyGroupService],
  controllers: [SurveyGroupController],
})
export class SurveyGroupModule {}
