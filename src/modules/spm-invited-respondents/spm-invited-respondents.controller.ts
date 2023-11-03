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
} from '@nestjs/common';
import { Response as ExpressResponse } from 'express';
import { ApiOkResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
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
} from './dto/get-spm-invited-respondents.dto';
import {
  PostInvitedRespondentsBodyDTO,
  PostInvitedRespondentsResultsDTO,
} from './dto/post-spm-invited-respondents.dto';
import { DelInvitedRespondentsQueryDTO } from './dto/delete-spm-invited-respondents.dto';

@ApiTags('Invited Respondents')
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

  // @Post('modify-total-invited')
  // async changeTotalInvited(
  //   @Query() { tahun_survey, company, surveygroup }: GetModifyDetailQueryDTO,
  //   @Body() body: number,
  // ) {
  //   try {
  //   } catch (error) {
  //     throw error;
  //   }
  // }

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
