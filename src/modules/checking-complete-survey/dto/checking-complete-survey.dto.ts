import { ApiProperty } from '@nestjs/swagger';
import { AbstractDto } from 'src/common/dto/abstract.dto';
import { CheckingCompleteSurvey } from '../checking-complete-survey.entity';

export class CheckingCompleteSurveyDto extends AbstractDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  respondentid: number;

  @ApiProperty()
  surveyid: string;

  @ApiProperty()
  company: string;

  @ApiProperty()
  validation: string;

  @ApiProperty()
  status: string;

  @ApiProperty()
  isdelete: string;

  constructor(checkingCompleteSurveyEntity: CheckingCompleteSurvey) {
    super(checkingCompleteSurveyEntity, { exludeFields: true });
    this.id = checkingCompleteSurveyEntity.id * 1;
    this.respondentid = checkingCompleteSurveyEntity.respondentid;
    this.surveyid = checkingCompleteSurveyEntity.surveyid;
    this.company = checkingCompleteSurveyEntity.company;
    this.validation = checkingCompleteSurveyEntity.validation;
    this.status = checkingCompleteSurveyEntity.status;
    this.isdelete = checkingCompleteSurveyEntity.isdelete;
  }
}
