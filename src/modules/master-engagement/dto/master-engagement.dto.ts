import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { AbstractDto } from 'src/common/dto/abstract.dto';
import type { MasterEngagement } from '../master-engagement.entity';

export class MasterEngagementDTO extends AbstractDto {
  @ApiProperty()
  d_engagementid: number;

  @ApiPropertyOptional()
  h_engagementhashkey: string;

  @ApiProperty()
  engagement: string;

  @ApiProperty()
  engagement_shortname: string;

  constructor(masterEngagement: MasterEngagement) {
    super(masterEngagement, { exludeFields: true });

    this.d_engagementid = masterEngagement.d_engagementid;
    this.engagement = masterEngagement.engagement;
    this.engagement_shortname = masterEngagement.engagement_shortname;
  }
}
