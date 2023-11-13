import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CheckingCompleteSurvey } from './checking-complete-survey.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CheckingCompleteSurvey])],
  exports: [TypeOrmModule.forFeature([CheckingCompleteSurvey])],
})
export class CheckingCompleteSurveyModule {}
