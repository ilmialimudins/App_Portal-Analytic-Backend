import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleMenu } from './role-menu.entity';
import { In, Repository } from 'typeorm';
import { AddRoleMenuDto } from './dto/add-role-menu.dto';
import { TransactionMaintainRoleMenuDTO } from './dto/update-role-menu.dto';
import { RoleMenuDto } from './dto/role-menu.dto';
import { MasterMenuService } from '../master-menu/master-menu.service';
import { ListMenuDTO } from '../master-menu/dto/maintain-mastermenu.dto';
import { DataRoleMenuActiveDTO } from './dto/get-rolemenu-active.dto';
import { UserInfoDTO } from '../duende-authentication/dto/userinfo.dto';
import { MaintainRoleMenuTransaction } from './maintain-rolemenu.transaction';

@Injectable()
export class RoleMenuService {
  constructor(
    @InjectRepository(RoleMenu)
    private roleMenuRepository: Repository<RoleMenu>,

    @Inject(forwardRef(() => MasterMenuService))
    private masterMenuService: MasterMenuService,

    @Inject(MaintainRoleMenuTransaction)
    private maintainMenuTransaction: MaintainRoleMenuTransaction,
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

  async createRoleMenu(rolemenu: AddRoleMenuDto, userinfo: UserInfoDTO) {
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

  async updateRoleMenu(
    data: TransactionMaintainRoleMenuDTO,
    userinfo: UserInfoDTO,
  ) {
    try {
      return this.maintainMenuTransaction.setMetadata({ userinfo }).run(data);
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

  async getMenuByListRole(rolelist: string[], roleids?: number[]) {
    try {
      const query = this.roleMenuRepository
        .createQueryBuilder('rolemenu')
        .select([
          'DISTINCT mastermenu.menuid as menuid',
          'mastermenu.menuname as menuname',
          'mastermenu.parentid as parentid',
          'mastermenu.issection as issection',
          'mastermenu.sequence as sequence',
          'mastermenu.menucode as menucode',
          'mastermenu.url as url',
        ])
        .leftJoin('rolemenu.masterrole', 'masterrole')
        .leftJoin('rolemenu.mastermenu', 'mastermenu');

      if (roleids?.length) {
        query.where('masterrole.roleid IN (:...roleids)', {
          roleids: roleids,
        });
      } else {
        query.where('masterrole.rolename IN (:...roleNames)', {
          roleNames: rolelist,
        });
      }

      const result = await query
        .orderBy('mastermenu.sequence', 'ASC')
        .addOrderBy('parentid', 'ASC')
        .addOrderBy('menuid', 'ASC')
        .getRawMany();

      return result;
    } catch (error) {
      throw error;
    }
  }

  async getAllMenuActiveByRole(roleid: number) {
    const getAllMenu = await this.masterMenuService.getAllMasterMenu();
    const getRoleMenu = await this.getMenuByListRole([], [roleid]);

    const generateDataMantainRoleMenu = (
      ListMenuDTO: ListMenuDTO[],
      AvailableRoleMenu: ListMenuDTO[],
      parent: number,
    ) => {
      const filteredRole = ListMenuDTO.filter(
        (menu) => menu.parentid == parent,
      );
      const result: DataRoleMenuActiveDTO[] = [];

      for (const item of filteredRole) {
        const childrenMenu = generateDataMantainRoleMenu(
          ListMenuDTO,
          AvailableRoleMenu,
          item.menuid,
        );

        const isactive = AvailableRoleMenu.some(
          (role) => role.menuid === item.menuid,
        );
        result.push({
          menuid:
            typeof item.menuid === 'string'
              ? parseInt(item.menuid)
              : item.menuid,
          menuname: item.menuname,
          url: item.url ?? '',
          isactive,
          children: childrenMenu,
        });
      }

      return result;
    };

    const data = generateDataMantainRoleMenu(getAllMenu, getRoleMenu, 0);

    return data;
  }

  public async checkRoleUserExist(menuid: number, roleids: number[]) {
    return this.roleMenuRepository.find({
      where: { menuid: menuid, roleid: In(roleids) },
    });
  }
}
