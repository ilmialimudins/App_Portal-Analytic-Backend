import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ValidateSurveyResult } from './validate-survey-result.entity';
import { ValidateSurveyResultService } from './validate-survey-result.service';
import { ValidateSurveyResultController } from './validate-survey-result.controller';
import { CheckingCompleteSurveyModule } from '../checking-complete-survey/checking-complete-survey.module';
import { UploadSurveyTransaction } from './upload-validate-survey-result.transaction';
import { UpdateDateVersion } from './update-dateversion.transaction';

@Module({
  imports: [
    TypeOrmModule.forFeature([ValidateSurveyResult]),
    CheckingCompleteSurveyModule,
  ],
  providers: [
    ValidateSurveyResultService,
    UploadSurveyTransaction,
    UpdateDateVersion,
  ],
  controllers: [ValidateSurveyResultController],
})
export class ValidateSurveyResultModule {}
