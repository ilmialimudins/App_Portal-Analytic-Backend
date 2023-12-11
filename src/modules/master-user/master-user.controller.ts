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
import { MasterUserService } from './master-user.service';
import { MasterUserDto } from './dto/master-user.dto';
import { AddMasterUserDto } from './dto/add-master-user.dto';
import { UpdateMasterUserDto } from './dto/update-master-user.dto';
import { AuthGuard } from 'src/guards/auth/auth.guard';
import { RoleUserService } from '../role-user/role-user.service';
import { AccessUserService } from '../access-user/access-user.service';
import { UserInfo } from 'src/decorators/use-info.decorator';
import { UserInfoDTO } from '../duende-authentication/dto/userinfo.dto';

@ApiBearerAuth()
@UseGuards(AuthGuard)
@ApiTags('Master User')
@Controller('masteruser')
export class MasterUserController {
  constructor(
    private masteruserService: MasterUserService,
    private roleUserService: RoleUserService,
    private accessUserService: AccessUserService,
  ) {}

  @Get('/')
  @ApiCreatedResponse({ type: MasterUserDto })
  async getMasterUser(
    @Query('page') page: number,
    @Query('take') take: number,
    @Query('user') user: string,
  ): Promise<{
    data: MasterUserDto[];
    page: number;
    take: number;
    itemCount: number;
    pageCount: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
  }> {
    return this.masteruserService.getAllMasterUser(page, take, user);
  }

  @Get('/getAllUserActive')
  @ApiCreatedResponse({ type: MasterUserDto })
  async getAllUserActive() {
    return this.masteruserService.getAllUserActive();
  }

  @Get('/checkDuplicateMasterUser')
  @ApiCreatedResponse({ type: MasterUserDto })
  async checkDuplicateMasterUser(
    @Query('username') username: string,
    @Query('email') email: string,
    @Query('npk') npk: string,
  ) {
    const result = await this.masteruserService.checkDuplicateMasterUser(
      username,
      email,
      npk,
    );

    if (result) {
      return { isDuplicate: true };
    } else {
      return { isDuplicate: false };
    }
  }

  @Get('/getMasterUserId')
  @ApiCreatedResponse({ type: MasterUserDto })
  async getMasterUserId(
    @Query('userid') userid: number,
  ): Promise<MasterUserDto | undefined> {
    return this.masteruserService.getMasterUserId(userid);
  }

  @Post('/createMasterUser')
  @ApiCreatedResponse({ type: MasterUserDto })
  async createMasterUser(
    @Body() masteruser: AddMasterUserDto,
    @UserInfo() userinfo: UserInfoDTO,
  ) {
    return this.masteruserService.createMasterUser(masteruser, userinfo);
  }

  @Patch('/updateMasterUser')
  @ApiCreatedResponse({ type: MasterUserDto })
  async updateMasterUser(
    @Query('userid') userid: number,
    @Body() masteruser: UpdateMasterUserDto,
    @UserInfo() userinfo: UserInfoDTO,
  ) {
    return this.masteruserService.updateMasterUser(
      userid,
      masteruser,
      userinfo,
    );
  }

  @Delete('/activeMasterUser')
  @ApiCreatedResponse({ type: MasterUserDto })
  async activeMasterUser(@Query('userid') userid: number) {
    return this.masteruserService.activeMasterUser(userid);
  }

  @Delete('/deactiveMasterUser')
  @ApiCreatedResponse({ type: MasterUserDto })
  async deactiveMasterUser(@Query('userid') userid: number) {
    await this.roleUserService.deleteRoleUserByUserId(userid);

    await this.accessUserService.deleteAccessUserByUserId(userid);

    return this.masteruserService.deactiveMasterUser(userid);
  }
}
