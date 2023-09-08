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
import { RoleUserService } from './role-user.service';
import { RoleUserDto } from './dto/role-user.dto';
import { AddRoleUserDto } from './dto/add-role-user.dto';
import { UpdateRoleUserDto } from './dto/update-role-user.dto';
import { AuthGuard } from 'src/guards/auth/auth.guard';

@ApiBearerAuth()
@UseGuards(AuthGuard)
@ApiTags('Role User')
@Controller('roleuser')
export class RoleUserController {
  constructor(private roleUserService: RoleUserService) {}

  @Get('/')
  @ApiCreatedResponse({ type: RoleUserDto })
  async getRoleUser(
    @Query('page') page: number,
    @Query('pageSize') pageSize: number,
  ): Promise<{ data: RoleUserDto[]; total: number }> {
    return this.roleUserService.getAllRoleUser(page, pageSize);
  }

  @Get('/getRoleUserRolename')
  @ApiCreatedResponse({ type: RoleUserDto })
  async getRoleUserRole(
    @Query('page') page: number,
    @Query('pageSize') pageSize: number,
    @Query('rolename') rolename: string,
  ): Promise<{ data: RoleUserDto[]; total: number }> {
    return this.roleUserService.getRoleUserRolename(page, pageSize, rolename);
  }

  @Get('/getRoleUserEmail')
  @ApiCreatedResponse({ type: RoleUserDto })
  async getRoleUserEmail(
    @Query('page') page: number,
    @Query('pageSize') pageSize: number,
    @Query('email') email: string,
  ): Promise<{ data: RoleUserDto[]; total: number }> {
    return this.roleUserService.getRoleUserEmail(page, pageSize, email);
  }

  @Get('/getRoleUserId')
  @ApiCreatedResponse({ type: RoleUserDto })
  async getRoleUserId(
    @Query('roleuserid') roleuserid: number,
  ): Promise<RoleUserDto | undefined> {
    return this.roleUserService.getRoleUserId(roleuserid);
  }

  @Post('/createRoleUser')
  @ApiCreatedResponse({ type: RoleUserDto })
  async createRoleUser(@Body() roleuser: AddRoleUserDto) {
    return this.roleUserService.createRoleUser(roleuser);
  }

  @Patch('/updateRoleUser')
  @ApiCreatedResponse({ type: RoleUserDto })
  async updateRoleUser(
    @Query('roleuserid') roleuserid: number,
    @Body() roleuser: UpdateRoleUserDto,
  ) {
    return this.roleUserService.updateRoleUser(roleuserid, roleuser);
  }

  @Delete('/deleteRoleUser')
  @ApiCreatedResponse({ type: RoleUserDto })
  async deleteRoleUser(@Query('roleuserid') roleuserid: number) {
    return this.roleUserService.deleteRoleUser(roleuserid);
  }
}
