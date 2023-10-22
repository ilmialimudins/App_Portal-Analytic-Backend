import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { AbstractDto } from 'src/common/dto/abstract.dto';
import type { MasterEngagement } from '../master-engagement.entity';

export class MasterEngagementDTO extends AbstractDto {
  @ApiProperty()
  engagementid: number;

  @ApiPropertyOptional()
  h_engagementhashkey: string;

  @ApiProperty()
  engagement: string;

  @ApiProperty()
  engagement_shortname: string;

  constructor(masterEngagement: MasterEngagement) {
    super(masterEngagement, { exludeFields: true });

    this.engagementid = masterEngagement.engagementid;
    this.engagement = masterEngagement.engagement;
    this.engagement_shortname = masterEngagement.engagement_shortname;
  }
}
