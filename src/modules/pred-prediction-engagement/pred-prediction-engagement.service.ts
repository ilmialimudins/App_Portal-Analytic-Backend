import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PredPredictionEngagement } from './pred-prediction-engagement.entity';
import { Repository } from 'typeorm';
import { GetAgregrationPerFactorDTO } from '../pred-engagement-value/dto/get-aggregation-factor.dto';
import { AggregationPerFactorDTO } from '../pred-engagement-value/dto/aggregation-factor.dto';
import {
  GetPredictionEngagementDTO,
  PredictionEngagementDTO,
} from './dto/get-prediction-engagement.dto';
import { SavePredictionEngagementTransaction } from './save-prediction-engagement.transaction';
import { SavePredictionEngagementDTO } from './dto/save-prediction-engagement.dto';
import { PredictionListDTO } from './dto/prediction-list.dto';

@Injectable()
export class PredPredictionEngagementService {
  constructor(
    @InjectRepository(PredPredictionEngagement)
    private engagementValue: Repository<PredPredictionEngagement>,

    @Inject(forwardRef(() => SavePredictionEngagementTransaction))
    private savePredictionTransaction: SavePredictionEngagementTransaction,
  ) {}

  public async previewPrediction(
    { d_companyid, demography }: GetAgregrationPerFactorDTO,
    aggregations: AggregationPerFactorDTO[],
  ): Promise<GetPredictionEngagementDTO> {
    try {
      const getPredictionList = await this.getPredictionList(
        { d_companyid, demography },
        this.engagementValue,
      );
      const { prediction_before, prediction_after } =
        await this.getPredictionBeforeAndAfter(aggregations, getPredictionList);
      return {
        aggregations: aggregations,
        prediction_before: prediction_before as PredictionEngagementDTO,
        prediction_after: prediction_after as PredictionEngagementDTO,
      };
    } catch (error) {
      throw error;
    }
  }

  public async savePrediction(data: SavePredictionEngagementDTO) {
    try {
      const savedPrediction = await this.savePredictionTransaction.run(data);

      return savedPrediction;
    } catch (error) {
      throw error;
    }
  }

  async getPredictionList(
    { d_companyid, demography }: Partial<GetAgregrationPerFactorDTO>,
    repo: Repository<PredPredictionEngagement>,
  ): Promise<PredictionListDTO[]> {
    try {
      return repo
        .createQueryBuilder('predictionengagement')
        .select([
          'predictionengagement.id as id',
          'predictionengagement.d_factorid as d_factorid',
          'factor.factor_shortname as factor_shortname',
          'predictionengagement.d_engagementid as d_engagementid',
          'engagement.engagement as engagement',
          'predictionengagement.demography as demography',
          'predictionengagement.coefficients as coefficients',
          'predictionengagement.coefficients_type as coefficients_type',
          'predictionengagement.prediction_before as prediction_before',
          'predictionengagement.prediction_before as prediction_after',
        ])
        .leftJoin('predictionengagement.factor', 'factor')
        .leftJoin('predictionengagement.engagement', 'engagement')
        .where('predictionengagement.d_companyid = :d_companyid', {
          d_companyid,
        })
        .andWhere('predictionengagement.demography = :demography', {
          demography,
        })
        .orderBy('factor.d_factorid')
        .getRawMany();
    } catch (error) {
      throw error;
    }
  }

  async getPredictionBeforeAndAfter(
    aggregations: AggregationPerFactorDTO[],
    predictionList: PredictionListDTO[],
  ) {
    const prediction_after = predictionList.reduce((acc, item) => {
      if (!acc[item.engagement]) {
        acc[item.engagement] = 0;
      }

      let enggagementToSum = 0;

      if (item.factor_shortname.includes('(Intercept)')) {
        enggagementToSum = item.coefficients;
      } else {
        const indexAggregation = aggregations.findIndex(
          (x) => parseInt(x.d_factorid) == item.d_factorid,
        );
        const aggregationValue =
          item.coefficients_type == 'Negative'
            ? aggregations[indexAggregation].aggregation_before
            : aggregations[indexAggregation].aggregation_after;

        enggagementToSum = item.coefficients * aggregationValue;
      }

      acc[item.engagement] += enggagementToSum;

      return acc;
    }, {});

    const prediction_before = {};

    predictionList.forEach((item) => {
      prediction_before[item.engagement] = item.prediction_before;
    });

    return { prediction_after, prediction_before };
  }
}
