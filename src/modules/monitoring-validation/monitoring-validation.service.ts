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
    company: string,
    year: number,
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

      let query = this.monitoringValidationRepository
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
        ]);

      if (company && year && uploadby) {
        query = query
          .where('monitoringvalidation.company = :company', { company })
          .andWhere('monitoringvalidation.year = :year', { year })
          .andWhere('LOWER(monitoringvalidation.uploadby) LIKE :uploadby', {
            uploadby: `%${uploadby.toLowerCase()}%`,
          });
      } else if (company && year) {
        query = query
          .where('monitoringvalidation.company = :company', { company })
          .andWhere('monitoringvalidation.year = :year', { year });
      } else if (year && uploadby) {
        query = query
          .where('LOWER(monitoringvalidation.uploadby) LIKE :uploadby', {
            uploadby: `%${uploadby.toLowerCase()}%`,
          })
          .andWhere('monitoringvalidation.year = :year', { year });
      } else if (company && uploadby) {
        query = query
          .where('monitoringvalidation.company = :company', { company })
          .andWhere('LOWER(monitoringvalidation.uploadby) LIKE :uploadby', {
            uploadby: `%${uploadby.toLowerCase()}%`,
          });
      } else if (company) {
        query = query.where('monitoringvalidation.company = :company', {
          company,
        });
      } else if (year) {
        query = query.where('monitoringvalidation.year = :year', { year });
      } else if (uploadby) {
        query = query.where(
          'LOWER(monitoringvalidation.uploadby) LIKE :uploadby',
          {
            uploadby: `%${uploadby.toLowerCase()}%`,
          },
        );
      }

      const data = await query
        .orderBy('monitoringvalidation.uploadtime')
        .offset(offset)
        .limit(take)
        .getRawMany();

      const itemCount = await query.getCount();

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
