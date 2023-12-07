import { Inject, Injectable } from '@nestjs/common';
import { TableProperty } from './table-mps-property.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GetOneProperty, MPSPropertyBody } from './dto/table-mps-property.dto';
import { MPSGradeEmployeeStatusService } from '../table-mps-gradeemployeestatus/mps-gradeemployeestatus.service';

@Injectable()
export class MPSPropertyService {
  constructor(
    @InjectRepository(TableProperty)
    private mpsPropertyRepo: Repository<TableProperty>,

    @Inject(MPSGradeEmployeeStatusService)
    private gradeEmployeeStatusService: MPSGradeEmployeeStatusService,
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

  async getPropertyByParams(body: GetOneProperty) {
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
        .where('property.companyid = :companyid', { companyid: body.companyid })
        .andWhere('property.month = :month', { month: body.month })
        .andWhere('property.year = :year', { year: body.year })
        .getRawOne();

      return result;
    } catch (error) {
      throw error;
    }
  }

  async updateProperty(propertyid: number, body: MPSPropertyBody) {
    try {
      const query = await this.mpsPropertyRepo
        .createQueryBuilder()
        .update(TableProperty)
        .set({
          directreviewid: body.directreviewid,
          claid: body.claid,
          locationid: body.locationid,
        })
        .where('propertyid = :propertyid', { propertyid })
        .execute();

      return query;
    } catch (error) {
      throw error;
    }
  }

  // async updateAllData(
  //   getOne: GetOneProperty,
  //   body: MPSPropertyBody,
  // ) {
  //   try {
  //     const getProperty = await this.getPropertyByParams(getOne);

  //     const updateProperty = await this.updateProperty(getProperty.propertyid, body);

  //     return {getProperty, updateProperty}
  //   }catch(error){
  //     throw error;
  //   }
  // }
}
