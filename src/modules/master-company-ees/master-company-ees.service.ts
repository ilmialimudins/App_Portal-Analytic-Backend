import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MasterCompanyEES } from './master-company-ees.entity';
import { Repository } from 'typeorm';
import { PageOptionsDTO } from 'src/common/dto/page-options.dto';
import { MasterCompanyEESDto } from './dto/master-company-ees.dto';
import { PageDto } from 'src/common/dto/page.dto';
import { AddMasterCompanyEESDto } from './dto/add-master-company-ees.dto';
import { UpdateMasterCompanyEESDto } from './dto/update-master-company-ees.dto';

@Injectable()
export class MasterCompanyEESService {
  constructor(
    @InjectRepository(MasterCompanyEES)
    private masterCompanyEESRepository: Repository<MasterCompanyEES>,
  ) {}

  async getAllCompany(
    pageOptions: PageOptionsDTO,
  ): Promise<PageDto<MasterCompanyEESDto>> {
    try {
      const query = this.masterCompanyEESRepository
        .createQueryBuilder('mastercompanyees')
        .where('mastercompanyees.isDelete = :isDelete', { isDelete: false })
        .orderBy('mastercompanyees.companyeesname', pageOptions.order);

      const [items, pageMetaDto] = await query.paginate(pageOptions);

      return items.toPageDto(pageMetaDto);
    } catch (error) {
      throw error;
    }
  }

  async getCompanyById(
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

  async getCompanyEESName(
    pageOptions: PageOptionsDTO,
    name: string,
  ): Promise<PageDto<MasterCompanyEESDto>> {
    try {
      const query = this.masterCompanyEESRepository
        .createQueryBuilder('mastercompanyees')
        .where('mastercompanyees.companyeesname = :name', { name })
        .andWhere('mastercompanyees.isDelete = :isDelete', { isDelete: false })
        .orderBy('mastercompanyees.companyeesname', pageOptions.order);

      const [items, pageMetaDto] = await query.paginate(pageOptions);

      return items.toPageDto(pageMetaDto);
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
