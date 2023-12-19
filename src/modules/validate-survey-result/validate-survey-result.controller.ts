import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  ParseFilePipeBuilder,
  Patch,
  Post,
  Query,
  Req,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ValidateSurveyResultService } from './validate-survey-result.service';
import { ValidateSurveyResultDto } from './dto/validate-survey-result.dto';
import { UpdateValidateSurveyResultDto } from './dto/update-validate-survey-result.dto';
import { AuthGuard } from 'src/guards/auth/auth.guard';
import { Response as ExpressResponse } from 'express';
import { DownloadValidateSurveyResultDto } from './dto/add-validate-survey-result.dto';
import { UserInfoDTO } from '../duende-authentication/dto/userinfo.dto';
import { UserInfo } from 'src/decorators/use-info.decorator';
import { UploadSurveyDTO } from './dto/upload-validate-survey-result.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import diskStorage from 'src/common/utils/diskStorage';
import { CustomUploadFileValidator } from 'src/common/validator/customfiletype.validator';
import { excelFileType } from 'src/constants/filetype';
import { UpdateDateVersion } from './update-dateversion.transaction';

@ApiBearerAuth()
@UseGuards(AuthGuard)
@ApiTags('Validate Survey Result')
@Controller('validatesurveyresult')
export class ValidateSurveyResultController {
  constructor(
    private validateSurveyResultService: ValidateSurveyResultService,
    private updateDateVersion: UpdateDateVersion,
  ) {}

  @Get('/')
  @ApiCreatedResponse({ type: ValidateSurveyResultDto })
  async getValidateSurveyResult(
    @Query() searchParams: Record<string, number>,
  ): Promise<{
    data: ValidateSurveyResultDto[];
    page: number;
    take: number;
    itemCount: number;
    pageCount: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
  }> {
    return this.validateSurveyResultService.getAllValidateSurveyResult(
      searchParams,
    );
  }

  @Patch('/updateValidateSurveyResult')
  @ApiCreatedResponse({ type: ValidateSurveyResultDto })
  async updateValidateSurveyResult(
    @Query('id') id: number,
    @Query('surveyid') surveyid: string,
    @Query('company') company: string,
    @Body() validatesurveyresult: UpdateValidateSurveyResultDto,
    @UserInfo() userinfo: UserInfoDTO,
  ) {
    await this.updateDateVersion.run([{ surveyid, company }]);

    const updateResult =
      await this.validateSurveyResultService.updateValidateSurveyResult(
        id,
        validatesurveyresult,
        userinfo,
      );

    return updateResult;
  }

  @Delete('/deleteValidateSurveyResult')
  @ApiCreatedResponse({ type: ValidateSurveyResultDto })
  async deleteAndModifySurveyResult(
    @Query('id') id: number,
    @Query('surveyid') surveyid: string,
    @Query('company') company: string,
  ) {
    await this.updateDateVersion.run([{ surveyid, company }]);

    const deletedResult =
      await this.validateSurveyResultService.deleteValidateSurveyResult(id);

    return deletedResult;
  }

  @Delete('/deleteRespondentIncomplete')
  @ApiCreatedResponse({ type: ValidateSurveyResultDto })
  async deleteRespondentIncomplete(
    @Query('respondentid') respondentid: number,
    @Query('surveyid') surveyid: string,
    @Query('company') company: string,
  ) {
    await this.updateDateVersion.run([{ surveyid, company }]);

    const deletedResult =
      this.validateSurveyResultService.deleteRespondentIncomplete(respondentid);

    return deletedResult;
  }

  @Post('/generateExcelValidateSurveyResult')
  @ApiCreatedResponse({ type: ValidateSurveyResultDto })
  async generateExcelValidateSurveyResult(
    @Body() body: DownloadValidateSurveyResultDto,
    @Res() res: ExpressResponse,
  ) {
    const workbook =
      await this.validateSurveyResultService.generateExcelValidateSurveyResult(
        body,
      );

    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    );
    res.setHeader(
      'Content-Disposition',
      `attachment; filename=ValidateSurveyResult.xlsx`,
    );

    await workbook.xlsx.write(res);
    res.end();
  }

  @Post('/UploadValidateSurveyResult')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Data Validate Survey Result',
    type: UploadSurveyDTO,
  })
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage(`./temp/cleansing-survey/`),
    }),
  )
  async uploadValidateSurveyResult(
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

    @UserInfo() user: UserInfoDTO,
  ) {
    return this.validateSurveyResultService.extractValidateSurveyResult(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      request.body as any,
      user,
    );
  }
}
