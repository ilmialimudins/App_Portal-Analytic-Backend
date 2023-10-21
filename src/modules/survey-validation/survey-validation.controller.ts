import { Controller, Get, Patch, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/guards/auth/auth.guard';
import { SurveyValidationService } from './survey-validation.service';
import { SurveyValidationDto } from './dto/survey-validation.dto';

@ApiBearerAuth()
@UseGuards(AuthGuard)
@ApiTags('Survey Validation')
@Controller('surveyvalidation')
export class SurveyValidationController {
  constructor(private surveyValidationService: SurveyValidationService) {}

  @Get('/getSurveyValidationNeedValidate')
  @ApiCreatedResponse({ type: SurveyValidationDto })
  async getSurveyValidationNeedValidate(
    @Query('page') page: number,
    @Query('take') take: number,
  ): Promise<{
    data: SurveyValidationDto[];
    page: number;
    take: number;
    itemCount: number;
    pageCount: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
  }> {
    return this.surveyValidationService.getAllSurveyValidationNeedValidate(
      page,
      take,
    );
  }

  @Get('/getSurveyValidationCompanyNeedValidate')
  @ApiCreatedResponse({ type: SurveyValidationDto })
  async getSurveyValidationCompanyNeedValidate(
    @Query('page') page: number,
    @Query('take') take: number,
    @Query('company') company: string,
  ): Promise<{
    data: SurveyValidationDto[];
    page: number;
    take: number;
    itemCount: number;
    pageCount: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
  }> {
    return this.surveyValidationService.getSurveyValidationCompanyNeedValidate(
      page,
      take,
      company,
    );
  }

  @Get('/getSurveyValidationValidationNeedValidate')
  @ApiCreatedResponse({ type: SurveyValidationDto })
  async getSurveyValidationValidationNeedValidate(
    @Query('page') page: number,
    @Query('take') take: number,
    @Query('date') date: Date,
  ): Promise<{
    data: SurveyValidationDto[];
    page: number;
    take: number;
    itemCount: number;
    pageCount: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
  }> {
    return this.surveyValidationService.getSurveyValidationValidationNeedValidate(
      page,
      take,
      date,
    );
  }

  @Get('/getSurveyValidationUsernameNeedValidate')
  @ApiCreatedResponse({ type: SurveyValidationDto })
  async getSurveyValidationUsernameNeedValidate(
    @Query('page') page: number,
    @Query('take') take: number,
    @Query('username') username: string,
  ): Promise<{
    data: SurveyValidationDto[];
    page: number;
    take: number;
    itemCount: number;
    pageCount: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
  }> {
    return this.surveyValidationService.getSurveyValidationUsernameNeedValidate(
      page,
      take,
      username,
    );
  }

  @Get('/getSurveyValidationValidate')
  @ApiCreatedResponse({ type: SurveyValidationDto })
  async getSurveyValidationValidate(
    @Query('page') page: number,
    @Query('take') take: number,
  ): Promise<{
    data: SurveyValidationDto[];
    page: number;
    take: number;
    itemCount: number;
    pageCount: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
  }> {
    return this.surveyValidationService.getAllSurveyValidationValidate(
      page,
      take,
    );
  }

  @Get('/getSurveyValidationCompanyValidate')
  @ApiCreatedResponse({ type: SurveyValidationDto })
  async getSurveyValidationCompanyValidate(
    @Query('page') page: number,
    @Query('take') take: number,
    @Query('company') company: string,
  ): Promise<{
    data: SurveyValidationDto[];
    page: number;
    take: number;
    itemCount: number;
    pageCount: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
  }> {
    return this.surveyValidationService.getSurveyValidationCompanyValidate(
      page,
      take,
      company,
    );
  }

  @Get('/getSurveyValidationValidationValidate')
  @ApiCreatedResponse({ type: SurveyValidationDto })
  async getSurveyValidationValidationValidate(
    @Query('page') page: number,
    @Query('take') take: number,
    @Query('date') date: Date,
  ): Promise<{
    data: SurveyValidationDto[];
    page: number;
    take: number;
    itemCount: number;
    pageCount: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
  }> {
    return this.surveyValidationService.getSurveyValidationValidationValidate(
      page,
      take,
      date,
    );
  }

  @Get('/getSurveyValidationUsernameValidate')
  @ApiCreatedResponse({ type: SurveyValidationDto })
  async getSurveyValidationUsernameValidate(
    @Query('page') page: number,
    @Query('take') take: number,
    @Query('username') username: string,
  ): Promise<{
    data: SurveyValidationDto[];
    page: number;
    take: number;
    itemCount: number;
    pageCount: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
  }> {
    return this.surveyValidationService.getSurveyValidationUsernameValidate(
      page,
      take,
      username,
    );
  }

  @Patch('/updateValidationSurveyValidation')
  @ApiCreatedResponse({ type: SurveyValidationDto })
  async updateValidation(@Query('id') id: number) {
    return this.surveyValidationService.updateValidation(id);
  }
}
