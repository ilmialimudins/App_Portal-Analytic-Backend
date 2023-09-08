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
    pageSize: number,
  ): Promise<{ data: AccessUserDto[]; total: number }> {
    try {
      const offset = (page - 1) * pageSize;

      const data = await this.accessUserRepository
        .createQueryBuilder('accessuser')
        .leftJoin('accessuser.mastercompanyees', 'mastercompanyees')
        .leftJoin('accessuser.masteruser', 'masteruser')
        .leftJoin('mastercompanyees.businessline', 'businessline')
        .leftJoin('mastercompanyees.surveygroup', 'surveygroup')
        .leftJoin('mastercompanyees.businessgroup', 'businessgroup')
        .select([
          'masteruser.email',
          'businessline.businesslinedesc',
          'surveygroup.surveygroupdesc',
          'businessgroup.businessgroupdesc',
          'mastercompanyees.companyname',
        ])
        .where('accessuser.isdelete = :isdelete', { isdelete: false })
        .orderBy('masteruser.email')
        .offset(offset)
        .limit(pageSize)
        .getRawMany();

      const total = await this.accessUserRepository
        .createQueryBuilder('accessuser')
        .leftJoin('accessuser.mastercompanyees', 'mastercompanyees')
        .leftJoin('accessuser.masteruser', 'masteruser')
        .leftJoin('mastercompanyees.businessline', 'businessline')
        .leftJoin('mastercompanyees.surveygroup', 'surveygroup')
        .leftJoin('mastercompanyees.businessgroup', 'businessgroup')
        .select([
          'masteruser.email',
          'businessline.businesslinedesc',
          'surveygroup.surveygroupdesc',
          'businessgroup.businessgroupdesc',
          'mastercompanyees.companyname',
        ])
        .where('accessuser.isdelete = :isdelete', { isdelete: false })
        .getCount();

      return { data, total };
    } catch (error) {
      throw error;
    }
  }

  async getAccessUserEmail(
    page: number,
    pageSize: number,
    email: string,
  ): Promise<{ data: AccessUserDto[]; total: number }> {
    try {
      const offset = (page - 1) * pageSize;

      const data = await this.accessUserRepository
        .createQueryBuilder('accessuser')
        .leftJoin('accessuser.mastercompanyees', 'mastercompanyees')
        .leftJoin('accessuser.masteruser', 'masteruser')
        .leftJoin('mastercompanyees.businessline', 'businessline')
        .leftJoin('mastercompanyees.surveygroup', 'surveygroup')
        .leftJoin('mastercompanyees.businessgroup', 'businessgroup')
        .select([
          'masteruser.email',
          'businessline.businesslinedesc',
          'surveygroup.surveygroupdesc',
          'businessgroup.businessgroupdesc',
          'mastercompanyees.companyname',
        ])
        .where('accessuser.isdelete = :isdelete', { isdelete: false })
        .andWhere('masteruser.email = :email', { email })
        .orderBy('masteruser.email')
        .offset(offset)
        .limit(pageSize)
        .getRawMany();

      const total = await this.accessUserRepository
        .createQueryBuilder('accessuser')
        .leftJoin('accessuser.mastercompanyees', 'mastercompanyees')
        .leftJoin('accessuser.masteruser', 'masteruser')
        .leftJoin('mastercompanyees.businessline', 'businessline')
        .leftJoin('mastercompanyees.surveygroup', 'surveygroup')
        .leftJoin('mastercompanyees.businessgroup', 'businessgroup')
        .select([
          'masteruser.email',
          'businessline.businesslinedesc',
          'surveygroup.surveygroupdesc',
          'businessgroup.businessgroupdesc',
          'mastercompanyees.companyname',
        ])
        .where('accessuser.isdelete = :isdelete', { isdelete: false })
        .andWhere('masteruser.email = :email', { email })
        .getCount();

      return { data, total };
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

  async createAccessUser(accessuser: AddAccessUserDto) {
    try {
      const query = await this.accessUserRepository
        .createQueryBuilder('accessuser')
        .insert()
        .into(AccessUser)
        .values({
          companyid: accessuser.companyid,
          userid: accessuser.userid,
          createdby: accessuser.createdby,
          createdtime: new Date(),
          sourcecreatedmodifiedtime: new Date(),
        })
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
