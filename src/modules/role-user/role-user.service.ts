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
    pageSize: number,
  ): Promise<{ data: RoleUserDto[]; total: number }> {
    try {
      const offset = (page - 1) * pageSize;

      const data = await this.roleUserRepository
        .createQueryBuilder('roleuser')
        .leftJoin('roleuser.masteruser', 'masteruser')
        .leftJoin('roleuser.masterrole', 'masterrole')
        .select(['masteruser.email', 'masterrole.rolename'])
        .where('roleuser.isdelete = :isdelete', { isdelete: false })
        .orderBy('masteruser.email')
        .offset(offset)
        .limit(pageSize)
        .getRawMany();

      const total = await this.roleUserRepository
        .createQueryBuilder('roleuser')
        .leftJoin('roleuser.masteruser', 'masteruser')
        .leftJoin('roleuser.masterrole', 'masterrole')
        .select(['masteruser.email', 'masterrole.rolename'])
        .where('roleuser.isdelete = :isdelete', { isdelete: false })
        .getCount();

      return { data, total };
    } catch (error) {
      throw error;
    }
  }

  async getRoleUserRolename(
    page: number,
    pageSize: number,
    rolename: string,
  ): Promise<{ data: RoleUserDto[]; total: number }> {
    try {
      const offset = (page - 1) * pageSize;

      const data = await this.roleUserRepository
        .createQueryBuilder('roleuser')
        .leftJoin('roleuser.masteruser', 'masteruser')
        .leftJoin('roleuser.masterrole', 'masterrole')
        .select(['masteruser.email', 'masterrole.rolename'])
        .where('roleuser.isdelete = :isdelete', { isdelete: false })
        .andWhere('masterrole.rolename = :rolename', { rolename })
        .orderBy('masteruser.email')
        .offset(offset)
        .limit(pageSize)
        .getRawMany();

      const total = await this.roleUserRepository
        .createQueryBuilder('roleuser')
        .leftJoin('roleuser.masteruser', 'masteruser')
        .leftJoin('roleuser.masterrole', 'masterrole')
        .select(['masteruser.email', 'masterrole.rolename'])
        .where('roleuser.isdelete = :isdelete', { isdelete: false })
        .andWhere('masterrole.rolename = :rolename', { rolename })
        .getCount();

      return { data, total };
    } catch (error) {
      throw error;
    }
  }

  async getRoleUserEmail(
    page: number,
    pageSize: number,
    email: string,
  ): Promise<{ data: RoleUserDto[]; total: number }> {
    try {
      const offset = (page - 1) * pageSize;

      const data = await this.roleUserRepository
        .createQueryBuilder('roleuser')
        .leftJoin('roleuser.masteruser', 'masteruser')
        .leftJoin('roleuser.masterrole', 'masterrole')
        .select(['masteruser.email', 'masterrole.rolename'])
        .where('roleuser.isdelete = :isdelete', { isdelete: false })
        .andWhere('masteruser.email = :email', { email })
        .orderBy('masteruser.email')
        .offset(offset)
        .limit(pageSize)
        .getRawMany();

      const total = await this.roleUserRepository
        .createQueryBuilder('roleuser')
        .leftJoin('roleuser.masteruser', 'masteruser')
        .leftJoin('roleuser.masterrole', 'masterrole')
        .select(['masteruser.email', 'masterrole.rolename'])
        .where('roleuser.isdelete = :isdelete', { isdelete: false })
        .andWhere('masteruser.email = :email', { email })
        .getCount();

      return { data, total };
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
