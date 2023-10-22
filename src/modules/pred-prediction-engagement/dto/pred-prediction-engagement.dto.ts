import { ApiProperty } from '@nestjs/swagger';
import { AbstractDto } from 'src/common/dto/abstract.dto';
import { PredPredictionEngagement } from '../pred-prediction-engagement.entity';

export class PredPredictionEngagementDto extends AbstractDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  surveygizmoid: number;

  @ApiProperty()
  companyid: number;

  @ApiProperty()
  factorid: number;

  @ApiProperty()
  engagementid: number;

  @ApiProperty()
  demography: string;

  @ApiProperty()
  tahunsurvey: number;

  @ApiProperty()
  coefficients: number;

  @ApiProperty()
  coefficients_type: string;

  @ApiProperty()
  prediction_before: number;

  @ApiProperty()
  prediction_after: number;

  constructor(predPredictionEngagement: PredPredictionEngagement) {
    super(predPredictionEngagement, { exludeFields: true });
  }
}
