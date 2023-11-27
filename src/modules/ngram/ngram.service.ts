import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Ngram } from './ngram.entity';
import { Repository } from 'typeorm';
import { NgramDto } from './dto/ngram.dto';
import { UpdateNgramDto } from './dto/update-ngram.dto';

@Injectable()
export class NgramService {
  constructor(
    @InjectRepository(Ngram)
    private NgramRepository: Repository<Ngram>,
  ) {}

  async getAllNgram(
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
        .andWhere('ngram.isdelete = :isdelete', { isdelete: false })
        .orderBy('tahun_survey', 'DESC')
        .offset(offset)
        .limit(take)
        .getRawMany();

      const itemCount = await query
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

  async getWordFor() {
    try {
      const query = await this.NgramRepository.createQueryBuilder('ngram')
        .leftJoin('ngram.word', 'word')
        .leftJoin('ngram.qcode', 'qcode')
        .select(['qcode.qcode', 'ngram.wordid', 'word.word'])
        .where('qcode.qcodeid = 134')
        .distinct(true)
        .orderBy('word.word', 'ASC')
        .getRawMany();

      return query;
    } catch (error) {
      throw error;
    }
  }

  async getWordUor() {
    try {
      const query = await this.NgramRepository.createQueryBuilder('ngram')
        .leftJoin('ngram.word', 'word')
        .leftJoin('ngram.qcode', 'qcode')
        .select(['qcode.qcode', 'ngram.wordid', 'word.word'])
        .where('qcode.qcodeid = 90')
        .distinct(true)
        .orderBy('word.word', 'ASC')
        .getRawMany();

      return query;
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

  async updateNgram(uuid: string, ngram: UpdateNgramDto) {
    try {
      const findNgram = await this.NgramRepository.findOne({ where: { uuid } });

      if (!findNgram) {
        return { message: 'Data yang ingin diupdate tidak ditemukan.' };
      }

      if (findNgram.ngram === ngram.ngram) {
        return {
          message: 'Data yang ingin diupdate sudah memiliki nilai yang sama.',
        };
      }

      const query = await this.NgramRepository.createQueryBuilder()
        .update(Ngram)
        .set({
          qcodeid: ngram.qcodeid,
          wordid: ngram.wordid,
          n: ngram.n,
          ngram: ngram.ngram,
          ngramfrequency: ngram.ngramfrequency,
        })
        .where('uuid = :uuid', { uuid })
        .andWhere('ngram != :ngram', { ngram: ngram.ngram })
        .execute();

      return query;
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
