import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ReplaceWordcloud } from './replace-wordcloud.entity';
import { Repository } from 'typeorm';
import { ReplaceWordcloudDto } from './dto/replace-wordcloud.dto';
import { AddReplaceWordcloudDto } from './dto/add-replace-wordcloud.dto';
import { UpdateReplaceWordcloudDto } from './dto/update-replace-wordcloud.dto';
import * as excel from 'exceljs';
import { addTable } from 'src/common/utils/addExcelTable';
import { v4 as uuidv4 } from 'uuid';
import { removeArrObj } from 'src/common/utils/checkDuplicate';
import { UserInfoDTO } from '../duende-authentication/dto/userinfo.dto';

@Injectable()
export class ReplaceWordcloudService {
  constructor(
    @InjectRepository(ReplaceWordcloud)
    private replaceWordcloudRepository: Repository<ReplaceWordcloud>,
  ) {}

  async getAllReplaceWordcloud(
    page: number,
    take: number,
    word: string,
  ): Promise<{
    data: ReplaceWordcloudDto[];
    page: number;
    take: number;
    itemCount: number;
    pageCount: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
  }> {
    try {
      const offset = (page - 1) * take;

      let query = this.replaceWordcloudRepository
        .createQueryBuilder('replacewordcloud')
        .leftJoin('replacewordcloud.company', 'company')
        .select([
          'id',
          'company.companyid',
          'replacewordcloud.original_text',
          'replacewordcloud.replace_text',
          'company.companyeesname',
          'replacewordcloud.uuid',
        ]);

      if (word) {
        query = query.where(
          'LOWER(replacewordcloud.original_text) LIKE :word',
          {
            word: `%${word.toLowerCase()}%`,
          },
        );
      }

      const data = await query
        .andWhere('replacewordcloud.isdelete = :isdelete', { isdelete: false })
        .orderBy('replacewordcloud.sourcecreatedmodifiedtime', 'DESC')
        .offset(offset)
        .limit(take)
        .getRawMany();

      const itemCount = await query
        .andWhere('replacewordcloud.isdelete = :isdelete', { isdelete: false })
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

  async getReplaceWordcloudId(
    uuid: string,
  ): Promise<ReplaceWordcloudDto | undefined> {
    try {
      const query = await this.replaceWordcloudRepository
        .createQueryBuilder('replacewordcloud')
        .where('replacewordcloud.uuid = :uuid', { uuid })
        .getOne();

      return query?.toDto();
    } catch (error) {
      throw error;
    }
  }

  async checkDuplicateReplaceWordCloud(original_text: string) {
    try {
      const query = await this.replaceWordcloudRepository
        .createQueryBuilder('replacewordcloud')
        .where('replacewordcloud.original_text = :original_text', {
          original_text: original_text,
        })
        .andWhere('replacewordcloud.isdelete = :isdelete', { isdelete: false })
        .getOne();

      return query;
    } catch (error) {
      throw error;
    }
  }

  async checkOneReplaceWordcloud(replaceWordcloud: AddReplaceWordcloudDto) {
    try {
      const query = await this.replaceWordcloudRepository
        .createQueryBuilder('replacewordcloud')
        .where('replacewordcloud.original_text = :original_text', {
          original_text: replaceWordcloud.original_text,
        })
        .andWhere('replacewordcloud.uuid != :uuid', {
          uuid: replaceWordcloud.uuid || '',
        })
        .getOne();

      return !!query;
    } catch (error) {
      throw error;
    }
  }

  async createReplaceWordcloud(
    replacewordcloud: AddReplaceWordcloudDto,
    userinfo: UserInfoDTO,
  ) {
    try {
      const createNow = new Date(new Date().getTime() + 7 * 60 * 60 * 1000);

      const year = createNow.getFullYear();
      const month = createNow.getMonth() + 1;
      const date = createNow.getDate();

      const createdDate = parseInt(`${year}${month}${date}`);

      const query = await this.replaceWordcloudRepository
        .createQueryBuilder('replacewordcloud')
        .insert()
        .into(ReplaceWordcloud)
        .values({
          uuid: uuidv4(),
          companyid: 475,
          tahun_survey: year,
          original_text: replacewordcloud.original_text,
          replace_text: replacewordcloud.replace_text,
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

  async updateReplaceWordcloud(
    uuid: string,
    replaceWordcloud: UpdateReplaceWordcloudDto,
    userinfo: UserInfoDTO,
  ) {
    try {
      const query = await this.replaceWordcloudRepository
        .createQueryBuilder()
        .update(ReplaceWordcloud)
        .set({
          original_text: replaceWordcloud.original_text,
          replace_text: replaceWordcloud.replace_text,
          updatedby: userinfo.fullname,
        })
        .where('uuid = :uuid', { uuid })
        .andWhere('original_text != :original_text', {
          original_text: replaceWordcloud.original_text,
        })
        .execute();

      return query;
    } catch (error) {
      throw error;
    }
  }

  async deleteReplaceWordcloud(uuid: string) {
    try {
      const query = await this.replaceWordcloudRepository
        .createQueryBuilder()
        .update(ReplaceWordcloud)
        .set({ isdelete: 'true' })
        .where('uuid = :uuid', { uuid })
        .execute();

      return query;
    } catch (error) {
      throw error;
    }
  }

  async createManyReplacewordcloud(
    replaceWordcloud: AddReplaceWordcloudDto[],
    userinfo: UserInfoDTO,
  ) {
    try {
      const createNow = new Date(new Date().getTime() + 7 * 60 * 60 * 1000);

      const year = createNow.getFullYear();
      const month = createNow.getMonth() + 1;
      const date = createNow.getDate();

      const createdDate = parseInt(`${year}${month}${date}`);

      const values = replaceWordcloud.map((item) => {
        return {
          uuid: uuidv4(),
          companyid: 475,
          tahun_survey: year,
          original_text: item.original_text,
          replace_text: item.replace_text,
          createdby: userinfo.fullname,
          isdelete: 'false',
          createdtime: createNow,
          createddate: createdDate,
          sourcecreatedmodifiedtime: createNow,
        };
      });

      const result = await this.replaceWordcloudRepository
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
    array: AddReplaceWordcloudDto[],
    params: AddReplaceWordcloudDto,
    index: number,
  ) {
    const arrayToFind = removeArrObj(array, index);
    return arrayToFind.findIndex((item: ReplaceWordcloud) => {
      return item.original_text === params.original_text;
    });
  }

  async checkManyDuplicateReplacewordcloud(
    replacewordcloud: AddReplaceWordcloudDto[],
  ) {
    try {
      const result = {
        anyDuplicate: false,
        countDuplicate: 0,
        duplicate: [] as AddReplaceWordcloudDto[],
      };

      const data = await Promise.all(
        replacewordcloud.map(async (item, index) => {
          const check = await this.checkOneReplaceWordcloud(item);
          const value = { ...item, isDuplicate: false };
          const getDuplicateIndex = this.checkJSONDuplicate(
            replacewordcloud,
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

  async generateExcelReplaceWordcloud() {
    try {
      const query = await this.replaceWordcloudRepository
        .createQueryBuilder('replacewordcloud')
        .leftJoin('replacewordcloud.company', 'company')
        .select([
          'replacewordcloud.id',
          'replacewordcloud.original_text',
          'replacewordcloud.replace_text',
          'company.companyeesname',
          'replacewordcloud.uuid',
        ])
        .where('replacewordcloud.isdelete = :isdelete', { isdelete: false })
        .getMany();

      const workbook = new excel.Workbook();
      const worksheet = workbook.addWorksheet('Replace Wordcloud Data');

      const headerTitle = ['Company Name', 'Original Text', 'Replacement Text'];
      const tableData = query.map((item) => ({
        'Company Name': item.company.companyeesname,
        'Original Text': item.original_text,
        'Replacement Text': item.replace_text,
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
