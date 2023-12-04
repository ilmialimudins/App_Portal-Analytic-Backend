import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BusinessLine } from './master-business-line.entity';
import { Repository } from 'typeorm';
import { BusinessLineDto } from './dto/master-business-line.dto';
import { AddBusinessLineDto } from './dto/add-master-business-line.dto';
import { UpdateBusinessLineDto } from './dto/update-master-business-line.dto';
import { Company } from '../master-company-ees/master-company-ees.entity';

@Injectable()
export class BusinessLineService {
  constructor(
    @InjectRepository(BusinessLine)
    private businessLineRepository: Repository<BusinessLine>,

    @InjectRepository(Company)
    private companyRepository: Repository<Company>,
  ) {}

  async getAllBusinessLine(
    page: number,
    take: number,
    businessline?: string,
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
      const company = await this.companyRepository
        .createQueryBuilder('company')
        .select('company.businesslineid')
        .getMany();

      const offset = (page - 1) * take;

      let query = this.businessLineRepository
        .createQueryBuilder('businessline')
        .select(['businesslineid', 'businesslinecode', 'businesslinedesc']);

      if (businessline) {
        query = query.where(
          'LOWER(businessline.businesslinedesc) LIKE :businessline',
          {
            businessline: `%${businessline.toLowerCase()}%`,
          },
        );
      }

      const data = await query
        .andWhere('businessline.isdelete = :isdelete', { isdelete: false })
        .orderBy('businessline.sourcecreatedmodifiedtime', 'DESC')
        .offset(offset)
        .limit(take)
        .getRawMany();

      const dataWithStatus = data.map((item) => ({
        ...item,
        status: company.find((c) => c.businesslineid === item.businesslineid)
          ? 'isUsed'
          : 'isNotUsed',
      }));

      const itemCount = await query
        .andWhere('businessline.isdelete = :isdelete', { isdelete: false })
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

  async checkDuplicateBusinessline(businessline: string) {
    try {
      const query = await this.businessLineRepository
        .createQueryBuilder('businessline')
        .where('businessline.businesslinedesc = :businessline', {
          businessline,
        })
        .andWhere('businessline.isdelete = :isdelete', { isdelete: false })
        .getOne();

      return query;
    } catch (error) {
      throw error;
    }
  }

  async getLastBusinessLineCode() {
    try {
      const query = await this.businessLineRepository
        .createQueryBuilder('businessline')
        .select('businessline.businesslinecode')
        .orderBy('businessline.businesslineid', 'DESC')
        .getOne();

      return query;
    } catch (error) {
      throw error;
    }
  }

  async createBusinessLine(businessline: AddBusinessLineDto) {
    try {
      const createNow = new Date(new Date().getTime() + 7 * 60 * 60 * 1000);

      const year = createNow.getFullYear();
      const month = createNow.getMonth() + 1;
      const date = createNow.getDate();

      const createdDate = parseInt(`${year}${month}${date}`);

      const query = this.businessLineRepository
        .createQueryBuilder('businessline')
        .insert()
        .into(BusinessLine)
        .values({
          businesslinecode: businessline.businesslinecode,
          businesslinedesc: businessline.businesslinedesc,
          createdby: businessline.createdby,
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
          updatedby: businessline.updatedby,
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
