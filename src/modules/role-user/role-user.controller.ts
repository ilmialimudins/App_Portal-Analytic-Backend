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
import { SyncRoleUserDTO } from './dto/update-role-user.dto';
import { AuthGuard } from 'src/guards/auth/auth.guard';
import { UserInfo } from 'src/decorators/use-info.decorator';
import { UserInfoDTO } from '../duende-authentication/dto/userinfo.dto';

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
    @Query('take') take: number,
    @Query('rolename') rolename: string,
    @Query('email') email: string,
  ): Promise<{
    data: RoleUserDto[];
    page: number;
    take: number;
    itemCount: number;
    pageCount: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
  }> {
    return this.roleUserService.getAllRoleUser(page, take, rolename, email);
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
  async createRoleUser(
    @Body() roleuser: AddRoleUserDto,
    @UserInfo() userinfo: UserInfoDTO,
  ) {
    return this.roleUserService.createRoleUser(roleuser, userinfo);
  }

  @Patch('/updateRoleUser')
  @ApiCreatedResponse({ type: RoleUserDto })
  async updateRoleUser(
    @Body() roleuser: SyncRoleUserDTO,
    @UserInfo() userinfo: UserInfoDTO,
  ) {
    return this.roleUserService.updateRoleUser(roleuser, userinfo);
  }

  @Delete('/deleteRoleUser')
  @ApiCreatedResponse({ type: RoleUserDto })
  async deleteRoleUser(@Query('roleuserid') roleuserid: number) {
    return this.roleUserService.deleteRoleUser(roleuserid);
  }
}
