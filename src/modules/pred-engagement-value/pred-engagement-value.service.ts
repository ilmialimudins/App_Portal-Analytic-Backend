import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PredEngagementValue } from './pred-engagement-value.entity';
import { PageOptionsDTO } from 'src/common/dto/page-options.dto';
import { PageDto } from 'src/common/dto/page.dto';
import { PredEngagementValueDto } from './dto/pred-engagement-value.dto';

import {
  GetDemographyByCompanyDTO,
  GetDemographyValueByCompanyDTO,
  ListDemographyDTO,
  ListDemographyValueDTO,
} from './dto/get-demography.dto';
import {
  AdjustmentDriverDTO,
  GetAgregrationPerFactorDTO,
} from './dto/get-aggregation-factor.dto';
import { AggregationPerFactorDTO } from './dto/aggregation-factor.dto';
import { GetAverageDriverDTO } from './dto/get-average-driver.dto';

@Injectable()
export class PredEngagamentValueService {
  constructor(
    @InjectRepository(PredEngagementValue)
    private engagementValue: Repository<PredEngagementValue>,
  ) {}

  async getAllPredEngagementValues(
    pageOptions: PageOptionsDTO,
  ): Promise<PageDto<PredEngagementValueDto>> {
    try {
      const query = this.engagementValue
        .createQueryBuilder('pred-engagement-value')
        .orderBy('pred-engagement-value.id', pageOptions.order);

      const [items, pageMetaDto] = await query.paginate(pageOptions);

      return items.toPageDto(pageMetaDto);
    } catch (error) {
      throw error;
    }
  }

  async getDemographyByCompany(
    company: GetDemographyByCompanyDTO,
  ): Promise<ListDemographyDTO[]> {
    try {
      const query = await this.engagementValue
        .createQueryBuilder('predengagementvalue')
        .select('DISTINCT predengagementvalue.demography')
        .where('predengagementvalue.d_companyid = :d_companyid', {
          d_companyid: company.d_companyid,
        })
        .getRawMany();

      return query;
    } catch (error) {
      throw error;
    }
  }

  async getDemographyValueByDemography({
    d_companyid,
    demography,
  }: GetDemographyValueByCompanyDTO): Promise<ListDemographyValueDTO[]> {
    try {
      const result = await this.engagementValue
        .createQueryBuilder('predengagementvalue')
        .select('DISTINCT predengagementvalue.demographyvalue')
        .where('predengagementvalue.d_companyid = :d_companyid', {
          d_companyid: d_companyid,
        })
        .andWhere('predengagementvalue.demography = :demography', {
          demography,
        })
        .getRawMany();

      return result;
    } catch (error) {
      throw error;
    }
  }

  async getAverageDriver({
    d_companyid,
    demography,
    demographyvalue,
  }: GetAverageDriverDTO) {
    try {
      const result = await this.engagementValue.find({
        select: {
          id: true,
          d_factorid: true,
          factor: {
            factor_shortname: true,
            factorname: true,
          },
          avg_respondentanswer_after: true,
          avg_respondentanswer_before: true,
        },
        relations: {
          factor: true,
        },
        where: {
          d_companyid: d_companyid,
          demography: demography,
          demographyvalue: demographyvalue,
        },
        order: {
          d_factorid: 'ASC',
        },
      });

      return result;
    } catch (error) {
      throw error;
    }
  }

  async calculateAverageDriver(
    { d_companyid, demography }: GetAgregrationPerFactorDTO,
    drivers: AdjustmentDriverDTO[],
  ): Promise<AggregationPerFactorDTO[]> {
    try {
      // Do this for initial fetch, not changes for preview data;
      const getAggregationAfterAndBefore =
        await this.getAggregationBeforeAndAfter(
          { d_companyid, demography },
          this.engagementValue,
        );
      if (drivers.length) {
        const getListAverageRespondentByDemography = await this.engagementValue
          .createQueryBuilder('a')
          .select(
            'a.count_respondent * 15 * CAST(a.avg_respondentanswer_after AS FLOAT)',
            'average_factor',
          )
          .addSelect('a.count_respondent * 15', 'count_respondent')
          .addSelect('CAST(a.avg_respondentanswer_after AS FLOAT)', 'avg_after')
          .addSelect('a.d_factorid', 'd_factorid')
          .addSelect('a.id', 'engagementvalue_id')
          .where('a.d_companyid = :companyId', { companyId: d_companyid })
          .andWhere('a.demography = :demography', { demography: demography })
          .getRawMany();

        const sumByFactorId = {};

        // change driver in list of data
        drivers.forEach((driver) => {
          const indexList = getListAverageRespondentByDemography.findIndex(
            (item) =>
              parseInt(item.engagementvalue_id) === driver.engagementvalue_id,
          );

          getListAverageRespondentByDemography[indexList].avg_after =
            driver.avg_respondentanswer_after;
        });

        getListAverageRespondentByDemography.forEach((item) => {
          const { d_factorid, avg_after, count_respondent } = item;
          if (sumByFactorId[d_factorid]) {
            sumByFactorId[d_factorid] = {
              average_factor:
                sumByFactorId[d_factorid].average_factor +
                avg_after * count_respondent,
              count_respondent:
                sumByFactorId[d_factorid].count_respondent +
                parseInt(count_respondent),
            };
          } else {
            sumByFactorId[d_factorid] = {
              average_factor: avg_after * count_respondent,
              count_respondent: parseInt(count_respondent),
            };
          }
        });

        const listAggregationPerFactorAfter: {
          d_factorid: string;
          aggregationAfter: number;
        }[] = [];

        for (const key in sumByFactorId) {
          listAggregationPerFactorAfter.push({
            d_factorid: key,
            aggregationAfter:
              sumByFactorId[key].average_factor /
              sumByFactorId[key].count_respondent,
          });
        }

        // assign to actual obj
        listAggregationPerFactorAfter.forEach((after) => {
          const index = getAggregationAfterAndBefore.findIndex(
            (item) => item.d_factorid === after.d_factorid,
          );

          if (index !== -1) {
            getAggregationAfterAndBefore[index].aggregation_after =
              after.aggregationAfter;
          }
        });
      }

      return getAggregationAfterAndBefore;
    } catch (error) {
      throw error;
    }
  }

  async getAggregationBeforeAndAfter(
    { d_companyid, demography }: Partial<GetAgregrationPerFactorDTO>,
    repo: Repository<PredEngagementValue>,
  ) {
    try {
      const data = await repo
        .createQueryBuilder('engagementvalue')
        .select('engagementvalue.d_factorid as d_factorid')
        .addSelect('factor.factor_shortname as factor_shortname')
        .addSelect(
          `SUM(engagementvalue.count_respondent * 15 * engagementvalue.avg_respondentanswer_after) / (SUM(engagementvalue.count_respondent * 1) * 15)`,
          'aggregation_after',
        )
        .addSelect(
          `SUM(engagementvalue.count_respondent * 15 * engagementvalue.avg_respondentanswer_before) / (SUM(engagementvalue.count_respondent * 1) * 15)`,
          'aggregation_before',
        )
        .addSelect(
          `(SUM(engagementvalue.count_respondent * 1) * 15)`,
          'count_respondent',
        )
        .leftJoin('engagementvalue.factor', 'factor')
        .where('engagementvalue.d_companyid = :d_companyid', {
          d_companyid,
        })
        .andWhere('engagementvalue.demography = :demography', {
          demography,
        })
        .groupBy('engagementvalue.d_factorid, factor.factor_shortname')
        .orderBy('engagementvalue.d_factorid', 'ASC')
        .getRawMany();

      return data;
    } catch (error) {
      throw error;
    }
  }
}
