import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { ValidateSurveyResultService } from './validate-survey-result.service';
import { ValidateSurveyResultDto } from './dto/validate-survey-result.dto';
import { UpdateValidateSurveyResultDto } from './dto/update-validate-survey-result.dto';
import { AuthGuard } from 'src/guards/auth/auth.guard';
import { Response as ExpressResponse } from 'express';
import {
  AddValidateSurveyResultDto,
  DownloadValidateSurveyResultDto,
} from './dto/add-validate-survey-result.dto';

@ApiBearerAuth()
@UseGuards(AuthGuard)
@ApiTags('Validate Survey Result')
@Controller('validatesurveyresult')
export class ValidateSurveyResultController {
  constructor(
    private validateSurveyResultService: ValidateSurveyResultService,
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

  @Post('/createManyValidateSurveyResult')
  @ApiCreatedResponse({ type: ValidateSurveyResultDto })
  async createManyValidateSurveyResult(
    @Body() validatesurveyresult: AddValidateSurveyResultDto[],
  ) {
    return this.validateSurveyResultService.createManyValidateSurveyResult(
      validatesurveyresult,
    );
  }

  @Patch('/updateValidateSurveyResult')
  @ApiCreatedResponse({ type: ValidateSurveyResultDto })
  async updateValidateSurveyResult(
    @Query('id') id: number,
    @Query('surveyid') surveyid: number,
    @Query('company') company: string,
    @Body() validatesurveyresult: UpdateValidateSurveyResultDto,
  ) {
    await this.validateSurveyResultService.updateDateVersion(surveyid, company);

    const updateResult =
      await this.validateSurveyResultService.updateValidateSurveyResult(
        id,
        validatesurveyresult,
      );

    return updateResult;
  }

  @Delete('/deleteValidateSurveyResult')
  @ApiCreatedResponse({ type: ValidateSurveyResultDto })
  async deleteAndModifySurveyResult(
    @Query('id') id: number,
    @Query('surveyid') surveyid: number,
    @Query('company') company: string,
  ) {
    await this.validateSurveyResultService.updateDateVersion(surveyid, company);

    const deletedResult =
      await this.validateSurveyResultService.deleteValidateSurveyResult(id);

    return deletedResult;
  }

  @Delete('/deleteRespondentIncomplete')
  @ApiCreatedResponse({ type: ValidateSurveyResultDto })
  async deleteRespondentIncomplete(
    @Query('respondentid') respondentid: number,
    @Query('surveyid') surveyid: number,
    @Query('company') company: string,
  ) {
    await this.validateSurveyResultService.updateDateVersion(surveyid, company);

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
}
