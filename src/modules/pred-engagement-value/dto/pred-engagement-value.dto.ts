import { ApiProperty } from '@nestjs/swagger';
import type { PredEngagementValue } from '../pred-engagement-value.entity';
import { AbstractDto } from 'src/common/dto/abstract.dto';

export class PredEngagementValueDto extends AbstractDto {
  @ApiProperty()
  demography: string;

  @ApiProperty()
  avg_respondentanswer_after: string;

  @ApiProperty()
  d_surveygizmoid: string;

  @ApiProperty()
  d_companyid: string;

  @ApiProperty()
  demographyvalue: string;

  @ApiProperty()
  d_factorid: string;

  @ApiProperty()
  tahunsurvey: string;

  constructor(predEngagementValue: PredEngagementValue) {
    super(predEngagementValue, { exludeFields: true });

    this.id = predEngagementValue.id;
    this.demography = predEngagementValue.demography;
    this.tahunsurvey = predEngagementValue.tahunsurvey;
    this.d_companyid = predEngagementValue.d_companyid;
  }
}
