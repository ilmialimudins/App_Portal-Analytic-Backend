import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Not, Repository } from 'typeorm';
import { PredRelativeImportance } from './pred-relative-importance.entity';
import {
  GetRelativeImportanceQueryDTO,
  RelativeImportancePerCompanyDTO,
} from './dto/get-relativeimportance-company.dto';

@Injectable()
export class PredRelativeImportanceService {
  constructor(
    @InjectRepository(PredRelativeImportance)
    private relativeImportanceRepo: Repository<PredRelativeImportance>,
  ) {}

  async getRelativeImportanceByCompany({
    d_companyid,
    order,
  }: GetRelativeImportanceQueryDTO): Promise<
    RelativeImportancePerCompanyDTO[]
  > {
    try {
      const relativeimportance = await this.relativeImportanceRepo.find({
        where: {
          d_companyid: parseInt(d_companyid),
          relativeimportance: Not(IsNull()),
        },
        relations: {
          engagement: true,
          factor: true,
        },
        select: {
          engagement: {
            d_engagementid: true,
            engagement: true,
          },
          factor: {
            factor_shortname: true,
          },
          relativeimportance: true,
        },
        order: {
          d_engagementid: 'ASC',
          relativeimportance: order || 'DESC',
        },
      });

      const data = relativeimportance.reduce((acc, val) => {
        if (!acc[val.engagement.d_engagementid]) {
          acc[val.engagement.d_engagementid] = {
            engagement: val.engagement.engagement,
            engagementid: val.engagement.d_engagementid,
            relativesimportance: [],
          };
        }

        acc[val.engagement.d_engagementid].relativesimportance.push({
          factor_shortname: val.factor.factor_shortname,
          relativeimportance: val.relativeimportance,
        });

        return acc;
      }, {});

      return Object.keys(data).map((item) => ({ ...data[item] }));
    } catch (error) {
      throw error;
    }
  }
}
