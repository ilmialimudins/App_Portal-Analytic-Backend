import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Stopwords } from './stopwords.entity';
import { Repository } from 'typeorm';
import { StopwordsDto } from './dto/stopwords.dto';
import { AddStopwordsDto } from './dto/add-stopwords.dto';
import { UpdateStopwordsDto } from './dto/update-stopwords.dto';

@Injectable()
export class StopwordsService {
  constructor(
    @InjectRepository(Stopwords)
    private stopwordsRepository: Repository<Stopwords>,
  ) {}

  async getAllStopwords(
    page: number,
    pageSize: number,
  ): Promise<{ data: StopwordsDto[]; total: number }> {
    try {
      const offset = (page - 1) * 1;

      const data = await this.stopwordsRepository
        .createQueryBuilder('stopwords')
        .leftJoin('stopwords.company', 'company')
        .select([
          'id',
          'stopwords.stopwords',
          'company.companyeesname',
          'stopwords.tahun_survey',
          'stopwords.uuid',
        ])
        .where('stopwords.isdelete = :isdelete', { isdelete: false })
        .orderBy('tahun_survey')
        .offset(offset)
        .limit(pageSize)
        .getRawMany();

      const total = await this.stopwordsRepository
        .createQueryBuilder('stopwords')
        .leftJoin('stopwords.company', 'company')
        .select([
          'id',
          'stopwords.stopwords',
          'company.companyeesname',
          'stopwords.tahun_survey',
          'stopwords.uuid',
        ])
        .where('stopwords.isdelete = :isdelete', { isdelete: false })
        .getCount();

      return { data, total };
    } catch (error) {
      throw error;
    }
  }

  async getStopwordsFilter(
    page: number,
    pageSize: number,
    companyname: string,
    tahun_survey: number,
  ): Promise<{ data: StopwordsDto[]; total: number }> {
    try {
      const offset = (page - 1) * 1;

      const data = await this.stopwordsRepository
        .createQueryBuilder('stopwords')
        .leftJoin('stopwords.company', 'company')
        .select([
          'id',
          'stopwords.stopwords',
          'company.companyeesname',
          'stopwords.tahun_survey',
          'stopwords.uuid',
        ])
        .where('stopwords.isdelete = :isdelete', { isdelete: false })
        .andWhere('company.companyeesname = :companyname', {
          companyname,
        })
        .andWhere('stopwords.tahun_survey = :tahun_survey', { tahun_survey })
        .orderBy('tahun_survey')
        .offset(offset)
        .limit(pageSize)
        .getRawMany();

      const total = await this.stopwordsRepository
        .createQueryBuilder('stopwords')
        .leftJoin('stopwords.company', 'company')
        .select([
          'id',
          'stopwords.stopwords',
          'company.companyeesname',
          'stopwords.tahun_survey',
          'stopwords.uuid',
        ])
        .where('stopwords.isdelete = :isdelete', { isdelete: false })
        .andWhere('company.companyeesname = :companyname', {
          companyname,
        })
        .andWhere('stopwords.tahun_survey = :tahun_survey', { tahun_survey })
        .getCount();

      return { data, total };
    } catch (error) {
      throw error;
    }
  }

  async getStopwordsId(uuid: string): Promise<StopwordsDto | undefined> {
    try {
      const query = await this.stopwordsRepository
        .createQueryBuilder('stopwords')
        .where('stopwords.uuid = :uuid', { uuid })
        .getOne();

      return query?.toDto();
    } catch (error) {
      throw error;
    }
  }

  async checkOneStopwords(stopwords: AddStopwordsDto) {
    try {
      const query = await this.stopwordsRepository
        .createQueryBuilder('stopwords')
        .where('stopwords.stopwords = :stopwords', {
          stopwords: stopwords.stopwords,
        })
        .andWhere('stopwords.uuid != :uuid', { uuid: stopwords.uuid || '' })
        .getOne();

      return !!query;
    } catch (error) {
      throw error;
    }
  }

  async createStopwords(stopwords: AddStopwordsDto) {
    try {
      const query = await this.stopwordsRepository
        .createQueryBuilder('stopwords')
        .insert()
        .into(Stopwords)
        .values({
          companyid: stopwords.companyid,
          stopwords: stopwords.stopwords,
          tahun_survey: stopwords.tahun_survey,
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

  async updateStopwords(uuid: string, stopwords: UpdateStopwordsDto) {
    try {
      const query = await this.stopwordsRepository
        .createQueryBuilder()
        .update(Stopwords)
        .set({
          stopwords: stopwords.stopwords,
        })
        .where('uuid = :uuid', { uuid })
        .andWhere('stopwords != :stopwords', { stopwords: stopwords.stopwords })
        .execute();

      return query;
    } catch (error) {
      throw error;
    }
  }

  async deleteStopwords(uuid: string) {
    try {
      await this.stopwordsRepository
        .createQueryBuilder()
        .update(Stopwords)
        .set({ isdelete: 'true' })
        .where('uuid = :uuid', { uuid })
        .execute();

      return `Data Berhasil Di Hapus`;
    } catch (error) {
      throw error;
    }
  }
}
