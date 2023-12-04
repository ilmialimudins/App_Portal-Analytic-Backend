import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BusinessGroup } from './master-business-group.entity';
import { Repository } from 'typeorm';
import { BusinessGroupDto } from './dto/master-business-group.dto';
import { AddBusinessGroupDto } from './dto/add-master-business-group.dto';
import { UpdateBusinessGroupDto } from './dto/update-master-business-group.dto';
import { Company } from '../master-company-ees/master-company-ees.entity';

@Injectable()
export class BusinessGroupService {
  constructor(
    @InjectRepository(BusinessGroup)
    private businessGroupRepository: Repository<BusinessGroup>,

    @InjectRepository(Company)
    private companyRepository: Repository<Company>,
  ) {}

  async getAllBusinessGroup(
    page: number,
    take: number,
    businessgroup?: string,
  ): Promise<{
    data: BusinessGroupDto[];
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
        .select('company.businessgroupid')
        .getMany();

      const offset = (page - 1) * take;

      let query = this.businessGroupRepository
        .createQueryBuilder('businessgroup')
        .select(['businessgroupid', 'businessgroupcode', 'businessgroupdesc']);

      if (businessgroup) {
        query = query.where(
          'LOWER(businessgroup.businessgroupdesc) LIKE :businessgroup',
          { businessgroup: `%${businessgroup.toLowerCase()}%` },
        );
      }

      const data = await query
        .andWhere('businessgroup.isdelete = :isdelete', { isdelete: false })
        .orderBy('businessgroup.sourcecreatedmodifiedtime', 'DESC')
        .offset(offset)
        .limit(take)
        .getRawMany();

      const dataWithStatus = data.map((item) => ({
        ...item,
        status: company.find((c) => c.businessgroupid === item.businessgroupid)
          ? 'isUsed'
          : 'isNotUsed',
      }));

      const itemCount = await query
        .andWhere('businessgroup.isdelete = :isdelete', { isdelete: false })
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

  async getBusinessGroupId(
    businessgroupid: number,
  ): Promise<BusinessGroupDto | undefined> {
    try {
      const query = await this.businessGroupRepository
        .createQueryBuilder('businessgroup')
        .where('businessgroup.businessgroupid = :businessgroupid', {
          businessgroupid,
        })
        .getOne();

      return query?.toDto();
    } catch (error) {
      throw error;
    }
  }

  async checkDuplicateBusinessgroup(businessgroup: string) {
    try {
      const query = await this.businessGroupRepository
        .createQueryBuilder('businessgroup')
        .where('businessgroup.businessgroupdesc = :businessgroup', {
          businessgroup,
        })
        .andWhere('businessgroup.isdelete = :isdelete', { isdelete: false })
        .getOne();

      return query;
    } catch (error) {
      throw error;
    }
  }

  async getLastBusinessGroupCode() {
    try {
      const query = await this.businessGroupRepository
        .createQueryBuilder('businessgroup')
        .select('businessgroup.businessgroupcode')
        .orderBy('businessgroup.businessgroupid', 'DESC')
        .getOne();

      return query;
    } catch (error) {
      throw error;
    }
  }

  async createBusinessGroup(businessgroup: AddBusinessGroupDto) {
    try {
      const createNow = new Date(new Date().getTime() + 7 * 60 * 60 * 1000);

      const year = createNow.getFullYear();
      const month = createNow.getMonth() + 1;
      const date = createNow.getDate();

      const createdDate = parseInt(`${year}${month}${date}`);

      const query = await this.businessGroupRepository
        .createQueryBuilder('businessgroup')
        .insert()
        .into(BusinessGroup)
        .values({
          businessgroupcode: businessgroup.businessgroupcode,
          businessgroupdesc: businessgroup.businessgroupdesc,
          createdby: businessgroup.createdby,
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

  async updateBusinessGroup(
    businessgroupid: number,
    businessgroup: UpdateBusinessGroupDto,
  ) {
    try {
      const query = await this.businessGroupRepository
        .createQueryBuilder()
        .update(BusinessGroup)
        .set({
          businessgroupcode: businessgroup.businessgroupcode,
          businessgroupdesc: businessgroup.businessgroupdesc,
          updatedby: businessgroup.updatedby,
        })
        .where('businessgroupid = :businessgroupid', { businessgroupid })
        .execute();

      return query;
    } catch (error) {
      throw error;
    }
  }

  async deleteBusinessGroup(businessgroupid: number) {
    try {
      const query = await this.businessGroupRepository
        .createQueryBuilder()
        .update(BusinessGroup)
        .set({ isdelete: 'true' })
        .where('businessgroupid = :businessgroupid', { businessgroupid })
        .execute();

      return query;
    } catch (error) {
      throw error;
    }
  }
}
