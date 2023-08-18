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
    d_companyid,
  }: GetAverageFavorableAllFactorQueryDTO): Promise<
    GetAverageFavorableAllFactorResultDTO[]
  > {
    try {
      const result = await this.engagementFavorableRepo
        .createQueryBuilder('favorable')
        .select('DISTINCT favorable.d_factorid as d_factorid')
        .addSelect('favorable.avg_per_factor as average_per_factor')
        .addSelect('factor.factorname as factor_name')
        .leftJoin('favorable.factor', 'factor')
        .where('favorable.d_companyid = :d_companyid', {
          d_companyid: d_companyid,
        })
        .andWhere('favorable.iscurrentsurvey = :value', { value: 'Current' })
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
    d_companyid,
    d_factorid,
  }: GetFavorableFactorDetailQueryDTO): Promise<GetFavorableFactorDetailDTO> {
    try {
      console.log('here');
      const result = await this.engagementFavorableRepo.find({
        where: {
          d_companyid: parseInt(d_companyid),
          d_factorid: parseInt(d_factorid),
          iscurrentsurvey: 'Current',
        },
        relations: {
          qcode: true,
          factor: true,
        },
        order: {
          favorable_type: 'ASC',
        },
      });

      const favorableData = result.reduce<FavorableDataDTO[]>((acc, val) => {
        const indexFavorableType = acc.findIndex(
          (x) => x.favorable_type === val.favorable_type,
        );

        if (indexFavorableType === -1) {
          acc.push({
            favorable_type: val.favorable_type,
            qcodedata: [
              {
                average_per_qcode: val.avg_per_qcode,
                count_respondent: val.count_respondent,
                percentage_all_favorabletype: val.percentage_all_favorabletype,
                question: val.qcode.question,
              },
            ],
          });
        } else {
          acc[indexFavorableType].qcodedata.push({
            average_per_qcode: val.avg_per_qcode,
            count_respondent: val.count_respondent,
            percentage_all_favorabletype: val.percentage_all_favorabletype,
            question: val.qcode.question,
          });
        }
        return acc;
      }, []);

      if (!result.length) {
        throw new NotFoundException('No Data For That Company');
      }
      return {
        factor_name: result[0].factor.factorname,
        average_per_factor: result[0].avg_per_factor,
        favorabledata: favorableData,
      };
    } catch (error) {
      throw error;
    }
  }
}
