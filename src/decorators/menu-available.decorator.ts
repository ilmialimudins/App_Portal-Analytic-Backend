import { SetMetadata, UseGuards, applyDecorators } from '@nestjs/common';

import { MenuGuard } from 'src/guards/menu/menu.guard';

export const AvailableMenus = (menuCodes: string[]) => {
  return applyDecorators(
    SetMetadata('menucodes', menuCodes),
    UseGuards(MenuGuard),
  );
};
