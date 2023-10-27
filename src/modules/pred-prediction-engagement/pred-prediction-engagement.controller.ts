import { Controller, Post, Body, Query, Res, UseGuards } from '@nestjs/common';
import { Response as ExpressResponse } from 'express';
import { PredPredictionEngagementService } from './pred-prediction-engagement.service';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import {
  DriversDTO,
  GetAgregrationPerFactorDTO,
} from '../pred-engagement-value/dto/get-aggregation-factor.dto';
import { PredEngagamentValueService } from '../pred-engagement-value/pred-engagement-value.service';
import { GetPredictionEngagementDTO } from './dto/get-prediction-engagement.dto';
import { SavePredictionEngagementDTO } from './dto/save-prediction-engagement.dto';
import { DownloadPredictionBodyDTO } from './dto/download-prediction..dto';
import { AuthGuard } from 'src/guards/auth/auth.guard';
import { CompanyService } from '../master-company-ees/master-company-ees.service';

@ApiBearerAuth()
@UseGuards(AuthGuard)
@ApiTags('Prediction Engagement')
@Controller('prediction-engagement')
export class PredPredictionEngagementController {
  constructor(
    private readonly predPredictionEngagementService: PredPredictionEngagementService,
    private readonly predEngagementValueService: PredEngagamentValueService,
    private readonly masterCompanyService: CompanyService,
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

  @Post('/download-prediction')
  async downloadPrediction(
    @Res() res: ExpressResponse,
    @Body() body: DownloadPredictionBodyDTO,
  ) {
    const company = await this.masterCompanyService.getCompanyId(
      parseInt(body.companyid),
    );

    const companyName = company?.companyeesname.split(' ').join('_');

    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    );

    res.setHeader(
      'Content-Disposition',
      `attachment; filename=Prediction_${companyName}_${body.demography}.xlsx`,
    );
    const workbook =
      await this.predPredictionEngagementService.generateExcelPrediction(body);
    await workbook.xlsx.write(res);
    res.end();
  }
}
