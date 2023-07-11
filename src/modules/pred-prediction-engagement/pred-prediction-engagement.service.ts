import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PredPredictionEngagement } from './pred-prediction-engagement.entity';
import { Repository } from 'typeorm';
import { GetAgregrationPerFactorDTO } from '../pred-engagement-value/dto/get-aggregation-factor.dto';
import { AggregationPerFactorDTO } from '../pred-engagement-value/dto/aggregation-factor.dto';
import {
  GetPredictionEngagementDTO,
  PredictionEngagementDTO,
} from './dto/get-prediction-engagement.dto';

@Injectable()
export class PredPredictionEngagementService {
  constructor(
    @InjectRepository(PredPredictionEngagement)
    private engagementValue: Repository<PredPredictionEngagement>,
  ) {}

  public async previewPrediction(
    { d_companyid, demography }: GetAgregrationPerFactorDTO,
    aggregations: AggregationPerFactorDTO[],
  ): Promise<GetPredictionEngagementDTO> {
    try {
      const getPredictionList = await this.engagementValue
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

      const prediction_after = getPredictionList.reduce((acc, item) => {
        if (!acc[item.engagement]) {
          acc[item.engagement] = 0;
        }

        let enggagementToSum = 0;

        if (item.factor_shortname.includes('(Intercept)')) {
          enggagementToSum = item.coefficients;
        } else {
          const indexAggregation = aggregations.findIndex(
            (x) => parseInt(x.d_factorid) === parseInt(item.d_factorid),
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

      getPredictionList.forEach((item) => {
        prediction_before[item.engagement] = item.prediction_before;
      });

      return {
        aggregations: aggregations,
        prediction_before: prediction_before as PredictionEngagementDTO,
        prediction_after: prediction_after as PredictionEngagementDTO,
      };
    } catch (error) {
      throw error;
    }
  }
}
