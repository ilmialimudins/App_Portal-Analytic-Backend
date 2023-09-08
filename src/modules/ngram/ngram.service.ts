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
    pageSize: number,
  ): Promise<{ data: NgramDto[]; total: number }> {
    try {
      const offset = (page - 1) * 1;

      const data = await this.NgramRepository.createQueryBuilder('ngram')
        .leftJoin('ngram.mastercompanyees', 'mastercompanyees')
        .select([
          'DISTINCT ngram.word',
          'mastercompanyees.companyeesname',
          'ngram.tahun_survey',
          'ngram.qcode',
        ])
        .where('ngram.isdelete = :isdelete', { isdelete: false })
        .orderBy('tahun_survey')
        .offset(offset)
        .limit(pageSize)
        .getRawMany();

      const total = await this.NgramRepository.createQueryBuilder('ngram')
        .leftJoin('ngram.mastercompanyees', 'mastercompanyees')
        .select([
          'DISTINCT ngram.word',
          'mastercompanyees.companyeesname',
          'ngram.tahun_survey',
          'ngram.qcode',
        ])
        .where('ngram.isdelete = :isdelete', { isdelete: false })
        .getCount();

      return { data, total };
    } catch (error) {
      throw error;
    }
  }

  async getAllNgramFilter(
    page: number,
    pageSize: number,
    companyname: string,
    tahun_survey: number,
  ): Promise<{ data: NgramDto[]; total: number }> {
    try {
      const offset = (page - 1) * 1;

      const data = await this.NgramRepository.createQueryBuilder('ngram')
        .leftJoin('ngram.mastercompanyees', 'mastercompanyees')
        .select([
          'DISTINCT ngram.word',
          'mastercompanyees.companyeesname',
          'ngram.tahun_survey',
          'ngram.qcode',
        ])
        .where('ngram.isdelete = :isdelete', { isdelete: false })
        .andWhere('mastercompanyees.companyeesname = :companyname', {
          companyname,
        })
        .andWhere('ngram.tahun_survey = :tahun_survey', { tahun_survey })
        .orderBy('tahun_survey')
        .offset(offset)
        .limit(pageSize)
        .getRawMany();

      const total = await this.NgramRepository.createQueryBuilder('ngram')
        .leftJoin('ngram.mastercompanyees', 'mastercompanyees')
        .select([
          'DISTINCT ngram.word',
          'mastercompanyees.companyeesname',
          'ngram.tahun_survey',
          'ngram.qcode',
        ])
        .where('ngram.isdelete = :isdelete', { isdelete: false })
        .andWhere('mastercompanyees.companyeesname = :companyname', {
          companyname,
        })
        .andWhere('ngram.tahun_survey = :tahun_survey', { tahun_survey })
        .getCount();

      return { data, total };
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
    pageSize: number,
    companyname: string,
    tahun_survey: number,
    qcode: string,
    word: string,
  ): Promise<{ data: NgramDto[]; total: number }> {
    try {
      const offset = (page - 1) * 1;

      const data = await this.NgramRepository.createQueryBuilder('ngram')
        .leftJoin('ngram.mastercompanyees', 'mastercompanyees')
        .select([
          'ngram.uuid',
          'mastercompanyees.companyeesname',
          'ngram.tahun_survey',
          'ngram.qcode',
          'ngram.word',
          'ngram.n',
          'ngram.ngram',
          'ngram.ngramfrequency',
        ])
        .where('ngram.isdelete = :isdelete', { isdelete: false })
        .andWhere('mastercompanyees.companyeesname = :companyname', {
          companyname,
        })
        .andWhere('ngram.tahun_survey = :tahun_survey', { tahun_survey })
        .andWhere('ngram.qcode = :qcode', { qcode })
        .andWhere('ngram.word = :word', { word })
        .orderBy('ngram.ngramfrequency', 'DESC')
        .offset(offset)
        .limit(pageSize)
        .getRawMany();

      const total = await this.NgramRepository.createQueryBuilder('ngram')
        .leftJoin('ngram.mastercompanyees', 'mastercompanyees')
        .select([
          'ngram.uuid',
          'mastercompanyees.companyeesname',
          'ngram.tahun_survey',
          'ngram.qcode',
          'ngram.word',
          'ngram.n',
          'ngram.ngram',
          'ngram.ngramfrequency',
        ])
        .where('ngram.isdelete = :isdelete', { isdelete: false })
        .andWhere('mastercompanyees.companyeesname = :companyname', {
          companyname,
        })
        .andWhere('ngram.tahun_survey = :tahun_survey', { tahun_survey })
        .andWhere('ngram.qcode = :qcode', { qcode })
        .andWhere('ngram.word = :word', { word })
        .getCount();

      return { data, total };
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
