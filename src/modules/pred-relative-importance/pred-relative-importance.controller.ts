import { Controller, Get, Query } from '@nestjs/common';
import { PredRelativeImportanceService } from './pred-relative-importance.service';

import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import {
  GetRelativeImportanceQueryDTO,
  RelativeImportancePerCompanyDTO,
} from './dto/get-relativeimportance-company.dto';
@ApiTags('Relative Importance')
@Controller('pred-relative-importance')
export class PredRelativeImportanceController {
  constructor(
    private readonly predRelativeImportanceService: PredRelativeImportanceService,
  ) {}

  @Get('/relativeimportance')
  @ApiOkResponse({ type: [RelativeImportancePerCompanyDTO] })
  async getRelativeImportanceByCompany(
    @Query() query: GetRelativeImportanceQueryDTO,
  ): Promise<RelativeImportancePerCompanyDTO[]> {
    return await this.predRelativeImportanceService.getRelativeImportanceByCompany(
      query,
    );
  }
}
