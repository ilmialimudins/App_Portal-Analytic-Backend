import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AccessUser } from './access-user.entity';
import { Repository } from 'typeorm';
import { AccessUserDto } from './dto/access-user.dto';
import { AddAccessUserDto } from './dto/add-access-user.dto';
import { UpdateAccessUserDto } from './dto/update-access-user.dto';
import { UserInfoDTO } from '../duende-authentication/dto/userinfo.dto';

@Injectable()
export class AccessUserService {
  constructor(
    @InjectRepository(AccessUser)
    private accessUserRepository: Repository<AccessUser>,
  ) {}

  async getAllAccessUser(
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

      let query = this.accessUserRepository
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
        ]);

      if (email) {
        query = query.where('LOWER(masteruser.email) LIKE :email', {
          email: `%${email.toLowerCase()}%`,
        });
      }

      const data = await query
        .andWhere('accessuser.isdelete = :isdelete', { isdelete: false })
        .orderBy('masteruser.sourcecreatedmodifiedtime', 'DESC')
        .offset(offset)
        .limit(take)
        .getRawMany();

      const itemCount = await query
        .andWhere('accessuser.isdelete = :isdelete', { isdelete: false })
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

  async createAccessUser(accessuser: AddAccessUserDto, userinfo: UserInfoDTO) {
    try {
      const createNow = new Date(new Date().getTime() + 7 * 60 * 60 * 1000);

      const year = createNow.getFullYear();
      const month = createNow.getMonth() + 1;
      const date = createNow.getDate();

      const createdDate = parseInt(`${year}${month}${date}`);

      const query = await this.accessUserRepository
        .createQueryBuilder('accessuser')
        .insert()
        .into(AccessUser)
        .values({
          companyid: accessuser.companyid,
          userid: accessuser.userid,
          createdby: userinfo.fullname,
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

  async updateAccessUser(
    accessuserid: number,
    accessuser: UpdateAccessUserDto,
    userinfo: UserInfoDTO,
  ) {
    try {
      const query = await this.accessUserRepository
        .createQueryBuilder()
        .update(AccessUser)
        .set({
          companyid: accessuser.companyid,
          userid: accessuser.userid,
          updatedby: userinfo.fullname,
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
      const query = await this.accessUserRepository
        .createQueryBuilder()
        .update(AccessUser)
        .set({ isdelete: 'true' })
        .where('aksesuserid = :accessuserid', { accessuserid })
        .execute();

      return query;
    } catch (error) {
      throw error;
    }
  }

  async deleteAccessUserByUserId(userid: number) {
    try {
      const query = await this.accessUserRepository
        .createQueryBuilder()
        .update(AccessUser)
        .set({ isdelete: 'true' })
        .where('userid = :userid', { userid })
        .execute();

      return query;
    } catch (error) {
      throw error;
    }
  }
}
