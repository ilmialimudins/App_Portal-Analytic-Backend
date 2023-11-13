import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ValidateSurveyResult } from './validate-survey-result.entity';
import { ValidateSurveyResultService } from './validate-survey-result.service';
import { ValidateSurveyResultController } from './validate-survey-result.controller';
import { CheckingCompleteSurveyModule } from '../checking-complete-survey/checking-complete-survey.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ValidateSurveyResult]),
    CheckingCompleteSurveyModule,
  ],
  providers: [ValidateSurveyResultService],
  controllers: [ValidateSurveyResultController],
})
export class ValidateSurveyResultModule {}
