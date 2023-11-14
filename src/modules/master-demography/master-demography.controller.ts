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
import { DemographyService } from './master-demography.service';
import { DemographyDto } from './dto/master-demography.dto';
import { AddDemographyDto } from './dto/add-master-demography.dto';
import { UpdateDemographyDto } from './dto/update-master-demography.dto';
import { AuthGuard } from 'src/guards/auth/auth.guard';

@ApiBearerAuth()
@UseGuards(AuthGuard)
@ApiTags('Demography')
@Controller('demography')
export class DemographyController {
  constructor(private demographyService: DemographyService) {}

  @Get('/')
  @ApiCreatedResponse({ type: DemographyDto })
  async getDemography(
    @Query('page') page: number,
    @Query('take') take: number,
    @Query('demography') demography: string,
  ): Promise<{
    data: DemographyDto[];
    page: number;
    take: number;
    itemCount: number;
    pageCount: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
  }> {
    return this.demographyService.getAllDemography(page, take, demography);
  }

  @Get('/getDemographyId')
  @ApiCreatedResponse({ type: DemographyDto })
  async getDemographyById(
    @Query('demographyid') demographyid: number,
  ): Promise<DemographyDto | undefined> {
    return this.demographyService.getDemographyId(demographyid);
  }

  @Get('/getDemographyAlias')
  @ApiCreatedResponse({ type: DemographyDto })
  async getDemographyAlias(@Query('demographyid') demographyid: number) {
    return this.demographyService.getDemographyAlias(demographyid);
  }

  @Get('/checkDuplicateDemographyAlias')
  @ApiCreatedResponse({ type: DemographyDto })
  async checkDuplicateDemographyAlias(
    @Query('demographyalias') demographyalias: string,
  ) {
    const result = await this.demographyService.checkDuplicateDemographyAlias(
      demographyalias,
    );

    if (result) {
      return { isDuplicate: true };
    } else {
      return { isDuplicate: false };
    }
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
