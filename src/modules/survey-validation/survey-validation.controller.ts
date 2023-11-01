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
    @Query('company') company: string,
    @Query('date') date: string,
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
    return this.surveyValidationService.getAllSurveyValidationNeedValidate(
      page,
      take,
      company,
      date,
      username,
    );
  }

  @Get('/getSurveyValidationValidate')
  @ApiCreatedResponse({ type: SurveyValidationDto })
  async getSurveyValidationValidate(
    @Query('page') page: number,
    @Query('take') take: number,
    @Query('company') company: string,
    @Query('date') date: string,
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
    return this.surveyValidationService.getAllSurveyValidationValidate(
      page,
      take,
      company,
      date,
      username,
    );
  }

  @Patch('/updateValidationSurveyValidation')
  @ApiCreatedResponse({ type: SurveyValidationDto })
  async updateValidation(@Query('id') id: number) {
    return this.surveyValidationService.updateValidation(id);
  }
}
