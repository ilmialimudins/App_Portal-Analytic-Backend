import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { PageOptionsDTO } from 'src/common/dto/page-options.dto';
import { PageDto } from 'src/common/dto/page.dto';
import { FactorDto } from './dto/factor.dto';
import { FactorService } from './factor.service';
import { ApiBearerAuth, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/guards/auth/auth.guard';

@ApiBearerAuth()
@UseGuards(AuthGuard)
@ApiTags('Factor')
@Controller('factor')
export class FactorController {
  constructor(private factorService: FactorService) {}
  @Get('/')
  @ApiCreatedResponse({ type: FactorDto })
  async getFactors(
    @Query() pageOptions: PageOptionsDTO,
  ): Promise<PageDto<FactorDto>> {
    return this.factorService.getAllFactor(pageOptions);
  }
}
