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

  @ApiProperty()
  avg_respondentanswer_before: number;

  @ApiProperty()
  count_respondent: string;

  constructor(predEngagementValue: PredEngagementValue) {
    super(predEngagementValue, { exludeFields: true });

    this.demography = predEngagementValue.demography;
    this.demographyvalue = predEngagementValue.demographyvalue;
    this.tahunsurvey = predEngagementValue.tahunsurvey;
    this.avg_respondentanswer_before =
      predEngagementValue.avg_respondentanswer_before;
    this.count_respondent = predEngagementValue.count_respondent;
  }
}
