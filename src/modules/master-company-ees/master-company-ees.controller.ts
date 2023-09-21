import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Query,
  Patch,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CompanyService } from './master-company-ees.service';
import { CompanyDto } from './dto/master-company-ees.dto';
import { AddCompanyDto } from './dto/add-master-company-ees.dto';
import { UpdateCompanyDto } from './dto/update-master-company-ees.dto';
import { AuthGuard } from 'src/guards/auth/auth.guard';

@ApiBearerAuth()
@UseGuards(AuthGuard)
@ApiTags('Company')
@Controller('company')
export class CompanyController {
  constructor(private companyService: CompanyService) {}

  @Get('/')
  @ApiOkResponse({ type: CompanyDto })
  async getAllCompany(
    @Query('page') page: number,
    @Query('take') take: number,
  ): Promise<{
    data: CompanyDto[];
    page: number;
    take: number;
    itemCount: number;
    pageCount: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
  }> {
    return this.companyService.getAllCompany(page, take);
  }

  @Get('/getCompanyName')
  @ApiOkResponse({ type: CompanyDto })
  async getCompanyName(
    @Query('page') page: number,
    @Query('take') take: number,
    @Query('Companyname') companyname: string,
  ): Promise<{
    data: CompanyDto[];
    page: number;
    take: number;
    itemCount: number;
    pageCount: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
  }> {
    return this.companyService.getCompanyName(page, take, companyname);
  }

  @Get('/getCompanyId')
  @ApiCreatedResponse({ type: CompanyDto })
  async getAllCompanyById(
    @Query('companyid') companyid: number,
  ): Promise<CompanyDto | undefined> {
    return this.companyService.getCompanyId(companyid);
  }

  @Post('/createCompany')
  @ApiCreatedResponse({ type: CompanyDto })
  async createCompany(@Body() company: AddCompanyDto) {
    return this.companyService.createCompany(company);
  }

  @Patch('updateCompany')
  @ApiCreatedResponse({ type: CompanyDto })
  async updateCompany(
    @Query('companyid') companyid: number,
    @Body() company: UpdateCompanyDto,
  ) {
    return this.companyService.updateCompany(companyid, company);
  }

  @Delete('/deleteCompany')
  @ApiCreatedResponse({ type: CompanyDto })
  async deleteCompany(@Query('companyid') companyid: number): Promise<string> {
    return this.companyService.deleteCompany(companyid);
  }
}
