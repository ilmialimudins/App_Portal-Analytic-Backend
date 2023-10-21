import { HttpException, Inject, Injectable, forwardRef } from '@nestjs/common';
import { BaseTransaction } from 'src/common/abstract.transaction';
import { SavePredictionEngagementDTO } from './dto/save-prediction-engagement.dto';
import {
  GetPredictionEngagementDTO,
  PredictionAfterEngagementDTO,
  PredictionEngagementDTO,
} from './dto/get-prediction-engagement.dto';
import { DataSource, EntityManager } from 'typeorm';

import { PredEngagementValue } from '../pred-engagement-value/pred-engagement-value.entity';
import { PredEngagamentValueService } from '../pred-engagement-value/pred-engagement-value.service';
import { PredPredictionEngagementService } from './pred-prediction-engagement.service';
import { PredPredictionEngagement } from './pred-prediction-engagement.entity';

@Injectable()
export class SavePredictionEngagementTransaction extends BaseTransaction<
  SavePredictionEngagementDTO,
  GetPredictionEngagementDTO
> {
  constructor(
    private dataSource: DataSource,
    private engagementValueServices: PredEngagamentValueService,
    @Inject(forwardRef(() => PredPredictionEngagementService))
    private predictionEngagementServices: PredPredictionEngagementService,
  ) {
    super(dataSource);
  }
  protected async execute(
    data: SavePredictionEngagementDTO,
    manager: EntityManager,
  ): Promise<GetPredictionEngagementDTO> {
    const repoEngagementValue = manager.getRepository(PredEngagementValue);
    const repoPredictionEngagement = manager.getRepository(
      PredPredictionEngagement,
    );

    const arrayPromises = await Promise.all(
      data.drivers.map(async (item) => {
        const value = await repoEngagementValue.update(
          { d_factorid: item.d_factorid, id: item.engagementvalue_id },
          { avg_respondentanswer_after: item.avg_respondentanswer_after },
        );

        return value;
      }),
    );
    if (!arrayPromises.length) {
      throw new HttpException('Failed update engagement value driver', 500);
    }
    const aggregations =
      await this.engagementValueServices.getAggregationBeforeAndAfter(
        data.filter,
        repoEngagementValue,
      );

    const listOfPrediction =
      await this.predictionEngagementServices.getPredictionList(
        data.filter,
        repoPredictionEngagement,
      );
    const { prediction_after, prediction_before } =
      await this.predictionEngagementServices.getPredictionBeforeAndAfter(
        aggregations,
        listOfPrediction,
      );

    const after = prediction_after as PredictionAfterEngagementDTO;

    const SustainableEngagement =
      this.predictionEngagementServices.calculateAverageEngagement(after);

    after['Sustainable Engagement'] = SustainableEngagement;

    const engagements = [
      {
        id: 1,
        engagement: 'Engaged',
      },
      {
        id: 2,
        engagement: 'Energized',
      },
      {
        id: 3,
        engagement: 'Enabled',
      },
    ];

    await Promise.all(
      engagements.map(async (item) => {
        const value = await repoPredictionEngagement.update(
          {
            d_companyid: data.filter.d_companyid,
            d_engagementid: item.id,
            demography: data.filter.demography,
          },
          {
            prediction_after: prediction_after[item.engagement],
          },
        );

        return value;
      }),
    );

    return {
      aggregations: aggregations,
      prediction_before: prediction_before as PredictionEngagementDTO,
      prediction_after: prediction_after as PredictionAfterEngagementDTO,
    };
  }
}
