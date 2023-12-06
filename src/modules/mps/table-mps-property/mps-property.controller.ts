import {
  Body,
  Controller,
  HttpStatus,
  ParseFilePipeBuilder,
  Post,
  Req,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { Response as ExpressResponse, Request } from 'express';

import { AuthGuard } from 'src/guards/auth/auth.guard';
import { DownloadMPSDTO } from './dto/download-mps.dto';
import { DownloadMPSService } from './download-mps.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { CustomUploadFileValidator } from 'src/common/validator/customfiletype.validator';
import { excelFileType } from 'src/constants/filetype';
import { UploadMPSDTO } from './dto/upload-mps.dto';
import diskStorage from 'src/common/utils/diskStorage';

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

  @Post('/upload')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Data MPS',
    type: UploadMPSDTO,
  })
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage(),
    }),
  )
  async uploadMPSProperty(
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addValidator(
          new CustomUploadFileValidator({ fileType: excelFileType }),
        )
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        }),
    )
    file: Express.Multer.File,
    @Req() request: Request,
  ) {
    console.log(file);
    console.log(request.body);

    return 'jancuk';
  }
}
