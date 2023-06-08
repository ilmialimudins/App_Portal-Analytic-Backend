import { Controller, Get, Post, Query, Body } from '@nestjs/common';
import { PageOptionsDTO } from 'src/common/dto/page-options.dto';
import { PageDto } from 'src/common/dto/page.dto';
import { PredEngagementValueDto } from './dto/pred-engagement-value.dto';
import { PredEngagamentValueService } from './pred-engagement-value.service';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { GetByIdDto } from 'src/common/dto/get-by-id';
import { AddPredEngagamentValueDto } from './dto/add-pred-engagement-value.dto';

@ApiTags('Average Driver')
@Controller('average-driver')
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

  @Get('/getOne')
  @ApiCreatedResponse({ type: PredEngagementValueDto })
  async getPredEngagementValueById(
    @Query() id: GetByIdDto,
  ): Promise<PredEngagementValueDto | undefined> {
    return this.predEngagementValueService.getPredEngagementValueById(id);
  }

  @Post('/createOne')
  @ApiCreatedResponse({ type: PredEngagementValueDto })
  async createPredEngagementValue(
    @Body() predEngagementValue: AddPredEngagamentValueDto,
  ) {
    return this.predEngagementValueService.addPredEngagementValue(
      predEngagementValue,
    );
  }
}
