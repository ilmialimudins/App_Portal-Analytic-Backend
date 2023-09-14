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
    pageSize: number,
  ): Promise<{ data: BusinessGroupDto[]; total: number }> {
    try {
      const offset = (page - 1) * pageSize;

      const data = await this.businessGroupRepository
        .createQueryBuilder('businessgroup')
        .select(['businessgroupid', 'businessgroupcode', 'businessgroupdesc'])
        .where('businessgroup.isdelete = :isdelete', { isdelete: 'false' })
        .orderBy('businessgroupcode')
        .offset(offset)
        .limit(pageSize)
        .getRawMany();

      const total = await this.businessGroupRepository
        .createQueryBuilder('businessgroup')
        .select(['businessgroupid', 'businessgroupcode', 'businessgroupdesc'])
        .where('businessgroup.isdelete = :isdelete', { isdelete: 'false' })
        .orderBy('businessgroupcode')
        .getCount();

      return { data, total };
    } catch (error) {
      throw error;
    }
  }

  async getBusinessGroupName(
    page: number,
    pageSize: number,
    businessgroup: string,
  ): Promise<{ data: BusinessGroupDto[]; total: number }> {
    try {
      const offset = (page - 1) * pageSize;

      const data = await this.businessGroupRepository
        .createQueryBuilder('businessgroup')
        .select(['businessgroupid', 'businessgroupcode', 'businessgroupdesc'])
        .where('businessgroup.isdelete = :isdelete', { isdelete: 'false' })
        .andWhere('businessgroup.businessgroupdesc = :businessgroup', {
          businessgroup,
        })
        .orderBy('businessgroupcode')
        .offset(offset)
        .limit(pageSize)
        .getRawMany();

      const total = await this.businessGroupRepository
        .createQueryBuilder('businessgroup')
        .select(['businessgroupid', 'businessgroupcode', 'businessgroupdesc'])
        .where('businessgroup.isdelete = :isdelete', { isdelete: 'false' })
        .andWhere('businessgroup.businessgroupdesc = :businessgroup', {
          businessgroup,
        })
        .orderBy('businessgroupcode')
        .getCount();

      return { data, total };
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
