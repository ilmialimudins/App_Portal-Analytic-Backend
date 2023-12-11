import { BaseTransaction } from 'src/common/abstract.transaction';
import { DataRoleMenuActiveDTO } from './dto/get-rolemenu-active.dto';
import { EntityManager, Repository } from 'typeorm';
import { RoleMenu } from './role-menu.entity';
import { TransactionMaintainRoleMenuDTO } from './dto/update-role-menu.dto';

import * as moment from 'moment';

export class MaintainRoleMenuTransaction extends BaseTransaction<
  TransactionMaintainRoleMenuDTO,
  DataRoleMenuActiveDTO[]
> {
  protected async execute(
    data: TransactionMaintainRoleMenuDTO,
    manager: EntityManager,
  ): Promise<DataRoleMenuActiveDTO[]> {
    const roleMenuRepository = manager.getRepository(RoleMenu);

    // Extract DataRoleMenuActive into flat array
    const extractdata = this.flattenDataRoleMenuActive(
      data.activeMenuData,
      data.roleid,
    );
    // Delete all role menu by roleid
    const deleted = await this.deleteRoleMenuByRoleID(
      roleMenuRepository,
      data.roleid,
    );
    console.log('successfully delete all existing menu', deleted);

    // Insert new role menu by roleid
    const newRoleMenu = await this.insertRoleMenuByRoleID(
      roleMenuRepository,
      extractdata,
    );
    console.log('successfully insert new role menu', newRoleMenu);

    return data.activeMenuData;
  }

  private flattenDataRoleMenuActive(
    data: DataRoleMenuActiveDTO[],
    roleid: number,
  ): { menuid: number; roleid: number }[] {
    const result: { menuid: number; roleid: number }[] = [];

    const flattern = (menu: DataRoleMenuActiveDTO) => {
      const flatMenu = {
        menuid: menu.menuid,
        roleid: roleid,
      };

      if (menu.isactive) {
        result.push(flatMenu);
      }

      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      if (menu.children && menu.children.length > 0) {
        menu.children.forEach((child) => flattern(child));
      }
    };

    for (const item of data) {
      flattern(item);
    }

    return result;
  }

  private async deleteRoleMenuByRoleID(
    repo: Repository<RoleMenu>,
    roleid: number,
  ) {
    return repo.delete({ roleid });
  }

  private async insertRoleMenuByRoleID(
    repo: Repository<RoleMenu>,
    data: { menuid: number; roleid: number }[],
  ) {
    return repo
      .createQueryBuilder()
      .insert()
      .values(
        data.map((item) => ({
          menuid: item.menuid,
          roleid: item.roleid,
          isdelete: 'false',
          createdby: this.metadata.userinfo?.username || 'System-Inject',
          createddate: parseInt(moment().format('YYYYMMDD')),
          createdtime: moment().toDate(),
          sourcecreatedmodifiedtime: moment().toDate(),
        })),
      )
      .execute();
  }
}
