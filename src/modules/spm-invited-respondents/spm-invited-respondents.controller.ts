import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Query,
  Res,
  Put,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  ParseFilePipeBuilder,
  Req,
  BadRequestException,
  Delete,
} from '@nestjs/common';
import { Response as ExpressResponse } from 'express';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOkResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { SpmInvitedRespondentsService } from './spm-invited-respondents.service';
import {
  GetSurveyInvitedRespondentsQueryDTO,
  GetSurveyInvitedRespondentsResultsDTO,
  GetManyInvitedRespondentsQueryDTO,
  GetModifyListQueryDTO,
  GetModifyResponse,
  GetModifyDetailQueryDTO,
  GetModifyDetailResponse,
  GetSurveyGroupListDTO,
} from './dto/get-spm-invited-respondents.dto';
import { PutTotalInvitedBodyDTO } from './dto/post-spm-invited-respondents.dto';

import { AuthGuard } from 'src/guards/auth/auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadSPMDTO } from './dto/upload-spm-invited-respondents.dto';
import diskStorage from 'src/common/utils/diskStorage';
import { DeleteFileInterceptor } from 'src/interceptors/delete-file-mps.interceptor';
import { CustomUploadFileValidator } from 'src/common/validator/customfiletype.validator';
import { excelFileType } from 'src/constants/filetype';
import { UserInfo } from 'src/decorators/use-info.decorator';
import { UserInfoDTO } from '../duende-authentication/dto/userinfo.dto';
import { SaveAllSpmDTO } from './dto/update-all-spm.dto';
import { DelInvitedRespondentsQueryDTO } from './dto/delete-spm-invited-respondents.dto';

@ApiTags('Invited Respondents')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('invited-respondents')
export class SpmInvitedRespondentsController {
  constructor(
    private readonly spmInvitedRespondentsService: SpmInvitedRespondentsService,
  ) {}

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

  @Post('save-all-invited')
  public async saveAllInvited(
    @Body() body: SaveAllSpmDTO,
    @UserInfo() user: UserInfoDTO,
  ) {
    return this.spmInvitedRespondentsService.saveAllDemography(body, user);
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

  @Get('/get-surveygroupid')
  async getSurveyGroupId(@Query() query: GetSurveyGroupListDTO) {
    return await this.spmInvitedRespondentsService.getSurveyGroupId(
      query.companyid,
    );
  }

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
        tahun_survey,
        surveygroupid,
      });
    await workbook.xlsx.write(res);
    res.send('File send');
  }

  @Post('/upload-spm')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Data SPM',
    type: UploadSPMDTO,
  })
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage(),
    }),
  )
  @UseInterceptors(DeleteFileInterceptor)
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

    @UserInfo() user: UserInfoDTO,
  ) {
    return this.spmInvitedRespondentsService.extractSPMInvited(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      request.body as any,
      user,
    );
  }

  // @Get('/')
  // @ApiOkResponse({ type: [GetInvitedRespondentsResultDTO] })
  // async getInvitedRespondents(
  //   @Query()
  //   { companyid, surveygroupid }: GetInvitedRespondentsQueryDTO,
  // ): Promise<GetOneInvitedRespondentsQueryDTO[]> {
  //   return await this.spmInvitedRespondentsService.getManyService({
  //     companyid,
  //     surveygroupid,
  //   });
  // }

  // @Post('/')
  // async creteRespondents(
  //   @Body() body: PostInvitedRespondentsBodyDTO,
  // ): Promise<PostInvitedRespondentsResultsDTO | undefined> {
  //   return await this.spmInvitedRespondentsService.createRespondent(body);
  // }

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

  // @Post('add-demographyvalue')
  // @ApiOkResponse({ type: ListDemographyValueDTO })
  // async addValueDemography(
  //   @Body() body: PostAddModifyValueBodyDTO,
  // ): Promise<ListDemographyValueDTO> {
  //   try {
  //     return await this.spmInvitedRespondentsService.addDemographyValueModify(
  //       body,
  //     );
  //   } catch (error) {
  //     throw error;
  //   }
  // }
  // @Delete('delete-modify-demography')
  // async deleteSectionValue(
  //   @Query()
  //   {
  //     companyid,
  //     tahun_survey,
  //     surveygroupid,
  //     valuedemography,
  //     demography,
  //   }: DelValueDemoModifyDTO,
  // ) {
  //   try {
  //     return await this.spmInvitedRespondentsService.removeValueDemo({
  //       companyid,
  //       tahun_survey,
  //       surveygroupid,
  //       valuedemography,
  //       demography,
  //     });
  //   } catch (error) {
  //     throw error;
  //   }
  // }

  // @Delete('delete-modify-section')
  // async deleteSectionModify(
  //   @Query()
  //   { companyid, tahun_survey, surveygroupid, demography }: DelSectionModifyDTO,
  // ) {
  //   try {
  //     return await this.spmInvitedRespondentsService.removeSectionDemo({
  //       companyid,
  //       tahun_survey,
  //       surveygroupid,
  //       demography,
  //     });
  //   } catch (error) {
  //     throw error;
  //   }
  // }
}
