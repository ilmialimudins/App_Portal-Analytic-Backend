import { Controller, Get, Post, Query, Body } from '@nestjs/common';
import { PageOptionsDTO } from 'src/common/dto/page-options.dto';
import { PageDto } from 'src/common/dto/page.dto';
import { MasterCompanyDto } from './dto/master-company.dto';
import { MasterCompanyService } from './master-company.service';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { GetByIdDto } from 'src/common/dto/getById.dto';
import { AddCompanyDto } from 'src/modules/master-company/dto/addCompany.dto';

@ApiTags('master-company')
@Controller('master-company')
export class MasterCompanyController {
  constructor(private masterCompanyService: MasterCompanyService) {}
  @Get('/')
  @ApiCreatedResponse({ type: MasterCompanyDto })
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

  @Post('/createOne')
  @ApiCreatedResponse({ type: MasterCompanyDto })
  async createMasterCompany(@Body() company: AddCompanyDto) {
    return this.masterCompanyService.addCompany(company);
  }
}
