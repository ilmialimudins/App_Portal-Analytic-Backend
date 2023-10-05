import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SurveyGroup } from './master-survey-group.entity';
import { Repository } from 'typeorm';
import { SurveyGroupDto } from './dto/master-survey-group.dto';
import { AddSurveyGroupDto } from './dto/add-master-survey-group.dto';
import { UpdateSurveyGroupDto } from './dto/update-master-survey-group.dto';

@Injectable()
export class SurveyGroupService {
  constructor(
    @InjectRepository(SurveyGroup)
    private surveyGroupRepository: Repository<SurveyGroup>,
  ) {}

  async getAllSurveyGroup(
    page: number,
    take: number,
  ): Promise<{
    data: SurveyGroupDto[];
    page: number;
    take: number;
    itemCount: number;
    pageCount: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
  }> {
    try {
      const offset = (page - 1) * take;

      const data = await this.surveyGroupRepository
        .createQueryBuilder('surveygroup')
        .select(['surveygroupid', 'surveygroupcode', 'surveygroupdesc'])
        .where('surveygroup.isdelete = :isdelete', { isdelete: false })
        .orderBy('surveygroupcode')
        .offset(offset)
        .limit(take)
        .getRawMany();

      const itemCount = await this.surveyGroupRepository
        .createQueryBuilder('surveygroup')
        .select(['surveygroupid', 'surveygroupcode', 'surveygroupdesc'])
        .where('surveygroup.isdelete = :isdelete', { isdelete: false })
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

  async getSurveyGroupName(
    page: number,
    take: number,
    surveygroup: string,
  ): Promise<{
    data: SurveyGroupDto[];
    page: number;
    take: number;
    itemCount: number;
    pageCount: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
  }> {
    try {
      const offset = (page - 1) * take;

      const data = await this.surveyGroupRepository
        .createQueryBuilder('surveygroup')
        .select(['surveygroupid', 'surveygroupcode', 'surveygroupdesc'])
        .where('surveygroup.isdelete = :isdelete', { isdelete: false })
        .andWhere('LOWER(surveygroup.surveygroupdesc) LIKE :surveygroup', {
          surveygroup: `%${surveygroup.toLowerCase()}%`,
        })
        .orderBy('surveygroupcode')
        .offset(offset)
        .limit(take)
        .getRawMany();

      const itemCount = await this.surveyGroupRepository
        .createQueryBuilder('surveygroup')
        .select(['surveygroupid', 'surveygroupcode', 'surveygroupdesc'])
        .where('surveygroup.isdelete = :isdelete', { isdelete: false })
        .andWhere('LOWER(surveygroup.surveygroupdesc) LIKE :surveygroup', {
          surveygroup: `%${surveygroup.toLowerCase()}%`,
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

  async getSurveyGroupId(
    surveygroupid: number,
  ): Promise<SurveyGroupDto | undefined> {
    try {
      const query = await this.surveyGroupRepository
        .createQueryBuilder('surveygroup')
        .where('surveygroup.surveygroupid = :surveygroupid', { surveygroupid })
        .getOne();

      return query?.toDto();
    } catch (error) {
      throw error;
    }
  }

  async getLastSurveyGroupCode() {
    try {
      const query = await this.surveyGroupRepository
        .createQueryBuilder('surveygroup')
        .select('surveygroup.surveygroupcode')
        .orderBy('surveygroup.surveygroupcode', 'DESC')
        .getOne();

      return query;
    } catch (error) {
      throw error;
    }
  }

  async createSurveyGroup(surveygroup: AddSurveyGroupDto) {
    try {
      const query = await this.surveyGroupRepository
        .createQueryBuilder('surveygroup')
        .insert()
        .into(SurveyGroup)
        .values({
          surveygroupcode: surveygroup.surveygroupcode,
          surveygroupdesc: surveygroup.surveygroupdesc,
          isdelete: 'false',
          createdtime: new Date(),
          sourcecreatedmodifiedtime: new Date(),
        })
        .execute();

      return query;
    } catch (error) {
      throw error;
    }
  }

  async updateSurveyGroup(
    surveygroupid: number,
    surveygroup: UpdateSurveyGroupDto,
  ) {
    try {
      const query = await this.surveyGroupRepository
        .createQueryBuilder()
        .update(SurveyGroup)
        .set({
          surveygroupcode: surveygroup.surveygroupcode,
          surveygroupdesc: surveygroup.surveygroupdesc,
        })
        .where('surveygroupid = :surveygroupid', { surveygroupid })
        .execute();

      return query;
    } catch (error) {
      throw error;
    }
  }

  async deleteSurveyGroup(surveygroupid: number) {
    try {
      const query = await this.surveyGroupRepository
        .createQueryBuilder()
        .update(SurveyGroup)
        .set({ isdelete: 'true' })
        .where('surveygroupid = :surveygroupid', { surveygroupid })
        .execute();

      return query;
    } catch (error) {
      throw error;
    }
  }
}
