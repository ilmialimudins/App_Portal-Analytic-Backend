import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MasterReport } from './master-report.entity';
import { Repository } from 'typeorm';
import { MasterReportDto } from './dto/master-report.dto';
import { AddMasterReportDto } from './dto/add-master-report.dto';
import { UpdateMasterReportDto } from './dto/update-master-report.dto';

@Injectable()
export class MasterReportService {
  constructor(
    @InjectRepository(MasterReport)
    private masterReportRepository: Repository<MasterReport>,
  ) {}

  async getAllMasterReport() {
    try {
      const data = await this.masterReportRepository
        .createQueryBuilder('masterreport')
        .leftJoin('masterreport.masterworkspace', 'masterworkspace')
        .select([
          'masterreport.reportid',
          'masterreport.reportname',
          'masterreport.reportdesc',
          'masterreport.reporturl',
          'masterreport.reportpowerbiid',
          'masterreport.datasetpowerbiid',
          'masterworkspace.workspacename',
          'masterworkspace.workspacepowerbiid',
        ])
        .where('masterreport.isdelete = :isdelete', { isdelete: false })
        .orderBy('masterreport.reportname', 'ASC')
        .getRawMany();

      return data;
    } catch (error) {
      throw error;
    }
  }

  async getMasterReportId(
    reportid: number,
  ): Promise<MasterReportDto | undefined> {
    try {
      const query = await this.masterReportRepository
        .createQueryBuilder('masterreport')
        .where('masterreport.reportid = :reportid', { reportid })
        .getOne();

      return query?.toDto();
    } catch (error) {
      throw error;
    }
  }

  async getLastMasterReportCode() {
    try {
      const query = await this.masterReportRepository
        .createQueryBuilder('masterreport')
        .select('masterreport.reportcode')
        .orderBy('masterreport.reportid', 'DESC')
        .getOne();

      return query;
    } catch (error) {
      throw error;
    }
  }

  async createMasterReport(masterreport: AddMasterReportDto) {
    try {
      const createNow = new Date(new Date().getTime() + 7 * 60 * 60 * 1000);

      const year = createNow.getFullYear();
      const month = createNow.getMonth() + 1;
      const date = createNow.getDate();

      const createdDate = parseInt(`${year}${month}${date}`);

      const query = this.masterReportRepository
        .createQueryBuilder('masterreport')
        .insert()
        .into(MasterReport)
        .values({
          workspaceid: masterreport.workspaceid,
          reportname: masterreport.reportname,
          reportpowerbiiid: masterreport.reportpowerbiid,
          datasetpowerbiid: masterreport.datasetpowerbiid,
          reporturl: masterreport.reporturl,
          createdby: masterreport.createdby,
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

  async updateMasterReport(
    reportid: number,
    masterreport: UpdateMasterReportDto,
  ) {
    try {
      const query = await this.masterReportRepository
        .createQueryBuilder()
        .update(MasterReport)
        .set({
          workspaceid: masterreport.workspaceid,
          reportname: masterreport.reportname,
          reportpowerbiiid: masterreport.reportpowerbiid,
          datasetpowerbiid: masterreport.datasetpowerbiid,
          reporturl: masterreport.reporturl,
          updatedby: masterreport.updatedby,
        })
        .where('reportid = :reportid', { reportid })
        .execute();

      return query;
    } catch (error) {
      throw error;
    }
  }

  async deleteMasterReport(reportid: number) {
    try {
      const query = await this.masterReportRepository
        .createQueryBuilder()
        .update(MasterReport)
        .set({ isdelete: 'true' })
        .where('reportid = :reportid', { reportid })
        .execute();

      return query;
    } catch (error) {
      throw error;
    }
  }
}
