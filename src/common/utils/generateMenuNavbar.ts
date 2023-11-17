/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  DataMenuDTO,
  ListMenuDTO,
} from 'src/modules/master-menu/dto/navbar-menu.dto';
import { MasterMenu } from 'src/modules/master-menu/master-menu.entity';
import { RoleMenu } from 'src/modules/role-menu/role-menu.entity';

const generateNavbarMenu = (listmenu: ListMenuDTO[], parent: number) => {
  const filteredRole = listmenu.filter((menu) => menu.parentid == parent);
  const result: DataMenuDTO[] = [];

  for (const item of filteredRole) {
    const childrenMenu = generateNavbarMenu(listmenu, item.menuid);
    result.push({
      label: item.menuname,
      sequence: item.sequence,
      url: item.url || '',
      children: childrenMenu,
    });
  }

  return result;
};
const constructAllMenu = (
  listRoleMenu: ListMenuDTO[],
  allMenu: MasterMenu[],
) => {
  const result: string[][] = [];

  listRoleMenu.forEach((item) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const parentMenu: any[] = [];

    let currentMenuID: number = item.parentid;

    const indexList = listRoleMenu.findIndex((x) => x.menuid == currentMenuID);

    while (currentMenuID !== 0 && indexList === -1) {
      const parentRecord = allMenu.find((x) => {
        return x.menuid == currentMenuID;
      });

      if (parentRecord) {
        parentMenu.unshift(parentRecord);
        currentMenuID = parentRecord.parentid;
      } else {
        break;
      }
    }

    result.push(parentMenu);
  });

  return result.flat(2);
};

export { generateNavbarMenu, constructAllMenu };
