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
    @Query('company') company: string,
    @Query('year') year: number,
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
    return this.monitoringValidationService.getAllMonitoringValidation(
      page,
      take,
      company,
      year,
      uploadby,
    );
  }
}
