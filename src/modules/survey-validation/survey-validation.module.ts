import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SurveyValidation } from './survey-validation.entity';
import { SurveyValidationService } from './survey-validation.service';
import { SurveyValidationController } from './survey-validation.controller';

@Module({
  imports: [TypeOrmModule.forFeature([SurveyValidation])],
  providers: [SurveyValidationService],
  controllers: [SurveyValidationController],
})
export class SurveyValidationModule {}
