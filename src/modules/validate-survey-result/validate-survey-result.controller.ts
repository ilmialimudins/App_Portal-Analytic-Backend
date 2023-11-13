import { Body, Controller, Delete, Get, Patch, Query } from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { ValidateSurveyResultService } from './validate-survey-result.service';
import { ValidateSurveyResultDto } from './dto/validate-survey-result.dto';
import { UpdateValidateSurveyResultDto } from './dto/update-validate-survey-result.dto';

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
}
