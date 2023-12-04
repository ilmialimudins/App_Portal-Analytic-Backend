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

  async getAllMasterSection() {
    try {
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
        .orderBy('masterreport.reportname', 'ASC')
        .getRawMany();

      return data;
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
        .orderBy('mastersection.sectionid', 'DESC')
        .getOne();

      return query;
    } catch (error) {
      throw error;
    }
  }

  async createMasterSection(mastersection: AddMasterSectionDto) {
    try {
      const createNow = new Date(new Date().getTime() + 7 * 60 * 60 * 1000);

      const year = createNow.getFullYear();
      const month = createNow.getMonth() + 1;
      const date = createNow.getDate();

      const createdDate = parseInt(`${year}${month}${date}`);

      const query = this.masterSectionRepository
        .createQueryBuilder('mastersection')
        .insert()
        .into(MasterSection)
        .values({
          reportid: mastersection.reportid,
          sectionname: mastersection.sectionname,
          sectiondesc: mastersection.sectiondesc,
          sectioncodepowerbiid: mastersection.sectioncodepowerbiid,
          createdby: mastersection.createdby,
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
          updatedby: mastersection.updatedby,
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
      const query = await this.masterSectionRepository
        .createQueryBuilder()
        .update(MasterSection)
        .set({ isdelete: 'true' })
        .where('sectionid = :sectionid', { sectionid })
        .execute();

      return query;
    } catch (error) {
      throw error;
    }
  }
}
