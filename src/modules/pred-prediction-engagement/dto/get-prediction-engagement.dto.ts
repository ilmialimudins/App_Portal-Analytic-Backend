import { ApiProperty } from '@nestjs/swagger';
import { AggregationPerFactorDTO } from 'src/modules/pred-engagement-value/dto/aggregation-factor.dto';

export class PredictionEngagementDTO {
  @ApiProperty()
  Engaged: number;

  @ApiProperty()
  Energized: number;

  @ApiProperty()
  Enabled: number;
}

export class GetPredictionEngagementDTO {
  @ApiProperty()
  aggregations: AggregationPerFactorDTO[];

  @ApiProperty()
  prediction_after: PredictionEngagementDTO;

  @ApiProperty()
  prediction_before: PredictionEngagementDTO;
}
