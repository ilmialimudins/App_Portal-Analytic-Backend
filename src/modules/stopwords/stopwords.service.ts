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
import { removeArrObj } from 'src/common/utils/checkDuplicate';

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
          'stopwords.uuid',
        ]);

      if (word) {
        query = query.where('LOWER(stopwords.stopwords) LIKE :word', {
          word: `%${word.toLowerCase()}%`,
        });
      }

      const data = await query
        .andWhere('stopwords.isdelete = :isdelete', { isdelete: false })
        .orderBy('stopwords.sourcecreatedmodifiedtime', 'DESC')
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
        .andWhere('stopwords.isdelete = :isdelete', { isdelete: false })
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
      const query = await this.stopwordsRepository
        .createQueryBuilder()
        .update(Stopwords)
        .set({ isdelete: 'true' })
        .where('uuid = :uuid', { uuid })
        .execute();

      return query;
    } catch (error) {
      throw error;
    }
  }

  async createManyStopwords(stopwords: AddStopwordsDto[]) {
    try {
      const nowDate = new Date();
      const nowYear = nowDate.getFullYear();

      const values = stopwords.map((item) => {
        return {
          uuid: uuidv4(),
          companyid: 475,
          stopwords: item.stopwords,
          tahun_survey: nowYear,
          isdelete: 'false',
          createdtime: new Date(),
          sourcecreatedmodifiedtime: new Date(),
        };
      });

      const result = await this.stopwordsRepository
        .createQueryBuilder()
        .insert()
        .values([...values])
        .execute();

      return { insertedRowCount: result.identifiers.length };
    } catch (error) {
      throw error;
    }
  }

  private checkJSONDuplicate(
    array: AddStopwordsDto[],
    params: AddStopwordsDto,
    index: number,
  ) {
    const arrayToFind = removeArrObj(array, index);
    return arrayToFind.findIndex((item: Stopwords) => {
      return item.stopwords === params.stopwords;
    });
  }

  async checkManyDuplicateStopwords(stopwords: AddStopwordsDto[]) {
    try {
      const result = {
        anyDuplicate: false,
        countDuplicate: 0,
        duplicate: [] as AddStopwordsDto[],
      };
      const data = await Promise.all(
        stopwords.map(async (item, index) => {
          const check = await this.checkOneStopwords(item);
          const value = { ...item, isDuplicate: false };
          const getDuplicateIndex = this.checkJSONDuplicate(
            stopwords,
            item,
            index,
          );

          if (getDuplicateIndex > -1 || check) {
            result.anyDuplicate = true;
            result.countDuplicate++;
            result.duplicate.push(item);
            value.isDuplicate = true;
          }

          return value;
        }),
      );

      return { ...result, data };
    } catch (error) {
      throw error;
    }
  }

  async generateExcelStopwords() {
    try {
      const query = await this.stopwordsRepository
        .createQueryBuilder('stopwords')
        .leftJoin('stopwords.company', 'company')
        .select([
          'stopwords.id',
          'company.companyid',
          'company.companyeesname',
          'stopwords.stopwords',
          'stopwords.uuid',
        ])
        .where('stopwords.isdelete = :isdelete', { isdelete: false })
        .orderBy('tahun_survey', 'DESC')
        .getMany();

      const workbook = new excel.Workbook();
      const worksheet = workbook.addWorksheet('Stopwords Data');

      const headerTitle = ['Company Name', 'Stopwords'];
      const tableData = query.map((item) => ({
        'Company Name': item.company.companyeesname,
        Stopwords: item.stopwords,
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
