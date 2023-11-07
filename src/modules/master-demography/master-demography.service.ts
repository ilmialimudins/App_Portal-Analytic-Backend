import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Demography } from './master-demography.entity';
import { Repository } from 'typeorm';
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
    page: number,
    take: number,
    demography?: string,
  ): Promise<{
    data: DemographyDto[];
    page: number;
    take: number;
    itemCount: number;
    pageCount: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
  }> {
    try {
      const offset = (page - 1) * take;

      let query = this.demographyRepository
        .createQueryBuilder('demography')
        .select([
          'demographyid',
          'demographydesc',
          'demographyalias',
          'urutanfilter',
        ]);

      if (demography) {
        query = query.where(
          'LOWER(demography.demographydesc) LIKE :demography',
          {
            demography: `%${demography.toLowerCase()}%`,
          },
        );
      }

      const data = await query
        .andWhere('demography.isdelete = :isdelete', { isdelete: false })
        .orderBy('urutanfilter')
        .offset(offset)
        .limit(take)
        .getRawMany();

      const itemCount = await query
        .andWhere('demography.isdelete = :isdelete', { isdelete: false })
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

  async getDemographyAlias(demographyid: number) {
    try {
      const query = this.demographyRepository
        .createQueryBuilder('demography')
        .select(['demographyid, demographydesc, urutanfilter, demographyalias'])
        .where('demography.demographyid = :demographyid', { demographyid })
        .andWhere('demography.desc = :desc', { desc: 'Non-Default' })
        .andWhere('demography.isdelete = :isdelete', { isdelete: false });

      return query;
    } catch (error) {
      throw error;
    }
  }

  async checkDuplicateDemographyAlias(demographyalias: string) {
    try {
      const query = await this.demographyRepository
        .createQueryBuilder('demography')
        .where('demography.demographyalias = :demographyalias', {
          demographyalias,
        })
        .getOne();

      return query;
    } catch (error) {
      throw error;
    }
  }

  async getDemographyId(
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
      const query = await this.demographyRepository
        .createQueryBuilder('demography')
        .insert()
        .into(Demography)
        .values({
          demographyalias: demography.demographyalias,
          desc: 'Non-Default',
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

  async updateDemography(
    demographyid: number,
    demography: UpdateDemographyDto,
  ) {
    try {
      const query = await this.demographyRepository
        .createQueryBuilder()
        .update(Demography)
        .set({
          demographyalias: demography.demographyalias,
        })
        .where('demographyid =:demographyid', { demographyid })
        .execute();

      return query;
    } catch (error) {
      throw error;
    }
  }

  async deleteDemography(demographyid: number) {
    try {
      const query = await this.demographyRepository
        .createQueryBuilder()
        .update(Demography)
        .set({ isdelete: 'true' })
        .where('demographyid = :demographyid', { demographyid })
        .execute();

      return query;
    } catch (error) {
      throw error;
    }
  }
}
