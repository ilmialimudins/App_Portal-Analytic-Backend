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
import { MasterMenuService } from './master-menu.service';
import { MasterMenuDto } from './dto/master-menu.dto';
import { AddMasterMenuDto } from './dto/add-master-menu.dto';
import { UpdateMasterMenuDto } from './dto/update-master-menu.dto';

@ApiBearerAuth()
@UseGuards(AuthGuard)
@ApiTags('Master Menu')
@Controller('mastermenu')
export class MasterMenuController {
  constructor(private masterMenuService: MasterMenuService) {}

  @Get('/')
  @ApiCreatedResponse({ type: MasterMenuDto })
  async getMasterMenu(
    @Query('page') page: number,
    @Query('take') take: number,
  ): Promise<{
    data: MasterMenuDto[];
    page: number;
    take: number;
    itemCount: number;
    pageCount: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
  }> {
    return this.masterMenuService.getAllMasterMenu(page, take);
  }

  @Get('getLastMasterMenuCode')
  @ApiCreatedResponse({ type: MasterMenuDto })
  async getLastMasterMenuCode() {
    return this.masterMenuService.getLastMasterMenuCode();
  }

  @Post('/createMasterMenu')
  @ApiCreatedResponse({ type: MasterMenuDto })
  async createMasterMenu(@Body() mastermenu: AddMasterMenuDto) {
    return this.masterMenuService.createMasterMenu(mastermenu);
  }

  @Patch('/updateMasterMenu')
  @ApiCreatedResponse({ type: MasterMenuDto })
  async updateMasterMenu(
    @Query('menuid') menuid: number,
    @Body() mastermenu: UpdateMasterMenuDto,
  ) {
    return this.masterMenuService.updateMasterMenu(menuid, mastermenu);
  }

  @Delete('/deleteMasterMenu')
  @ApiCreatedResponse({ type: MasterMenuDto })
  async deleteMasterMenu(@Query('menuid') menuid: number) {
    return this.masterMenuService.deleteMasterMenu(menuid);
  }
}
