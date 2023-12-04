import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SurveyValidation } from './survey-validation.entity';
import { Repository } from 'typeorm';
import { SurveyValidationDto } from './dto/survey-validation.dto';

@Injectable()
export class SurveyValidationService {
  constructor(
    @InjectRepository(SurveyValidation)
    private surveyValidationRepository: Repository<SurveyValidation>,
  ) {}

  async getAllSurveyValidationNeedValidate(
    page: number,
    take: number,
    company: string,
    dateversion: string,
    username: string,
  ): Promise<{
    data: SurveyValidationDto[];
    page: number;
    take: number;
    itemCount: number;
    pageCount: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
  }> {
    try {
      const offset = (page - 1) * take;

      const date = new Date(dateversion);

      let query = this.surveyValidationRepository
        .createQueryBuilder('surveyvalidation')
        .leftJoin('surveyvalidation.complete', 'complete')
        .select([
          'surveyvalidation.id',
          'surveyvalidation.company',
          'surveyvalidation.surveyid',
          'surveyvalidation.titlesurvey',
          'surveyvalidation.dateversion',
          'surveyvalidation.username',
          'complete.status',
        ])
        .distinct(true);

      if (company && dateversion && username) {
        query = query
          .where('surveyvalidation.company = :company', { company })
          .andWhere('surveyvalidation.dateversion = :date', {
            date: date.toISOString(),
          })
          .andWhere('LOWER(surveyvalidation.username) LIKE :username', {
            username: `%${username.toLowerCase()}%`,
          });
      } else if (company && dateversion) {
        query = query
          .where('surveyvalidation.company = :company', { company })
          .andWhere('surveyvalidation.dateversion = :date', {
            date: date.toISOString(),
          });
      } else if (username && dateversion) {
        query = query
          .where('surveyvalidation.dateversion = :date', {
            date: date.toISOString(),
          })
          .andWhere('LOWER(surveyvalidation.username) LIKE :username', {
            username: `%${username.toLowerCase()}%`,
          });
      } else if (company && username) {
        query = query
          .where('surveyvalidation.company = :company', { company })
          .andWhere('LOWER(surveyvalidation.username) LIKE :username', {
            username: `%${username.toLowerCase()}%`,
          });
      } else if (company) {
        query = query.where('surveyvalidation.company = :company', { company });
      } else if (dateversion) {
        query = query.where('surveyvalidation.dateversion = :date', {
          date: date.toISOString(),
        });
      } else if (username) {
        query = query.where('LOWER(surveyvalidation.username) LIKE :username', {
          username: `%${username.toLowerCase()}%`,
        });
      }

      const data = await query
        .andWhere('surveyvalidation.validation = :validation', {
          validation: '0',
        })
        .andWhere('surveyvalidation.company = complete.company')
        .andWhere('surveyvalidation.surveyid = complete.surveyid')
        .orderBy('dateversion', 'DESC')
        .offset(offset)
        .limit(take)
        .getRawMany();

      const itemCount = await query
        .andWhere('surveyvalidation.validation = :validation', {
          validation: '0',
        })
        .andWhere('surveyvalidation.company = complete.company')
        .andWhere('surveyvalidation.surveyid = complete.surveyid')
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

  async getAllSurveyValidationValidate(
    page: number,
    take: number,
    company: string,
    dateversion: string,
    username: string,
  ): Promise<{
    data: SurveyValidationDto[];
    page: number;
    take: number;
    itemCount: number;
    pageCount: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
  }> {
    try {
      const offset = (page - 1) * take;

      const date = new Date(dateversion);

      let query = this.surveyValidationRepository
        .createQueryBuilder('surveyvalidation')
        .select([
          'surveyvalidation.id',
          'surveyvalidation.company',
          'surveyvalidation.surveyid',
          'surveyvalidation.titlesurvey',
          'surveyvalidation.dateversion',
          'surveyvalidation.username',
          'surveyvalidation.validateddate',
        ]);

      if (company && dateversion && username) {
        query = query
          .where('surveyvalidation.company = :company', { company })
          .andWhere('surveyvalidation.dateversion = :date', {
            date: date.toISOString(),
          })
          .andWhere('LOWER(surveyvalidation.username) LIKE :username', {
            username: `%${username.toLowerCase()}%`,
          });
      } else if (company && dateversion) {
        query = query
          .where('surveyvalidation.company = :company', { company })
          .andWhere('surveyvalidation.dateversion = :date', {
            date: date.toISOString(),
          });
      } else if (username && dateversion) {
        query = query
          .where('surveyvalidation.dateversion = :date', {
            date: date.toISOString(),
          })
          .andWhere('LOWER(surveyvalidation.username) LIKE :username', {
            username: `%${username.toLowerCase()}%`,
          });
      } else if (company && username) {
        query = query
          .where('surveyvalidation.company = :company', { company })
          .andWhere('LOWER(surveyvalidation.username) LIKE :username', {
            username: `%${username.toLowerCase()}%`,
          });
      } else if (company) {
        query = query.where('surveyvalidation.company = :company', { company });
      } else if (dateversion) {
        query = query.where('surveyvalidation.dateversion = :date', {
          date: date.toISOString(),
        });
      } else if (username) {
        query = query.where('LOWER(surveyvalidation.username) LIKE :username', {
          username: `%${username.toLowerCase()}%`,
        });
      }

      const data = await query
        .andWhere('surveyvalidation.validation = :validation', {
          validation: '1',
        })
        .orderBy('dateversion', 'DESC')
        .offset(offset)
        .limit(take)
        .getRawMany();

      const itemCount = await query
        .andWhere('surveyvalidation.validation = :validation', {
          validation: '1',
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

  async getIncompleteResponse() {
    try {
      const query = await this.surveyValidationRepository
        .createQueryBuilder('surveyvalidation')
        .leftJoin('surveyvalidation.complete', 'complete')
        .select([
          'surveyvalidation.surveyid',
          'surveyvalidation.titlesurvey',
          'complete.respondentid',
        ])
        .where('surveyvalidation.validation = :validation', {
          validation: '0',
        })
        .andWhere('surveyvalidation.company = complete.company')
        .andWhere('surveyvalidation.surveyid = complete.surveyid')
        .getRawMany();

      return query;
    } catch (error) {
      throw error;
    }
  }

  async updateValidation(id: number) {
    try {
      const createNow = new Date(new Date().getTime() + 7 * 60 * 60 * 1000);

      const query = await this.surveyValidationRepository
        .createQueryBuilder()
        .update(SurveyValidation)
        .set({
          validation: '1',
          validateddate: createNow,
        })
        .where('id = :id', { id })
        .execute();

      return query;
    } catch (error) {
      throw error;
    }
  }
}
