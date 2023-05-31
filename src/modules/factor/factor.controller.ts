import { Controller, Get, Post, Query, Body } from '@nestjs/common';
import { PageOptionsDTO } from 'src/common/dto/page-options.dto';
import { PageDto } from 'src/common/dto/page.dto';
import { FactorDto } from './dto/factor.dto';
import { FactorService } from './factor.service';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { GetByIdDto } from 'src/common/dto/get-by-id';
import { AddFactorDto } from './dto/add-factor.dto';

@ApiTags('factor')
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

  @Get('/getOne')
  @ApiCreatedResponse({ type: FactorDto })
  async getFactorById(@Query() id: GetByIdDto): Promise<FactorDto | undefined> {
    return this.factorService.getFactorById(id);
  }

  @Post('/createOne')
  @ApiCreatedResponse({ type: FactorDto })
  async createFactor(@Body() factor: AddFactorDto) {
    return this.factorService.addFactor(factor);
  }
}
