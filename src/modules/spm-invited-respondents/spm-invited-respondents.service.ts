import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { InvitedRespondents } from './spm-invited-respondents.entity';
import { Repository, EntityManager, DeleteResult } from 'typeorm';
import * as excel from 'exceljs';
import {
  GetManyInvitedRespondentsQueryDTO,
  GetOneInvitedRespondentsQueryDTO,
  GetInvitedRespondentsResultDTO,
  GetSurveyInvitedRespondentsQueryDTO,
  GetSurveyInvitedRespondentsResultsDTO,
} from './dto/get-spm-invited-respondents.dto';
import { addTableInvitedTable } from 'src/common/utils/addExcelTable';
import {
  PostInvitedRespondentsBodyDTO,
  PostInvitedRespondentsResultsDTO,
} from './dto/post-spm-invited-respondents.dto';
import { DelInvitedRespondentsQueryDTO } from './dto/delete-spm-invited-respondents.dto';

@Injectable()
export class SpmInvitedRespondentsService {
  constructor(
    @InjectRepository(InvitedRespondents)
    private invitedRespondentsRepo: Repository<InvitedRespondents>,

    @InjectEntityManager()
    private readonly entityManager: EntityManager,
  ) {}

  public async getOneService({
    companyid,
    surveyid,
    valuedemography,
    demography,
    tahun_survey,
  }: GetOneInvitedRespondentsQueryDTO): Promise<GetInvitedRespondentsResultDTO> {
    try {
      const query = await this.invitedRespondentsRepo
        .createQueryBuilder('tbl_spm_invitedrespondents')
        .where('tbl_spm_invitedrespondents.companyid = :companyid', {
          companyid,
        })
        .andWhere('tbl_spm_invitedrespondents.surveyid = :surveyid', {
          surveyid,
        })
        .andWhere('tbl_spm_invitedrespondents.tahun_survey = :tahun_survey', {
          tahun_survey,
        })
        .andWhere('tbl_spm_invitedrespondents.demography = :demography', {
          demography,
        })
        .andWhere(
          'tbl_spm_invitedrespondents.valuedemography = :valuedemography',
          {
            valuedemography,
          },
        )
        .andWhere('tbl_spm_invitedrespondents.is_delete = :is_delete', {
          is_delete: '0',
        })
        .getOne();

      if (!query) {
        throw new NotFoundException('Data not found');
      }

      return query;
    } catch (error) {
      throw error;
    }
  }

  public async getCompanyList(): Promise<GetInvitedRespondentsResultDTO[]> {
    try {
      const results = await this.invitedRespondentsRepo
        .createQueryBuilder()
        .select('*')
        .distinctOn(['companyid'])
        .getRawMany();
      return results;
    } catch (error) {
      throw error;
    }
  }

  public async getSurveyId({
    companyid,
  }: GetSurveyInvitedRespondentsQueryDTO): Promise<
    GetSurveyInvitedRespondentsResultsDTO[]
  > {
    try {
      return await this.invitedRespondentsRepo
        .createQueryBuilder()
        .select(['DISTINCT surveyid', 'companyid', 'tahun_survey'])
        .where('companyid = :companyid', { companyid })
        .andWhere('tahun_survey IS NOT NULL')
        .getRawMany();
    } catch (error) {
      throw error;
    }
  }

  public async getManyService({
    companyid,
    surveyid,
    tahun_survey,
  }: GetManyInvitedRespondentsQueryDTO): Promise<
    GetInvitedRespondentsResultDTO[]
  > {
    try {
      let query = this.invitedRespondentsRepo
        .createQueryBuilder()
        .where('companyid = :companyid', {
          companyid,
        })
        .andWhere('surveyid = :surveyid', {
          surveyid,
        });

      if (tahun_survey) {
        query = query.andWhere('tahun_survey = :tahun_survey', {
          tahun_survey,
        });
      }

      query = query
        .orderBy('demography', 'ASC')
        .addOrderBy('totalinvited_demography', 'DESC')
        .addOrderBy('valuedemography', 'ASC')
        .andWhere('is_delete = :is_delete', {
          is_delete: '0',
        });
      return (await query.getMany()).toDtos();
    } catch (error) {
      throw error;
    }
  }

  public async generateExcelInvitedRespondents({
    companyid,
    surveyid,
    tahun_survey,
  }): Promise<excel.Workbook> {
    try {
      const data = await this.getManyService({
        companyid,
        surveyid,
        tahun_survey,
      });
      const demographyQuery = `
        SELECT * FROM ms_demography
      `;
      const demographyResults = await this.entityManager.query(demographyQuery);

      if (data.length > 0) {
        data.forEach((item) => {
          item.startsurvey.getDay();
          item.closesurvey.getDate();
        });
      }

      const strings = demographyResults.map((item) => item.demographyalias);

      const workbook: excel.Workbook = new excel.Workbook();

      data.map((item) => {
        const sheet: excel.Worksheet = workbook.addWorksheet(item.demography);

        addTableInvitedTable(
          {
            columnStart: 'A',
            rowHeaderNum: 1,
            rowDataNum: 2,
            headerTitle: [
              'id',
              'companyid',
              'startsurvey',
              'closesurvey',
              'surveyid',
              'totalinvited_company',
              'valuedemography',
              'demography',
              'sourcecreatedmodifiedtime',
              'createdby',
              'createdtime',
              'endcreatedtime',
              'tahun_survey',
              'is_delete',
            ],
            tableData: [item],
          },
          sheet,
          [`"${strings}"`],
        );
      });
      return workbook;
    } catch (error) {
      throw error;
    }
  }

  public async createRespondent(
    body: PostInvitedRespondentsBodyDTO,
  ): Promise<PostInvitedRespondentsResultsDTO | undefined> {
    const currentDate = new Date();
    const offset = 7 * 60;
    const now = new Date(currentDate.getTime() + offset * 60 * 1000);
    const createdBy = `IRSPMWebAPI_Via_WebUI_`;

    try {
      const existings = await this.getOneService({
        companyid: body.companyid,
        surveyid: body.surveyid,
        valuedemography: body.valuedemography,
        demography: body.demography,
        tahun_survey: body.tahun_survey,
      })
        .then(async (res) => {
          return await this.invitedRespondentsRepo.save({
            ...res,
            startsurvey: body.startsurvey,
            closesurvey: body.closesurvey,
            totalinvited_demography: body.totalinvited_demography * 1,
            valuedemography: body.valuedemography,
            sourcecreatedmodifiedtime: now.toISOString(),
            totalinvited_company: body.totalinvited_company,
          });
        })
        .catch(() => null);

      if (!existings) {
        await this.getOneService({
          companyid: body.companyid,
          surveyid: body.surveyid,
          valuedemography: body.valuedemography,
          demography: body.demography,
          tahun_survey: body.tahun_survey,
        })
          .then(() => {
            throw new BadRequestException(
              `Value Demography ${body.valuedemography} on ${body.demography} already exist!`,
            );
          })
          .catch(() => null);

        const InsertData = this.invitedRespondentsRepo.create({
          ...body,
          startsurvey: body.startsurvey,
          closesurvey: body.closesurvey,
          totalinvited_company: body.totalinvited_company,
          sourcecreatedmodifiedtime: now.toISOString(),
          createdby: createdBy,
          createdtime: now.toISOString(),
          endcreatedtime: now.toISOString(),
          valuedemography: body.valuedemography,
        });
        return await this.invitedRespondentsRepo.save(InsertData);
      }
    } catch (error) {
      throw error;
    }
  }

  public async removeRespondents({
    companyid,
    surveyid,
    valuedemography,
    demography,
    tahun_survey,
  }: DelInvitedRespondentsQueryDTO): Promise<DeleteResult> {
    try {
      const currentDate = new Date();
      const offset = 7 * 60;
      const now = new Date(currentDate.getTime() + offset * 60 * 1000);
      const updateDelete = await this.getOneService({
        companyid,
        surveyid,
        valuedemography,
        demography,
        tahun_survey,
      });

      return await this.invitedRespondentsRepo.update(updateDelete.id, {
        sourcecreatedmodifiedtime: now.toISOString(),
        is_delete: '1',
      });
    } catch (error) {
      return error;
    }
  }
}
