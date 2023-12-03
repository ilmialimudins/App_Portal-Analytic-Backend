import { Body, Controller, Post, Res, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Response as ExpressResponse } from 'express';

import { AuthGuard } from 'src/guards/auth/auth.guard';
import { DownloadMPSDTO } from './dto/download-mps.dto';
import { DownloadMPSService } from './download-mps.service';

@ApiBearerAuth()
@ApiTags('Man Power Statistics')
@Controller('man-power-statistics')
@UseGuards(AuthGuard)
export class MPSPropertyController {
  constructor(private readonly downloadMPSService: DownloadMPSService) {}

  @Post('/download')
  async getMPSProperty(
    @Body() data: DownloadMPSDTO,
    @Res() res: ExpressResponse,
  ) {
    console.log('get here');
    const { workbook, sheetMetadata } =
      await this.downloadMPSService.downloadMPS(data);

    const companyName = sheetMetadata.companyname.split(' ').join('_');

    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    );

    res.setHeader(
      'Content-Disposition',
      `attachment; filename=MPS_${companyName}_${data.year}_${data.month}.xlsx`,
    );

    await workbook.xlsx.write(res);

    res.end();
  }
}
