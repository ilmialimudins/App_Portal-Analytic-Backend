import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/guards/auth/auth.guard';
import { ClaService } from './master-cla.service';
import { ClaDto } from './dto/master-cla.dto';
import { PageOptionsDTO } from 'src/common/dto/page-options.dto';
import { PageDto } from 'src/common/dto/page.dto';

@ApiBearerAuth()
@UseGuards(AuthGuard)
@ApiTags('Cla')
@Controller('cla')
export class ClaController {
  constructor(private claService: ClaService) {}

  @Get('/')
  @ApiCreatedResponse({ type: ClaDto })
  async getCla(@Query() pageOptions: PageOptionsDTO): Promise<PageDto<ClaDto>> {
    return this.claService.getAllCla(pageOptions);
  }
}
