import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Company } from './master-company-ees.entity';
import { Repository } from 'typeorm';
import { CompanyDto } from './dto/master-company-ees.dto';
import { AddCompanyDto } from './dto/add-master-company-ees.dto';
import { UpdateCompanyDto } from './dto/update-master-company-ees.dto';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company)
    private companyRepository: Repository<Company>,
  ) {}

  async getAllCompany(
    page: number,
    take: number,
  ): Promise<{
    data: CompanyDto[];
    page: number;
    take: number;
    itemCount: number;
    pageCount: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
  }> {
    try {
      const offset = (page - 1) * take;

      const data = await this.companyRepository
        .createQueryBuilder('company')
        .select([
          'company.companyid',
          'company.companycode',
          'company.companyeesname',
          'company.companympsname',
          'businessline.businesslinedesc',
          'company.aliascompany1',
          'company.aliascompany2',
          'company.aliascompany3',
          'surveygroup.surveygroupdesc',
          'modellingtype.modellingtypedesc',
          'businessgroup.businessgroupdesc',
          'ownershipstatus.ownershipstatusdesc',
          'location.locationdesc',
          'cla.cladesc',
          'directreview.directreviewdesc',
          'company.isdelete',
        ])
        .leftJoin('company.businessline', 'businessline')
        .leftJoin('company.surveygroup', 'surveygroup')
        .leftJoin('company.modellingtype', 'modellingtype')
        .leftJoin('company.businessgroup', 'businessgroup')
        .leftJoin('company.ownershipstatus', 'ownershipstatus')
        .leftJoin('company.location', 'location')
        .leftJoin('company.cla', 'cla')
        .leftJoin('company.directreview', 'directreview')
        .orderBy({ 'company.isdelete': 'ASC', 'company.companyeesname': 'ASC' })
        .offset(offset)
        .limit(take)
        .getRawMany();

      const itemCount = await this.companyRepository
        .createQueryBuilder('company')
        .select([
          'company.companyid',
          'company.companycode',
          'company.companyeesname',
          'company.companympsname',
          'businessline.businesslinedesc',
          'company.aliascompany1',
          'company.aliascompany2',
          'company.aliascompany3',
          'surveygroup.surveygroupdesc',
          'modellingtype.modellingtypedesc',
          'businessgroup.businessgroupdesc',
          'ownershipstatus.ownershipstatusdesc',
          'location.locationdesc',
          'cla.cladesc',
          'directreview.directreviewdesc',
          'company.isdelete',
        ])
        .leftJoin('company.businessline', 'businessline')
        .leftJoin('company.surveygroup', 'surveygroup')
        .leftJoin('company.modellingtype', 'modellingtype')
        .leftJoin('company.businessgroup', 'businessgroup')
        .leftJoin('company.ownershipstatus', 'ownershipstatus')
        .leftJoin('company.location', 'location')
        .leftJoin('company.cla', 'cla')
        .leftJoin('company.directreview', 'directreview')
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

  async getCompanyName(
    page: number,
    take: number,
    companyname: string,
  ): Promise<{
    data: CompanyDto[];
    page: number;
    take: number;
    itemCount: number;
    pageCount: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
  }> {
    try {
      const offset = (page - 1) * take;

      const data = await this.companyRepository
        .createQueryBuilder('company')
        .select([
          'company.companyid',
          'company.companycode',
          'company.companyeesname',
          'company.companympsname',
          'businessline.businesslinedesc',
          'company.aliascompany1',
          'company.aliascompany2',
          'company.aliascompany3',
          'surveygroup.surveygroupdesc',
          'modellingtype.modellingtypedesc',
          'businessgroup.businessgroupdesc',
          'ownershipstatus.ownershipstatusdesc',
          'location.locationdesc',
          'cla.cladesc',
          'directreview.directreviewdesc',
          'company.isdelete',
        ])
        .leftJoin('company.businessline', 'businessline')
        .leftJoin('company.surveygroup', 'surveygroup')
        .leftJoin('company.modellingtype', 'modellingtype')
        .leftJoin('company.businessgroup', 'businessgroup')
        .leftJoin('company.ownershipstatus', 'ownershipstatus')
        .leftJoin('company.location', 'location')
        .leftJoin('company.cla', 'cla')
        .leftJoin('company.directreview', 'directreview')
        .andWhere(
          'company.companyeesname LIKE :companyname OR LOWER(company.companympsname) LIKE :companyname',
          { companyname: `%${companyname}%` },
        )
        .orderBy({ 'company.isdelete': 'ASC', 'company.companyeesname': 'ASC' })
        .offset(offset)
        .limit(take)
        .getRawMany();

      const itemCount = await this.companyRepository
        .createQueryBuilder('company')
        .select([
          'company.companyid',
          'company.companycode',
          'company.companyeesname',
          'company.companympsname',
          'businessline.businesslinedesc',
          'company.aliascompany1',
          'company.aliascompany2',
          'company.aliascompany3',
          'surveygroup.surveygroupdesc',
          'modellingtype.modellingtypedesc',
          'businessgroup.businessgroupdesc',
          'ownershipstatus.ownershipstatusdesc',
          'location.locationdesc',
          'cla.cladesc',
          'directreview.directreviewdesc',
          'company.isdelete',
        ])
        .leftJoin('company.businessline', 'businessline')
        .leftJoin('company.surveygroup', 'surveygroup')
        .leftJoin('company.modellingtype', 'modellingtype')
        .leftJoin('company.businessgroup', 'businessgroup')
        .leftJoin('company.ownershipstatus', 'ownershipstatus')
        .leftJoin('company.location', 'location')
        .leftJoin('company.cla', 'cla')
        .leftJoin('company.directreview', 'directreview')
        .andWhere(
          'LOWER(company.companyeesname) OR LOWER(company.companympsname) LIKE :companyname',
          { companyname: `%${companyname.toLowerCase()}%` },
        )
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

  async getCompanyId(companyid: number): Promise<CompanyDto | undefined> {
    try {
      const query = await this.companyRepository
        .createQueryBuilder('company')
        .where('company.companyid = :companyid', { companyid })
        .getOne();

      return query?.toDto();
    } catch (error) {
      throw error;
    }
  }

  async getLastCompanyCode() {
    try {
      const query = await this.companyRepository
        .createQueryBuilder('company')
        .select('company.companycode')
        .orderBy('company.companycode', 'DESC')
        .getOne();

      return query;
    } catch (error) {
      throw error;
    }
  }

  async createCompany(company: AddCompanyDto) {
    try {
      const query = await this.companyRepository
        .createQueryBuilder('company')
        .insert()
        .into(Company)
        .values({
          businesslineid: company.businesslineid,
          surveygroupid: company.surveygroupid,
          modellingtypeid: company.modellingtypeid,
          businessgroupid: company.businessgroupid,
          ownershipstatusid: company.ownershipstatusid,
          locationid: company.locationid,
          claid: company.claid,
          directreviewid: company.directreviewid,
          companycode: company.companycode,
          companyeesname: company.companyeesname,
          companympsname: company.companympsname,
          aliascompany1: company.aliascompany1,
          aliascompany2: company.aliascompany2,
          aliascompany3: company.aliascompany3,
          remark: company.remark,
          isdelete: 'active',
          createdtime: new Date(),
          sourcecreatedmodifiedtime: new Date(),
        })
        .execute();

      return query;
    } catch (error) {
      throw error;
    }
  }

  async updateCompany(companyid: number, company: UpdateCompanyDto) {
    try {
      const query = await this.companyRepository
        .createQueryBuilder()
        .update(Company)
        .set({
          businesslineid: company.businesslineid,
          surveygroupid: company.surveygroupid,
          modellingtypeid: company.modellingtypeid,
          businessgroupid: company.businessgroupid,
          ownershipstatusid: company.ownershipstatusid,
          locationid: company.locationid,
          claid: company.claid,
          directreviewid: company.directreviewid,
          companycode: company.companycode,
          companyeesname: company.companyeesname,
          companympsname: company.companympsname,
          aliascompany1: company.aliascompany1,
          aliascompany2: company.aliascompany2,
          aliascompany3: company.aliascompany3,
          remark: company.remark,
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
      await this.companyRepository
        .createQueryBuilder()
        .update(Company)
        .set({ isdelete: 'deactive' })
        .where('companyid = :companyid', { companyid })
        .execute();

      return `Data berhasil di hapus`;
    } catch (error) {
      throw error;
    }
  }
}
