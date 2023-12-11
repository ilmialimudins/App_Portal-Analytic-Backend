import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Query,
  Res,
  BadRequestException,
  Put,
  UseGuards,
} from '@nestjs/common';
import { Response as ExpressResponse } from 'express';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { SpmInvitedRespondentsService } from './spm-invited-respondents.service';
import {
  GetOneInvitedRespondentsQueryDTO,
  GetInvitedRespondentsResultDTO,
  GetSurveyInvitedRespondentsQueryDTO,
  GetSurveyInvitedRespondentsResultsDTO,
  GetInvitedRespondentsQueryDTO,
  GetManyInvitedRespondentsQueryDTO,
  GetModifyListQueryDTO,
  GetModifyResponse,
  GetModifyDetailQueryDTO,
  GetModifyDetailResponse,
  ListDemographyValueDTO,
} from './dto/get-spm-invited-respondents.dto';
import {
  PostAddModifyValueBodyDTO,
  PostInvitedRespondentsBodyDTO,
  PostInvitedRespondentsResultsDTO,
  PutTotalInvitedBodyDTO,
} from './dto/post-spm-invited-respondents.dto';
import {
  DelInvitedRespondentsQueryDTO,
  DelSectionModifyDTO,
  DelValueDemoModifyDTO,
} from './dto/delete-spm-invited-respondents.dto';
import { AuthGuard } from 'src/guards/auth/auth.guard';

@ApiTags('Invited Respondents')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('invited-respondents')
export class SpmInvitedRespondentsController {
  constructor(
    private readonly spmInvitedRespondentsService: SpmInvitedRespondentsService,
  ) {}

  @Get('/')
  @ApiOkResponse({ type: [GetInvitedRespondentsResultDTO] })
  async getInvitedRespondents(
    @Query()
    { companyid, surveyid, surveygroupid }: GetInvitedRespondentsQueryDTO,
  ): Promise<GetOneInvitedRespondentsQueryDTO[]> {
    return await this.spmInvitedRespondentsService.getManyService({
      companyid,
      surveyid,
      surveygroupid,
    });
  }

  @Post('/')
  async creteRespondents(
    @Body() body: PostInvitedRespondentsBodyDTO,
  ): Promise<PostInvitedRespondentsResultsDTO | undefined> {
    return await this.spmInvitedRespondentsService.createRespondent(body);
  }

  @Delete('/')
  async deleteRespondents(
    @Query()
    {
      companyid,
      surveyid,
      valuedemography,
      demographyid,
      tahun_survey,
      surveygroupid,
    }: DelInvitedRespondentsQueryDTO,
  ) {
    const result = await this.spmInvitedRespondentsService.removeRespondents({
      companyid,
      surveyid,
      valuedemography,
      demographyid,
      tahun_survey,
      surveygroupid,
    });

    const { raw, affected } = result;

    if (!affected) {
      throw new BadRequestException(
        'Gagal menghapus atau data tidak ditemukan',
      );
    }

    return { message: 'Success', data: raw };
  }

  @Get('modify-list')
  @ApiResponse({ type: GetModifyResponse })
  async getListModify(
    @Query() { tahun_survey, search, limit, page }: GetModifyListQueryDTO,
  ): Promise<GetModifyResponse> {
    try {
      return await this.spmInvitedRespondentsService.getListModify({
        tahun_survey,
        search,
        limit,
        page,
      });
    } catch (error) {
      throw error;
    }
  }

  @Get('modify-detail')
  @ApiOkResponse({ type: GetModifyDetailResponse })
  async getDetail(
    @Query()
    { tahun_survey, companyid, surveygroupid }: GetModifyDetailQueryDTO,
  ): Promise<GetModifyDetailResponse> {
    try {
      return await this.spmInvitedRespondentsService.getDetailModify({
        tahun_survey,
        companyid,
        surveygroupid,
      });
    } catch (error) {
      throw error;
    }
  }

  @Put('modify-total-invited')
  async changeTotalInvited(
    @Query()
    { tahun_survey, companyid, surveygroupid }: GetModifyDetailQueryDTO,
    @Body() body: PutTotalInvitedBodyDTO,
  ) {
    try {
      return await this.spmInvitedRespondentsService.changeTotalInvited(
        { tahun_survey, companyid, surveygroupid },
        body.total,
      );
    } catch (error) {
      throw error;
    }
  }

  @Post('add-demographyvalue')
  @ApiOkResponse({ type: ListDemographyValueDTO })
  async addValueDemography(
    @Body() body: PostAddModifyValueBodyDTO,
  ): Promise<ListDemographyValueDTO> {
    try {
      return await this.spmInvitedRespondentsService.addDemographyValueModify(
        body,
      );
    } catch (error) {
      throw error;
    }
  }

  @Delete('delete-modify-demography')
  async deleteSectionValue(
    @Query()
    {
      companyid,
      tahun_survey,
      surveygroupid,
      valuedemography,
      demography,
    }: DelValueDemoModifyDTO,
  ) {
    try {
      return await this.spmInvitedRespondentsService.removeValueDemo({
        companyid,
        tahun_survey,
        surveygroupid,
        valuedemography,
        demography,
      });
    } catch (error) {
      throw error;
    }
  }

  @Delete('delete-modify-section')
  async deleteSectionModify(
    @Query()
    { companyid, tahun_survey, surveygroupid, demography }: DelSectionModifyDTO,
  ) {
    try {
      return await this.spmInvitedRespondentsService.removeSectionDemo({
        companyid,
        tahun_survey,
        surveygroupid,
        demography,
      });
    } catch (error) {
      throw error;
    }
  }

  // @Get('/get-one')
  // @ApiOkResponse({ type: GetInvitedRespondentsResultDTO })
  // async getOneInvitedRepondents(
  //   @Query()
  //   {
  //     companyid,
  //     surveyid,
  //     valuedemography,
  //     demography,
  //     tahun_survey,
  //   }: GetOneInvitedRespondentsQueryDTO,
  // ): Promise<GetInvitedRespondentsResultDTO | undefined> {
  //   return await this.spmInvitedRespondentsService.getOneService({
  //     companyid,
  //     surveyid,
  //     valuedemography,
  //     demography,
  //     tahun_survey,
  //   });
  // }

  // @Get('/get-companylist')
  // @ApiOkResponse({ type: [GetInvitedRespondentsResultDTO] })
  // async getInvitedCompany(): Promise<GetInvitedRespondentsResultDTO[]> {
  //   return await this.spmInvitedRespondentsService.getCompanyList();
  // }

  @Get('/get-surveyid')
  @ApiOkResponse({ type: [GetSurveyInvitedRespondentsResultsDTO] })
  async getSurveyId(
    @Query() { companyid, surveygroupid }: GetSurveyInvitedRespondentsQueryDTO,
  ): Promise<GetSurveyInvitedRespondentsResultsDTO[]> {
    if (!companyid)
      throw new HttpException('No Company Params Found', HttpStatus.NOT_FOUND);
    return await this.spmInvitedRespondentsService.getSurveyId({
      companyid,
      surveygroupid,
    });
  }

  @Get('download-invitedRespondent')
  async getDownloadInvitedRespondent(
    @Res() res: ExpressResponse,
    @Query()
    {
      companyid,
      surveyid,
      tahun_survey,
      surveygroupid,
    }: GetManyInvitedRespondentsQueryDTO,
  ) {
    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    );

    res.setHeader(
      'Content-Disposition',
      `attachment; filename=InvitedRespondent_${companyid}.xlsx`,
    );

    const workbook =
      await this.spmInvitedRespondentsService.generateExcelInvitedRespondents({
        companyid,
        surveyid,
        tahun_survey,
        surveygroupid,
      });
    await workbook.xlsx.write(res);
    res.send('File send');
  }
}
