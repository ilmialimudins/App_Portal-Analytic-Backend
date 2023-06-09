import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PredEngagementValue } from './pred-engagement-value.entity';
import { PageOptionsDTO } from 'src/common/dto/page-options.dto';
import { PageDto } from 'src/common/dto/page.dto';
import { PredEngagementValueDto } from './dto/pred-engagement-value.dto';
import { GetByIdDto } from 'src/common/dto/get-by-id';
import { AddPredEngagamentValueDto } from './dto/add-pred-engagement-value.dto';
import { GetByDemography } from './dto/get-by-demography';

@Injectable()
export class PredEngagamentValueService {
  constructor(
    @InjectRepository(PredEngagementValue)
    private factorRepository: Repository<PredEngagementValue>,
  ) {}

  async getAllPredEngagementValues(
    pageOptions: PageOptionsDTO,
  ): Promise<PageDto<PredEngagementValueDto>> {
    try {
      const query = this.factorRepository
        .createQueryBuilder('pred-engagement-value')
        .orderBy('pred-engagement-value.id', pageOptions.order);

      const [items, pageMetaDto] = await query.paginate(pageOptions);

      return items.toPageDto(pageMetaDto);
    } catch (error) {
      throw error;
    }
  }

  async getPredEngagementValueById(
    id: GetByIdDto,
  ): Promise<PredEngagementValueDto | undefined> {
    try {
      const query = await this.factorRepository
        .createQueryBuilder('pred-engagement-value')
        .where('pred-engagement-value.id = :id', { id: id.id })
        .getOne();
      return query?.toDto();
    } catch (error) {
      throw error;
    }
  }

  async getPredEngagementValueByDemography(
    pageOptions: PageOptionsDTO,
    demography: GetByDemography,
  ): Promise<PageDto<PredEngagementValueDto>> {
    try {
      const query = this.factorRepository
        .createQueryBuilder('pred-engagement-value')
        .where('pred-engagement-value.demography = :demography', {
          demography: demography.demography,
        })
        .orderBy('pred-engagement-value.id', pageOptions.order);

      const [items, pageMetaDto] = await query.paginate(pageOptions);

      return items.toPageDto(pageMetaDto);
    } catch (error) {
      throw error;
    }
  }

  async addPredEngagementValue(predEngagementValue: AddPredEngagamentValueDto) {
    try {
      const query = await this.factorRepository
        .createQueryBuilder('pred-engagement-value')
        .insert()
        .into(PredEngagementValue)
        .values({
          demography: predEngagementValue.demography,
          d_companyid: predEngagementValue.d_companyid,
        })
        .execute();
      return query;
    } catch (error) {
      throw error;
    }
  }
}
