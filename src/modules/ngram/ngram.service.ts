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

      const data = await this.NgramRepository.createQueryBuilder('ngram')
        .select([
          'id',
          'ngram.word',
          'company.companyeesname',
          'ngram.tahun_survey',
          'ngram.qcode',
        ])
        .leftJoin('ngram.company', 'company')
        .where('ngram.isdelete = :isdelete', { isdelete: false })
        .orderBy('tahun_survey')
        .offset(offset)
        .limit(take)
        .getRawMany();

      const itemCount = await this.NgramRepository.createQueryBuilder('ngram')
        .select([
          'id',
          'ngram.word',
          'company.companyeesname',
          'ngram.tahun_survey',
          'ngram.qcode',
        ])
        .leftJoin('ngram.company', 'company')
        .where('ngram.isdelete = :isdelete', { isdelete: false })
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

  async getAllNgramFilter(
    page: number,
    take: number,
    companyname: string,
    tahun_survey: number,
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

      const data = await this.NgramRepository.createQueryBuilder('ngram')
        .leftJoin('ngram.company', 'company')
        .select([
          'id',
          'ngram.word',
          'company.companyeesname',
          'ngram.tahun_survey',
          'ngram.qcode',
        ])
        .where('ngram.isdelete = :isdelete', { isdelete: false })
        .andWhere('company.companyeesname = :companyname', { companyname })
        .andWhere('ngram.tahun_survey = :tahun_survey', { tahun_survey })
        .orderBy('tahun_survey')
        .offset(offset)
        .limit(take)
        .getRawMany();

      const itemCount = await this.NgramRepository.createQueryBuilder('ngram')
        .leftJoin('ngram.company', 'company')
        .select([
          'id',
          'ngram.word',
          'company.companyeesname',
          'ngram.tahun_survey',
          'ngram.qcode',
        ])
        .where('ngram.isdelete = :isdelete', { isdelete: false })
        .andWhere('company.companyeesname = :companyname', {
          companyname,
        })
        .andWhere('ngram.tahun_survey = :tahun_survey', { tahun_survey })
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

  async getNgramByWord(
    page: number,
    take: number,
    companyname: string,
    tahun_survey: number,
    qcode: string,
    word: string,
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

      const data = await this.NgramRepository.createQueryBuilder('ngram')
        .leftJoin('ngram.company', 'company')
        .select([
          'id',
          'ngram.uuid',
          'company.companyeesname',
          'ngram.tahun_survey',
          'ngram.qcode',
          'ngram.word',
          'ngram.n',
          'ngram.ngram',
          'ngram.ngramfrequency',
        ])
        .where('ngram.isdelete = :isdelete', { isdelete: false })
        .andWhere('company.companyeesname = :companyname', { companyname })
        .andWhere('ngram.tahun_survey = :tahun_survey', { tahun_survey })
        .andWhere('ngram.qcode = :qcode', { qcode })
        .andWhere('ngram.word = :word', { word })
        .orderBy('ngram.ngramfrequency', 'DESC')
        .offset(offset)
        .limit(take)
        .getRawMany();

      const itemCount = await this.NgramRepository.createQueryBuilder('ngram')
        .leftJoin('ngram.company', 'company')
        .select([
          'id',
          'ngram.uuid',
          'company.companyeesname',
          'ngram.tahun_survey',
          'ngram.qcode',
          'ngram.word',
          'ngram.n',
          'ngram.ngram',
          'ngram.ngramfrequency',
        ])
        .where('ngram.isdelete = :isdelete', { isdelete: false })
        .andWhere('company.companyeesname = :companyname', { companyname })
        .andWhere('ngram.tahun_survey = :tahun_survey', { tahun_survey })
        .andWhere('ngram.qcode = :qcode', { qcode })
        .andWhere('ngram.word = :word', { word })
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

  async updateNgram(uuid: string, ngram: UpdateNgramDto) {
    try {
      const query = await this.NgramRepository.createQueryBuilder()
        .update(Ngram)
        .set({
          ngram: ngram.ngram,
          n: ngram.n,
          ngramfrequency: ngram.ngramfrequency,
        })
        .where('uuid = :uuid', { uuid })
        .execute();

      return query;
    } catch (error) {
      throw error;
    }
  }

  async deleteNgram(uuid: string) {
    try {
      await this.NgramRepository.createQueryBuilder()
        .update(Ngram)
        .set({ isdelete: 'true' })
        .where('uuid = :uuid', { uuid })
        .execute();

      return 'Data Berhasil Di Hapus';
    } catch (error) {
      throw error;
    }
  }
}
