import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BusinessGroup } from './master-business-group.entity';
import { Repository } from 'typeorm';
import { BusinessGroupDto } from './dto/master-business-group.dto';
import { AddBusinessGroupDto } from './dto/add-master-business-group.dto';
import { UpdateBusinessGroupDto } from './dto/update-master-business-group.dto';

@Injectable()
export class BusinessGroupService {
  constructor(
    @InjectRepository(BusinessGroup)
    private businessGroupRepository: Repository<BusinessGroup>,
  ) {}

  async getAllBusinessGroup(
    page: number,
    take: number,
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
      const offset = (page - 1) * take;

      const data = await this.businessGroupRepository
        .createQueryBuilder('businessgroup')
        .select(['businessgroupid', 'businessgroupcode', 'businessgroupdesc'])
        .where('businessgroup.isdelete = :isdelete', { isdelete: false })
        .orderBy('businessgroupcode')
        .offset(offset)
        .limit(take)
        .getRawMany();

      const itemCount = await this.businessGroupRepository
        .createQueryBuilder('businessgroup')
        .select(['businessgroupid', 'businessgroupcode', 'businessgroupdesc'])
        .where('businessgroup.isdelete = :isdelete', { isdelete: false })
        .orderBy('businessgroupcode')
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

  async getBusinessGroupName(
    page: number,
    take: number,
    businessgroup: string,
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
      const offset = (page - 1) * take;

      const data = await this.businessGroupRepository
        .createQueryBuilder('businessgroup')
        .select(['businessgroupid', 'businessgroupcode', 'businessgroupdesc'])
        .where('businessgroup.isdelete = :isdelete', { isdelete: false })
        .andWhere(
          'LOWER(businessgroup.businessgroupdesc) LIKE :businessgroup',
          { businessgroup: `%${businessgroup.toLowerCase()}%` },
        )
        .orderBy('businessgroupcode')
        .offset(offset)
        .limit(take)
        .getRawMany();

      const itemCount = await this.businessGroupRepository
        .createQueryBuilder('businessgroup')
        .select(['businessgroupid', 'businessgroupcode', 'businessgroupdesc'])
        .where('businessgroup.isdelete = :isdelete', { isdelete: false })
        .andWhere(
          'LOWER(businessgroup.businessgroupdesc) LIKE :businessgroup',
          { businessgroup: `%${businessgroup.toLowerCase()}%` },
        )
        .orderBy('businessgroupcode')
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

  async getLastBusinessGroupCode() {
    try {
      const query = await this.businessGroupRepository
        .createQueryBuilder('businessgroup')
        .select('businessgroup.businessgroupcode')
        .orderBy('businessgroup.businessgroupcode', 'DESC')
        .getOne();

      return query;
    } catch (error) {
      throw error;
    }
  }

  async createBusinessGroup(businessgroup: AddBusinessGroupDto) {
    try {
      const query = await this.businessGroupRepository
        .createQueryBuilder('businessgroup')
        .insert()
        .into(BusinessGroup)
        .values({
          businessgroupcode: businessgroup.businessgroupcode,
          businessgroupdesc: businessgroup.businessgroupdesc,
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
