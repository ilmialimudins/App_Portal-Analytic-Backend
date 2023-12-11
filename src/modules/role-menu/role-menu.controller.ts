import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/guards/auth/auth.guard';
import { RoleMenuService } from './role-menu.service';
import { RoleMenuDto } from './dto/role-menu.dto';
import { AddRoleMenuDto } from './dto/add-role-menu.dto';
import { GetRoleMenuDTO } from './dto/get-rolemenu-active.dto';
import { TransactionMaintainRoleMenuDTO } from './dto/update-role-menu.dto';
import { UserInfo } from 'src/decorators/use-info.decorator';
import { UserInfoDTO } from '../duende-authentication/dto/userinfo.dto';

@ApiBearerAuth()
@UseGuards(AuthGuard)
@ApiTags('Role Menu')
@Controller('rolemenu')
export class RoleMenuController {
  constructor(private roleMenuService: RoleMenuService) {}

  @Get('/')
  @ApiCreatedResponse({ type: RoleMenuDto })
  async getRoleMenu() {
    return this.roleMenuService.getAllRoleMenu();
  }

  @Get('/getRoleMenuId')
  @ApiCreatedResponse({ type: RoleMenuDto })
  async getRoleMenuId(
    @Query('rolemenuid') rolemenuid: number,
  ): Promise<RoleMenuDto | undefined> {
    return this.roleMenuService.getRoleMenuId(rolemenuid);
  }

  @Post('/createRoleMenu')
  @ApiCreatedResponse({ type: RoleMenuDto })
  async createRoleMenu(
    @Body() rolemenu: AddRoleMenuDto,
    @UserInfo() userinfo: UserInfoDTO,
  ) {
    return this.roleMenuService.createRoleMenu(rolemenu, userinfo);
  }

  @Post('/maintain-role-menu')
  @ApiCreatedResponse({ type: RoleMenuDto })
  async updateRoleMenu(
    @Body() body: TransactionMaintainRoleMenuDTO,
    @UserInfo() userinfo: UserInfoDTO,
  ) {
    return await this.roleMenuService.updateRoleMenu(body, userinfo);
  }

  @Delete('/deleteRoleMenu')
  @ApiCreatedResponse({ type: RoleMenuDto })
  async deleteRoleMenu(@Query('rolemenuid') rolemenuid: number) {
    return this.roleMenuService.deleteRoleMenu(rolemenuid);
  }

  @Get('/get-rolemenu-active')
  async getRoleMenuActive(@Query() query: GetRoleMenuDTO) {
    return this.roleMenuService.getAllMenuActiveByRole(query.roleid);
  }
}
