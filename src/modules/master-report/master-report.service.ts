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

  async getAllMasterReport(
    page: number,
    take: number,
  ): Promise<{
    data: MasterReportDto[];
    page: number;
    take: number;
    itemCount: number;
    pageCount: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
  }> {
    try {
      const offset = (page - 1) * take;

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
        .where('masterreport.isdelete = :isdelete', { isdelete: 'false' })
        .orderBy('masterreport.reportname')
        .offset(offset)
        .limit(take)
        .getRawMany();

      const itemCount = await this.masterReportRepository
        .createQueryBuilder('masterreport')
        .leftJoin('masterreport.masterworkspace', 'masterworkspace')
        .select([
          'masterreport.reportname',
          'masterreport.reportdesc',
          'masterreport.reporturl',
          'masterreport.reportpowerbiid',
          'masterreport.datasetpowerbiid',
          'masterworkspace.workspacename',
          'masterworkspace.workspacepowerbiid',
        ])
        .where('masterreport.isdelete = :isdelete', { isdelete: 'false' })
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
        .orderBy('masterreport.reportcode', 'DESC')
        .getOne();

      return query;
    } catch (error) {
      throw error;
    }
  }

  async createMasterReport(masterreport: AddMasterReportDto) {
    try {
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
      await this.masterReportRepository
        .createQueryBuilder()
        .update(MasterReport)
        .set({ isdelete: 'true' })
        .where('reportid = :reportid', { reportid })
        .execute();

      return `Data berhasil di hapus`;
    } catch (error) {
      throw error;
    }
  }
}
