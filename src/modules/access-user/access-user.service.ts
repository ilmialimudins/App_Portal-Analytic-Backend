import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AccessUser } from './access-user.entity';
import { Repository } from 'typeorm';
import { AccessUserDto } from './dto/access-user.dto';
import { AddAccessUserDto } from './dto/add-access-user.dto';
import { UpdateAccessUserDto } from './dto/update-access-user.dto';

@Injectable()
export class AccessUserService {
  constructor(
    @InjectRepository(AccessUser)
    private accessUserRepository: Repository<AccessUser>,
  ) {}

  async getAllAccessUser(
    page: number,
    take: number,
  ): Promise<{
    data: AccessUserDto[];
    page: number;
    take: number;
    itemCount: number;
    pageCount: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
  }> {
    try {
      const offset = (page - 1) * take;

      const data = await this.accessUserRepository
        .createQueryBuilder('accessuser')
        .leftJoin('accessuser.company', 'company')
        .leftJoin('accessuser.masteruser', 'masteruser')
        .leftJoin('company.businessline', 'businessline')
        .leftJoin('company.surveygroup', 'surveygroup')
        .leftJoin('company.businessgroup', 'businessgroup')
        .select([
          'accessuser.aksesuserid',
          'masteruser.email',
          'businessline.businesslinedesc',
          'surveygroup.surveygroupdesc',
          'businessgroup.businessgroupdesc',
          'company.companyeesname',
        ])
        .where('accessuser.isdelete = :isdelete', { isdelete: false })
        .orderBy('masteruser.email')
        .offset(offset)
        .limit(take)
        .getRawMany();

      const itemCount = await this.accessUserRepository
        .createQueryBuilder('accessuser')
        .leftJoin('accessuser.company', 'company')
        .leftJoin('accessuser.masteruser', 'masteruser')
        .leftJoin('company.businessline', 'businessline')
        .leftJoin('company.surveygroup', 'surveygroup')
        .leftJoin('company.businessgroup', 'businessgroup')
        .select([
          'accessuser.aksesuserid',
          'masteruser.email',
          'businessline.businesslinedesc',
          'surveygroup.surveygroupdesc',
          'businessgroup.businessgroupdesc',
          'company.companyeesname',
        ])
        .where('accessuser.isdelete = :isdelete', { isdelete: false })
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

  async getAccessUserEmail(
    page: number,
    take: number,
    email: string,
  ): Promise<{
    data: AccessUserDto[];
    page: number;
    take: number;
    itemCount: number;
    pageCount: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
  }> {
    try {
      const offset = (page - 1) * take;

      const data = await this.accessUserRepository
        .createQueryBuilder('accessuser')
        .leftJoin('accessuser.company', 'company')
        .leftJoin('accessuser.masteruser', 'masteruser')
        .leftJoin('company.businessline', 'businessline')
        .leftJoin('company.surveygroup', 'surveygroup')
        .leftJoin('company.businessgroup', 'businessgroup')
        .select([
          'accessuser.aksesuserid',
          'masteruser.email',
          'businessline.businesslinedesc',
          'surveygroup.surveygroupdesc',
          'businessgroup.businessgroupdesc',
          'company.companyeesname',
        ])
        .where('accessuser.isdelete = :isdelete', { isdelete: false })
        .andWhere('LOWER(masteruser.email) LIKE :email', {
          email: `%${email.toLowerCase()}%`,
        })
        .orderBy('masteruser.email')
        .offset(offset)
        .limit(take)
        .getRawMany();

      const itemCount = await this.accessUserRepository
        .createQueryBuilder('accessuser')
        .leftJoin('accessuser.company', 'company')
        .leftJoin('accessuser.masteruser', 'masteruser')
        .leftJoin('company.businessline', 'businessline')
        .leftJoin('company.surveygroup', 'surveygroup')
        .leftJoin('company.businessgroup', 'businessgroup')
        .select([
          'accessuser.aksesuserid',
          'masteruser.email',
          'businessline.businesslinedesc',
          'surveygroup.surveygroupdesc',
          'businessgroup.businessgroupdesc',
          'company.companyeesname',
        ])
        .where('accessuser.isdelete = :isdelete', { isdelete: false })
        .andWhere('LOWER(masteruser.email) LIKE :email', {
          email: `%${email.toLowerCase()}%`,
        })
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

  async getAccessUserId(
    accessuserid: number,
  ): Promise<AccessUserDto | undefined> {
    try {
      const query = await this.accessUserRepository
        .createQueryBuilder('accessuser')
        .where('accessuser.aksesuserid = :accessuserid', { accessuserid })
        .where('accessuser.isdelete = :isdelete', { isdelete: false })
        .getOne();

      return query?.toDto();
    } catch (error) {
      throw error;
    }
  }

  async createAccessUser(accessuser: AddAccessUserDto[]) {
    try {
      const values = accessuser.map((accessuser) => ({
        companyid: accessuser.companyid,
        userid: accessuser.userid,
        isdelete: 'false',
        createdby: accessuser.createdby,
        createdtime: new Date(),
        sourcecreatedmodifiedtime: new Date(),
      }));

      const query = await this.accessUserRepository
        .createQueryBuilder('accessuser')
        .insert()
        .into(AccessUser)
        .values(values)
        .execute();

      return query;
    } catch (error) {
      throw error;
    }
  }

  async updateAccessUser(
    accessuserid: number,
    accessuser: UpdateAccessUserDto,
  ) {
    try {
      const query = await this.accessUserRepository
        .createQueryBuilder()
        .update(AccessUser)
        .set({
          companyid: accessuser.companyid,
          userid: accessuser.userid,
          createdby: accessuser.createdby,
        })
        .where('aksesuserid = :accessuserid', { accessuserid })
        .execute();

      return query;
    } catch (error) {
      throw error;
    }
  }

  async deleteAccessUser(accessuserid: number) {
    try {
      await this.accessUserRepository
        .createQueryBuilder()
        .update(AccessUser)
        .set({ isdelete: 'true' })
        .where('aksesuserid = :accessuserid', { accessuserid })
        .execute();

      return `Data berhasil di hapus`;
    } catch (error) {
      throw error;
    }
  }
}
