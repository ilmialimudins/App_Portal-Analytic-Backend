import { DataMenuDTO } from 'src/modules/master-menu/dto/navbar-menu.dto';
import { RoleMenu } from 'src/modules/role-menu/role-menu.entity';

const generateNavbarMenu = (listmenu: RoleMenu[], parent: number) => {
  const filteredRole = listmenu.filter(
    (menu) => menu.mastermenu.parentid == parent,
  );
  const result: DataMenuDTO[] = [];

  for (const item of filteredRole) {
    const childrenMenu = generateNavbarMenu(listmenu, item.mastermenu.menuid);
    result.push({
      label: item.mastermenu.menuname,
      sequence: item.mastermenu.sequence,
      url: item.mastermenu.url,
      children: childrenMenu,
    });
  }

  return result;
};

export default generateNavbarMenu;
