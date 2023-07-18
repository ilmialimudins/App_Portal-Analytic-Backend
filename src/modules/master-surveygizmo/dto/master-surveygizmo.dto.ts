import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { AbstractDto } from 'src/common/dto/abstract.dto';
import { MasterSurveygizmo } from '../master-surveygizmo.entity';

export class MasterSurveyGizmoDTO extends AbstractDto {
  @ApiProperty()
  d_surveygizmoid: number;

  @ApiPropertyOptional()
  h_surveygizmohashkey: string;

  @ApiProperty()
  surveyid: string;

  @ApiProperty()
  team: string;

  @ApiProperty()
  status: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  links: string;

  @ApiProperty()
  totalinvitedrespondent: number;

  @ApiPropertyOptional()
  recordsource: string;

  @ApiPropertyOptional()
  loadenddate: Date;

  @ApiPropertyOptional()
  created_on: Date;

  @ApiPropertyOptional()
  modified_on: Date;

  constructor(masterSurveygizmo: MasterSurveygizmo) {
    super(masterSurveygizmo, { exludeFields: true });
  }
}
