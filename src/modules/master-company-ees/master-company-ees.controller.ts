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
import { MasterCompanyEESService } from './master-company-ees.service';
import { MasterCompanyEESDto } from './dto/master-company-ees.dto';
import { AddMasterCompanyEESDto } from './dto/add-master-company-ees.dto';
import { UpdateMasterCompanyEESDto } from './dto/update-master-company-ees.dto';
import { AuthGuard } from 'src/guards/auth/auth.guard';

@ApiBearerAuth()
@UseGuards(AuthGuard)
@ApiTags('Master Company EES')
@Controller('master-company-ees')
export class MasterCompanyEESController {
  constructor(private masterCompanyServiceEES: MasterCompanyEESService) {}

  @Get('/')
  @ApiOkResponse({ type: MasterCompanyEESDto })
  async getAllCompany(
    @Query('page') page: number,
    @Query('pageSize') pageSize: number,
  ): Promise<{ data: MasterCompanyEESDto[]; total: number }> {
    return this.masterCompanyServiceEES.getAllCompany(page, pageSize);
  }

  @Get('/getCompanyName')
  @ApiOkResponse({ type: MasterCompanyEESDto })
  async getCompanyName(
    @Query('page') page: number,
    @Query('pageSize') pageSize: number,
    @Query('Companyname') companyname: string,
  ): Promise<{ data: MasterCompanyEESDto[]; total: number }> {
    return this.masterCompanyServiceEES.getCompanyName(
      page,
      pageSize,
      companyname,
    );
  }

  @Get('/getCompanyId')
  @ApiCreatedResponse({ type: MasterCompanyEESDto })
  async getAllCompanyById(
    @Query('companyid') companyid: number,
  ): Promise<MasterCompanyEESDto | undefined> {
    return this.masterCompanyServiceEES.getCompanyId(companyid);
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
