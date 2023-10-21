import { ApiBearerAuth, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { MonitoringValidationService } from './monitoring-validation.service';
import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth/auth.guard';
import { MonitoringValidationDto } from './dto/monitoring-validation.dto';

@ApiBearerAuth()
@UseGuards(AuthGuard)
@ApiTags('Monitoring Validation')
@Controller('monitoringvalidation')
export class MonitoringValidationController {
  constructor(
    private monitoringValidationService: MonitoringValidationService,
  ) {}

  @Get('/')
  @ApiCreatedResponse({ type: MonitoringValidationDto })
  async getMonitoringValidation(
    @Query('page') page: number,
    @Query('take') take: number,
  ): Promise<{
    data: MonitoringValidationDto[];
    page: number;
    take: number;
    itemCount: number;
    pageCount: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
  }> {
    return this.monitoringValidationService.getAllMonitoringValidation(
      page,
      take,
    );
  }

  @Get('/getMonitoringValidationCompany')
  @ApiCreatedResponse({ type: MonitoringValidationDto })
  async getMonitoringValidationCompany(
    @Query('page') page: number,
    @Query('take') take: number,
    @Query('company') company: string,
  ): Promise<{
    data: MonitoringValidationDto[];
    page: number;
    take: number;
    itemCount: number;
    pageCount: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
  }> {
    return this.monitoringValidationService.getMonitoringValidationCompany(
      page,
      take,
      company,
    );
  }

  @Get('/getMonitoringValidationYear')
  @ApiCreatedResponse({ type: MonitoringValidationDto })
  async getMonitoringValidationYear(
    @Query('page') page: number,
    @Query('take') take: number,
    @Query('year') year: number,
  ): Promise<{
    data: MonitoringValidationDto[];
    page: number;
    take: number;
    itemCount: number;
    pageCount: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
  }> {
    return this.monitoringValidationService.getMonitoringValidationYear(
      page,
      take,
      year,
    );
  }

  @Get('/getMonitoringValidationUploadBy')
  @ApiCreatedResponse({ type: MonitoringValidationDto })
  async getMonitoringValidationUploadBy(
    @Query('page') page: number,
    @Query('take') take: number,
    @Query('uploadby') uploadby: string,
  ): Promise<{
    data: MonitoringValidationDto[];
    page: number;
    take: number;
    itemCount: number;
    pageCount: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
  }> {
    return this.monitoringValidationService.getMonitoringValidationUploadBy(
      page,
      take,
      uploadby,
    );
  }
}
