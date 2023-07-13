import { Controller, Post, Body, Query } from '@nestjs/common';
import { PredPredictionEngagementService } from './pred-prediction-engagement.service';

import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import {
  DriversDTO,
  GetAgregrationPerFactorDTO,
} from '../pred-engagement-value/dto/get-aggregation-factor.dto';
import { PredEngagamentValueService } from '../pred-engagement-value/pred-engagement-value.service';
import { GetPredictionEngagementDTO } from './dto/get-prediction-engagement.dto';
import { SavePredictionEngagementDTO } from './dto/save-prediction-engagement.dto';

@ApiTags('Prediction Engagement')
@Controller('prediction-engagement')
export class PredPredictionEngagementController {
  constructor(
    private readonly predPredictionEngagementService: PredPredictionEngagementService,
    private readonly predEngagementValueService: PredEngagamentValueService,
  ) {}

  @Post('/preview')
  @ApiOkResponse({ type: [GetPredictionEngagementDTO] })
  async getAggregation(
    @Query() query: GetAgregrationPerFactorDTO,
    @Body() body: DriversDTO,
  ): Promise<GetPredictionEngagementDTO> {
    const aggregationBeforeAndAfter =
      await this.predEngagementValueService.calculateAverageDriver(
        query,
        body.drivers,
      );

    const prediction =
      await this.predPredictionEngagementService.previewPrediction(
        query,
        aggregationBeforeAndAfter,
      );

    return prediction;
  }

  @Post('/apply-changes')
  async savePredictionAndDriver(@Body() body: SavePredictionEngagementDTO) {
    return await this.predPredictionEngagementService.savePrediction(body);
  }
}
