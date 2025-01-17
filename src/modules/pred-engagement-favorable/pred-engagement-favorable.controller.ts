import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { PredEngagementFavorableService } from './pred-engagement-favorable.service';

import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import {
  GetAverageFavorableAllFactorQueryDTO,
  GetAverageFavorableAllFactorResultDTO,
} from './dto/get-engagement-favorable-factor.dto';
import {
  GetFavorableFactorDetailDTO,
  GetFavorableFactorDetailQueryDTO,
} from './dto/get-engagement-favorable-factor-detail.dto';
import { AuthGuard } from 'src/guards/auth/auth.guard';

@ApiBearerAuth()
@UseGuards(AuthGuard)
@ApiTags('Engagement Favorable')
@Controller('pred-engagement-favorable')
export class PredEngagementFavorableController {
  constructor(
    private readonly predEngagementFavorableService: PredEngagementFavorableService,
  ) {}

  @Get('/favorable-all-factor')
  @ApiOkResponse({ type: [GetAverageFavorableAllFactorResultDTO] })
  async getAllAverageFactor(
    @Query()
    {
      companyid,
      demography,
      demographyvalue,
    }: GetAverageFavorableAllFactorQueryDTO,
  ): Promise<GetAverageFavorableAllFactorResultDTO[]> {
    return await this.predEngagementFavorableService.getAverageFavorableAllFactor(
      {
        companyid,
        demography,
        demographyvalue,
      },
    );
  }

  @Get('/favorable-detail')
  async getFavorableDetail(
    @Query()
    {
      companyid,
      factorid,
      demography,
      demographyvalue,
    }: GetFavorableFactorDetailQueryDTO,
  ): Promise<GetFavorableFactorDetailDTO> {
    return await this.predEngagementFavorableService.getFavorableDetail({
      companyid,
      factorid,
      demography,
      demographyvalue,
    });
  }
}
