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
import { MasterRoleService } from './master-role.service';
import { MasterRoleDto } from './dto/master-role.dto';
import { AddMasterRoleDto } from './dto/add-master-role.dto';
import { UpdateMasterRoleDto } from './dto/update-master-role.dto';
import { AuthGuard } from 'src/guards/auth/auth.guard';

@ApiBearerAuth()
@UseGuards(AuthGuard)
@ApiTags('Master Role')
@Controller('masterrole')
export class MasterRoleController {
  constructor(private masterRoleService: MasterRoleService) {}

  @Get('/')
  @ApiCreatedResponse({ type: MasterRoleDto })
  async getMasterRole(
    @Query('page') page: number,
    @Query('pageSize') pageSize: number,
  ): Promise<{ data: MasterRoleDto[]; total: number }> {
    return this.masterRoleService.getAllMasterRole(page, pageSize);
  }

  @Get('/getMasterRoleName')
  @ApiCreatedResponse({ type: MasterRoleDto })
  async getMasterRoleName(
    @Query('page') page: number,
    @Query('pageSize') pageSize: number,
    @Query('rolename') rolename: string,
  ): Promise<{ data: MasterRoleDto[]; total: number }> {
    return this.masterRoleService.getMasterRoleName(page, pageSize, rolename);
  }

  @Get('/getMasterRoleId')
  @ApiCreatedResponse({ type: MasterRoleDto })
  async getMasterRoleId(
    @Query('roleid') roleid: number,
  ): Promise<MasterRoleDto | undefined> {
    return this.masterRoleService.getMasterRoleId(roleid);
  }

  @Get('/getLastMasterRoleCode')
  @ApiCreatedResponse({ type: MasterRoleDto })
  async getLastMasterRoleCode() {
    return this.masterRoleService.getLastMasterRoleCode();
  }

  @Post('/createMasterRole')
  @ApiCreatedResponse({ type: MasterRoleDto })
  async createMasterRole(@Body() masterrole: AddMasterRoleDto) {
    return this.masterRoleService.createMasterRole(masterrole);
  }

  @Patch('/updateMasterRole')
  @ApiCreatedResponse({ type: MasterRoleDto })
  async updateMasterRole(
    @Query('roleid') roleid: number,
    @Body() masterrole: UpdateMasterRoleDto,
  ) {
    return this.masterRoleService.updateMasterRole(roleid, masterrole);
  }

  @Delete('/deleteMasterRole')
  @ApiCreatedResponse({ type: MasterRoleDto })
  async deleteMasterRole(@Query('roleid') roleid: number) {
    return this.masterRoleService.deleteMasterRole(roleid);
  }
}
