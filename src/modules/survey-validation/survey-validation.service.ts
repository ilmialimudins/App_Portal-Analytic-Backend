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

      const data = await this.surveyValidationRepository
        .createQueryBuilder('surveyvalidation')
        .select([
          'id',
          'company',
          'surveyid',
          'titlesurvey',
          'dateversion',
          'username',
        ])
        .where('surveyvalidation.validation = :validation', { validation: '0' })
        .orderBy('dateversion')
        .offset(offset)
        .limit(take)
        .getRawMany();

      const itemCount = await this.surveyValidationRepository
        .createQueryBuilder('surveyvalidation')
        .select([
          'id',
          'company',
          'surveyid',
          'titlesurvey',
          'dateversion',
          'username',
        ])
        .where('surveyvalidation.validation = :validation', { validation: '0' })
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

  async getSurveyValidationCompanyNeedValidate(
    page: number,
    take: number,
    company: string,
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

      const data = await this.surveyValidationRepository
        .createQueryBuilder('surveyvalidation')
        .select([
          'id',
          'company',
          'surveyid',
          'titlesurvey',
          'dateversion',
          'username',
        ])
        .where('surveyvalidation.validation = :validation', { validation: '0' })
        .andWhere('surveyvalidation.company = :company', { company })
        .orderBy('dateversion')
        .offset(offset)
        .limit(take)
        .getRawMany();

      const itemCount = await this.surveyValidationRepository
        .createQueryBuilder('surveyvalidation')
        .select([
          'id',
          'company',
          'surveyid',
          'titlesurvey',
          'dateversion',
          'username',
        ])
        .where('surveyvalidation.validation = :validation', { validation: '0' })
        .andWhere('surveyvalidation.company = :company', { company })
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

  async getSurveyValidationValidationNeedValidate(
    page: number,
    take: number,
    validateddate: Date,
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

      const data = await this.surveyValidationRepository
        .createQueryBuilder('surveyvalidation')
        .select([
          'id',
          'company',
          'surveyid',
          'titlesurvey',
          'dateversion',
          'username',
        ])
        .where('surveyvalidation.validation = :validation', { validation: '0' })
        .andWhere('surveyvalidation.validateddate = :validateddate', {
          validateddate,
        })
        .orderBy('dateversion')
        .offset(offset)
        .limit(take)
        .getRawMany();

      const itemCount = await this.surveyValidationRepository
        .createQueryBuilder('surveyvalidation')
        .select([
          'id',
          'company',
          'surveyid',
          'titlesurvey',
          'dateversion',
          'username',
        ])
        .where('surveyvalidation.validation = :validation', { validation: '0' })
        .andWhere('surveyvalidation.validateddate = :validateddate', {
          validateddate,
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

  async getSurveyValidationUsernameNeedValidate(
    page: number,
    take: number,
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

      const data = await this.surveyValidationRepository
        .createQueryBuilder('surveyvalidation')
        .select([
          'id',
          'company',
          'surveyid',
          'titlesurvey',
          'dateversion',
          'username',
        ])
        .where('surveyvalidation.validation = :validation', { validation: '0' })
        .where('LOWER(surveyvalidation.username) LIKE :username', {
          username: `%${username.toLowerCase()}%`,
        })
        .orderBy('dateversion')
        .offset(offset)
        .limit(take)
        .getRawMany();

      const itemCount = await this.surveyValidationRepository
        .createQueryBuilder('surveyvalidation')
        .select([
          'id',
          'company',
          'surveyid',
          'titlesurvey',
          'dateversion',
          'username',
        ])
        .where('surveyvalidation.validation = :validation', { validation: '0' })
        .where('LOWER(surveyvalidation.username) LIKE :username', {
          username: `%${username.toLowerCase()}%`,
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

  async getAllSurveyValidationValidate(
    page: number,
    take: number,
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

      const data = await this.surveyValidationRepository
        .createQueryBuilder('surveyvalidation')
        .select([
          'id',
          'company',
          'surveyid',
          'titlesurvey',
          'dateversion',
          'username',
        ])
        .where('surveyvalidation.validation = :validation', { validation: '1' })
        .orderBy('dateversion')
        .offset(offset)
        .limit(take)
        .getRawMany();

      const itemCount = await this.surveyValidationRepository
        .createQueryBuilder('surveyvalidation')
        .select([
          'id',
          'company',
          'surveyid',
          'titlesurvey',
          'dateversion',
          'username',
        ])
        .where('surveyvalidation.validation = :validation', { validation: '1' })
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

  async getSurveyValidationCompanyValidate(
    page: number,
    take: number,
    company: string,
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

      const data = await this.surveyValidationRepository
        .createQueryBuilder('surveyvalidation')
        .select([
          'id',
          'company',
          'surveyid',
          'titlesurvey',
          'dateversion',
          'username',
        ])
        .where('surveyvalidation.validation = :validation', { validation: '1' })
        .andWhere('surveyvalidation.company = :company', { company })
        .orderBy('dateversion')
        .offset(offset)
        .limit(take)
        .getRawMany();

      const itemCount = await this.surveyValidationRepository
        .createQueryBuilder('surveyvalidation')
        .select([
          'id',
          'company',
          'surveyid',
          'titlesurvey',
          'dateversion',
          'username',
        ])
        .where('surveyvalidation.validation = :validation', { validation: '1' })
        .andWhere('surveyvalidation.company = :company', { company })
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

  async getSurveyValidationValidationValidate(
    page: number,
    take: number,
    validateddate: Date,
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

      const data = await this.surveyValidationRepository
        .createQueryBuilder('surveyvalidation')
        .select([
          'id',
          'company',
          'surveyid',
          'titlesurvey',
          'dateversion',
          'username',
        ])
        .where('surveyvalidation.validation = :validation', { validation: '1' })
        .andWhere('surveyvalidation.validateddate = :validateddate', {
          validateddate,
        })
        .orderBy('dateversion')
        .offset(offset)
        .limit(take)
        .getRawMany();

      const itemCount = await this.surveyValidationRepository
        .createQueryBuilder('surveyvalidation')
        .select([
          'id',
          'company',
          'surveyid',
          'titlesurvey',
          'dateversion',
          'username',
        ])
        .where('surveyvalidation.validation = :validation', { validation: '1' })
        .andWhere('surveyvalidation.validateddate = :validateddate', {
          validateddate,
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

  async getSurveyValidationUsernameValidate(
    page: number,
    take: number,
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

      const data = await this.surveyValidationRepository
        .createQueryBuilder('surveyvalidation')
        .select([
          'id',
          'company',
          'surveyid',
          'titlesurvey',
          'dateversion',
          'username',
        ])
        .where('surveyvalidation.validation = :validation', { validation: '1' })
        .where('LOWER(surveyvalidation.username) LIKE :username', {
          username: `%${username.toLowerCase()}%`,
        })
        .orderBy('dateversion')
        .offset(offset)
        .limit(take)
        .getRawMany();

      const itemCount = await this.surveyValidationRepository
        .createQueryBuilder('surveyvalidation')
        .select([
          'id',
          'company',
          'surveyid',
          'titlesurvey',
          'dateversion',
          'username',
        ])
        .where('surveyvalidation.validation = :validation', { validation: '1' })
        .where('LOWER(surveyvalidation.username) LIKE :username', {
          username: `%${username.toLowerCase()}%`,
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

  async updateValidation(id: number) {
    try {
      const query = await this.surveyValidationRepository
        .createQueryBuilder()
        .update(SurveyValidation)
        .set({ validation: '1' })
        .where('id = :id', { id })
        .execute();

      return query;
    } catch (error) {
      throw error;
    }
  }
}
