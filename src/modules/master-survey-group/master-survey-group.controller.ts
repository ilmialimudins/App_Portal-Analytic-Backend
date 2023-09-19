import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/guards/auth/auth.guard';
import { SurveyGroupService } from './master-survey-group.service';
import { SurveyGroupDto } from './dto/master-survey-group.dto';
import { AddSurveyGroupDto } from './dto/add-master-survey-group.dto';
import { UpdateSurveyGroupDto } from './dto/update-master-survey-group.dto';

@ApiBearerAuth()
@UseGuards(AuthGuard)
@ApiTags('Survey Group')
@Controller('surveygroup')
export class SurveyGroupController {
  constructor(private surveyGroupService: SurveyGroupService) {}

  @Get('/')
  @ApiCreatedResponse({ type: SurveyGroupDto })
  async getAllSurveyGroup(
    @Query('page') page: number,
    @Query('pageSize') pageSize: number,
  ): Promise<{ data: SurveyGroupDto[]; total: number }> {
    return this.surveyGroupService.getAllSurveyGroup(page, pageSize);
  }

  @Get('/getSurveryGroupName')
  @ApiCreatedResponse({ type: SurveyGroupDto })
  async getSurveyGroupName(
    @Query('page') page: number,
    @Query('pageSize') pageSize: number,
    @Query('surveygroup') surveygroup: string,
  ): Promise<{ data: SurveyGroupDto[]; total: number }> {
    return this.surveyGroupService.getSurveyGroupName(
      page,
      pageSize,
      surveygroup,
    );
  }

  @Get('/getSurveyGroupId')
  @ApiCreatedResponse({ type: SurveyGroupDto })
  async getSurveyGroupId(
    @Query('surveygroupid') surveygroupid: number,
  ): Promise<SurveyGroupDto | undefined> {
    return this.surveyGroupService.getSurveyGroupId(surveygroupid);
  }

  @Get('getLastSurveyGroupCode')
  @ApiCreatedResponse({ type: SurveyGroupDto })
  async getLastSurveyGroupCode() {
    return this.surveyGroupService.getLastSurveyGroupCode();
  }

  @Post('/createSurveyGroup')
  @ApiCreatedResponse({ type: SurveyGroupDto })
  async createSurveyGroup(@Body() surveygroup: AddSurveyGroupDto) {
    return this.surveyGroupService.createSurveyGroup(surveygroup);
  }

  @Patch('/updateSurveyGroup')
  @ApiCreatedResponse({ type: SurveyGroupDto })
  async updateSurveyGroup(
    @Query('surveygroupid') surveygroupid: number,
    @Body() surveygroup: UpdateSurveyGroupDto,
  ) {
    return this.surveyGroupService.updateSurveyGroup(
      surveygroupid,
      surveygroup,
    );
  }

  @Delete('/deleteSurveyGroup')
  @ApiCreatedResponse({ type: SurveyGroupDto })
  async deleteSurveyGroup(@Query('surveygroupid') surveygroupid: number) {
    return this.surveyGroupService.deleteSurveyGroup(surveygroupid);
  }
}
