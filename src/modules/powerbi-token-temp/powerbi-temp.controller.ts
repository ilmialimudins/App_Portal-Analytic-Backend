import { Body, Controller, Get, Patch, Query } from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { PowerBIService } from './powerbi-temp.service';
import { PowerBIDto } from './dto/powerbi-temp.dto';
import { UpdatePowerBIID } from './dto/update-powerbi-temp.dto';

@ApiTags('Power BI Token - Temp')
@Controller('power-bi')
export class PowerBIController {
  constructor(private powerBIService: PowerBIService) {}

  @Get('/')
  @ApiCreatedResponse({ type: PowerBIDto })
  async getPowerBI(): Promise<{ query: PowerBIDto[] }> {
    return this.powerBIService.getAllPowerBI();
  }

  @Patch('/updatePowerBI')
  @ApiCreatedResponse({ type: PowerBIDto })
  async updatePowerBI(
    @Query('pbiid') pbiid: number,
    @Body() powerbi: UpdatePowerBIID,
  ) {
    return this.powerBIService.updatePowerBIID(pbiid, powerbi);
  }
}
