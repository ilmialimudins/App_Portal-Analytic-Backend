import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Demography } from './master-demography.entity';
import { Repository } from 'typeorm';
import { PageOptionsDTO } from 'src/common/dto/page-options.dto';
import { PageDto } from 'src/common/dto/page.dto';
import { DemographyDto } from './dto/master-demography.dto';
import { AddDemographyDto } from './dto/add-master-demography.dto';
import { UpdateDemographyDto } from './dto/update-master-demography.dto';

@Injectable()
export class DemographyService {
  constructor(
    @InjectRepository(Demography)
    private demographyRepository: Repository<Demography>,
  ) {}

  async getAllDemography(
    pageOptions: PageOptionsDTO,
  ): Promise<PageDto<DemographyDto>> {
    try {
      const query = this.demographyRepository
        .createQueryBuilder('demography')
        .orderBy('demography.urutanfilter', pageOptions.order);

      const [items, pageMetaDto] = await query.paginate(pageOptions);

      return items.toPageDto(pageMetaDto);
    } catch (error) {
      throw error;
    }
  }

  async getDemographyById(
    demographyid: number,
  ): Promise<DemographyDto | undefined> {
    try {
      const query = await this.demographyRepository
        .createQueryBuilder('demography')
        .where('demography.demographyid = :demographyid', { demographyid })
        .getOne();

      return query?.toDto();
    } catch (error) {
      throw error;
    }
  }

  async createDemography(demography: AddDemographyDto) {
    try {
      const query = this.demographyRepository
        .createQueryBuilder('demography')
        .insert()
        .into(Demography)
        .values({
          demographycode: demography.demographycode,
          demographydesc: demography.demographydesc,
          demographyalias: demography.demographyalias,
          urutanfilter: demography.urutanfilter,
          desc: 'false',
        })
        .execute();

      return query;
    } catch (error) {
      throw error;
    }
  }

  async updateDemography(
    demographyid: number,
    demography: UpdateDemographyDto,
  ) {
    try {
      const query = await this.demographyRepository
        .createQueryBuilder('demography')
        .update(Demography)
        .set({
          demographyalias: demography.demographyalias,
        })
        .where('demography.demographyid =:demographyid', { demographyid })
        .execute();

      return query;
    } catch (error) {
      throw error;
    }
  }

  async deleteDemography(demographyid: number) {
    try {
      const query = await this.demographyRepository
        .createQueryBuilder('Demography')
        .update(Demography)
        .set({ desc: 'true' })
        .where('demography.demographyid = :demographyid', { demographyid })
        .execute();

      return query;
    } catch (error) {
      throw error;
    }
  }
}
