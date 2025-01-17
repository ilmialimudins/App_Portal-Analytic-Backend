import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from 'src/guards/auth/auth.guard';
import { MasterMenuService } from './master-menu.service';
import { MasterMenuDto } from './dto/master-menu.dto';
import { AddMasterMenuDto } from './dto/add-master-menu.dto';
import { UpdateMasterMenuDto } from './dto/update-master-menu.dto';
import { NavbarMenuDTO } from './dto/navbar-menu.dto';
import { UserInfo } from 'src/decorators/use-info.decorator';
import { UserInfoDTO } from '../duende-authentication/dto/userinfo.dto';
import { generateMasterMenu } from 'src/common/utils/generateMenuNavbar';
import { ListMasterMenuDTO } from './dto/maintain-mastermenu.dto';
import {
  AvailableMenusBodyDTO,
  AvailableMenusResponseBody,
} from './dto/available-menu.dto';
import { AvailableMenus } from 'src/decorators/menu-available.decorator';
import { MenuGuard } from 'src/guards/menu/menu.guard';

@ApiBearerAuth()
@UseGuards(AuthGuard)
@ApiTags('Master Menu')
@Controller('mastermenu')
export class MasterMenuController {
  constructor(private masterMenuService: MasterMenuService) {}

  @Get('/')
  @ApiOkResponse({ type: [ListMasterMenuDTO] })
  async getMasterMenu() {
    return generateMasterMenu(
      await this.masterMenuService.getAllMasterMenu(),
      0,
    );
  }

  @Get('/getMasterMenuParent')
  @ApiCreatedResponse({ type: MasterMenuDto })
  async getMasterMenuParent() {
    return this.masterMenuService.getAllMasterMenuParent();
  }

  @Get('/getmastermenu-detail')
  @ApiOkResponse({})
  async getMenuDetail(@Query('menuid') menuid: number) {
    return this.masterMenuService.getMasterMenuId(menuid);
  }

  @Get('/navbar-menu')
  @ApiOkResponse({ type: NavbarMenuDTO })
  async getNavbarMenu(@UserInfo() userInfo: UserInfoDTO) {
    return this.masterMenuService.getNavbarUserInfo(userInfo.email);
  }

  @Post('/createMasterMenu')
  @ApiCreatedResponse({ type: MasterMenuDto })
  async createMasterMenu(
    @Body() mastermenu: AddMasterMenuDto,
    @UserInfo() userInfo: UserInfoDTO,
  ) {
    return this.masterMenuService.createMasterMenu(mastermenu, userInfo);
  }

  @Patch('/updateMasterMenu')
  @ApiCreatedResponse({ type: MasterMenuDto })
  async updateMasterMenu(
    @Body() mastermenu: UpdateMasterMenuDto,
    @UserInfo() userInfo: UserInfoDTO,
  ) {
    return this.masterMenuService.updateMasterMenu(mastermenu, userInfo);
  }

  @Delete('/deleteMasterMenu')
  @ApiCreatedResponse({ type: MasterMenuDto })
  async deleteMasterMenu(@Query('menuid') menuid: number) {
    return this.masterMenuService.deleteMasterMenu(menuid);
  }

  @Post('/check-available-menu')
  @AvailableMenus(['MENU_001', 'MENU_002'])
  @UseGuards(MenuGuard)
  @ApiCreatedResponse({ type: AvailableMenusResponseBody })
  async checkAvailableMenu(
    @Body() data: AvailableMenusBodyDTO,
    @UserInfo() userInfo: UserInfoDTO,
  ) {
    return this.masterMenuService.checkMenuUrl(data.url, userInfo);
  }
}
