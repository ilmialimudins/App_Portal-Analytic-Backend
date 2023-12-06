import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleMenu } from './role-menu.entity';
import { In, Repository } from 'typeorm';
import { AddRoleMenuDto } from './dto/add-role-menu.dto';
import { UpdateRoleMenuDto } from './dto/update-role-menu.dto';
import { RoleMenuDto } from './dto/role-menu.dto';

@Injectable()
export class RoleMenuService {
  constructor(
    @InjectRepository(RoleMenu)
    private roleMenuRepository: Repository<RoleMenu>,
  ) {}

  async getAllRoleMenu() {
    try {
      const data = await this.roleMenuRepository
        .createQueryBuilder('rolemenu')
        .leftJoin('rolemenu.masterrole', 'masterrole')
        .leftJoin('rolemenu.mastermenu', 'mastermenu')
        .select([
          'rolemenu.rolemenuid',
          'masterrole.rolename',
          'mastermenu.menuname',
        ])
        .where('rolemenu.isdelete = :isdelete', { isdelete: false })
        .orderBy('masterrole.rolename', 'ASC')
        .getRawMany();

      return data;
    } catch (error) {
      throw error;
    }
  }

  async getRoleMenuId(rolemenuid: number): Promise<RoleMenuDto | undefined> {
    try {
      const query = await this.roleMenuRepository
        .createQueryBuilder('rolemenu')
        .where('rolemenu.rolemenuid = :rolemenuid', { rolemenuid })
        .where('rolemenu.isdelete = :isdelete', { isdelete: false })
        .getOne();

      return query?.toDto();
    } catch (error) {
      throw error;
    }
  }

  async createRoleMenu(rolemenu: AddRoleMenuDto) {
    try {
      const createNow = new Date(new Date().getTime() + 7 * 60 * 60 * 1000);

      const year = createNow.getFullYear();
      const month = createNow.getMonth() + 1;
      const date = createNow.getDate();

      const createdDate = parseInt(`${year}${month}${date}`);

      const query = await this.roleMenuRepository
        .createQueryBuilder('rolemenu')
        .insert()
        .into(RoleMenu)
        .values({
          roleid: rolemenu.roleid,
          menuid: rolemenu.menuid,
          createdby: rolemenu.createdby,
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

  async updateRoleMenu(rolemenuid: number, rolemenu: UpdateRoleMenuDto) {
    try {
      const query = await this.roleMenuRepository
        .createQueryBuilder()
        .update(RoleMenu)
        .set({
          roleid: rolemenu.roleid,
          menuid: rolemenu.menuid,
          updatedby: rolemenu.updatedby,
        })
        .where('rolemenuid = :rolemenuid', { rolemenuid })
        .execute();

      return query;
    } catch (error) {
      throw error;
    }
  }

  async getRoleByMenu(menuid: number, roleids: number[]) {
    try {
      const query = await this.roleMenuRepository.find({
        where: { menuid: menuid, roleid: In(roleids) },
      });

      return query;
    } catch (error) {
      throw error;
    }
  }

  async deleteRoleMenu(rolemenuid: number) {
    try {
      const query = await this.roleMenuRepository
        .createQueryBuilder()
        .update(RoleMenu)
        .set({ isdelete: 'true' })
        .where('rolemenuid = :rolemenuid', { rolemenuid })
        .execute();

      return query;
    } catch (error) {
      throw error;
    }
  }

  async getMenuByListRole(rolelist: string[]) {
    try {
      const result = await this.roleMenuRepository
        .createQueryBuilder('rolemenu')
        .select([
          'DISTINCT mastermenu.menuid as menuid',
          'mastermenu.menuname as menuname',
          'mastermenu.parentid as parentid',
          'mastermenu.issection as issection',
          'mastermenu.sequence as sequence',
          'mastermenu.url as url',
        ])
        .leftJoin('rolemenu.masterrole', 'masterrole')
        .leftJoin('rolemenu.mastermenu', 'mastermenu')
        .where('masterrole.rolename IN (:...roleNames)', {
          roleNames: rolelist,
        })
        .orderBy('mastermenu.sequence', 'ASC')
        .addOrderBy('parentid', 'ASC')
        .addOrderBy('menuid', 'ASC')
        .getRawMany();

      return result;
    } catch (error) {
      throw error;
    }
  }
}
