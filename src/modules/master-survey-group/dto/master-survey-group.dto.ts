import { ApiProperty } from '@nestjs/swagger';
import { AbstractDto } from 'src/common/dto/abstract.dto';
import { SurveyGroup } from '../master-survey-group.entity';

export class SurveyGroupDto extends AbstractDto {
  @ApiProperty()
  surveygroupid: number;

  @ApiProperty()
  surveygroupcode: number;

  @ApiProperty()
  surveygroupdesc: string;

  @ApiProperty()
  desc: string;

  constructor(SurveyGroupEntity: SurveyGroup) {
    super(SurveyGroupEntity, { exludeFields: true });
    this.surveygroupid = SurveyGroupEntity.surveygroupid * 1;
    this.surveygroupcode = SurveyGroupEntity.surveygroupcode;
    this.surveygroupdesc = SurveyGroupEntity.surveygroupdesc;
    this.desc = SurveyGroupEntity.desc;
  }
}
