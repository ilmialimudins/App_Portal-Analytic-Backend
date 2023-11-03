import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { InvitedRespondents } from './spm-invited-respondents.entity';
import {
  Repository,
  EntityManager,
  DeleteResult,
  FindManyOptions,
  Like,
  Not,
  IsNull,
} from 'typeorm';
import * as excel from 'exceljs';
import {
  GetManyInvitedRespondentsQueryDTO,
  GetOneInvitedRespondentsQueryDTO,
  GetInvitedRespondentsResultDTO,
  GetSurveyInvitedRespondentsQueryDTO,
  GetSurveyInvitedRespondentsResultsDTO,
  GetModifyListQueryDTO,
  GetModifyListManyDTO,
  GetModifyResponse,
  GetModifyDemographyDTO,
  GetModifyDetailQueryDTO,
  GetModifyDetailResponse,
  DetailDTO,
} from './dto/get-spm-invited-respondents.dto';
import { addTableInvitedTable } from 'src/common/utils/addExcelTable';
import {
  PostInvitedRespondentsBodyDTO,
  PostInvitedRespondentsResultsDTO,
} from './dto/post-spm-invited-respondents.dto';
import { DelInvitedRespondentsQueryDTO } from './dto/delete-spm-invited-respondents.dto';
import { Demography } from '../master-demography/master-demography.entity';

@Injectable()
export class SpmInvitedRespondentsService {
  constructor(
    @InjectRepository(InvitedRespondents)
    private invitedRespondentsRepo: Repository<InvitedRespondents>,

    @InjectRepository(Demography)
    private demographyRepository: Repository<Demography>,

    @InjectEntityManager()
    private readonly entityManager: EntityManager,
  ) {}

  public async getOneService({
    companyid,
    surveyid,
    valuedemography,
    demographyid,
    tahun_survey,
    surveygroupid,
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
        .andWhere('tbl_spm_invitedrespondents.surveygroupid = :surveygroupid', {
          surveygroupid,
        })
        .andWhere('tbl_spm_invitedrespondents.tahun_survey = :tahun_survey', {
          tahun_survey,
        })
        .andWhere('tbl_spm_invitedrespondents.demographyid = :demographyid', {
          demographyid,
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
    surveygroupid,
  }: GetSurveyInvitedRespondentsQueryDTO): Promise<
    GetSurveyInvitedRespondentsResultsDTO[]
  > {
    try {
      return await this.invitedRespondentsRepo
        .createQueryBuilder()
        .select([
          'DISTINCT surveyid',
          'companyid',
          'tahun_survey',
          'surveygroupid',
        ])
        .where('companyid = :companyid', { companyid })
        .andWhere('surveygroupid = :surveygroupid', { surveygroupid })
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
    surveygroupid,
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
        })
        .andWhere('surveygroupid = :surveygroupid', { surveygroupid });

      if (tahun_survey) {
        query = query.andWhere('tahun_survey = :tahun_survey', {
          tahun_survey,
        });
      }

      query = query
        .orderBy('demographyid', 'ASC')
        .addOrderBy('totalinvited_demography', 'DESC')
        .addOrderBy('valuedemography', 'ASC')
        .andWhere('is_delete = :is_delete', {
          is_delete: '0',
        });
      return query.getMany();
    } catch (error) {
      throw error;
    }
  }

  public async generateExcelInvitedRespondents({
    companyid,
    surveyid,
    tahun_survey,
    surveygroupid,
  }: GetManyInvitedRespondentsQueryDTO): Promise<excel.Workbook> {
    try {
      const data: GetInvitedRespondentsResultDTO[] = await this.getManyService({
        companyid,
        surveyid,
        tahun_survey,
        surveygroupid,
      }).then((response) => {
        console.log(response);
        // permisalan untuk data kosong
        return response;
      });
      const demographyQuery = `
        SELECT * FROM ms_demography
      `;
      const demographyResults = await this.entityManager.query(demographyQuery);

      const strings = demographyResults.map((item) => item.demographyalias);

      const workbook: excel.Workbook = new excel.Workbook();

      data.map((item) => {
        const sheet: excel.Worksheet = workbook.addWorksheet(
          item.valuedemography.trim() === ''
            ? 'Empty'
            : item.valuedemography.replace(/([^\w ]|_)/g, ''),
        );

        addTableInvitedTable(
          {
            columnStart: 'A',
            rowHeaderNum: 1,
            rowDataNum: 2,
            headerTitle: [
              'companyid',
              'surveyid',
              'tahun_survey',
              'startsurvey',
              'closesurvey',
              'demography',
              'totalinvited_demography',
              'valuedemography',
              'totalinvited_company',
            ],
            tableData: [
              {
                companyid: item.companyid,
                surveyid: item.surveyid,
                tahun_survey: item.tahun_survey,
                startsurvey: new Date(item.startsurvey)
                  .toLocaleDateString('id-ID', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                  })
                  .replace(/\//g, '-'),
                closesurvey: new Date(item.closesurvey)
                  .toLocaleDateString('id-ID', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                  })
                  .replace(/\//g, '-'),
                demography: item.demographyid,
                totalinvited_demography: item.totalinvited_demography,
                valuedemography: item.valuedemography,
                totalinvited_company: item.totalinvited_company,
              },
            ],
          },
          sheet,
          [`"${strings.join(',')}"`],
        );
      });
      console.log(data);
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
        demographyid: body.demographyid,
        tahun_survey: body.tahun_survey,
        surveygroupid: body.surveygroupid,
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
          demographyid: body.demographyid,
          tahun_survey: body.tahun_survey,
          surveygroupid: body.surveygroupid,
        })
          .then(() => {
            throw new BadRequestException(
              `Value Demography ${body.valuedemography} on ${body.demographyid} already exist!`,
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
    demographyid,
    tahun_survey,
    surveygroupid,
  }: DelInvitedRespondentsQueryDTO): Promise<DeleteResult> {
    try {
      const currentDate = new Date();
      const offset = 7 * 60;
      const now = new Date(currentDate.getTime() + offset * 60 * 1000);
      const updateDelete = await this.getOneService({
        companyid,
        surveyid,
        valuedemography,
        demographyid,
        tahun_survey,
        surveygroupid,
      });

      return await this.invitedRespondentsRepo.update(updateDelete.id, {
        sourcecreatedmodifiedtime: now.toISOString(),
        is_delete: '1',
      });
    } catch (error) {
      return error;
    }
  }

  async getListModify({
    search,
    filter,
    limit,
    offset,
  }: GetModifyListQueryDTO): Promise<GetModifyResponse> {
    try {
      if (!limit) limit = 10;
      if (!offset) offset = 0;
      const searchCriteria: FindManyOptions = {
        select: {
          id: true,
          tahun_survey: true,
          company: {
            companyeesname: true,
          },
          surveygroup: {
            surveygroupdesc: true,
          },
        },
        where: [
          {
            company: {
              companyeesname: Like(`%${search}%`),
            },
            is_delete: '0',
            tahun_survey: filter ? +filter : Not(IsNull()),
          },
          {
            surveygroup: {
              surveygroupdesc: Like(`%${search}%`),
            },
            is_delete: '0',
            tahun_survey: filter ? +filter : Not(IsNull()),
          },
        ],
        relations: {
          company: true,
          surveygroup: true,
        },
        take: limit,
        skip: offset,
      };

      const counter = await this.invitedRespondentsRepo.find({
        where: {
          is_delete: '0',
        },
      });

      const list: GetModifyListManyDTO[] =
        await this.invitedRespondentsRepo.find(searchCriteria);

      return {
        data: list,
        limit,
        offset,
        size: counter.length,
      };
    } catch (error) {
      return error;
    }
  }

  async getDetailModify({
    tahun_survey,
    company,
    surveygroup,
  }: GetModifyDetailQueryDTO): Promise<GetModifyDetailResponse> {
    try {
      const data: DetailDTO | null = await this.invitedRespondentsRepo.findOne({
        select: {
          company: {
            companyeesname: true,
          },
          surveygroup: {
            surveygroupdesc: true,
          },
        },
        relations: {
          company: true,
          surveygroup: true,
        },
        where: {
          tahun_survey: +tahun_survey,
          company: {
            companyeesname: !company ? '' : company,
          },
          surveygroup: {
            surveygroupdesc: !surveygroup ? '' : surveygroup,
          },
        },
      });
      if (!data)
        throw new HttpException('Data Not Found', HttpStatus.NOT_FOUND);

      const demographyValue = await this.demographyRepository
        .createQueryBuilder()
        .select('demographycode')
        .addSelect('demographydesc')
        .groupBy('demographycode, demographydesc')
        .getRawMany();

      const divAndDirData = await this.invitedRespondentsRepo
        .createQueryBuilder('tsi')
        .distinctOn(['dm.demographycode'])
        .select('dm.demographydesc', 'demography')
        .addSelect('tsi.valuedemography', 'valuedemography')
        .addSelect('dm.demographycode', 'demographycode')
        .addSelect('tsi.totalinvited_demography', 'totalinvited_demography')
        .innerJoin('tsi.demography', 'dm')
        .groupBy(
          'dm.demographycode, dm.demographydesc, tsi.valuedemography, tsi.totalinvited_demography',
        )
        .getRawMany();

      const invitedDemo: GetModifyDemographyDTO[] = [];
      let total_invited = 0;

      divAndDirData.forEach((demo) => {
        if (demo.demography == 'Division' || demo.demography == 'Directorate') {
          invitedDemo.push({
            demography: demo.demography,
            valuedemography: demo.valuedemography,
            totalinvited_demography: demo.totalinvited_demography,
          });

          total_invited += demo.totalinvited_demography;
        }
      });

      const [detail, invited, demography] = await Promise.all([
        data,
        invitedDemo,
        demographyValue,
      ]);

      return {
        detail,
        invited_respondents: invited,
        demography,
        total_invited_respondents: total_invited,
      };
    } catch (error) {
      throw error;
    }
  }
}
