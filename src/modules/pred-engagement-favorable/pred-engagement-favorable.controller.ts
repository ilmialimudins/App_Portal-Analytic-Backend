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
    @Query() { d_companyid }: GetAverageFavorableAllFactorQueryDTO,
  ): Promise<GetAverageFavorableAllFactorResultDTO[]> {
    return await this.predEngagementFavorableService.getAverageFavorableAllFactor(
      {
        d_companyid,
      },
    );
  }

  @Get('/favorable-detail')
  async getFavorableDetail(
    @Query() { d_companyid, d_factorid }: GetFavorableFactorDetailQueryDTO,
  ): Promise<GetFavorableFactorDetailDTO> {
    return await this.predEngagementFavorableService.getFavorableDetail({
      d_companyid,
      d_factorid,
    });
  }
}
