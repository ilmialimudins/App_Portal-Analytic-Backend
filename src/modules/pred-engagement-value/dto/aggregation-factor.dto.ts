import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class AggregationPerFactorDTO {
  @ApiProperty()
  d_factorid: string;

  @ApiPropertyOptional()
  factor_shortname?: string;

  @ApiProperty()
  aggregation_after: number;

  @ApiProperty()
  aggregation_before: number;

  @ApiPropertyOptional()
  count_respondent?: string;
}
