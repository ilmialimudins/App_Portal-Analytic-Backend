import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MasterUser } from './master-user.entity';
import { Repository } from 'typeorm';
import { MasterUserDto } from './dto/master-user.dto';
import { AddMasterUserDto } from './dto/add-master-user.dto';
import { UpdateMasterUserDto } from './dto/update-master-user.dto';

@Injectable()
export class MasterUserService {
  constructor(
    @InjectRepository(MasterUser)
    private masterUserRepository: Repository<MasterUser>,
  ) {}

  async getAllMasterUser(
    page: number,
    take: number,
  ): Promise<{
    data: MasterUserDto[];
    page: number;
    take: number;
    itemCount: number;
    pageCount: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
  }> {
    try {
      const offset = (page - 1) * take;

      const data = await this.masterUserRepository
        .createQueryBuilder('masteruser')
        .select([
          'userid',
          'companycode',
          'username',
          'email',
          'npk',
          'phonenumber',
          'companyname',
        ])
        .where('masteruser.isdelete = :isdelete', { isdelete: false })
        .orderBy('username')
        .offset(offset)
        .limit(take)
        .getRawMany();

      const itemCount = await this.masterUserRepository
        .createQueryBuilder('masteruser')
        .select([
          'userid',
          'companycode',
          'username',
          'email',
          'npk',
          'phonenumber',
          'companyname',
        ])
        .where('masteruser.isdelete = :isdelete', { isdelete: false })
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

  async getMasterUserUsername(
    page: number,
    take: number,
    username: string,
  ): Promise<{
    data: MasterUserDto[];
    page: number;
    take: number;
    itemCount: number;
    pageCount: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
  }> {
    try {
      const offset = (page - 1) * take;

      const data = await this.masterUserRepository
        .createQueryBuilder('masteruser')
        .select([
          'userid',
          'companycode',
          'username',
          'email',
          'npk',
          'phonenumber',
          'companyname',
        ])
        .where('masteruser.isdelete = :isdelete', { isdelete: false })
        .andWhere('LOWER(masteruser.username) LIKE :username', {
          username: `%${username.toLowerCase()}%`,
        })
        .orderBy('username')
        .offset(offset)
        .limit(take)
        .getRawMany();

      const itemCount = await this.masterUserRepository
        .createQueryBuilder('masteruser')
        .select([
          'userid',
          'companycode',
          'username',
          'email',
          'npk',
          'phonenumber',
          'companyname',
        ])
        .where('masteruser.isdelete = :isdelete', { isdelete: false })
        .andWhere('LOWER(masteruser.username) LIKE :username', {
          username: `%${username.toLowerCase()}%`,
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

  async getMasterUserId(userid: number): Promise<MasterUserDto | undefined> {
    try {
      const query = await this.masterUserRepository
        .createQueryBuilder('masteruser')
        .where('masteruser.userid = :userid', { userid })
        .getOne();

      return query?.toDto();
    } catch (error) {
      throw error;
    }
  }

  async createMasterUser(masteruser: AddMasterUserDto) {
    try {
      const query = await this.masterUserRepository
        .createQueryBuilder('masteruser')
        .insert()
        .into(MasterUser)
        .values({
          npk: masteruser.npk,
          username: masteruser.username,
          phonenumber: masteruser.phonenumber,
          companycode: masteruser.companycode,
          companyname: masteruser.companyname,
          email: masteruser.email,
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

  async updateMasterUser(userid: number, masteruser: UpdateMasterUserDto) {
    try {
      const query = await this.masterUserRepository
        .createQueryBuilder()
        .update(MasterUser)
        .set({
          npk: masteruser.npk,
          username: masteruser.username,
          phonenumber: masteruser.phonenumber,
          companycode: masteruser.companycode,
          companyname: masteruser.companyname,
          email: masteruser.email,
        })
        .where('userid = :userid', { userid })
        .execute();

      return query;
    } catch (error) {
      throw error;
    }
  }

  async deleteMasterUser(userid: number) {
    try {
      const query = await this.masterUserRepository
        .createQueryBuilder()
        .update(MasterUser)
        .set({ isdelete: 'true' })
        .where('userid = :userid', { userid })
        .execute();

      return query;
    } catch (error) {
      throw error;
    }
  }
}
