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
    companyid: number,
    wordid: number,
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
        ]);

      if (year && companyid && wordid) {
        query = query
          .where('company.companyid = :companyid', { companyid })
          .andWhere('ngram.tahun_survey = :year', { year })
          .andWhere('word.wordid = :wordid', { wordid });
      } else if (year && companyid) {
        query = query
          .where('company.companyid = :companyid', { companyid })
          .andWhere('ngram.tahun_survey = :year', { year });
      } else if (year) {
        query = query.where('ngram.tahun_survey = :year', { year });
      } else if (companyid) {
        query = query.where('company.companyid = :companyid', { companyid });
      } else if (wordid) {
        query = query.where('word.wordid = :wordid', { wordid });
      }

      const data = await query
        .andWhere('ngram.qcode = 134')
        .andWhere('ngram.isdelete = :isdelete', { isdelete: false })
        .orderBy('tahun_survey', 'DESC')
        .offset(offset)
        .limit(take)
        .getRawMany();

      const itemCount = await query
        .andWhere('ngram.qcode = 134')
        .andWhere('ngram.isdelete = :isdelete', { isdelete: false })
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

  async getAllNgramUOR(
    page: number,
    take: number,
    year: number,
    companyid: number,
    wordid: number,
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
        ]);

      if (year && companyid && wordid) {
        query = query
          .where('company.companyid = :companyid', { companyid })
          .andWhere('ngram.tahun_survey = :year', { year })
          .andWhere('word.wordid = :wordid', { wordid });
      } else if (year && companyid) {
        query = query
          .where('company.companyid = :companyid', { companyid })
          .andWhere('ngram.tahun_survey = :year', { year });
      } else if (year) {
        query = query.where('ngram.tahun_survey = :year', { year });
      } else if (companyid) {
        query = query.where('company.companyid = :companyid', { companyid });
      } else if (wordid) {
        query = query.where('word.wordid = :wordid', { wordid });
      }

      const data = await query
        .andWhere('ngram.qcode = 90')
        .andWhere('ngram.isdelete = :isdelete', { isdelete: false })
        .orderBy('tahun_survey', 'DESC')
        .offset(offset)
        .limit(take)
        .getRawMany();

      const itemCount = await query
        .andWhere('ngram.qcode = 90')
        .andWhere('ngram.isdelete = :isdelete', { isdelete: false })
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
        .where('ngram.ngram = :ngram', { ngram })
        .andWhere('ngram.isdelete = :isdelete', { isdelete: false })
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
