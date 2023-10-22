import { ApiProperty } from '@nestjs/swagger';
import type { PredEngagementValue } from '../pred-engagement-value.entity';
import { AbstractDto } from 'src/common/dto/abstract.dto';

export class PredEngagementValueDto extends AbstractDto {
  @ApiProperty()
  demography: string;

  @ApiProperty()
  avg_respondentanswer_after: string;

  @ApiProperty()
  surveygizmoid: number;

  @ApiProperty()
  companyid: number;

  @ApiProperty()
  demographyvalue: string;

  @ApiProperty()
  factorid: string;

  @ApiProperty()
  tahunsurvey: number;

  constructor(predEngagementValue: PredEngagementValue) {
    super(predEngagementValue, { exludeFields: true });

    this.demography = predEngagementValue.demography;
    this.tahunsurvey = predEngagementValue.tahunsurvey;
    this.companyid = predEngagementValue.companyid;
  }
}
