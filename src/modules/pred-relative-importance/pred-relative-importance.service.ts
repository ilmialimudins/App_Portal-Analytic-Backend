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
    companyid,
    order,
  }: GetRelativeImportanceQueryDTO): Promise<
    RelativeImportancePerCompanyDTO[]
  > {
    try {
      const relativeimportance = await this.relativeImportanceRepo.find({
        where: {
          companyid: parseInt(companyid),
          relativeimportance: Not(IsNull()),
        },
        relations: {
          engagement: true,
          factor: true,
        },
        select: {
          engagement: {
            engagementid: true,
            engagement: true,
          },
          factor: {
            factor_shortname: true,
            factorname: true,
          },
          relativeimportance: true,
        },
        order: {
          engagementid: 'ASC',
          relativeimportance: order || 'DESC',
        },
      });

      const data = relativeimportance.reduce((acc, val) => {
        if (!acc[val.engagement.engagementid]) {
          acc[val.engagement.engagementid] = {
            engagement: val.engagement.engagement,
            engagementid: val.engagement.engagementid,
            relativesimportance: [],
          };
        }

        acc[val.engagement.engagementid].relativesimportance.push({
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
