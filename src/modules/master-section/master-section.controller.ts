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
import { MasterSectionService } from './master-section.service';
import { MasterSectionDto } from './dto/master-section.dto';
import { AddMasterSectionDto } from './dto/add-master-section.dto';
import { UpdateMasterSectionDto } from './dto/update-master-section.dto';

@ApiBearerAuth()
@UseGuards(AuthGuard)
@ApiTags('Master Section')
@Controller('mastersection')
export class MasterSectionController {
  constructor(private masterSectionService: MasterSectionService) {}

  @Get('/')
  @ApiCreatedResponse({ type: MasterSectionDto })
  async getMasterSection(
    @Query('page') page: number,
    @Query('pageSize') pageSize: number,
  ): Promise<{ data: MasterSectionDto[]; total: number }> {
    return this.masterSectionService.getAllMasterSection(page, pageSize);
  }

  @Get('/getMasterSectionId')
  @ApiCreatedResponse({ type: MasterSectionDto })
  async getMasterSectionId(
    @Query('sectionid') sectionid: number,
  ): Promise<MasterSectionDto | undefined> {
    return this.masterSectionService.getMasterSectionId(sectionid);
  }

  @Get('/getLastMasterSectionCode')
  @ApiCreatedResponse({ type: MasterSectionDto })
  async getLastMasterSectionCode() {
    return this.masterSectionService.getLastMasterSectionCode();
  }

  @Post('/createMasterSection')
  @ApiCreatedResponse({ type: MasterSectionDto })
  async createMasterSection(@Body() mastersection: AddMasterSectionDto) {
    return this.masterSectionService.createMasterSection(mastersection);
  }

  @Patch('/updateMasterSection')
  @ApiCreatedResponse({ type: MasterSectionDto })
  async updateMasterSection(
    @Query('sectionid') sectionid: number,
    @Body() mastersection: UpdateMasterSectionDto,
  ) {
    return this.masterSectionService.updateMasterSection(
      sectionid,
      mastersection,
    );
  }

  @Delete('/deleteMasterSection')
  @ApiCreatedResponse({ type: MasterSectionDto })
  async deleteMasterSection(@Query('sectionid') sectionid: number) {
    return this.masterSectionService.deleteMasterSection(sectionid);
  }
}
