import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { AbstractDto } from 'src/common/dto/abstract.dto';
import { PredEngagementFavorable } from '../pred-engagement-favorable.entity';

export class PredEngagementFavorableDTO extends AbstractDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  factorid: number;

  @ApiProperty()
  companyid: number;

  @ApiProperty()
  surveygizmoid: number;

  @ApiProperty()
  engagementlevel: string;

  @ApiProperty()
  demography: string;

  @ApiProperty()
  demographyvalue: string;

  @ApiProperty()
  tahunsurvey: number;

  @ApiProperty()
  iscurrentsurvey: string;

  @ApiProperty()
  latest: string;

  @ApiProperty()
  sum_unfavorable: number;

  @ApiProperty()
  sum_neutral: number;

  @ApiProperty()
  sum_favorable: number;

  @ApiProperty()
  count_unfavorable: number;

  @ApiProperty()
  count_neutral: number;

  @ApiProperty()
  count_favorable: number;

  @ApiProperty()
  count_respondent: number;

  @ApiProperty()
  count_answer: number;

  @ApiPropertyOptional()
  created_on: Date;

  @ApiPropertyOptional()
  modified_on: Date;

  constructor(predEngagementFavorable: PredEngagementFavorable) {
    super(predEngagementFavorable, { exludeFields: true });
  }
}
