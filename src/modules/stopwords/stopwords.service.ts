import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Stopwords } from './stopwords.entity';
import { Repository } from 'typeorm';
import { StopwordsDto } from './dto/stopwords.dto';
import { AddStopwordsDto } from './dto/add-stopwords.dto';
import { UpdateStopwordsDto } from './dto/update-stopwords.dto';
import * as excel from 'exceljs';
import { addTable } from 'src/common/utils/addExcelTable';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class StopwordsService {
  constructor(
    @InjectRepository(Stopwords)
    private stopwordsRepository: Repository<Stopwords>,
  ) {}

  async getAllStopwords(
    page: number,
    take: number,
    word: string,
  ): Promise<{
    data: StopwordsDto[];
    page: number;
    take: number;
    itemCount: number;
    pageCount: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
  }> {
    try {
      const offset = (page - 1) * take;

      let query = this.stopwordsRepository
        .createQueryBuilder('stopwords')
        .leftJoin('stopwords.company', 'company')
        .select([
          'id',
          'company.companyid',
          'stopwords.stopwords',
          'company.companyeesname',
          'stopwords.tahun_survey',
          'stopwords.uuid',
        ]);

      if (word) {
        query = query.where('LOWER(stopwords.stopwords) LIKE :word', {
          word: `%${word.toLowerCase()}%`,
        });
      }

      const data = await query
        .andWhere('stopwords.isdelete = :isdelete', { isdelete: false })
        .orderBy('tahun_survey')
        .offset(offset)
        .limit(take)
        .getRawMany();

      const itemCount = await query
        .andWhere('stopwords.isdelete = :isdelete', { isdelete: false })
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

  async checkDuplicateStopwords(stopword: string) {
    try {
      const query = await this.stopwordsRepository
        .createQueryBuilder('stopwords')
        .where('stopwords.stopwords = :stopword', { stopword })
        .getOne();

      return query;
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
      const nowDate = new Date();
      const nowYear = nowDate.getFullYear();

      const query = await this.stopwordsRepository
        .createQueryBuilder('stopwords')
        .insert()
        .into(Stopwords)
        .values({
          uuid: uuidv4(),
          companyid: 475,
          stopwords: stopwords.stopwords,
          tahun_survey: nowYear,
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

  async generateExcelStopwords(companyname: string, tahun_survey: number) {
    try {
      const query = await this.stopwordsRepository
        .createQueryBuilder('stopwords')
        .leftJoin('stopwords.company', 'company')
        .select([
          'stopwords.stopwords',
          'company.companyeesname',
          'stopwords.tahun_survey',
          'stopwords.uuid',
        ])
        .where('stopwords.isdelete = :isdelete', { isdelete: false })
        .andWhere('company.companyeesname = :companyname', { companyname })
        .andWhere('stopwords.tahun_survey = :tahun_survey', { tahun_survey })
        .orderBy('tahun_survey')
        .getMany();

      const workbook = new excel.Workbook();
      const worksheet = workbook.addWorksheet('Stopwords Data');

      const headerTitle = ['Stopwords', 'Company Name', 'Tahun Survey'];
      const tableData = query.map((item) => ({
        Stopwords: item.stopwords,
        'Company Name': item.company.companyeesname,
        'Tahun Survey': item.tahun_survey,
      }));

      addTable(
        {
          columnStart: 'A',
          rowHeaderNum: 1,
          rowDataNum: 2,
          headerTitle: headerTitle,
          tableData: tableData,
        },
        worksheet,
      );

      return workbook;
    } catch (error) {
      throw error;
    }
  }
}
