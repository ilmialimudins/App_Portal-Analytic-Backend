import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SurveyGroup } from './master-survey-group.entity';
import { Repository } from 'typeorm';
import { SurveyGroupDto } from './dto/master-survey-group.dto';
import { AddSurveyGroupDto } from './dto/add-master-survey-group.dto';
import { UpdateSurveyGroupDto } from './dto/update-master-survey-group.dto';
import { Company } from '../master-company-ees/master-company-ees.entity';
import { UserInfoDTO } from '../duende-authentication/dto/userinfo.dto';

@Injectable()
export class SurveyGroupService {
  constructor(
    @InjectRepository(SurveyGroup)
    private surveyGroupRepository: Repository<SurveyGroup>,

    @InjectRepository(Company)
    private companyRepository: Repository<Company>,
  ) {}

  async getAllSurveyGroup(
    page: number,
    take: number,
    surveygroup?: string,
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
      const company = await this.companyRepository
        .createQueryBuilder('company')
        .select('company.surveygroupid')
        .getMany();

      const offset = (page - 1) * take;

      let query = this.surveyGroupRepository
        .createQueryBuilder('surveygroup')
        .select(['surveygroupid', 'surveygroupcode', 'surveygroupdesc']);

      if (surveygroup) {
        query = query.where(
          'LOWER(surveygroup.surveygroupdesc) LIKE :surveygroup',
          {
            surveygroup: `%${surveygroup.toLowerCase()}%`,
          },
        );
      }

      const data = await query
        .andWhere('surveygroup.isdelete = :isdelete', { isdelete: false })
        .orderBy('surveygroup.surveygroupid', 'ASC')
        .orderBy('surveygroup.sourcecreatedmodifiedtime', 'DESC')
        .offset(offset)
        .limit(take)
        .getRawMany();

      const dataWithStatus = data.map((item) => ({
        ...item,
        status: company.find((c) => c.surveygroupid === item.surveygroupid)
          ? 'isUsed'
          : 'isNotUsed',
      }));

      const itemCount = await query
        .andWhere('surveygroup.isdelete = :isdelete', { isdelete: false })
        .getCount();

      const pageCount = Math.ceil(itemCount / take);
      const hasPreviousPage = page > 1;
      const hasNextPage = page < pageCount;

      return {
        data: dataWithStatus,
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

  async checkDuplicateSurveygroup(surveygroup: string) {
    try {
      const query = await this.surveyGroupRepository
        .createQueryBuilder('surveygroup')
        .where('surveygroup.surveygroupdesc = :surveygroup', { surveygroup })
        .andWhere('surveygroup.isdelete = :isdelete', { isdelete: false })
        .getOne();

      return query;
    } catch (error) {
      throw error;
    }
  }

  async getLastSurveyGroupCode() {
    try {
      const query = await this.surveyGroupRepository
        .createQueryBuilder('surveygroup')
        .select('surveygroup.surveygroupcode')
        .orderBy('surveygroup.surveygroupid', 'DESC')
        .getOne();

      return query;
    } catch (error) {
      throw error;
    }
  }

  async createSurveyGroup(
    surveygroup: AddSurveyGroupDto,
    userinfo: UserInfoDTO,
  ) {
    try {
      const createNow = new Date(new Date().getTime() + 7 * 60 * 60 * 1000);

      const year = createNow.getFullYear();
      const month = createNow.getMonth() + 1;
      const date = createNow.getDate();

      const createdDate = parseInt(`${year}${month}${date}`);

      const query = await this.surveyGroupRepository
        .createQueryBuilder('surveygroup')
        .insert()
        .into(SurveyGroup)
        .values({
          surveygroupcode: surveygroup.surveygroupcode,
          surveygroupdesc: surveygroup.surveygroupdesc,
          createdby: userinfo.fullname,
          isdelete: 'false',
          createdtime: createNow,
          createddate: createdDate,
          sourcecreatedmodifiedtime: createNow,
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
    userinfo: UserInfoDTO,
  ) {
    try {
      const query = await this.surveyGroupRepository
        .createQueryBuilder()
        .update(SurveyGroup)
        .set({
          surveygroupcode: surveygroup.surveygroupcode,
          surveygroupdesc: surveygroup.surveygroupdesc,
          updatedby: userinfo.fullname,
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
