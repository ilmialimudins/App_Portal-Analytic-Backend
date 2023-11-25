/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  ListMasterMenuDTO,
  ListMenuDTO,
} from 'src/modules/master-menu/dto/maintain-mastermenu.dto';
import { DataMenuDTO } from 'src/modules/master-menu/dto/navbar-menu.dto';
import { MasterMenu } from 'src/modules/master-menu/master-menu.entity';

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

const generateMasterMenu = (listMenu: ListMenuDTO[], parent: number) => {
  const filteredRole = listMenu.filter((menu) => menu.parentid == parent);
  const result: ListMasterMenuDTO[] = [];

  for (const item of filteredRole) {
    const childrenMenu = generateMasterMenu(listMenu, item.menuid);
    result.push({ ...item, children: childrenMenu });
  }

  return result;
};

const constructAllMenu = (
  listRoleMenu: ListMenuDTO[],
  allMenu: ListMenuDTO[],
) => {
  const result: Record<string, ListMenuDTO> = {};

  listRoleMenu.forEach((item) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const parentMenu: Record<string, ListMenuDTO> = {};

    let currentMenuID: number = item.parentid;

    const indexList = listRoleMenu.findIndex((x) => x.menuid == currentMenuID);

    while (currentMenuID !== 0 && indexList === -1) {
      const parentRecord = allMenu.find((x) => {
        return x.menuid == currentMenuID;
      });

      if (parentRecord) {
        parentMenu[parentRecord.menuid] = parentRecord;
        currentMenuID = parentRecord.parentid;
      } else {
        break;
      }
    }

    Object.assign(result, parentMenu);
  });

  return result;
};

export { generateNavbarMenu, constructAllMenu, generateMasterMenu };
