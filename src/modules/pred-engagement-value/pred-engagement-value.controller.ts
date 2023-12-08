import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { PageOptionsDTO } from 'src/common/dto/page-options.dto';
import { PageDto } from 'src/common/dto/page.dto';
import { PredEngagementValueDto } from './dto/pred-engagement-value.dto';
import { PredEngagamentValueService } from './pred-engagement-value.service';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

import {
  GetDemographyByCompanyDTO,
  GetDemographyValueByCompanyDTO,
  ListDemographyDTO,
  ListDemographyValueDTO,
} from './dto/get-demography.dto';
import {
  DriversDTO,
  GetAgregrationPerFactorDTO,
} from './dto/get-aggregation-factor.dto';
import { GetAverageDriverDTO } from './dto/get-average-driver.dto';
import { AggregationPerFactorDTO } from './dto/aggregation-factor.dto';
import { AuthGuard } from 'src/guards/auth/auth.guard';

@ApiBearerAuth()
@UseGuards(AuthGuard)
@ApiTags('Engagement Value')
@Controller('engagement-value')
export class PredEngagementValueController {
  constructor(private predEngagementValueService: PredEngagamentValueService) {}
  @Get('/')
  @ApiCreatedResponse({ type: PredEngagementValueDto })
  async getAllPredEngagementValues(
    @Query() pageOptions: PageOptionsDTO,
  ): Promise<PageDto<PredEngagementValueDto>> {
    return this.predEngagementValueService.getAllPredEngagementValues(
      pageOptions,
    );
  }

  @Get('/demography')
  @ApiOkResponse({ type: ListDemographyDTO })
  async getAllDemographyByCompany(@Query() query: GetDemographyByCompanyDTO) {
    return await this.predEngagementValueService.getDemographyByCompany(query);
  }

  @Get('/demographyvalue')
  @ApiOkResponse({ type: ListDemographyValueDTO })
  async getDemographyValue(@Query() query: GetDemographyValueByCompanyDTO) {
    return await this.predEngagementValueService.getDemographyValueByDemography(
      query,
    );
  }

  @Get('/average-driver')
  async getAverageDriver(@Query() query: GetAverageDriverDTO) {
    const data = await this.predEngagementValueService.getAverageDriver(query);

    return data;
  }

  @Post('/get-aggregation')
  @ApiOkResponse({ type: [AggregationPerFactorDTO] })
  async getAggregation(
    @Query() query: GetAgregrationPerFactorDTO,
    @Body() body: DriversDTO,
  ): Promise<AggregationPerFactorDTO[]> {
    return await this.predEngagementValueService.calculateAverageDriver(
      query,
      body.drivers,
    );
  }
}
