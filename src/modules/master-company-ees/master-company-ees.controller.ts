import { Controller, Get, Query } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { MasterCompanyEESService } from './master-company-ees.service';
import { MasterCompanyEESDto } from './dto/master-company-ees.dto';
import { PageOptionsDTO } from 'src/common/dto/page-options.dto';
import { PageDto } from 'src/common/dto/page.dto';

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
}
