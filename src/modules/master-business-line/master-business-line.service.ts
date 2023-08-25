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
    pageSize: number,
  ): Promise<{ data: BusinessLineDto[]; total: number }> {
    try {
      const offset = (page - 1) * pageSize;

      const data = await this.businessLineRepository
        .createQueryBuilder('businessline')
        .select(['businesslinecode', 'businesslinedesc'])
        .where('businessline.desc = :desc', { desc: false })
        .orderBy('businesslinecode')
        .offset(offset)
        .limit(pageSize)
        .getRawMany();

      const total = await this.businessLineRepository
        .createQueryBuilder('businessline')
        .select(['businesslinecode', 'businesslinedesc'])
        .where('businessline.desc = :desc', { desc: false })
        .getCount();

      return { data, total };
    } catch (error) {
      throw error;
    }
  }

  async getBusinessLineName(
    page: number,
    pageSize: number,
    businessline: string,
  ): Promise<{ data: BusinessLineDto[]; total: number }> {
    try {
      const offset = (page - 1) * pageSize;

      const data = await this.businessLineRepository
        .createQueryBuilder('businessline')
        .select(['businesslinecode', 'businesslinedesc'])
        .where('businessline.desc = :desc', { desc: false })
        .andWhere('businessline.businesslinedesc = :businessline', {
          businessline,
        })
        .orderBy('businesslinecode')
        .offset(offset)
        .limit(pageSize)
        .getRawMany();

      const total = await this.businessLineRepository
        .createQueryBuilder('businessline')
        .select(['businesslinecode', 'businesslinedesc'])
        .where('businessline.desc = :desc', { desc: false })
        .andWhere('businessline.businesslinedesc = :businessline', {
          businessline,
        })
        .getCount();

      return { data, total };
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

  async createBusinessLine(businessline: AddBusinessLineDto) {
    try {
      const query = this.businessLineRepository
        .createQueryBuilder('businessline')
        .insert()
        .into(BusinessLine)
        .values({
          businesslinecode: businessline.businesslinecode,
          businesslinedesc: businessline.businesslinedesc,
          desc: 'false',
          createdtime: new Date(),
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
        .createQueryBuilder('businessline')
        .update(BusinessLine)
        .set({
          businesslinecode: businessline.businesslinecode,
          businesslinedesc: businessline.businesslinedesc,
        })
        .where('businessline.businesslineid =:businesslineid', {
          businesslineid,
        })
        .execute();

      return query;
    } catch (error) {
      throw error;
    }
  }

  async deleteBusinessline(businesslineid: number) {
    try {
      const query = await this.businessLineRepository
        .createQueryBuilder('businessline')
        .update(BusinessLine)
        .set({ desc: 'true' })
        .where('businessline.businesslineid =:businesslineid', {
          businesslineid,
        })
        .execute();

      return query;
    } catch (error) {
      throw error;
    }
  }
}
