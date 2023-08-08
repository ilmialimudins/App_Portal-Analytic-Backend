import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { PageOptionsDTO } from 'src/common/dto/page-options.dto';
import { PageDto } from 'src/common/dto/page.dto';
import { MasterCompanyDto } from './dto/master-company.dto';
import { MasterCompanyService } from './master-company.service';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { GetByIdDto } from 'src/common/dto/get-by-id';
import { AuthGuard } from 'src/guards/auth/auth.guard';

@ApiTags('Master Company')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('master-company')
export class MasterCompanyController {
  constructor(private masterCompanyService: MasterCompanyService) {}
  @Get('/')
  @ApiOkResponse({ type: MasterCompanyDto })
  async getCompanies(
    @Query() pageOptions: PageOptionsDTO,
  ): Promise<PageDto<MasterCompanyDto>> {
    return this.masterCompanyService.getAllCompany(pageOptions);
  }

  @Get('/getOne')
  @ApiCreatedResponse({ type: MasterCompanyDto })
  async getCompanyById(
    @Query() id: GetByIdDto,
  ): Promise<MasterCompanyDto | undefined> {
    return this.masterCompanyService.getCompanyById(id);
  }
}
