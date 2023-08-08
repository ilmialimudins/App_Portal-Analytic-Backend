import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { PredRelativeImportanceService } from './pred-relative-importance.service';

import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import {
  GetRelativeImportanceQueryDTO,
  RelativeImportancePerCompanyDTO,
} from './dto/get-relativeimportance-company.dto';
import { AuthGuard } from 'src/guards/auth/auth.guard';

@ApiBearerAuth()
@UseGuards(AuthGuard)
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
