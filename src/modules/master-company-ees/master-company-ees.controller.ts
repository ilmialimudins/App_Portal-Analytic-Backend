import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Query,
  Patch,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { MasterCompanyEESService } from './master-company-ees.service';
import { MasterCompanyEESDto } from './dto/master-company-ees.dto';
import { PageOptionsDTO } from 'src/common/dto/page-options.dto';
import { PageDto } from 'src/common/dto/page.dto';
import { AddMasterCompanyEESDto } from './dto/add-master-company-ees.dto';
import { UpdateMasterCompanyEESDto } from './dto/update-master-company-ees.dto';

@ApiTags('Master Company EES')
@Controller('master-company-ees')
export class MasterCompanyEESController {
  constructor(private masterCompanyServiceEES: MasterCompanyEESService) {}

  @Get('/')
  @ApiOkResponse({ type: MasterCompanyEESDto })
  async getAllCompany(
    @Query() pageOptions: PageOptionsDTO,
  ): Promise<PageDto<MasterCompanyEESDto>> {
    return this.masterCompanyServiceEES.getAllCompany(pageOptions);
  }

  @Get('/getOneCompany')
  @ApiCreatedResponse({ type: MasterCompanyEESDto })
  async getAllCompanyById(
    @Query('companyid') companyid: number,
  ): Promise<MasterCompanyEESDto | undefined> {
    return this.masterCompanyServiceEES.getCompanyById(companyid);
  }

  @Get('/getCompanyName')
  @ApiCreatedResponse({ type: MasterCompanyEESDto })
  async getCompanyEESName(
    @Query() pageOptions: PageOptionsDTO,
    @Query('name') name: string,
  ): Promise<PageDto<MasterCompanyEESDto | undefined>> {
    return this.masterCompanyServiceEES.getCompanyEESName(pageOptions, name);
  }

  @Post('/createCompany')
  @ApiCreatedResponse({
    type: MasterCompanyEESDto,
  })
  async createCompany(@Body() company: AddMasterCompanyEESDto) {
    return this.masterCompanyServiceEES.addCompany(company);
  }

  @Patch('updateCompany')
  @ApiCreatedResponse({
    type: MasterCompanyEESDto,
  })
  async updateCompany(
    @Query('companyid') companyid: number,
    @Body() company: UpdateMasterCompanyEESDto,
  ) {
    return this.masterCompanyServiceEES.updateCompany(companyid, company);
  }

  @Delete('/deleteCompany')
  @ApiCreatedResponse({
    type: MasterCompanyEESDto,
  })
  async deleteCompany(@Query('companyid') companyid: number): Promise<string> {
    return this.masterCompanyServiceEES.deleteCompany(companyid);
  }
}
