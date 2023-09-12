import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleMenu } from './role-menu.entity';
import { Repository } from 'typeorm';
import { AddRoleMenuDto } from './dto/add-role-menu.dto';
import { UpdateRoleMenuDto } from './dto/update-role-menu.dto';
import { RoleMenuDto } from './dto/role-menu.dto';

@Injectable()
export class RoleMenuService {
  constructor(
    @InjectRepository(RoleMenu)
    private roleMenuRepository: Repository<RoleMenu>,
  ) {}

  async getAllRoleMenu(
    page: number,
    pageSize: number,
  ): Promise<{ data: RoleMenu[]; total: number }> {
    try {
      const offset = (page - 1) * pageSize;

      const data = await this.roleMenuRepository
        .createQueryBuilder('rolemenu')
        .leftJoin('rolemenu.masterrole', 'masterrole')
        .leftJoin('rolemenu.mastermenu', 'mastermenu')
        .select(['masterrole.rolename', 'mastermenu.menuname'])
        .where('rolemenu.isdelete = :isdelete', { isdelete: 'false' })
        .orderBy('masterrole.rolemenu')
        .offset(offset)
        .limit(pageSize)
        .getRawMany();

      const total = await this.roleMenuRepository
        .createQueryBuilder('rolemenu')
        .leftJoin('rolemenu.masterrole', 'masterrole')
        .leftJoin('rolemenu.mastermenu', 'mastermenu')
        .select(['masterrole.rolename', 'mastermenu.menuname'])
        .where('rolemenu.isdelete = :isdelete', { isdelete: 'false' })
        .getCount();

      return { data, total };
    } catch (error) {
      throw error;
    }
  }

  async getRoleMenuId(rolemenuid: number): Promise<RoleMenuDto | undefined> {
    try {
      const query = await this.roleMenuRepository
        .createQueryBuilder('rolemenu')
        .where('rolemenu.rolemenuid = :rolemenuid', { rolemenuid })
        .where('rolemenu.isdelete = :isdelete', { isdelete: 'false' })
        .getOne();

      return query?.toDto();
    } catch (error) {
      throw error;
    }
  }

  async createRoleMenu(rolemenu: AddRoleMenuDto) {
    try {
      const query = await this.roleMenuRepository
        .createQueryBuilder('rolemenu')
        .insert()
        .into(RoleMenu)
        .values({
          roleid: rolemenu.roleid,
          menuid: rolemenu.menuid,
          createdby: rolemenu.createdby,
          createdtime: new Date(),
          sourcecreatedmodifiedtime: new Date(),
        })
        .execute();

      return query;
    } catch (error) {
      throw error;
    }
  }

  async updateRoleMenu(rolemenuid: number, rolemenu: UpdateRoleMenuDto) {
    try {
      const query = await this.roleMenuRepository
        .createQueryBuilder()
        .update(RoleMenu)
        .set({
          roleid: rolemenu.roleid,
          menuid: rolemenu.menuid,
          createdby: rolemenu.createdby,
        })
        .where('rolemenuid = :rolemenuid', { rolemenuid })
        .execute();

      return query;
    } catch (error) {
      throw error;
    }
  }

  async deleteRoleMenu(rolemenuid: number) {
    try {
      await this.roleMenuRepository
        .createQueryBuilder()
        .update(RoleMenu)
        .set({ isdelete: 'true' })
        .where('rolemenuid = :rolemenuid', { rolemenuid })
        .execute();

      return `Data berhasil di hapus`;
    } catch (error) {
      throw error;
    }
  }
}
