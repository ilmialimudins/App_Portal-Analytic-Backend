import { Inject, Injectable, forwardRef } from '@nestjs/common';
import * as excel from 'exceljs';
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
import { DownloadPredictionBodyDTO } from './dto/download-prediction..dto';
import { PredEngagamentValueService } from '../pred-engagement-value/pred-engagement-value.service';
import { GetAverageDriverDTO } from '../pred-engagement-value/dto/get-average-driver.dto';
import { addTable } from 'src/common/utils/addExcelTable';

@Injectable()
export class PredPredictionEngagementService {
  constructor(
    @InjectRepository(PredPredictionEngagement)
    private engagementValue: Repository<PredPredictionEngagement>,

    @Inject(forwardRef(() => SavePredictionEngagementTransaction))
    private savePredictionTransaction: SavePredictionEngagementTransaction,

    private readonly predEngagementValueService: PredEngagamentValueService,
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

  async generateExcelPrediction(
    body: DownloadPredictionBodyDTO,
  ): Promise<excel.Workbook> {
    try {
      if (body.isAll) {
        const demographyValue =
          await this.predEngagementValueService.getDemographyValueByDemography({
            d_companyid: body.d_companyid,
            demography: body.demography,
          });
        body.demoraphyvalue = demographyValue.map(
          (item) => item.demographyvalue,
        );
      }

      const dataToGenerate = await Promise.all(
        body.demoraphyvalue.map(async (item) => {
          const data = await this.getDriverAndPrediction({
            d_companyid: body.d_companyid,
            demography: body.demography,
            demographyvalue: item,
          });

          return data;
        }),
      );

      const workbook: excel.Workbook = new excel.Workbook();

      // // Generate Excel Sheet
      dataToGenerate.map((data) => {
        const sheet: excel.Worksheet = workbook.addWorksheet(
          data.demographyvalue,
        );

        addTable(
          {
            columnStart: 'A',
            rowHeaderNum: 1,
            rowDataNum: 2,
            headerTitle: [
              'Factor Name',
              'Factor Shortname',
              'Average Driver Before',
              'Average Driver After',
            ],
            tableData: data.driver.map((item) => ({
              factorname: item.factor.factorname,
              factor_shortname: item.factor.factor_shortname,
              avg_driver_before: item.avg_respondentanswer_before,
              avg_driver_after: item.avg_respondentanswer_after,
            })),
          },
          sheet,
        );

        const engagementKeys = Object.keys(data.prediction.prediction_after);

        addTable(
          {
            columnStart: 'F',
            rowHeaderNum: 1,
            rowDataNum: 2,
            headerTitle: [
              'Engagement',
              'Prediction Before',
              'Prediction After',
            ],
            tableData: engagementKeys.map((engagement) => ({
              engagement: engagement,
              prediction_before: data.prediction.prediction_before[engagement],
              prediction_after: data.prediction.prediction_after[engagement],
            })),
          },
          sheet,
        );
      });

      return workbook;
    } catch (error) {
      throw error;
    }
  }

  async getDriverAndPrediction(data: GetAverageDriverDTO) {
    try {
      const driver = await this.predEngagementValueService.getAverageDriver(
        data,
      );

      const params = {
        d_companyid: data.d_companyid,
        demography: data.demography,
        demographyvalue: data.demographyvalue,
      };

      const aggregation =
        await this.predEngagementValueService.calculateAverageDriver(
          params,
          [],
        );

      const prediction = await this.previewPrediction(params, aggregation);

      return {
        driver: driver,
        prediction: prediction,
        demographyvalue: data.demographyvalue,
      };
    } catch (error) {
      throw error;
    }
  }
}
