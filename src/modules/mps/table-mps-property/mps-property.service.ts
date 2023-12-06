import { Injectable } from '@nestjs/common';
import { TableProperty } from './table-mps-property.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GetOneProperty } from './dto/table-mps-property.dto';

@Injectable()
export class MPSPropertyService {
  constructor(
    @InjectRepository(TableProperty)
    private mpsPropertyRepo: Repository<TableProperty>,
  ) {}

  public async getOneMPSProperty(data: GetOneProperty) {
    try {
      return this.mpsPropertyRepo.findOne({
        where: {
          companyid: data.companyid,
          year: data.year,
          month: data.month,
        },
        relations: {
          company: true,
          location: true,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async getPropertyByParams(companyid: number, month: number, year: number) {
    try {
      const result = await this.mpsPropertyRepo
        .createQueryBuilder('property')
        .leftJoin('property.company', 'company')
        .leftJoin('company.cla', 'cla')
        .leftJoin('company.directreview', 'directreview')
        .leftJoin('company.location', 'location')
        .select([
          'property.propertyid as propertyid',
          'company.companyid as companyid',
          'cla.claid as claid',
          'directreview.directreviewid as directreviewid',
          'location.locationid as locationid',
          'company.companympsname as companyname',
          'cla.cladesc as cladesc',
          'directreview.directreviewdesc as directreviewdesc',
          'location.locationdesc as locationdesc',
          'property.month as month',
          'property.year as year',
        ])
        .where('property.companyid = :companyid', { companyid: companyid })
        .andWhere('property.month = :month', { month: month })
        .andWhere('property.year = :year', { year: year })
        .getRawOne();

      return result;
    } catch (error) {
      throw error;
    }
  }
}
