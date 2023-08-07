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
import { PageOptionsDTO } from 'src/common/dto/page-options.dto';
import { PageDto } from 'src/common/dto/page.dto';
import { AddDemographyDto } from './dto/add-master-demography.dto';
import { UpdateDemographyDto } from './dto/update-master-demography.dto';

@ApiTags('Demography')
@Controller('demography')
export class DemographyController {
  constructor(private demographyService: DemographyService) {}

  @Get('/')
  @ApiCreatedResponse({
    type: DemographyDto,
  })
  async getDemography(
    @Query() pageOptions: PageOptionsDTO,
  ): Promise<PageDto<DemographyDto>> {
    return this.demographyService.getAllDemography(pageOptions);
  }

  @Get('/getOne')
  @ApiCreatedResponse({
    type: DemographyDto,
  })
  async getDemographyById(
    @Query('demographyid') demographyid: number,
  ): Promise<DemographyDto | undefined> {
    return this.demographyService.getDemographyById(demographyid);
  }

  @Post('/createDemography')
  @ApiCreatedResponse({
    type: DemographyDto,
  })
  async createDemography(@Body() demography: AddDemographyDto) {
    return this.demographyService.createDemography(demography);
  }

  @Patch('/updateDemography')
  @ApiCreatedResponse({
    type: DemographyDto,
  })
  async updateDemography(
    @Query('demographyid') demographyid: number,
    @Body() demography: UpdateDemographyDto,
  ) {
    return this.demographyService.updateDemography(demographyid, demography);
  }

  @Delete('/deleteDemography')
  @ApiCreatedResponse({
    type: DemographyDto,
  })
  async deleteDemography(@Query('demographyid') demographyid: number) {
    return this.demographyService.deleteDemography(demographyid);
  }
}
