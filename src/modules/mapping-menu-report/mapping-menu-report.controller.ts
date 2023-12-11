import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/guards/auth/auth.guard';
import { MappingMenuReportDto } from './dto/mapping-menu-report.dto';
import { MappingMenuReportService } from './mapping-menu-report.service';
import { AddMappingMenuReportDto } from './dto/add-mapping-menu-report.dto';
import { UpdateMappingMenuReportDto } from './dto/update-mapping-menu-report.dto';
import { UserInfo } from 'src/decorators/use-info.decorator';
import { UserInfoDTO } from '../duende-authentication/dto/userinfo.dto';

@ApiBearerAuth()
@UseGuards(AuthGuard)
@ApiTags('Mapping Menu Report')
@Controller('mappingmenureport')
export class MappingMenuReportController {
  constructor(private mappingMenuReportService: MappingMenuReportService) {}

  @Get('/')
  @ApiCreatedResponse({ type: MappingMenuReportDto })
  async getMappingMenuReport() {
    return this.mappingMenuReportService.getAllMappingMenuReport();
  }

  @Get('/getMappingMenuReportId')
  @ApiCreatedResponse({ type: MappingMenuReportDto })
  async getMappingMenuReportId(
    @Query('mappingmenureportid') mappingmenureportid: number,
  ): Promise<MappingMenuReportDto | undefined> {
    return this.mappingMenuReportService.getMappingMenuReportId(
      mappingmenureportid,
    );
  }

  @Post('/createMappingMenuReport')
  @ApiCreatedResponse({ type: MappingMenuReportDto })
  async createMappingMenuReport(
    @Body() mappingmenureport: AddMappingMenuReportDto,
    @UserInfo() userinfo: UserInfoDTO,
  ) {
    return this.mappingMenuReportService.createMappingMenuReport(
      mappingmenureport,
      userinfo,
    );
  }

  @Patch('/updateMappingMenuReport')
  @ApiCreatedResponse({ type: MappingMenuReportDto })
  async updateMappingMenuReport(
    @Query('mappingmenureportid') mappingmenureportid: number,
    @Body() mappingmenureport: UpdateMappingMenuReportDto,
    @UserInfo() userinfo: UserInfoDTO,
  ) {
    return this.mappingMenuReportService.updateMappingMenuReport(
      mappingmenureportid,
      mappingmenureport,
      userinfo,
    );
  }

  @Delete('/deleteMappingMenuReport')
  @ApiCreatedResponse({ type: MappingMenuReportDto })
  async deleteMappingMenuReport(
    @Query('mappingmenureportid') mappingmenureportid: number,
  ) {
    return this.mappingMenuReportService.deleteMappingMenuReport(
      mappingmenureportid,
    );
  }
}
