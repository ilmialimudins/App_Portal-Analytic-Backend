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
import { MasterReportService } from './master-report.service';
import { MasterReportDto } from './dto/master-report.dto';
import { AddMasterReportDto } from './dto/add-master-report.dto';
import { UpdateMasterReportDto } from './dto/update-master-report.dto';

@ApiBearerAuth()
@UseGuards(AuthGuard)
@ApiTags('Master Report')
@Controller('masterreport')
export class MasterReportController {
  constructor(private masterReportService: MasterReportService) {}

  @Get('/')
  @ApiCreatedResponse({ type: MasterReportDto })
  async getMasterReport(
    @Query('page') page: number,
    @Query('pageSize') pageSize: number,
  ): Promise<{ data: MasterReportDto[]; total: number }> {
    return this.masterReportService.getAllMasterReport(page, pageSize);
  }

  @Get('/getMasterReportId')
  @ApiCreatedResponse({ type: MasterReportDto })
  async getMasterReportId(@Query('reportid') reportid: number) {
    return this.masterReportService.getMasterReportId(reportid);
  }

  @Get('/getLastMasterReportCode')
  @ApiCreatedResponse({ type: MasterReportDto })
  async getLastMasterReportCode() {
    return this.masterReportService.getLastMasterReportCode();
  }

  @Post('/createMasterReport')
  @ApiCreatedResponse({ type: MasterReportDto })
  async createMasterReport(@Body() masterreport: AddMasterReportDto) {
    return this.masterReportService.createMasterReport(masterreport);
  }

  @Patch('/updateMasterReport')
  @ApiCreatedResponse({ type: MasterReportDto })
  async updateMasterReport(
    @Query('reportid') reportid: number,
    @Body() masterreport: UpdateMasterReportDto,
  ) {
    return this.masterReportService.updateMasterReport(reportid, masterreport);
  }

  @Delete('/deleteMasterReport')
  @ApiCreatedResponse({ type: MasterReportDto })
  async deleteMasterReport(@Query('reportid') reportid: number) {
    return this.masterReportService.deleteMasterReport(reportid);
  }
}
