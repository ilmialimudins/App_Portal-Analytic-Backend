import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleUser } from './role-user.entity';
import { Repository } from 'typeorm';
import { RoleUserDto } from './dto/role-user.dto';
import { AddRoleUserDto } from './dto/add-role-user.dto';
import { UpdateRoleUserDto } from './dto/update-role-user.dto';

@Injectable()
export class RoleUserService {
  constructor(
    @InjectRepository(RoleUser)
    private roleUserRepository: Repository<RoleUser>,
  ) {}

  async getAllRoleUser(
    page: number,
    take: number,
    rolename?: string,
    email?: string,
  ): Promise<{
    data: RoleUserDto[];
    page: number;
    take: number;
    itemCount: number;
    pageCount: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
  }> {
    try {
      const offset = (page - 1) * take;

      let query = this.roleUserRepository
        .createQueryBuilder('roleuser')
        .leftJoin('roleuser.masteruser', 'masteruser')
        .leftJoin('roleuser.masterrole', 'masterrole')
        .select([
          'roleuser.roleuserid',
          'masteruser.email',
          'masterrole.rolename',
        ]);

      if (rolename && email) {
        query = query
          .where('LOWER(masterrole.rolename) LIKE :rolename', {
            rolename: `%${rolename.toLowerCase()}%`,
          })
          .andWhere('LOWER(masteruser.email) LIKE :email', {
            email: `%${email.toLowerCase()}%`,
          });
      } else if (rolename) {
        query = query.where('LOWER(masterrole.rolename) LIKE :rolename', {
          rolename: `%${rolename.toLowerCase()}%`,
        });
      } else if (email) {
        query = query.where('LOWER(masteruser.email) LIKE :email', {
          email: `%${email.toLowerCase()}%`,
        });
      }

      const data = await query
        .andWhere('roleuser.isdelete = :isdelete', { isdelete: false })
        .orderBy('masteruser.email')
        .offset(offset)
        .limit(take)
        .getRawMany();

      const itemCount = await query
        .andWhere('roleuser.isdelete = :isdelete', { isdelete: false })
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

  async getRoleUserId(roleuserid: number): Promise<RoleUserDto | undefined> {
    try {
      const query = await this.roleUserRepository
        .createQueryBuilder('roleuser')
        .where('roleuser.roleuserid = :roleuserid', { roleuserid })
        .where('roleuser.isdelete = :isdelete', { isdelete: false })
        .getOne();

      return query?.toDto();
    } catch (error) {
      throw error;
    }
  }

  async createRoleUser(roleuser: AddRoleUserDto) {
    try {
      const query = await this.roleUserRepository
        .createQueryBuilder('roleuser')
        .insert()
        .into(RoleUser)
        .values({
          roleid: roleuser.roleid,
          userid: roleuser.userid,
          isdelete: 'false',
          createdby: roleuser.createdby,
          createdtime: new Date(),
          sourcecreatedmodifiedtime: new Date(),
        })
        .execute();

      return query;
    } catch (error) {
      throw error;
    }
  }

  async updateRoleUser(roleuserid: number, roleuser: UpdateRoleUserDto) {
    try {
      const query = await this.roleUserRepository
        .createQueryBuilder()
        .update(RoleUser)
        .set({
          roleid: roleuser.roleid,
          userid: roleuser.userid,
          createdby: roleuser.createdby,
        })
        .where('roleuserid = :roleuserid', { roleuserid })
        .execute();

      return query;
    } catch (error) {
      throw error;
    }
  }

  async deleteRoleUser(roleuserid: number) {
    try {
      await this.roleUserRepository
        .createQueryBuilder()
        .update(RoleUser)
        .set({ isdelete: 'true' })
        .where('roleuserid = :roleuserid', { roleuserid })
        .execute();

      return `Data berhasil di hapus`;
    } catch (error) {
      throw error;
    }
  }
}
