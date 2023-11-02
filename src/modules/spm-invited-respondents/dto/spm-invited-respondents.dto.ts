import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { InvitedRespondents } from '../spm-invited-respondents.entity';
import { AbstractDto } from 'src/common/dto/abstract.dto';

export class SpmInvitedRespondentsDTO extends AbstractDto {
  @ApiProperty()
  id: number;

  @ApiPropertyOptional()
  surveyid?: number;

  @ApiProperty()
  companyid: number;

  @ApiPropertyOptional()
  startsurvey?: Date;

  @ApiPropertyOptional()
  closesurvey?: Date;

  @ApiPropertyOptional()
  totalinvited_company?: number;

  @ApiPropertyOptional()
  demographyid?: number;

  @ApiPropertyOptional()
  valuedemography?: string;

  @ApiPropertyOptional()
  totalinvited_demography?: number;

  @ApiPropertyOptional()
  is_sync?: number;

  @ApiPropertyOptional()
  endcreatedtime?: Date;

  @ApiPropertyOptional()
  tahun_survey?: number;

  @ApiProperty()
  is_delete?: string;

  constructor(invitedRespondentsEntity: InvitedRespondents) {
    super(invitedRespondentsEntity, { exludeFields: true });
  }
}
