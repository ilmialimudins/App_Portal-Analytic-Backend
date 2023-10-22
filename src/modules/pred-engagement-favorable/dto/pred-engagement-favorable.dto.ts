import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { AbstractDto } from 'src/common/dto/abstract.dto';
import { PredEngagementFavorable } from '../pred-engagement-favorable.entity';

export class PredEngagementFavorableDTO extends AbstractDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  surveygizmoid: number;

  @ApiProperty()
  companyid: number;

  @ApiProperty()
  iscurrentsurvey: number;

  @ApiProperty()
  tahunsurvey: number;

  @ApiProperty()
  totalcompletedrespondent: number;

  @ApiProperty()
  factorid: number;

  @ApiProperty()
  qcodeid: number;

  @ApiProperty()
  count_all_favorabletype: number;

  @ApiProperty()
  percentage_all_favorabletype: number;

  @ApiProperty()
  favorable_type: string;

  @ApiProperty()
  count_respondent: number;

  @ApiProperty()
  avg_per_qcode: number;

  @ApiProperty()
  avg_per_factor: number;

  @ApiPropertyOptional()
  created_on: Date;

  @ApiPropertyOptional()
  modified_on: Date;

  constructor(predEngagementFavorable: PredEngagementFavorable) {
    super(predEngagementFavorable, { exludeFields: true });
  }
}
