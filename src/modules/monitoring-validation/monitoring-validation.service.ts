import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MonitoringValidation } from './monitoring-validation.entity';
import { Repository } from 'typeorm';
import { MonitoringValidationDto } from './dto/monitoring-validation.dto';

@Injectable()
export class MonitoringValidationService {
  constructor(
    @InjectRepository(MonitoringValidation)
    private monitoringValidationRepository: Repository<MonitoringValidation>,
  ) {}

  async getAllMonitoringValidation(
    page: number,
    take: number,
  ): Promise<{
    data: MonitoringValidationDto[];
    page: number;
    take: number;
    itemCount: number;
    pageCount: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
  }> {
    try {
      const offset = (page - 1) * take;

      const data = await this.monitoringValidationRepository
        .createQueryBuilder('monitoringvalidation')
        .select([
          'id',
          'uploadby',
          'uploadtime',
          'surveytitle',
          'company',
          'year',
          'createdtime',
          'exceltitle',
          'statusprogress',
        ])
        .orderBy('uploadtime')
        .offset(offset)
        .limit(take)
        .getRawMany();

      const itemCount = await this.monitoringValidationRepository
        .createQueryBuilder('monitoringvalidation')
        .select([
          'id',
          'uploadby',
          'uploadtime',
          'surveytitle',
          'company',
          'year',
          'createdtime',
          'exceltitle',
          'statusprogress',
        ])
        .getCount();

      const pageCount = Math.ceil(itemCount / take);
      const hasPreviousPage = page > 1;
      const hasNextPage = page < pageCount;

      return {
        data,
        page,
        take,
        itemCount,
        pageCount,
        hasPreviousPage,
        hasNextPage,
      };
    } catch (error) {
      throw error;
    }
  }

  async getMonitoringValidationCompany(
    page: number,
    take: number,
    company: string,
  ): Promise<{
    data: MonitoringValidationDto[];
    page: number;
    take: number;
    itemCount: number;
    pageCount: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
  }> {
    try {
      const offset = (page - 1) * take;

      const data = await this.monitoringValidationRepository
        .createQueryBuilder('monitoringvalidation')
        .select([
          'id',
          'uploadby',
          'uploadtime',
          'surveytitle',
          'company',
          'year',
          'createdtime',
          'exceltitle',
          'statusprogress',
        ])
        .where('monitoringvalidation.company = :company', { company })
        .orderBy('uploadtime')
        .offset(offset)
        .limit(take)
        .getRawMany();

      const itemCount = await this.monitoringValidationRepository
        .createQueryBuilder('monitoringvalidation')
        .select([
          'id',
          'uploadby',
          'uploadtime',
          'surveytitle',
          'company',
          'year',
          'createdtime',
          'exceltitle',
          'statusprogress',
        ])
        .where('monitoringvalidation.company = :company', { company })
        .getCount();

      const pageCount = Math.ceil(itemCount / take);
      const hasPreviousPage = page > 1;
      const hasNextPage = page < pageCount;

      return {
        data,
        page,
        take,
        itemCount,
        pageCount,
        hasPreviousPage,
        hasNextPage,
      };
    } catch (error) {
      throw error;
    }
  }

  async getMonitoringValidationYear(
    page: number,
    take: number,
    year: number,
  ): Promise<{
    data: MonitoringValidationDto[];
    page: number;
    take: number;
    itemCount: number;
    pageCount: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
  }> {
    try {
      const offset = (page - 1) * take;

      const data = await this.monitoringValidationRepository
        .createQueryBuilder('monitoringvalidation')
        .select([
          'id',
          'uploadby',
          'uploadtime',
          'surveytitle',
          'company',
          'year',
          'createdtime',
          'exceltitle',
          'statusprogress',
        ])
        .where('monitoringvalidation.year = :year', { year })
        .orderBy('uploadtime')
        .offset(offset)
        .limit(take)
        .getRawMany();

      const itemCount = await this.monitoringValidationRepository
        .createQueryBuilder('monitoringvalidation')
        .select([
          'id',
          'uploadby',
          'uploadtime',
          'surveytitle',
          'company',
          'year',
          'createdtime',
          'exceltitle',
          'statusprogress',
        ])
        .where('monitoringvalidation.year = :year', { year })
        .getCount();

      const pageCount = Math.ceil(itemCount / take);
      const hasPreviousPage = page > 1;
      const hasNextPage = page < pageCount;

      return {
        data,
        page,
        take,
        itemCount,
        pageCount,
        hasPreviousPage,
        hasNextPage,
      };
    } catch (error) {
      throw error;
    }
  }

  async getMonitoringValidationUploadBy(
    page: number,
    take: number,
    uploadby: string,
  ): Promise<{
    data: MonitoringValidationDto[];
    page: number;
    take: number;
    itemCount: number;
    pageCount: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
  }> {
    try {
      const offset = (page - 1) * take;

      const data = await this.monitoringValidationRepository
        .createQueryBuilder('monitoringvalidation')
        .select([
          'id',
          'uploadby',
          'uploadtime',
          'surveytitle',
          'company',
          'year',
          'createdtime',
          'exceltitle',
          'statusprogress',
        ])
        .where('LOWER(monitoringvalidation.uploadby) LIKE :uploadby', {
          uploadby: `%${uploadby.toLowerCase()}%`,
        })
        .orderBy('uploadtime')
        .offset(offset)
        .limit(take)
        .getRawMany();

      const itemCount = await this.monitoringValidationRepository
        .createQueryBuilder('monitoringvalidation')
        .select([
          'id',
          'uploadby',
          'uploadtime',
          'surveytitle',
          'company',
          'year',
          'createdtime',
          'exceltitle',
          'statusprogress',
        ])
        .where('LOWER(monitoringvalidation.uploadby) LIKE :uploadby', {
          uploadby: `%${uploadby.toLowerCase()}%`,
        })
        .getCount();

      const pageCount = Math.ceil(itemCount / take);
      const hasPreviousPage = page > 1;
      const hasNextPage = page < pageCount;

      return {
        data,
        page,
        take,
        itemCount,
        pageCount,
        hasPreviousPage,
        hasNextPage,
      };
    } catch (error) {
      throw error;
    }
  }
}
