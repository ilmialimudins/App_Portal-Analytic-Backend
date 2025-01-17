import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Ngram } from './ngram.entity';
import { Repository } from 'typeorm';
import { NgramDto } from './dto/ngram.dto';
import { UpdateNgramDto } from './dto/update-ngram.dto';
import { UserInfoDTO } from '../duende-authentication/dto/userinfo.dto';

@Injectable()
export class NgramService {
  constructor(
    @InjectRepository(Ngram)
    private NgramRepository: Repository<Ngram>,
  ) {}

  async getAllNgramFOR(
    page: number,
    take: number,
    year: number,
    company: number,
    word: number,
  ): Promise<{
    data: NgramDto[];
    page: number;
    take: number;
    itemCount: number;
    pageCount: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
  }> {
    try {
      const offset = (page - 1) * take;

      let query = this.NgramRepository.createQueryBuilder('ngram')
        .leftJoin('ngram.company', 'company')
        .leftJoin('ngram.word', 'word')
        .leftJoin('ngram.qcode', 'qcode')
        .select([
          'ngram.id',
          'ngram.uuid',
          'company.companyid',
          'qcode.qcodeid',
          'word.wordid',
          'qcode.qcode',
          'word.word',
          'ngram.n',
          'ngram.ngram',
          'ngram.ngramfrequency',
          'company.companyeesname',
          'ngram.tahun_survey',
        ])
        .where('ngram.isdelete IN (:...isdeleteValues)', {
          isdeleteValues: ['false', 'merge'],
        });

      if (year && company && word) {
        query = query
          .andWhere('company.companyid = :company', { company })
          .andWhere('ngram.tahun_survey = :year', { year })
          .andWhere('word.wordid = :word', { word });
      } else if (year && company) {
        query = query
          .where('company.companyid = :company', { company })
          .andWhere('ngram.tahun_survey = :year', { year });
      } else if (year) {
        query = query.andWhere('ngram.tahun_survey = :year', { year });
      } else if (company) {
        query = query.andWhere('company.companyid = :company', { company });
      } else if (word) {
        query = query.andWhere('word.wordid = :word', { word });
      }

      const data = await query
        .andWhere('ngram.qcode = 134')
        .orderBy('ngram.tahun_survey', 'DESC')
        .offset(offset)
        .limit(take)
        .getRawMany();

      const itemCount = await query.andWhere('ngram.qcode = 134').getCount();

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

  async getAllNgramUOR(
    page: number,
    take: number,
    year: number,
    company: number,
    word: number,
  ): Promise<{
    data: NgramDto[];
    page: number;
    take: number;
    itemCount: number;
    pageCount: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
  }> {
    try {
      const offset = (page - 1) * take;

      let query = this.NgramRepository.createQueryBuilder('ngram')
        .leftJoin('ngram.company', 'company')
        .leftJoin('ngram.word', 'word')
        .leftJoin('ngram.qcode', 'qcode')
        .select([
          'id',
          'uuid',
          'company.companyid',
          'qcode.qcodeid',
          'word.wordid',
          'qcode.qcode',
          'word.word',
          'ngram.n',
          'ngram.ngram',
          'ngram.ngramfrequency',
          'company.companyeesname',
          'ngram.tahun_survey',
        ])
        .where('ngram.isdelete IN (:...isdeleteValues)', {
          isdeleteValues: ['false', 'merge'],
        });

      if (year && company && word) {
        query = query
          .andWhere('company.companyid = :company', { company })
          .andWhere('ngram.tahun_survey = :year', { year })
          .andWhere('word.wordid = :word', { word });
      } else if (year && company) {
        query = query
          .where('company.companyid = :company', { company })
          .andWhere('ngram.tahun_survey = :year', { year });
      } else if (year) {
        query = query.andWhere('ngram.tahun_survey = :year', { year });
      } else if (company) {
        query = query.andWhere('company.companyid = :company', { company });
      } else if (word) {
        query = query.andWhere('word.wordid = :word', { word });
      }

      const data = await query
        .andWhere('ngram.qcode = 90')
        .orderBy('tahun_survey', 'DESC')
        .offset(offset)
        .limit(take)
        .getRawMany();

      const itemCount = await query.andWhere('ngram.qcode = 90').getCount();

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

  async getNgramId(uuid: string): Promise<NgramDto | undefined> {
    try {
      const query = await this.NgramRepository.createQueryBuilder('ngram')
        .where('ngram.uuid = :uuid', { uuid })
        .getOne();

      return query?.toDto();
    } catch (error) {
      throw error;
    }
  }

  async checkDuplicateNgram(ngram: string) {
    try {
      const query = await this.NgramRepository.createQueryBuilder('ngram')
        .where('ngram.isdelete IN (:...isdeleteValues)', {
          isdeleteValues: ['false', 'merge'],
        })
        .andWhere('ngram.ngram = :ngram', { ngram })
        .getOne();

      return query;
    } catch (error) {
      throw error;
    }
  }

  async updateNgram(
    uuid: string,
    ngram: UpdateNgramDto,
    userinfo: UserInfoDTO,
  ) {
    try {
      const findNgram = await this.NgramRepository.find({
        where: { ngram: ngram.ngram },
      });
      const findNgramFrequency = await this.NgramRepository.findOne({
        where: { uuid: uuid },
      });
      const ngramfrequency = findNgramFrequency
        ? findNgramFrequency.ngramfrequency
        : 0;
      const hasMerge = findNgram.find((n) => n.isdelete === 'merge');

      let query = this.NgramRepository.createQueryBuilder()
        .update(Ngram)
        .set({
          ngram: ngram.ngram,
          updatedby: userinfo.fullname,
        })
        .where('uuid = :uuid', { uuid });

      if (!hasMerge) {
        if (findNgram.length === 0) {
          query.execute();
          return 'Ngram Berhasil Di Update';
        } else {
          await Promise.all(
            findNgram
              .filter((findNgram) => findNgram.isdelete === 'false')
              .map(async (findNgram) => {
                const mergeFrequency =
                  (findNgram.ngramfrequency || 0) + ngramfrequency;

                query = query.set({
                  ngram: ngram.ngram,
                  ngramfrequency: mergeFrequency,
                  isdelete: 'merge',
                  updatedby: userinfo.fullname,
                });

                await query.execute();

                await this.NgramRepository.createQueryBuilder()
                  .update(Ngram)
                  .set({ ngramfrequency: mergeFrequency, isdelete: 'merge' })
                  .where('uuid = :uuid', { uuid: findNgram.uuid })
                  .execute();
              }),
          );
        }
      } else {
        const mergeFrequency = (hasMerge.ngramfrequency || 0) + ngramfrequency;

        query = query.set({
          ngram: ngram.ngram,
          ngramfrequency: mergeFrequency,
          isdelete: 'merge',
          updatedby: userinfo.fullname,
        });
        await query.execute();

        await this.NgramRepository.createQueryBuilder()
          .update(Ngram)
          .set({ ngramfrequency: mergeFrequency })
          .where('ngram = :ngram', { ngram: ngram.ngram })
          .execute();
      }
      return 'Ngram Frequency Has Been Merge';
    } catch (error) {
      throw error;
    }
  }

  async deleteNgram(uuid: string) {
    try {
      const query = await this.NgramRepository.createQueryBuilder()
        .update(Ngram)
        .set({ isdelete: 'true' })
        .where('uuid = :uuid', { uuid })
        .execute();

      return query;
    } catch (error) {
      throw error;
    }
  }
}
