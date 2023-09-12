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
import { ApiBearerAuth, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/guards/auth/auth.guard';
import { RoleMenuService } from './role-menu.service';
import { RoleMenuDto } from './dto/role-menu.dto';
import { AddRoleMenuDto } from './dto/add-role-menu.dto';
import { UpdateRoleMenuDto } from './dto/update-role-menu.dto';

@ApiBearerAuth()
@UseGuards(AuthGuard)
@ApiTags('Role Menu')
@Controller('rolemenu')
export class RoleMenuController {
  constructor(private roleMenuService: RoleMenuService) {}

  @Get('/')
  @ApiCreatedResponse({ type: RoleMenuDto })
  async getRoleMenu(
    @Query('page') page: number,
    @Query('pageSize') pageSize: number,
  ): Promise<{ data: RoleMenuDto[]; total: number }> {
    return this.roleMenuService.getAllRoleMenu(page, pageSize);
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
  async createRoleMenu(@Body() rolemenu: AddRoleMenuDto) {
    return this.roleMenuService.createRoleMenu(rolemenu);
  }

  @Patch('/updateRoleMenu')
  @ApiCreatedResponse({ type: RoleMenuDto })
  async updateRoleMenu(
    @Query('rolemenuid') rolemenuid: number,
    @Body() rolemenu: UpdateRoleMenuDto,
  ) {
    return this.roleMenuService.updateRoleMenu(rolemenuid, rolemenu);
  }

  @Delete('/deleteRoleMenu')
  @ApiCreatedResponse({ type: RoleMenuDto })
  async deleteRoleMenu(@Query('rolemenuid') rolemenuid: number) {
    return this.roleMenuService.deleteRoleMenu(rolemenuid);
  }
}
