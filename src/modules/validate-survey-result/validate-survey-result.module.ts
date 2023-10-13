import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ValidateSurveyResult } from './validate-survey-result.entity';
import { ValidateSurveyResultService } from './valdiate-survey-result.service';
import { ValidateSurveyResultController } from './validate-survey-result.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ValidateSurveyResult])],
  providers: [ValidateSurveyResultService],
  controllers: [ValidateSurveyResultController],
})
export class ValidateSurveyResultModule {}
