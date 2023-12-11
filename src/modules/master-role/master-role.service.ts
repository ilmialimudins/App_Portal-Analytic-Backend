import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MasterRole } from './master-role.entity';
import { Repository } from 'typeorm';
import { MasterRoleDto } from './dto/master-role.dto';
import { AddMasterRoleDto } from './dto/add-master-role.dto';
import { UpdateMasterRoleDto } from './dto/update-master-role.dto';
import { UserInfoDTO } from '../duende-authentication/dto/userinfo.dto';

@Injectable()
export class MasterRoleService {
  constructor(
    @InjectRepository(MasterRole)
    private masterRoleRepository: Repository<MasterRole>,
  ) {}

  async getAllMasterRole(
    page: number,
    take: number,
    rolename?: string,
  ): Promise<{
    data: MasterRoleDto[];
    page: number;
    take: number;
    itemCount: number;
    pageCount: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
  }> {
    try {
      const offset = (page - 1) * take;

      let query = this.masterRoleRepository
        .createQueryBuilder('masterrole')
        .select(['roleid', 'rolename', 'roledesc']);

      if (rolename) {
        query = query.where('LOWER(masterrole.rolename) LIKE :rolename', {
          rolename: `%${rolename.toLowerCase()}%`,
        });
      }

      const data = await query
        .andWhere('masterrole.isdelete = :isdelete', { isdelete: false })
        .orderBy('masterrole.sourcecreatedmodifiedtime', 'DESC')
        .offset(offset)
        .limit(take)
        .getRawMany();

      const itemCount = await query
        .andWhere('masterrole.isdelete = :isdelete', { isdelete: false })
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

  async getMasterRoleId(roleid: number): Promise<MasterRoleDto | undefined> {
    try {
      const query = await this.masterRoleRepository
        .createQueryBuilder('masterrole')
        .where('masterrole.roleid = :roleid', { roleid })
        .getOne();

      return query?.toDto();
    } catch (error) {
      throw error;
    }
  }

  async checkDuplicateMasterRole(rolename: string) {
    try {
      const query = await this.masterRoleRepository
        .createQueryBuilder('masterrole')
        .where('masterrole.rolename = :rolename', { rolename })
        .andWhere('masterrole.isdelete = :isdelete', { isdelete: false })
        .getOne();

      return query;
    } catch (error) {
      throw error;
    }
  }

  async getLastMasterRoleCode() {
    try {
      const query = await this.masterRoleRepository
        .createQueryBuilder('masterrole')
        .select('masterrole.rolecode')
        .orderBy('masterrole.roleid', 'DESC')
        .getOne();

      return query;
    } catch (error) {
      throw error;
    }
  }

  async createMasterRole(masterrole: AddMasterRoleDto, userinfo: UserInfoDTO) {
    try {
      const createNow = new Date(new Date().getTime() + 7 * 60 * 60 * 1000);

      const year = createNow.getFullYear();
      const month = createNow.getMonth() + 1;
      const date = createNow.getDate();

      const createdDate = parseInt(`${year}${month}${date}`);

      const query = await this.masterRoleRepository
        .createQueryBuilder('masterrole')
        .insert()
        .into(MasterRole)
        .values({
          rolename: masterrole.rolename,
          roledesc: masterrole.roledesc,
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

  async updateMasterRole(
    roleid: number,
    masterrole: UpdateMasterRoleDto,
    userinfo: UserInfoDTO,
  ) {
    try {
      const query = await this.masterRoleRepository
        .createQueryBuilder()
        .update(MasterRole)
        .set({
          rolename: masterrole.rolename,
          roledesc: masterrole.roledesc,
          updatedby: userinfo.fullname,
        })
        .where('roleid = :roleid', { roleid })
        .execute();

      return query;
    } catch (error) {
      throw error;
    }
  }

  async deleteMasterRole(roleid: number) {
    try {
      const query = await this.masterRoleRepository
        .createQueryBuilder()
        .update(MasterRole)
        .set({ isdelete: 'true' })
        .where('roleid = :roleid', { roleid })
        .execute();

      return query;
    } catch (error) {
      throw error;
    }
  }
}
