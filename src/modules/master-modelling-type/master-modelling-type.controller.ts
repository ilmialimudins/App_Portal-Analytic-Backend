import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/guards/auth/auth.guard';
import { ModellingTypeService } from './master-modelling-type.service';
import { ModellingTypeDto } from './dto/master-modelling-type.dto';
import { PageOptionsDTO } from 'src/common/dto/page-options.dto';
import { PageDto } from 'src/common/dto/page.dto';

@ApiBearerAuth()
@UseGuards(AuthGuard)
@ApiTags('Modelling Type')
@Controller('modelling-type')
export class ModellingTypeController {
  constructor(private modellingTypeService: ModellingTypeService) {}

  @Get('/')
  @ApiCreatedResponse({ type: ModellingTypeDto })
  async getModellingType(
    @Query() pageOptions: PageOptionsDTO,
  ): Promise<PageDto<ModellingTypeDto>> {
    return this.modellingTypeService.getAllModellingType(pageOptions);
  }
}
