import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Company } from './master-company-ees.entity';
import { Repository } from 'typeorm';
import { CompanyDto } from './dto/master-company-ees.dto';
import { AddCompanyDto } from './dto/add-master-company-ees.dto';
import { UpdateCompanyDto } from './dto/update-master-company-ees.dto';
import { UserInfoDTO } from '../duende-authentication/dto/userinfo.dto';
import { AccessUser } from '../access-user/access-user.entity';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company)
    private companyRepository: Repository<Company>,

    @InjectRepository(AccessUser)
    private accessUserRepository: Repository<AccessUser>,
  ) {}

  async getAllCompany(
    page: number,
    take: number,
    companyname?: string,
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

      let query = this.companyRepository
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
        .leftJoin('company.directreview', 'directreview');

      if (companyname) {
        query = query.where(
          'LOWER(company.companyeesname) LIKE :companyname OR LOWER(company.companympsname) LIKE :companyname',
          { companyname: `%${companyname.toLowerCase()}%` },
        );
      }

      const data = await query
        .orderBy('company.isdelete', 'ASC')
        .addOrderBy('company.sourcecreatedmodifiedtime', 'DESC')
        .addOrderBy('company.companyeesname', 'ASC')
        .offset(offset)
        .limit(take)
        .getRawMany();

      const itemCount = await query.getCount();

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

  async getAllCompanyActive(userinfo: UserInfoDTO) {
    try {
      const query = await this.accessUserRepository
        .createQueryBuilder('accessuser')
        .leftJoin('accessuser.company', 'company')
        .leftJoin('accessuser.masteruser', 'masteruser')
        .select([
          'company.companyid',
          'company.companycode',
          'company.companyeesname',
        ])
        .where('company.isdelete = :isdelete', { isdelete: 'Active' })
        .andWhere('masteruser.email = :email', { email: userinfo.email })
        .orderBy('company.companyeesname', 'ASC')
        .getRawMany();

      return query;
    } catch (error) {
      throw error;
    }
  }

  async getCompanyId(companyid: number): Promise<CompanyDto | undefined> {
    try {
      const query = await this.companyRepository.findOne({
        where: { companyid: companyid },
        relations: {
          location: true,
        },
      });

      return query?.toDto();
    } catch (error) {
      throw error;
    }
  }

  async checkDuplicateCompany(
    companyees: string,
    companymps: string,
    alias: string,
  ) {
    try {
      let query = this.companyRepository.createQueryBuilder('mastercompany');

      if (companyees) {
        query = query.where('mastercompany.companyeesname = :companyees', {
          companyees,
        });
      }

      if (companymps) {
        query = query.where('mastercompany.companympsname = :companymps', {
          companymps,
        });
      }

      if (alias) {
        query = query.where(
          '(mastercompany.aliascompany1 = :alias OR mastercompany.aliascompany2 = :alias OR mastercompany.aliascompany3 = :alias)',
          { alias },
        );
      }

      const data = query.getOne();

      return data;
    } catch (error) {
      throw error;
    }
  }

  async getLastCompanyCode() {
    try {
      const query = await this.companyRepository
        .createQueryBuilder('company')
        .select('company.companycode')
        .orderBy('company.companyid', 'DESC')
        .getOne();

      return query;
    } catch (error) {
      throw error;
    }
  }

  async createCompany(company: AddCompanyDto, userinfo: UserInfoDTO) {
    try {
      const createNow = new Date(new Date().getTime() + 7 * 60 * 60 * 1000);

      const year = createNow.getFullYear();
      const month = createNow.getMonth() + 1;
      const date = createNow.getDate();

      const createdDate = parseInt(`${year}${month}${date}`);

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
          createdby: userinfo.fullname,
          isdelete: 'Active',
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

  async updateCompany(
    companyid: number,
    company: UpdateCompanyDto,
    userinfo: UserInfoDTO,
  ) {
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
          updatedby: userinfo.fullname,
        })
        .where('companyid = :companyid', { companyid })
        .execute();

      return query;
    } catch (error) {
      throw error;
    }
  }

  async activeCompany(companyid: number) {
    try {
      const query = await this.companyRepository
        .createQueryBuilder()
        .update(Company)
        .set({ isdelete: 'Active' })
        .where('companyid = :companyid', { companyid })
        .execute();

      return query;
    } catch (error) {
      throw error;
    }
  }

  async deactiveCompany(companyid: number) {
    try {
      const query = await this.companyRepository
        .createQueryBuilder()
        .update(Company)
        .set({ isdelete: 'Incative' })
        .where('companyid = :companyid', { companyid })
        .execute();

      return query;
    } catch (error) {
      throw error;
    }
  }

  async getCompanyByName(companyname: string) {
    return this.companyRepository.findOne({
      where: { companympsname: companyname, isdelete: 'Active' },
    });
  }
}
