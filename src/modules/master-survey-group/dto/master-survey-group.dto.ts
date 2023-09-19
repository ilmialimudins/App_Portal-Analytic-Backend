import { ApiProperty } from '@nestjs/swagger';
import { AbstractDto } from 'src/common/dto/abstract.dto';
import { SurveyGroup } from '../master-survey-group.entity';

export class SurveyGroupDto extends AbstractDto {
  @ApiProperty()
  surveygroupid: number;

  @ApiProperty()
  surveygroupcode: string;

  @ApiProperty()
  surveygroupdesc: string;

  @ApiProperty()
  desc: string;

  @ApiProperty()
  isdelete: string;

  constructor(surveyGroupEntity: SurveyGroup) {
    super(surveyGroupEntity, { exludeFields: true });
    this.surveygroupid = surveyGroupEntity.surveygroupid * 1;
    this.surveygroupcode = surveyGroupEntity.surveygroupcode;
    this.surveygroupdesc = surveyGroupEntity.surveygroupdesc;
    this.desc = surveyGroupEntity.desc;
    this.isdelete = surveyGroupEntity.isdelete;
  }
}
