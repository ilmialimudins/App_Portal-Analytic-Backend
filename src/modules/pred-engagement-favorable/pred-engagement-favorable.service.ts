import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PredEngagementFavorable } from './pred-engagement-favorable.entity';
import {
  GetAverageFavorableAllFactorQueryDTO,
  GetAverageFavorableAllFactorResultDTO,
} from './dto/get-engagement-favorable-factor.dto';
import { Repository } from 'typeorm';
import {
  FavorableDataDTO,
  GetFavorableFactorDetailDTO,
  GetFavorableFactorDetailQueryDTO,
} from './dto/get-engagement-favorable-factor-detail.dto';

@Injectable()
export class PredEngagementFavorableService {
  constructor(
    @InjectRepository(PredEngagementFavorable)
    private engagementFavorableRepo: Repository<PredEngagementFavorable>,
  ) {}

  public async getAverageFavorableAllFactor({
    companyid,
    demography,
    demographyvalue,
  }: GetAverageFavorableAllFactorQueryDTO): Promise<
    GetAverageFavorableAllFactorResultDTO[]
  > {
    try {
      const excludedFactorNames = ['Enabled', 'Energized', 'Engaged'];

      const result = await this.engagementFavorableRepo
        .createQueryBuilder('favorable')
        .select('DISTINCT favorable.factorid as factorid')
        .addSelect(
          'favorable.avg_respondentanswer_factor as avg_respondentanswer_factor',
        )
        .addSelect('factor.factorname as factor_name')
        .addSelect('factor.factorcode as factor_code')
        .leftJoin('favorable.factor', 'factor')
        .where('favorable.companyid = :companyid', {
          companyid: companyid,
        })
        .andWhere('favorable.demography = :demography', {
          demography,
        })
        .andWhere('favorable.demographyvalue = :demographyvalue', {
          demographyvalue,
        })
        .andWhere('favorable.iscurrentsurvey = :value', { value: 'Current' })
        .andWhere('factor.factorname NOT IN (:...excludedFactorNames)', {
          excludedFactorNames,
        })
        .orderBy('factor.factorcode', 'ASC')
        .getRawMany();

      const removeDuplicate = result.reduce((acc, val) => {
        return { ...acc, [val.factor_name]: val };
      }, {});

      return Object.values(removeDuplicate);
    } catch (error) {
      throw error;
    }
  }

  public async getFavorableDetail({
    companyid,
    factorid,
    demography,
    demographyvalue,
  }: GetFavorableFactorDetailQueryDTO): Promise<GetFavorableFactorDetailDTO> {
    try {
      const result = await this.engagementFavorableRepo
        .createQueryBuilder('favorable')
        .select([
          'favorable.companyid',
          'favorable.demography',
          'favorable.demographyvalue',
          'favorable.avg_respondentanswer_factor as avg_respondentanswer_factor',
          'factor.factorcode',
          'factor.factorname',
          'qcode.new_qcode',
          'qcode.question',
          'SUM ( favorable.sum_unfavorable ) AS sum_unfavorable',
          'SUM ( favorable.sum_neutral ) as sum_neutral',
          'SUM ( favorable.sum_favorable ) as sum_favorable',
          'SUM (favorable.count_unfavorable ) as count_unfavorable',
          'SUM (favorable.count_neutral ) as count_neutral',
          'SUM (favorable.count_favorable ) as count_favorable',
          'SUM ( favorable.count_respondent) as count_respondent',
        ])
        .leftJoin('favorable.factor', 'factor')
        .leftJoin('favorable.qcode', 'qcode')
        .where('favorable.companyid = :companyid', {
          companyid: companyid,
        })
        .andWhere('favorable.demography = :demography', {
          demography,
        })
        .andWhere('favorable.demographyvalue = :demographyvalue', {
          demographyvalue,
        })
        .andWhere('favorable.iscurrentsurvey = :value', { value: 'Current' })
        .andWhere('favorable.factorid = :factorid', { factorid })
        .groupBy('favorable.companyid')
        .addGroupBy('favorable.demography')
        .addGroupBy('favorable.avg_respondentanswer_factor')
        .addGroupBy('favorable.demographyvalue')
        .addGroupBy('factor.factorcode')
        .addGroupBy('factor.factorname')
        .addGroupBy('qcode.new_qcode')
        .addGroupBy('qcode.question')
        .orderBy('qcode.new_qcode')
        .getRawMany();

      const favorableType = ['favorable', 'neutral', 'unfavorable'];

      const summarizeResult: FavorableDataDTO[] = favorableType.map((item) => {
        return {
          favorable_type: item,
          qcodedata: result.map((qcode) => {
            const totalsum =
              parseInt(qcode.sum_favorable) +
              parseInt(qcode.sum_neutral) +
              parseInt(qcode.sum_unfavorable);

            return {
              average_per_qcode: totalsum / qcode.count_respondent,
              percentage_all_favorabletype:
                parseInt(qcode[`count_${item}`]) / qcode.count_respondent,
              count_respondent: qcode[`count_${item}`],
              question: qcode.qcode_question,
              qcode: qcode.qcode_qcode,
            };
          }),
        };
      });

      if (!summarizeResult.length) {
        throw new NotFoundException('No Data For That Company');
      }
      return {
        factor_name: result[0].factor_factorname as string,
        average_per_factor: result[0].avg_respondentanswer_factor as number,
        favorabledata: summarizeResult,
      };
    } catch (error) {
      throw error;
    }
  }
}
