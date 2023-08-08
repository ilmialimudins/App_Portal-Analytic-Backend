import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BusinessLine } from './master-business-line.entity';
import { Repository } from 'typeorm';
import { PageOptionsDTO } from 'src/common/dto/page-options.dto';
import { PageDto } from 'src/common/dto/page.dto';
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
    pageOptions: PageOptionsDTO,
  ): Promise<PageDto<BusinessLineDto>> {
    try {
      const query = this.businessLineRepository
        .createQueryBuilder('businessline')
        .orderBy('businessline.businesslinedesc', pageOptions.order);

      const [items, pageMetaDto] = await query.paginate(pageOptions);

      return items.toPageDto(pageMetaDto);
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
