import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { DemographyService } from './master-demography.service';
import { DemographyDto } from './dto/master-demography.dto';
import { AddDemographyDto } from './dto/add-master-demography.dto';
import { UpdateDemographyDto } from './dto/update-master-demography.dto';

@ApiTags('Demography')
@Controller('demography')
export class DemographyController {
  constructor(private demographyService: DemographyService) {}

  @Get('/')
  @ApiCreatedResponse({ type: DemographyDto })
  async getDemography(
    @Query('page') page: number,
    @Query('pageSize') pageSize: number,
  ): Promise<{ data: DemographyDto[]; total: number }> {
    return this.demographyService.getAllDemography(page, pageSize);
  }

  @Get('/getDemographyName')
  @ApiCreatedResponse({ type: DemographyDto })
  async getDemographyName(
    @Query('page') page: number,
    @Query('pageSize') pageSize: number,
    @Query('Demography') demography: string,
  ): Promise<{ data: DemographyDto[]; total: number }> {
    return this.demographyService.getDemographyName(page, pageSize, demography);
  }

  @Get('/getDemographyId')
  @ApiCreatedResponse({ type: DemographyDto })
  async getDemographyById(
    @Query('demographyid') demographyid: number,
  ): Promise<DemographyDto | undefined> {
    return this.demographyService.getDemographyId(demographyid);
  }

  @Post('/createDemography')
  @ApiCreatedResponse({ type: DemographyDto })
  async createDemography(@Body() demography: AddDemographyDto) {
    return this.demographyService.createDemography(demography);
  }

  @Patch('/updateDemography')
  @ApiCreatedResponse({ type: DemographyDto })
  async updateDemography(
    @Query('demographyid') demographyid: number,
    @Body() demography: UpdateDemographyDto,
  ) {
    return this.demographyService.updateDemography(demographyid, demography);
  }

  @Delete('/deleteDemography')
  @ApiCreatedResponse({ type: DemographyDto })
  async deleteDemography(@Query('demographyid') demographyid: number) {
    return this.demographyService.deleteDemography(demographyid);
  }
}
