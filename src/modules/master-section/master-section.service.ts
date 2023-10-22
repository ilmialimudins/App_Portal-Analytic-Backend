import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MasterSection } from './master-section.entity';
import { Repository } from 'typeorm';
import { MasterSectionDto } from './dto/master-section.dto';
import { AddMasterSectionDto } from './dto/add-master-section.dto';
import { UpdateMasterSectionDto } from './dto/update-master-section.dto';

@Injectable()
export class MasterSectionService {
  constructor(
    @InjectRepository(MasterSection)
    private masterSectionRepository: Repository<MasterSection>,
  ) {}

  async getAllMasterSection(
    page: number,
    take: number,
  ): Promise<{
    data: MasterSectionDto[];
    page: number;
    take: number;
    itemCount: number;
    pageCount: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
  }> {
    try {
      const offset = (page - 1) * take;

      const data = await this.masterSectionRepository
        .createQueryBuilder('mastersection')
        .leftJoin('mastersection.masterreport', 'masterreport')
        .select([
          'mastersection.sectionid',
          'mastersection.sectionname',
          'mastersection.sectiondesc',
          'mastersection.sectioncodepowerbiid',
          'masterreport.reportname',
          'masterreport.reportpowerbiid',
          'masterreport.datasetpowerbiid',
        ])
        .where('mastersection.isdelete = :isdelete', { isdelete: false })
        .orderBy('masterreport.reportname')
        .offset(offset)
        .limit(take)
        .getRawMany();

      const itemCount = await this.masterSectionRepository
        .createQueryBuilder('mastersection')
        .leftJoin('mastersection.masterreport', 'masterreport')
        .select([
          'mastersection.sectionid',
          'mastersection.sectionname',
          'mastersection.sectiondesc',
          'mastersection.sectioncodepowerbiid',
          'masterreport.reportname',
          'masterreport.reportpowerbiid',
          'masterreport.datasetpowerbiid',
        ])
        .where('mastersection.isdelete = :isdelete', { isdelete: false })
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

  async getMasterSectionId(
    sectionid: number,
  ): Promise<MasterSectionDto | undefined> {
    try {
      const query = await this.masterSectionRepository
        .createQueryBuilder('mastersection')
        .where('mastersection.sectionid = :sectionid', { sectionid })
        .getOne();

      return query?.toDto();
    } catch (error) {
      throw error;
    }
  }

  async getLastMasterSectionCode() {
    try {
      const query = await this.masterSectionRepository
        .createQueryBuilder('mastersection')
        .select('mastersection.sectioncode')
        .orderBy('mastersection.sectioncode', 'DESC')
        .getOne();

      return query;
    } catch (error) {
      throw error;
    }
  }

  async createMasterSection(mastersection: AddMasterSectionDto) {
    try {
      const query = this.masterSectionRepository
        .createQueryBuilder('mastersection')
        .insert()
        .into(MasterSection)
        .values({
          reportid: mastersection.reportid,
          sectionname: mastersection.sectionname,
          sectiondesc: mastersection.sectiondesc,
          sectioncodepowerbiid: mastersection.sectioncodepowerbiid,
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

  async updateMasterSection(
    sectionid: number,
    mastersection: UpdateMasterSectionDto,
  ) {
    try {
      const query = await this.masterSectionRepository
        .createQueryBuilder()
        .update(MasterSection)
        .set({
          reportid: mastersection.reportid,
          sectionname: mastersection.sectionname,
          sectiondesc: mastersection.sectiondesc,
          sectioncodepowerbiid: mastersection.sectioncodepowerbiid,
        })
        .where('sectionid = :sectionid', { sectionid })
        .execute();

      return query;
    } catch (error) {
      throw error;
    }
  }

  async deleteMasterSection(sectionid: number) {
    try {
      await this.masterSectionRepository
        .createQueryBuilder()
        .update(MasterSection)
        .set({ isdelete: 'true' })
        .where('sectionid = :sectionid', { sectionid })
        .execute();

      return `Data berhasil dihapus`;
    } catch (error) {
      throw error;
    }
  }
}