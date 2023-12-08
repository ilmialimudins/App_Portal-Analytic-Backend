import { Inject, Injectable } from '@nestjs/common/decorators';
import { InjectRepository } from '@nestjs/typeorm';
import { MasterMenu } from './master-menu.entity';
import { Repository } from 'typeorm';
import { MasterMenuDto } from './dto/master-menu.dto';
import { AddMasterMenuDto } from './dto/add-master-menu.dto';
import { UpdateMasterMenuDto } from './dto/update-master-menu.dto';
import { MasterUserService } from '../master-user/master-user.service';
import { NavbarMenuDTO } from './dto/navbar-menu.dto';
import { BadRequestException, forwardRef } from '@nestjs/common';
import {
  constructAllMenu,
  generateNavbarMenu,
} from 'src/common/utils/generateMenuNavbar';
import { RoleMenuService } from '../role-menu/role-menu.service';
import { RoleUserService } from '../role-user/role-user.service';
import { ListMenuDTO } from './dto/maintain-mastermenu.dto';
import { MappingMenuReportService } from '../mapping-menu-report/mapping-menu-report.service';
import { UserInfoDTO } from '../duende-authentication/dto/userinfo.dto';
import { AddMasterMenuTransaction } from './add-master-menu.transaction';
import { EditMasterMenuTransaction } from './edit-master-menu.transaction';

@Injectable()
export class MasterMenuService {
  constructor(
    @InjectRepository(MasterMenu)
    private masterMenuRepository: Repository<MasterMenu>,

    @Inject(MasterUserService)
    private masterUserService: MasterUserService,

    @Inject(forwardRef(() => RoleMenuService))
    private roleMenuService: RoleMenuService,

    @Inject(RoleUserService)
    private roleUserService: RoleUserService,

    @Inject(MappingMenuReportService)
    private mappingMenuReportService: MappingMenuReportService,

    @Inject(AddMasterMenuTransaction)
    private addMasterMenuTransactionService: AddMasterMenuTransaction,

    @Inject(EditMasterMenuTransaction)
    private editMasterMenuTransactionService: EditMasterMenuTransaction,
  ) {}

  async getAllMasterMenu() {
    try {
      const data: ListMenuDTO[] = await this.masterMenuRepository
        .createQueryBuilder('mastermenu')
        .select([
          'menuid',
          'menuname',
          'menucode',
          'parentid',
          'sequence',
          'url',
          'issection',
        ])
        .where('mastermenu.isdelete = :isdelete', { isdelete: false })
        .orderBy('sequence', 'ASC')
        .addOrderBy('parentid', 'ASC')
        .addOrderBy('menuid', 'ASC')
        .getRawMany();

      return await this.concatMenuURLIsSection(data);
    } catch (error) {
      throw error;
    }
  }

  private async concatMenuURLIsSection(data: ListMenuDTO[]) {
    try {
      return Promise.all(
        data.map(async (menu) => {
          if (menu.issection === 0) {
            return menu;
          }

          const getReport =
            await this.mappingMenuReportService.getOneMenuReportByMenuID(
              menu.menuid,
            );
          let mappingUrlReport = '';

          if (getReport) {
            mappingUrlReport = `/${getReport.masterreport.masterworkspace.workspacepowerbiid}/${getReport.masterreport.reportpowerbiiid}/${getReport.masterreport.datasetpowerbiid}/${getReport.mastersection.sectioncodepowerbiid}`;
          }

          return { ...menu, url: `${menu.url}${mappingUrlReport}` };
        }),
      );
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
        .getRawMany();

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

  private incrementMenuCode(menuCode: string) {
    const numericPart = parseInt(menuCode.substring(2));

    const newNumericPart = numericPart + 1;

    const newMenuCode =
      menuCode.substring(0, 2) + newNumericPart.toString().padStart(5, '0');

    return newMenuCode;
  }

  async createMasterMenu(mastermenu: AddMasterMenuDto, userInfo: UserInfoDTO) {
    try {
      const lastMenuCode = await this.getLastMasterMenuCode();

      const nextMenuCode = lastMenuCode
        ? this.incrementMenuCode(lastMenuCode.menucode)
        : null;

      const transac = await this.addMasterMenuTransactionService
        .setMetadata({
          userinfo: userInfo,
        })
        .run({ ...mastermenu, menucode: nextMenuCode });

      return transac;
    } catch (error) {
      throw error;
    }
  }

  async updateMasterMenu(
    mastermenu: UpdateMasterMenuDto,
    userInfo: UserInfoDTO,
  ) {
    try {
      return await this.editMasterMenuTransactionService
        .setMetadata({ userinfo: userInfo })
        .run(mastermenu);
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

      let listMenuByRole = (
        await this.roleMenuService.getMenuByListRole(listRole)
      ).map<ListMenuDTO>((item) => {
        const {
          menuid,
          menuname,
          parentid,
          issection,
          sequence,
          url,
          menucode,
        } = item;
        return {
          menuid,
          menuname,
          parentid,
          issection,
          sequence,
          menucode,
          url,
        };
      });
      listMenuByRole = await this.concatMenuURLIsSection(listMenuByRole);

      const allMenu = await this.getAllMasterMenu();

      const constructMenuData = constructAllMenu(listMenuByRole, allMenu);

      const navbarMenu = generateNavbarMenu(
        [...Object.values(constructMenuData), ...listMenuByRole],
        0,
      );

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
