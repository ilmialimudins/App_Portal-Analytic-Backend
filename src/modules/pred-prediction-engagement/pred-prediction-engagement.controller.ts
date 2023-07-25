import { Controller, Post, Body, Query, Res } from '@nestjs/common';
import { Response as ExpressResponse } from 'express';
import { PredPredictionEngagementService } from './pred-prediction-engagement.service';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import {
  DriversDTO,
  GetAgregrationPerFactorDTO,
} from '../pred-engagement-value/dto/get-aggregation-factor.dto';
import { PredEngagamentValueService } from '../pred-engagement-value/pred-engagement-value.service';
import { GetPredictionEngagementDTO } from './dto/get-prediction-engagement.dto';
import { SavePredictionEngagementDTO } from './dto/save-prediction-engagement.dto';
import { DownloadPredictionBodyDTO } from './dto/download-prediction..dto';

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

    console.log(aggregationBeforeAndAfter);

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

  @Post('/download-prediction')
  async downloadPrediction(
    @Res() res: ExpressResponse,
    @Body() body: DownloadPredictionBodyDTO,
  ) {
    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    );

    res.setHeader(
      'Content-Disposition',
      `attachment; filename=Prediction_${body.d_companyid}_${body.demoraphyvalue}.xlsx`,
    );
    const workbook =
      await this.predPredictionEngagementService.generateExcelPrediction(body);
    await workbook.xlsx.write(res);
    res.end();
  }
}
