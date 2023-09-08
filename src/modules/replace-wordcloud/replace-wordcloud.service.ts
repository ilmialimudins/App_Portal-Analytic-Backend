import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ReplaceWordcloud } from './replace-wordcloud.entity';
import { Brackets, Repository } from 'typeorm';
import { ReplaceWordcloudDto } from './dto/replace-wordcloud.dto';
import { AddReplaceWordcloudDto } from './dto/add-replace-wordcloud.dto';
import { UpdateReplaceWordcloudDto } from './dto/update-replace-wordcloud.dto';

@Injectable()
export class ReplaceWordcloudService {
  constructor(
    @InjectRepository(ReplaceWordcloud)
    private replaceWordcloudRepository: Repository<ReplaceWordcloud>,
  ) {}

  async getAllReplaceWordcloud(
    page: number,
    pageSize: number,
  ): Promise<{ data: ReplaceWordcloudDto[]; total: number }> {
    try {
      const offset = (page - 1) * 1;

      const data = await this.replaceWordcloudRepository
        .createQueryBuilder('replacewordcloud')
        .leftJoin('replacewordcloud.mastercompanyees', 'mastercompanyees')
        .select([
          'replacewordcloud.original_text',
          'replacewordcloud.replace_text',
          'mastercompanyees.companyeesname',
          'replacewordcloud.tahun_survey',
        ])
        .where('replacewordcloud.isdelete = :isdelete', { isdelete: false })
        .orderBy('tahun_survey')
        .offset(offset)
        .limit(pageSize)
        .getRawMany();

      const total = await this.replaceWordcloudRepository
        .createQueryBuilder('replacewordcloud')
        .leftJoin('replacewordcloud.mastercompanyees', 'mastercompanyees')
        .select([
          'replacewordcloud.original_text',
          'replacewordcloud.replace_text',
          'mastercompanyees.companyeesname',
          'replacewordcloud.tahun_survey',
        ])
        .where('replacewordcloud.isdelete = :isdelete', { isdelete: false })
        .getCount();

      return { data, total };
    } catch (error) {
      throw error;
    }
  }

  async getAllReplaceWordcloudFilter(
    page: number,
    pageSize: number,
    companyname: string,
    tahun_survey: number,
  ): Promise<{ data: ReplaceWordcloudDto[]; total: number }> {
    try {
      const offset = (page - 1) * 1;

      const data = await this.replaceWordcloudRepository
        .createQueryBuilder('replacewordcloud')
        .leftJoin('replacewordcloud.mastercompanyees', 'mastercompanyees')
        .select([
          'replacewordcloud.original_text',
          'replacewordcloud.replace_text',
          'mastercompanyees.companyeesname',
          'replacewordcloud.tahun_survey',
        ])
        .where('replacewordcloud.isdelete = :isdelete', { isdelete: false })
        .andWhere('mastercompanyees.companyeesname = :companyname', {
          companyname,
        })
        .andWhere('replacewordcloud.tahun_survey = :tahun_survey', {
          tahun_survey,
        })
        .orderBy('tahun_survey')
        .offset(offset)
        .limit(pageSize)
        .getRawMany();

      const total = await this.replaceWordcloudRepository
        .createQueryBuilder('replacewordcloud')
        .leftJoin('replacewordcloud.mastercompanyees', 'mastercompanyees')
        .select([
          'replacewordcloud.original_text',
          'replacewordcloud.replace_text',
          'mastercompanyees.companyeesname',
          'replacewordcloud.tahun_survey',
        ])
        .where('replacewordcloud.isdelete = :isdelete', { isdelete: false })
        .andWhere('mastercompanyees.companyeesname = :companyname', {
          companyname,
        })
        .andWhere('replacewordcloud.tahun_survey = :tahun_survey', {
          tahun_survey,
        })
        .getCount();

      return { data, total };
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

  async checkOneReplaceWordcloud(replaceWordcloud: AddReplaceWordcloudDto) {
    try {
      const query = await this.replaceWordcloudRepository
        .createQueryBuilder('replacewordcloud')
        .where('replacewordcloud.original_text = :original_text', {
          original_text: replaceWordcloud.original_text,
        })
        .where('replacewordcloud.replace_text = :replace_text', {
          replace_text: replaceWordcloud.replace_text,
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

  async createReplaceWordcloud(replacewordcloud: AddReplaceWordcloudDto) {
    try {
      const query = await this.replaceWordcloudRepository
        .createQueryBuilder('replacewordcloud')
        .insert()
        .into(ReplaceWordcloud)
        .values({
          companyid: replacewordcloud.companyid,
          tahun_survey: replacewordcloud.tahun_survey,
          original_text: replacewordcloud.original_text,
          replace_text: replacewordcloud.replace_text,
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

  async updateReplaceWordcloud(
    uuid: string,
    replaceWordcloud: UpdateReplaceWordcloudDto,
  ) {
    try {
      const query = await this.replaceWordcloudRepository
        .createQueryBuilder()
        .update(ReplaceWordcloud)
        .set({
          original_text: replaceWordcloud.original_text,
          replace_text: replaceWordcloud.replace_text,
        })
        .where('uuid = :uuid', { uuid })
        .andWhere(
          new Brackets((qb) => {
            qb.where(
              'original_text != :original_text OR replace_text != :replace_text',
              {
                original_text: replaceWordcloud.original_text,
                replace_text: replaceWordcloud.replace_text,
              },
            );
          }),
        )
        .execute();

      return query;
    } catch (error) {
      throw error;
    }
  }

  async deleteReplaceWordcloud(uuid: string) {
    try {
      await this.replaceWordcloudRepository
        .createQueryBuilder()
        .update(ReplaceWordcloud)
        .set({ isdelete: 'true' })
        .where('uuid = :uuid', { uuid })
        .execute();

      return 'Data Berhasil Di Hapus';
    } catch (error) {
      throw error;
    }
  }
}
