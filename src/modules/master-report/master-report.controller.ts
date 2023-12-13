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
import { UserInfo } from 'src/decorators/use-info.decorator';
import { UserInfoDTO } from '../duende-authentication/dto/userinfo.dto';

@ApiBearerAuth()
@UseGuards(AuthGuard)
@ApiTags('Master Report')
@Controller('masterreport')
export class MasterReportController {
  constructor(private masterReportService: MasterReportService) {}

  @Get('/')
  @ApiCreatedResponse({ type: MasterReportDto })
  async getMasterReport() {
    return this.masterReportService.getAllMasterReport();
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

  @Get('/checkDuplicateReportPowerBI')
  @ApiCreatedResponse({ type: MasterReportDto })
  async checkDuplicateReportPowerBI(@Query('report') report: string) {
    const result = await this.masterReportService.checkDuplicateReportPowerBI(
      report,
    );

    if (result) {
      return { isDuplicate: true };
    } else {
      return { isDuplicate: false };
    }
  }

  @Post('/createMasterReport')
  @ApiCreatedResponse({ type: MasterReportDto })
  async createMasterReport(
    @Body() masterreport: AddMasterReportDto,
    @UserInfo() userinfo: UserInfoDTO,
  ) {
    return this.masterReportService.createMasterReport(masterreport, userinfo);
  }

  @Patch('/updateMasterReport')
  @ApiCreatedResponse({ type: MasterReportDto })
  async updateMasterReport(
    @Query('reportid') reportid: number,
    @Body() masterreport: UpdateMasterReportDto,
    @UserInfo() userinfo: UserInfoDTO,
  ) {
    return this.masterReportService.updateMasterReport(
      reportid,
      masterreport,
      userinfo,
    );
  }

  @Delete('/deleteMasterReport')
  @ApiCreatedResponse({ type: MasterReportDto })
  async deleteMasterReport(@Query('reportid') reportid: number) {
    return this.masterReportService.deleteMasterReport(reportid);
  }
}
