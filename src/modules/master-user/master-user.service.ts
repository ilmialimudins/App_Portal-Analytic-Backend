import {
  BadRequestException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MasterUser } from './master-user.entity';
import { Repository } from 'typeorm';
import { MasterUserDto } from './dto/master-user.dto';
import { AddMasterUserDto } from './dto/add-master-user.dto';
import { UpdateMasterUserDto } from './dto/update-master-user.dto';
import { RoleUserService } from '../role-user/role-user.service';
import { UserInfoDTO } from '../duende-authentication/dto/userinfo.dto';

@Injectable()
export class MasterUserService {
  constructor(
    @InjectRepository(MasterUser)
    private masterUserRepository: Repository<MasterUser>,

    @Inject(RoleUserService)
    private roleUserService: RoleUserService,
  ) {}

  async getAllMasterUser(
    page: number,
    take: number,
    user?: string,
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

      let query = this.masterUserRepository
        .createQueryBuilder('masteruser')
        .select([
          'userid',
          'companycode',
          'username',
          'fullname',
          'email',
          'npk',
          'phonenumber',
          'companyname',
          'isdelete',
        ]);

      if (user) {
        query = query.where(
          'LOWER(masteruser.email) LIKE :user OR LOWER(masteruser.username) LIKE :user OR LOWER(masteruser.fullname) LIKE :user ',
          { user: `%${user.toLowerCase()}%` },
        );
      }

      const data = await query
        .orderBy('masteruser.isdelete', 'ASC')
        .addOrderBy('masteruser.sourcecreatedmodifiedtime', 'DESC')
        .addOrderBy('masteruser.fullname', 'ASC')
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

  async getAllUserActive() {
    try {
      const query = await this.masterUserRepository
        .createQueryBuilder('masteruser')
        .where('masteruser.isdelete = :isdelete', { isdelete: 'Active' })
        .orderBy('masteruser.email', 'ASC')
        .getMany();

      return query;
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

  async checkDuplicateMasterUser(username: string, email: string, npk: string) {
    try {
      let query = this.masterUserRepository.createQueryBuilder('masteruser');

      if (username) {
        query = query.where('masteruser.username = :username', { username });
      }

      if (email) {
        query = query.where('masteruser.email = :email', { email });
      }

      if (npk) {
        query = query.where('masteruser.npk = :npk', { npk });
      }

      const data = query.getOne();
      return data;
    } catch (error) {
      throw error;
    }
  }

  async getMasterUserEmail(
    email: string,
  ): Promise<(MasterUserDto & { roles: string[] }) | undefined> {
    try {
      const searchableEmail = email.trim().toLocaleLowerCase();
      const user = await this.masterUserRepository
        .createQueryBuilder('masteruser')
        .where('masteruser.email = :email', { email: searchableEmail })
        .getOne();

      const userResult = user?.toDto();

      if (!userResult) {
        throw new BadRequestException('There is no user found');
      }

      const roles = await this.roleUserService.getUserRoles(userResult.userid);

      return {
        ...userResult,
        roles: roles.map((item) => item.masterrole.rolename),
      };
    } catch (error) {
      if (error.status === 401) {
        throw new UnauthorizedException('You are not authorize');
      }
      throw error;
    }
  }

  async createMasterUser(masteruser: AddMasterUserDto, userinfo: UserInfoDTO) {
    try {
      const createNow = new Date(new Date().getTime() + 7 * 60 * 60 * 1000);

      const year = createNow.getFullYear();
      const month = createNow.getMonth() + 1;
      const date = createNow.getDate();

      const createdDate = parseInt(`${year}${month}${date}`);

      const query = await this.masterUserRepository
        .createQueryBuilder('masteruser')
        .insert()
        .into(MasterUser)
        .values({
          npk: masteruser.npk,
          username: masteruser.username,
          fullname: masteruser.fullname,
          phonenumber: masteruser.phonenumber,
          companycode: masteruser.companycode,
          companyname: masteruser.companyname,
          email: masteruser.email,
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

  async updateMasterUser(
    userid: number,
    masteruser: UpdateMasterUserDto,
    userinfo: UserInfoDTO,
  ) {
    try {
      const query = await this.masterUserRepository
        .createQueryBuilder()
        .update(MasterUser)
        .set({
          npk: masteruser.npk,
          username: masteruser.username,
          fullname: masteruser.fullname,
          phonenumber: masteruser.phonenumber,
          companycode: masteruser.companycode,
          companyname: masteruser.companyname,
          email: masteruser.email,
          updatedby: userinfo.fullname,
        })
        .where('userid = :userid', { userid })
        .execute();

      return query;
    } catch (error) {
      throw error;
    }
  }

  async activeMasterUser(userid: number) {
    try {
      const query = await this.masterUserRepository
        .createQueryBuilder()
        .update(MasterUser)
        .set({ isdelete: 'Active' })
        .where('userid = :userid', { userid })
        .execute();

      return query;
    } catch (error) {
      throw error;
    }
  }

  async deactiveMasterUser(userid: number) {
    try {
      const query = await this.masterUserRepository
        .createQueryBuilder()
        .update(MasterUser)
        .set({ isdelete: 'Inactive' })
        .where('userid = :userid', { userid })
        .execute();

      return query;
    } catch (error) {
      throw error;
    }
  }
}
