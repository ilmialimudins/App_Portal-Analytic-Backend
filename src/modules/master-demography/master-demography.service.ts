import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Demography } from './master-demography.entity';
import { Repository } from 'typeorm';
import { DemographyDto } from './dto/master-demography.dto';
import { AddDemographyDto } from './dto/add-master-demography.dto';
import { UpdateDemographyDto } from './dto/update-master-demography.dto';
import { UserInfoDTO } from '../duende-authentication/dto/userinfo.dto';

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
        .orderBy('urutanfilter', 'ASC')
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
        .select('demography.demographyalias')
        .andWhere('demography.isdelete = :isdelete', { isdelete: false })
        .getMany();

      const findDuplicate = query.filter((item) => {
        const alias = item.demographyalias.split('/');
        return alias.some((alias) => alias.trim() === demographyalias);
      });

      return findDuplicate;
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

  async createDemography(demography: AddDemographyDto, userinfo: UserInfoDTO) {
    try {
      const createNow = new Date(new Date().getTime() + 7 * 60 * 60 * 1000);

      const year = createNow.getFullYear();
      const month = createNow.getMonth() + 1;
      const date = createNow.getDate();

      const createdDate = parseInt(`${year}${month}${date}`);

      const query = await this.demographyRepository
        .createQueryBuilder('demography')
        .insert()
        .into(Demography)
        .values({
          demographycode: demography.demographycode,
          demographydesc: demography.demographydesc,
          demographyalias: demography.demographyalias,
          urutanfilter: demography.urutanfilter,
          desc: 'Non-Default',
          createdby: userinfo.fullname,
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

  async updateDemography(
    demographyid: number,
    demography: UpdateDemographyDto,
    userinfo: UserInfoDTO,
  ) {
    try {
      const query = await this.demographyRepository
        .createQueryBuilder()
        .update(Demography)
        .set({
          demographyalias: demography.demographyalias,
          updatedby: userinfo.fullname,
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
