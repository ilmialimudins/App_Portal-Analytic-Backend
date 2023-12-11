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
import { UserInfo } from 'src/decorators/use-info.decorator';
import { UserInfoDTO } from '../duende-authentication/dto/userinfo.dto';

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
    return this.companyService.getAllCompany(page, take, companyname);
  }

  @Get('/getAllCompanyActive')
  @ApiOkResponse({ type: CompanyDto })
  async getAllCompanyActive() {
    return this.companyService.getAllCompanyActive();
  }

  @Get('/getCompanyId')
  @ApiCreatedResponse({ type: CompanyDto })
  async getAllCompanyById(
    @Query('companyid') companyid: number,
  ): Promise<CompanyDto | undefined> {
    return this.companyService.getCompanyId(companyid);
  }

  @Get('/checkDuplicateCompany')
  @ApiCreatedResponse({ type: CompanyDto })
  async checkDuplicateCompany(
    @Query('companyees') companyees: string,
    @Query('companymps') companymps: string,
    @Query('alias') alias: string,
  ) {
    const result = await this.companyService.checkDuplicateCompany(
      companyees,
      companymps,
      alias,
    );

    if (result) {
      return { isDuplicate: true };
    } else {
      return { isDuplicate: false };
    }
  }

  @Get('/getLastCompanyCode')
  @ApiCreatedResponse({ type: CompanyDto })
  async getLastCompanyCode() {
    return this.companyService.getLastCompanyCode();
  }

  @Post('/createCompany')
  @ApiCreatedResponse({ type: CompanyDto })
  async createCompany(
    @Body() company: AddCompanyDto,
    @UserInfo() userinfo: UserInfoDTO,
  ) {
    return this.companyService.createCompany(company, userinfo);
  }

  @Patch('updateCompany')
  @ApiCreatedResponse({ type: CompanyDto })
  async updateCompany(
    @Query('companyid') companyid: number,
    @Body() company: UpdateCompanyDto,
    @UserInfo() userinfo: UserInfoDTO,
  ) {
    return this.companyService.updateCompany(companyid, company, userinfo);
  }

  @Delete('/activeCompany')
  @ApiCreatedResponse({ type: CompanyDto })
  async activeCompany(@Query('companyid') companyid: number) {
    return this.companyService.activeCompany(companyid);
  }

  @Delete('/deactiveCompany')
  @ApiCreatedResponse({ type: CompanyDto })
  async deactiveCompany(@Query('companyid') companyid: number) {
    return this.companyService.deactiveCompany(companyid);
  }
}
