import { ApiProperty } from '@nestjs/swagger';
import { AbstractDto } from 'src/common/dto/abstract.dto';
import { SurveyValidation } from '../survey-validation.entity';

export class SurveyValidationDto extends AbstractDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  validation: string;

  @ApiProperty()
  company: string;

  @ApiProperty()
  surveyid: string;

  @ApiProperty()
  titlesurvey: string;

  @ApiProperty()
  dateversion: Date;

  @ApiProperty()
  validadate: Date;

  constructor(surveyValidationEntity: SurveyValidation) {
    super(surveyValidationEntity, { exludeFields: true });
    this.id = surveyValidationEntity.id * 1;
    this.validation = surveyValidationEntity.validation;
    this.company = surveyValidationEntity.company;
    this.surveyid = surveyValidationEntity.surveyid;
    this.titlesurvey = surveyValidationEntity.titlesurvey;
    this.dateversion = surveyValidationEntity.dateversion;
    this.validadate = surveyValidationEntity.validateddate;
  }
}
