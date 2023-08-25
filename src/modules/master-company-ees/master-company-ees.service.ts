import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MasterCompanyEES } from './master-company-ees.entity';
import { Repository } from 'typeorm';
import { MasterCompanyEESDto } from './dto/master-company-ees.dto';
import { AddMasterCompanyEESDto } from './dto/add-master-company-ees.dto';
import { UpdateMasterCompanyEESDto } from './dto/update-master-company-ees.dto';

@Injectable()
export class MasterCompanyEESService {
  constructor(
    @InjectRepository(MasterCompanyEES)
    private masterCompanyEESRepository: Repository<MasterCompanyEES>,
  ) {}

  async getAllCompany(
    page: number,
    pageSize: number,
  ): Promise<{ data: MasterCompanyEESDto[]; total: number }> {
    try {
      const offset = (page - 1) * pageSize;

      const data = await this.masterCompanyEESRepository
        .createQueryBuilder('mastercompanyees')
        .leftJoin('mastercompanyees.surveygroup', 'surveygroup')
        .leftJoin('mastercompanyees.businessline', 'businessline')
        .leftJoin('mastercompanyees.modellingtype', 'modellingtype')
        .select([
          'companycode',
          'companyeesname',
          'aliascompany1',
          'aliascompany2',
          'aliascompany3',
          'surveygroupdesc',
          'businesslinedesc',
          'modellingtypedesc',
        ])
        .where('mastercompanyees.isDelete = :isDelete', { isDelete: false })
        .orderBy('companyeesname')
        .offset(offset)
        .limit(pageSize)
        .getRawMany();

      const total = await this.masterCompanyEESRepository
        .createQueryBuilder('mastercompanyees')
        .leftJoin('mastercompanyees.surveygroup', 'surveygroup')
        .leftJoin('mastercompanyees.businessline', 'businessline')
        .leftJoin('mastercompanyees.modellingtype', 'modellingtype')
        .select([
          'companycode',
          'companyeesname',
          'aliascompany1',
          'aliascompany2',
          'aliascompany3',
          'surveygroupdesc',
          'businesslinedesc',
          'modellingtypedesc',
        ])
        .where('mastercompanyees.isDelete = :isDelete', { isDelete: false })
        .getCount();

      return { data, total };
    } catch (error) {
      throw error;
    }
  }

  async getCompanyName(
    page: number,
    pageSize: number,
    companyname: string,
  ): Promise<{ data: MasterCompanyEESDto[]; total: number }> {
    try {
      const offset = (page - 1) * pageSize;

      const data = await this.masterCompanyEESRepository
        .createQueryBuilder('mastercompanyees')
        .leftJoin('mastercompanyees.surveygroup', 'surveygroup')
        .leftJoin('mastercompanyees.businessline', 'businessline')
        .leftJoin('mastercompanyees.modellingtype', 'modellingtype')
        .select([
          'companycode',
          'companyeesname',
          'aliascompany1',
          'aliascompany2',
          'aliascompany3',
          'surveygroupdesc',
          'businesslinedesc',
          'modellingtypedesc',
        ])
        .where('mastercompanyees.isDelete = :isDelete', { isDelete: false })
        .andWhere('mastercompanyees.companyeesname = :companyname', {
          companyname,
        })
        .orderBy('companyeesname')
        .offset(offset)
        .limit(pageSize)
        .getRawMany();

      const total = await this.masterCompanyEESRepository
        .createQueryBuilder('mastercompanyees')
        .leftJoin('mastercompanyees.surveygroup', 'surveygroup')
        .leftJoin('mastercompanyees.businessline', 'businessline')
        .leftJoin('mastercompanyees.modellingtype', 'modellingtype')
        .select([
          'companycode',
          'companyeesname',
          'aliascompany1',
          'aliascompany2',
          'aliascompany3',
          'surveygroupdesc',
          'businesslinedesc',
          'modellingtypedesc',
        ])
        .where('mastercompanyees.isDelete = :isDelete', { isDelete: false })
        .andWhere('mastercompanyees.companyeesname = :companyname', {
          companyname,
        })
        .getCount();

      return { data, total };
    } catch (error) {
      throw error;
    }
  }

  async getCompanyId(
    companyid: number,
  ): Promise<MasterCompanyEESDto | undefined> {
    try {
      const query = await this.masterCompanyEESRepository
        .createQueryBuilder('mastercompanyees')
        .where('mastercompanyees.companyid = :companyid', { companyid })
        .andWhere('mastercompanyees.isDelete = :isDelete', { isDelete: false })
        .getOne();

      return query?.toDto();
    } catch (error) {
      throw error;
    }
  }

  async addCompany(company: AddMasterCompanyEESDto) {
    try {
      const query = await this.masterCompanyEESRepository
        .createQueryBuilder('mastercompanyees')
        .insert()
        .into(MasterCompanyEES)
        .values({
          companycode: company.companycode,
          companyeesname: company.companyeesname,
          aliascompany1: company.aliascompany1,
          aliascompany2: company.aliascompany2,
          aliascompany3: company.aliascompany3,
          surveygroupid: company.surveygroupid,
          businesslineid: company.businesslineid,
          modellingtypeid: company.modellingtypeid,
          isdelete: 'false',
          createdtime: new Date(),
        })
        .execute();

      return query;
    } catch (error) {
      throw error;
    }
  }

  async updateCompany(companyid: number, company: UpdateMasterCompanyEESDto) {
    try {
      const query = await this.masterCompanyEESRepository
        .createQueryBuilder()
        .update(MasterCompanyEES)
        .set({
          companyeesname: company.companyeesname,
          aliascompany1: company.aliascompany1,
          aliascompany2: company.aliascompany2,
          aliascompany3: company.aliascompany3,
          surveygroupid: company.surveygroupid,
          businesslineid: company.businesslineid,
          modellingtypeid: company.modellingtypeid,
        })
        .where('companyid = :companyid', { companyid })
        .execute();

      return query;
    } catch (error) {
      throw error;
    }
  }

  async deleteCompany(companyid: number) {
    try {
      await this.masterCompanyEESRepository
        .createQueryBuilder()
        .update(MasterCompanyEES)
        .set({ isdelete: 'true' })
        .where('companyid = :companyid', { companyid })
        .execute();

      return `Data berhasil di hapus`;
    } catch (error) {
      throw error;
    }
  }
}
