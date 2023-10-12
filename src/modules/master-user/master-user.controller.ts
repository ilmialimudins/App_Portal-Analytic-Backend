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

@ApiBearerAuth()
@UseGuards(AuthGuard)
@ApiTags('Master User')
@Controller('masteruser')
export class MasterUserController {
  constructor(private masteruserService: MasterUserService) {}

  @Get('/')
  @ApiCreatedResponse({ type: MasterUserDto })
  async getMasterUser(
    @Query('page') page: number,
    @Query('take') take: number,
  ): Promise<{
    data: MasterUserDto[];
    page: number;
    take: number;
    itemCount: number;
    pageCount: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
  }> {
    return this.masteruserService.getAllMasterUser(page, take);
  }

  @Get('/getMasterUserUsername')
  @ApiCreatedResponse({ type: MasterUserDto })
  async getMasterUserUsername(
    @Query('page') page: number,
    @Query('take') take: number,
    @Query('username') username: string,
  ): Promise<{
    data: MasterUserDto[];
    page: number;
    take: number;
    itemCount: number;
    pageCount: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
  }> {
    return this.masteruserService.getMasterUserUsername(page, take, username);
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
  async createMasterUser(@Body() masteruser: AddMasterUserDto) {
    return this.masteruserService.createMasterUser(masteruser);
  }

  @Patch('/updateMasterUser')
  @ApiCreatedResponse({ type: MasterUserDto })
  async updateMasterUser(
    @Query('userid') userid: number,
    @Body() masteruser: UpdateMasterUserDto,
  ) {
    return this.masteruserService.updateMasterUser(userid, masteruser);
  }

  @Delete('/deleteMasterUser')
  @ApiCreatedResponse({ type: MasterUserDto })
  async deleteMasterUser(@Query('userid') userid: number) {
    return this.masteruserService.deleteMasterUser(userid);
  }
}
