import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BusinessLine } from './master-business-line.entity';
import { Repository } from 'typeorm';
import { BusinessLineDto } from './dto/master-business-line.dto';
import { AddBusinessLineDto } from './dto/add-master-business-line.dto';
import { UpdateBusinessLineDto } from './dto/update-master-business-line.dto';

@Injectable()
export class BusinessLineService {
  constructor(
    @InjectRepository(BusinessLine)
    private businessLineRepository: Repository<BusinessLine>,
  ) {}

  async getAllBusinessLine(
    page: number,
    take: number,
  ): Promise<{
    data: BusinessLineDto[];
    page: number;
    take: number;
    itemCount: number;
    pageCount: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
  }> {
    try {
      const offset = (page - 1) * take;

      const data = await this.businessLineRepository
        .createQueryBuilder('businessline')
        .select(['businesslineid', 'businesslinecode', 'businesslinedesc'])
        .where('businessline.isdelete = :isdelete', { isdelete: false })
        .orderBy('businesslinecode')
        .offset(offset)
        .limit(take)
        .getRawMany();

      const itemCount = await this.businessLineRepository
        .createQueryBuilder('businessline')
        .select(['businesslineid', 'businesslinecode', 'businesslinedesc'])
        .where('businessline.isdelete = :isdelete', { isdelete: false })
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

  async getBusinessLineName(
    page: number,
    take: number,
    businessline: string,
  ): Promise<{
    data: BusinessLineDto[];
    page: number;
    take: number;
    itemCount: number;
    pageCount: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
  }> {
    try {
      const offset = (page - 1) * take;

      const data = await this.businessLineRepository
        .createQueryBuilder('businessline')
        .select(['businesslineid', 'businesslinecode', 'businesslinedesc'])
        .where('businessline.isdelete = :isdelete', { isdelete: false })
        .andWhere('LOWER(businessline.businesslinedesc) LIKE :businessline', {
          businessline: `%${businessline.toLowerCase()}%`,
        })
        .orderBy('businesslinecode')
        .offset(offset)
        .limit(take)
        .getRawMany();

      const itemCount = await this.businessLineRepository
        .createQueryBuilder('businessline')
        .select(['businesslineid', 'businesslinecode', 'businesslinedesc'])
        .where('businessline.isdelete = :isdelete', { isdelete: false })
        .andWhere('LOWER(businessline.businesslinedesc) LIKE :businessline', {
          businessline: `%${businessline.toLowerCase()}%`,
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

  async getBusinessLineId(
    businesslineid: number,
  ): Promise<BusinessLineDto | undefined> {
    try {
      const query = await this.businessLineRepository
        .createQueryBuilder('businessline')
        .where('businessline.businesslineid = :businesslineid', {
          businesslineid,
        })
        .getOne();

      return query?.toDto();
    } catch (error) {
      throw error;
    }
  }

  async getLastBusinessLineCode() {
    try {
      const query = await this.businessLineRepository
        .createQueryBuilder('businessline')
        .select('businessline.businesslinecode')
        .orderBy('businessline.businesslinecode', 'DESC')
        .getOne();

      return query;
    } catch (error) {
      throw error;
    }
  }

  async createBusinessLine(businessline: AddBusinessLineDto) {
    try {
      const query = this.businessLineRepository
        .createQueryBuilder('businessline')
        .insert()
        .into(BusinessLine)
        .values({
          businesslinecode: businessline.businesslinecode,
          businesslinedesc: businessline.businesslinedesc,
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

  async updateBusinessLine(
    businesslineid: number,
    businessline: UpdateBusinessLineDto,
  ) {
    try {
      const query = await this.businessLineRepository
        .createQueryBuilder()
        .update(BusinessLine)
        .set({
          businesslinecode: businessline.businesslinecode,
          businesslinedesc: businessline.businesslinedesc,
        })
        .where('businesslineid =:businesslineid', { businesslineid })
        .execute();

      return query;
    } catch (error) {
      throw error;
    }
  }

  async deleteBusinessline(businesslineid: number) {
    try {
      const query = await this.businessLineRepository
        .createQueryBuilder()
        .update(BusinessLine)
        .set({ isdelete: 'true' })
        .where('businesslineid =:businesslineid', { businesslineid })
        .execute();

      return query;
    } catch (error) {
      throw error;
    }
  }
}
