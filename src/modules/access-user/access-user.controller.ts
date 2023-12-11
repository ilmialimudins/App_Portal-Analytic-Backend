import {
  Controller,
  Get,
  Query,
  Post,
  Body,
  Patch,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { AccessUserService } from './access-user.service';
import { AccessUserDto } from './dto/access-user.dto';
import { AddAccessUserDto } from './dto/add-access-user.dto';
import { UpdateAccessUserDto } from './dto/update-access-user.dto';
import { AuthGuard } from 'src/guards/auth/auth.guard';
import { UserInfo } from 'src/decorators/use-info.decorator';
import { UserInfoDTO } from '../duende-authentication/dto/userinfo.dto';

@ApiBearerAuth()
@UseGuards(AuthGuard)
@ApiTags('Access User')
@Controller('accessuser')
export class AccessUserController {
  constructor(private accessUserService: AccessUserService) {}

  @Get('/')
  @ApiCreatedResponse({ type: AccessUserDto })
  async getAccessUser(
    @Query('page') page: number,
    @Query('take') take: number,
    @Query('email') email: string,
  ): Promise<{
    data: AccessUserDto[];
    page: number;
    take: number;
    itemCount: number;
    pageCount: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
  }> {
    return this.accessUserService.getAllAccessUser(page, take, email);
  }

  @Get('/getAccessUserId')
  @ApiCreatedResponse({ type: AccessUserDto })
  async getAccessUserId(
    @Query('accessuserid') accessuserid: number,
  ): Promise<AccessUserDto | undefined> {
    return this.accessUserService.getAccessUserId(accessuserid);
  }

  @Post('/createAccessUser')
  @ApiCreatedResponse({ type: AccessUserDto })
  async createAccessUser(
    @Body() accessuser: AddAccessUserDto,
    @UserInfo() userinfo: UserInfoDTO,
  ) {
    return this.accessUserService.createAccessUser(accessuser, userinfo);
  }

  @Patch('/updateAccessUser')
  @ApiCreatedResponse({ type: AccessUserDto })
  async updateAccessUser(
    @Query('accessuserid') accessuserid: number,
    @Body() accessuser: UpdateAccessUserDto,
    @UserInfo() userinfo: UserInfoDTO,
  ) {
    return this.accessUserService.updateAccessUser(
      accessuserid,
      accessuser,
      userinfo,
    );
  }

  @Delete('/deleteAccessUser')
  @ApiCreatedResponse({ type: AccessUserDto })
  async deleteAccessUser(@Query('accessuserid') accessuserid: number) {
    return this.accessUserService.deleteAccessUser(accessuserid);
  }
}
