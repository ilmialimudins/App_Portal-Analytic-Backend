import { Inject, Injectable } from '@nestjs/common/decorators';
import { InjectRepository } from '@nestjs/typeorm';
import { MasterMenu } from './master-menu.entity';
import { Repository } from 'typeorm';
import { MasterMenuDto } from './dto/master-menu.dto';
import { AddMasterMenuDto } from './dto/add-master-menu.dto';
import { UpdateMasterMenuDto } from './dto/update-master-menu.dto';
import { MasterUserService } from '../master-user/master-user.service';
import { ListMenuDTO, NavbarMenuDTO } from './dto/navbar-menu.dto';
import { BadRequestException } from '@nestjs/common';
import {
  constructAllMenu,
  generateNavbarMenu,
} from 'src/common/utils/generateMenuNavbar';
import { RoleMenuService } from '../role-menu/role-menu.service';
import { RoleUserService } from '../role-user/role-user.service';

@Injectable()
export class MasterMenuService {
  constructor(
    @InjectRepository(MasterMenu)
    private masterMenuRepository: Repository<MasterMenu>,

    @Inject(MasterUserService)
    private masterUserService: MasterUserService,

    @Inject(RoleMenuService)
    private roleMenuService: RoleMenuService,

    @Inject(RoleUserService)
    private roleUserService: RoleUserService,
  ) {}

  async getAllMasterMenu() {
    try {
      const data = await this.masterMenuRepository
        .createQueryBuilder('mastermenu')
        .select([
          'menuid',
          'menuname',
          'parentid',
          'sequence',
          'url',
          'issection',
        ])
        .where('mastermenu.isdelete = :isdelete', { isdelete: false })
        .orderBy('parentid', 'ASC')
        .getRawMany();

      return data;
    } catch (error) {
      throw error;
    }
  }

  async getAllMasterMenuParent() {
    try {
      const data = await this.masterMenuRepository
        .createQueryBuilder('mastermenu')
        .select(['menuid', 'menuname', 'parentid'])
        .where('mastermenu.isdelete = :isdelete', { isdelete: false })
        .andWhere('mastermenu.parentid = :parentid', { parentid: 0 })
        .orderBy('parentid', 'ASC')
        .getMany();

      return data;
    } catch (error) {
      throw error;
    }
  }

  async getMasterMenuId(menuid: number): Promise<MasterMenuDto | undefined> {
    try {
      const query = await this.masterMenuRepository
        .createQueryBuilder('mastermenu')
        .where('mastermenu.menuid = :menuid', { menuid })
        .getOne();

      return query?.toDto();
    } catch (error) {
      throw error;
    }
  }

  async checkDuplicateMenu(menuname: string) {
    try {
      const query = await this.masterMenuRepository
        .createQueryBuilder('mastermenu')
        .where('mastermenu.menuname = :menuname', { menuname })
        .where('mastermenu.isdelete = :isdelete', { isdelete: false })
        .getOne();

      return query;
    } catch (error) {
      throw error;
    }
  }

  async getLastMasterMenuCode() {
    try {
      const query = await this.masterMenuRepository
        .createQueryBuilder('mastermenu')
        .select('mastermenu.menucode')
        .orderBy('mastermenu.menuid', 'DESC')
        .getOne();

      return query;
    } catch (error) {
      throw error;
    }
  }

  async createMasterMenu(mastermenu: AddMasterMenuDto) {
    try {
      const query = await this.masterMenuRepository
        .createQueryBuilder('mastermenu')
        .insert()
        .into(MasterMenu)
        .values({
          menuname: mastermenu.menuname,
          parentid: mastermenu.parentid,
          sequence: mastermenu.sequence,
          url: mastermenu.url,
          issection: mastermenu.issection,
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

  async updateMasterMenu(menuid: number, mastermenu: UpdateMasterMenuDto) {
    try {
      const query = await this.masterMenuRepository
        .createQueryBuilder()
        .update(MasterMenu)
        .set({
          menuname: mastermenu.menuname,
          url: mastermenu.url,
        })
        .where('menuid = :menuid', { menuid })
        .execute();

      return query;
    } catch (error) {
      throw error;
    }
  }

  async deleteMasterMenu(menuid: number) {
    try {
      const query = await this.masterMenuRepository
        .createQueryBuilder()
        .update(MasterMenu)
        .set({ isdelete: 'true' })
        .where('menuid = :menuid', { menuid })
        .execute();

      return query;
    } catch (error) {
      throw error;
    }
  }

  async getNavbarUserInfo(useremail: string): Promise<NavbarMenuDTO> {
    try {
      const user = await this.masterUserService.getMasterUserEmail(useremail);

      if (!user) {
        throw new BadRequestException(
          'Cannot retrive navbar because there is no user in current database',
        );
      }

      const roles = await this.roleUserService.getUserRoles(user.userid);

      const listRole = roles.map((item) => item.masterrole.rolename);

      const listMenuByRole = (
        await this.roleMenuService.getMenuByListRole(listRole)
      ).map<ListMenuDTO>((item) => {
        const { menuid, menuname, parentid, issection, sequence, url } =
          item.mastermenu;
        return {
          menuid,
          menuname,
          parentid,
          issection,
          sequence,
          url,
        };
      });

      const allMenu = await this.getAllMasterMenu();
      const constructMenuData = constructAllMenu(listMenuByRole, allMenu);

      console.log(constructMenuData);
      const navbarMenu = generateNavbarMenu(listMenuByRole, 0);

      return {
        name: user.username,
        user_role: listRole,
        datamenu: navbarMenu,
      };
    } catch (error) {
      if (error) console.log(error);
      throw error;
    }
  }
}
