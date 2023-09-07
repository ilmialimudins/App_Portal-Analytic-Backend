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
    pageSize: number,
  ): Promise<{ data: DemographyDto[]; total: number }> {
    try {
      const offset = (page - 1) * pageSize;

      const data = await this.demographyRepository
        .createQueryBuilder('demography')
        .select(['demographydesc', 'demographyalias', 'urutanfilter'])
        .where('demography.isdelete = :isdelete', { isdelete: false })
        .orderBy('urutanfilter')
        .offset(offset)
        .limit(pageSize)
        .getRawMany();

      const total = await this.demographyRepository
        .createQueryBuilder('demography')
        .select(['demographydesc', 'demographyalias', 'urutanfilter'])
        .where('demography.isdelete = :isdelete', { isdelete: false })
        .getCount();

      return { data, total };
    } catch (error) {
      throw error;
    }
  }

  async getDemographyName(
    page: number,
    pageSize: number,
    demography: string,
  ): Promise<{ data: DemographyDto[]; total: number }> {
    try {
      const offset = (page - 1) * pageSize;

      const data = await this.demographyRepository
        .createQueryBuilder('demography')
        .select(['demographydesc', 'demographyalias', 'urutanfilter'])
        .where('demography.isdelete = :isdelete', { isdelete: false })
        .andWhere('demography.demographydesc = :demography', { demography })
        .orderBy('urutanfilter')
        .offset(offset)
        .limit(pageSize)
        .getRawMany();

      const total = await this.demographyRepository
        .createQueryBuilder('demography')
        .select(['demographydesc', 'demographyalias', 'urutanfilter'])
        .where('demography.isdelete = :isdelete', { isdelete: false })
        .andWhere('demography.demographydesc = :demography', { demography })
        .getCount();

      return { data, total };
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
          demographycode: demography.demographycode,
          demographydesc: demography.demographydesc,
          demographyalias: demography.demographyalias,
          urutanfilter: demography.urutanfilter,
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
