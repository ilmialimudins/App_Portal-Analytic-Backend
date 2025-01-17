import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Inject,
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
  GetModifyListQueryDTO,
  GetModifyResponse,
  GetModifyDetailQueryDTO,
  GetModifyDetailResponse,
  DetailDTO,
  ListDemographyValueDTO,
} from './dto/get-spm-invited-respondents.dto';
import { addTableInvitedTable } from 'src/common/utils/addExcelTable';
import {
  PostAddModifyValueBodyDTO,
  PostInvitedRespondentsBodyDTO,
  PostInvitedRespondentsResultsDTO,
} from './dto/post-spm-invited-respondents.dto';
import {
  DelInvitedRespondentsQueryDTO,
  DelSectionModifyDTO,
} from './dto/delete-spm-invited-respondents.dto';
import { Demography } from '../master-demography/master-demography.entity';
import {
  ExtractExcelDataSPMDTO,
  UploadBodyNameDTO,
} from './dto/upload-spm-invited-respondents.dto';
import { UserInfoDTO } from '../duende-authentication/dto/userinfo.dto';
import { UploadSPMTransaction } from './upload-spm.transaction';
import { SaveAllSpmDTO, SaveAllTransactionDTO } from './dto/update-all-spm.dto';
import { SaveAllSMPTransaction } from './save-all-spm.transaction';

@Injectable()
export class SpmInvitedRespondentsService {
  constructor(
    @InjectRepository(InvitedRespondents)
    private invitedRespondentsRepo: Repository<InvitedRespondents>,

    @InjectRepository(Demography)
    private demographyRepository: Repository<Demography>,

    @Inject(UploadSPMTransaction)
    private uploadSPMTransaction: UploadSPMTransaction,

    @Inject(SaveAllSMPTransaction)
    private saveAllSmpTransaction: SaveAllSMPTransaction,

    @InjectEntityManager()
    private readonly entityManager: EntityManager,
  ) {}

  private currentDate = new Date();
  private offset = 7 * 60;
  private now = new Date(this.currentDate.getTime() + this.offset * 60 * 1000);

  public async getOneService({
    companyid,
    surveyid,
    valuedemography,
    demographyid,
    tahun_survey,
    surveygroupid,
  }: GetOneInvitedRespondentsQueryDTO): Promise<
    GetInvitedRespondentsResultDTO & { demographydesc?: string }
  > {
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

  public async getSurveyGroupId(companyid: number) {
    return this.invitedRespondentsRepo
      .createQueryBuilder('spm')
      .leftJoin('spm.surveygroup', 'surveygroup')
      .select([
        'DISTINCT surveygroup.surveygroupid as surveygroupid',
        'surveygroup.surveygroupdesc as surveygroupdesc',
        'surveygroup.surveygroupcode as surveygroupcode',
      ])
      .where('spm.companyid = :companyid', { companyid })
      .getRawMany();
  }

  public async getManyService({
    companyid,
    tahun_survey,
    surveygroupid,
  }: GetManyInvitedRespondentsQueryDTO): Promise<
    GetInvitedRespondentsResultDTO[]
  > {
    try {
      let query = this.invitedRespondentsRepo
        .createQueryBuilder('spm')
        .leftJoin('spm.demography', 'demography')
        .leftJoin('spm.company', 'company')
        .leftJoin('company.businessgroup', 'businessgroup')
        .leftJoin('spm.surveygroup', 'surveygroup')
        .select([
          'spm.createdby as createdby',
          'spm.updatedby as updatedby',
          'spm.createdtime as createdtime',
          'spm.createddate as createddate',
          'spm.sourcecreatedmodifiedtime as sourcecreatedmodifiedtime',
          'spm.sync_date as sync_date',
          'spm.id as id',
          'company.companyeesname as companyname',
          'businessgroup.businessgroupdesc as companygroup',
          'surveygroup.surveygroupdesc as surveygroupdesc',
          'spm.surveyid as surveyid',
          'spm.companyid as companyid',
          'spm.surveygroupid as surveygroupid',
          'spm.startsurvey as startsurvey',
          'spm.closesurvey as closesurvey',
          'spm.totalinvited_company as totalinvited_company',
          'spm.demographyid as demographyid',
          'spm.valuedemography as valuedemography',
          'spm.totalinvited_demography as totalinvited_demography',
          'spm.is_sync as is_sync',
          'spm.endcreatedtime as endcreatedtime',
          'spm.tahun_survey as tahun_survey',
          'spm.is_delete as is_delete',
          'spm.demography as demography',
        ])
        .addSelect('demography.demographydesc', 'demographydesc')
        .where('spm.companyid = :companyid', {
          companyid,
        })
        .andWhere('spm.surveygroupid = :surveygroupid', { surveygroupid })
        .andWhere('spm.tahun_survey = :tahun_survey', {
          tahun_survey,
        });

      query = query
        .orderBy('spm.demographyid', 'ASC')
        .addOrderBy('spm.totalinvited_demography', 'DESC')
        .addOrderBy('spm.valuedemography', 'ASC')
        .andWhere('spm.is_delete = :is_delete', {
          is_delete: '0',
        });
      return query.getRawMany();
    } catch (error) {
      throw error;
    }
  }

  public async generateExcelInvitedRespondents({
    companyid,
    tahun_survey,
    surveygroupid,
  }: GetManyInvitedRespondentsQueryDTO): Promise<excel.Workbook> {
    try {
      const data: GetInvitedRespondentsResultDTO[] = await this.getManyService({
        companyid,
        tahun_survey,
        surveygroupid,
      }).then((response) => {
        // permisalan untuk data kosong
        return response;
      });
      const demographyQuery = `
        SELECT * FROM ms_demography
      `;
      const demographyResults = await this.entityManager.query(demographyQuery);

      const strings = demographyResults.map((item) => item.demographyalias);

      const workbook: excel.Workbook = new excel.Workbook();

      const sheet: excel.Worksheet = workbook.addWorksheet('My Worksheet');

      sheet.protect('strongprotectpassword', {});
      addTableInvitedTable(
        {
          columnStart: 'A',
          rowHeaderNum: 1,
          rowDataNum: 2,
          headerTitle: [
            'companyid',
            'surveygroupid',
            'surveyid',
            'demographyid',
            'companygroup',
            'companyname',
            'surveygroupdesc',
            'tahun_survey',
            'startsurvey',
            'closesurvey',
            'demography',
            'valuedemography',
            'totalinvited_demography',
            'totalinvited_company',
          ],
          tableData: data.map((item) => ({
            companyid: item.companyid,
            surveygroupid: item.surveygroupid,
            surveyid: item.surveyid,
            demographyid: item.demographyid,
            companygroup: item.companygroup || 'N/A',
            companyname: item.companyname,
            surveygroupdesc: item.surveygroupdesc,
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
            demography: item.demographydesc,
            valuedemography: item.valuedemography,
            totalinvited_demography: item.totalinvited_demography,
            totalinvited_company: item.totalinvited_company,
          })),
        },
        sheet,
        [`"${strings.join(',')}"`],
      );

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
      const updateDelete = await this.getOneService({
        companyid,
        surveyid,
        valuedemography,
        demographyid,
        tahun_survey,
        surveygroupid,
      });

      return await this.invitedRespondentsRepo.update(updateDelete.id, {
        sourcecreatedmodifiedtime: this.now.toISOString(),
        is_delete: '1',
      });
    } catch (error) {
      return error;
    }
  }

  async getListModify({
    search,
    tahun_survey,
    limit,
    page,
  }: GetModifyListQueryDTO): Promise<GetModifyResponse> {
    try {
      if (!limit) limit = 10;
      if (!page) page = 1;

      const counter = await this.invitedRespondentsRepo
        .createQueryBuilder('spm')
        .select([
          'DISTINCT spm.tahun_survey as tahun_survey',
          'spm.companyid as companyid',
          'spm.surveygroupid as surveygroupid',
        ])
        .getRawMany();

      const querylist = this.invitedRespondentsRepo
        .createQueryBuilder('spm')
        .select([
          'DISTINCT spm.tahun_survey as tahun_survey',
          'spm.companyid as companyid',
          'spm.surveygroupid as surveygroupid',
          'company.companyeesname as company',
          'surveygroup.surveygroupdesc as surveygroup',
        ])

        .leftJoin('spm.company', 'company')
        .leftJoin('spm.surveygroup', 'surveygroup')
        .where('spm.is_delete = :is_delete', { is_delete: '0' });
      if (search) {
        querylist.andWhere(
          'company.companyeesname LIKE :search OR surveygroup.surveygroupdesc LIKE :search',
          { search: `%${search}%` },
        );
      }

      if (tahun_survey) {
        querylist.andWhere('spm.tahun_survey = :tahun_survey', {
          tahun_survey: tahun_survey,
        });
      }

      const list = await querylist
        .orderBy('spm.tahun_survey', 'DESC')
        .addOrderBy('spm.companyid', 'ASC')
        .limit(limit)
        .offset((page - 1) * limit)
        .getRawMany();

      return {
        data: list,
        limit,
        page,
        size: counter.length,
      };
    } catch (error) {
      return error;
    }
  }

  async getDetailModify({
    tahun_survey,
    companyid,
    surveygroupid,
  }: GetModifyDetailQueryDTO): Promise<GetModifyDetailResponse> {
    try {
      const data: DetailDTO | undefined = await this.invitedRespondentsRepo
        .createQueryBuilder('tsi')
        .select('tsi.surveyid', 'surveyid')
        .addSelect('tsi.surveygroupid', 'surveygroupid')
        .addSelect('tsi.companyid', 'companyid')
        .addSelect('tsi.startsurvey', 'startsurvey')
        .addSelect('tsi.closesurvey', 'closesurvey')
        .addSelect('tsi.totalinvited_company', 'totalinvited_company')
        .addSelect('tsi.demographyid', 'demographyid')
        .addSelect('tsi.valuedemography', 'valuedemography')
        .addSelect('tsi.tahun_survey', 'tahun_survey')
        .addSelect('c.companyeesname', 'company')
        .addSelect('s.surveygroupdesc', 'surveygroup')
        .innerJoin('tsi.company', 'c')
        .innerJoin('tsi.surveygroup', 's')
        .where(
          'tsi.tahun_survey = :tahun_survey AND tsi.companyid = :companyid AND tsi.surveygroupid = :surveygroupid AND tsi.is_delete = 0',
          { tahun_survey, companyid, surveygroupid },
        )
        .getRawOne();
      if (!data)
        throw new HttpException('Data Not Found', HttpStatus.NOT_FOUND);

      const divAndDirData = await this.invitedRespondentsRepo
        .createQueryBuilder('tsi')
        .select('dm.demographydesc', 'demography')
        .addSelect('tsi.id', 'id')
        .addSelect('tsi.valuedemography', 'valuedemography')
        .addSelect('tsi.demographyid', 'demographyid')
        .addSelect('dm.demographycode', 'demographycode')
        .addSelect('tsi.totalinvited_demography', 'totalinvited_demography')
        .innerJoin('tsi.demography', 'dm')
        .where(
          'tsi.tahun_survey = :tahun_survey AND tsi.companyid = :companyid AND tsi.surveygroupid = :surveygroupid AND tsi.is_delete = 0',
          { tahun_survey, companyid, surveygroupid },
        )
        .getRawMany();

      const constructDataDemography = divAndDirData.reduce((acc, item) => {
        return Object.assign(acc, {
          [item.demographycode]: {
            demography: item.demography,
            demographycode: item.demographycode,
            demographyid: item.demographyid,
            listdemographyvalue: [
              ...(acc[item.demographycode]?.listdemographyvalue || []),
              {
                id: item.id,
                valuedemography: item.valuedemography,
                totalinvited_demography: item.totalinvited_demography,
              },
            ],
          },
        });
      }, {});

      const invitedRespondent = Object.keys(constructDataDemography).map(
        (key: string) => ({ ...constructDataDemography[key] }),
      );

      const [detail, total] = await Promise.all([
        data,
        Math.max(
          ...invitedRespondent.map((item) =>
            item.listdemographyvalue.reduce((acc, item) => {
              const current =
                typeof item.totalinvited_demography === 'string'
                  ? parseInt(item.totalinvited_demography)
                  : item.totalinvited_demography;

              return acc + current;
            }, 0),
          ),
        ),
      ]);

      return {
        detail,
        invited_respondents: invitedRespondent,
        total_invited_respondents: total,
      };
    } catch (error) {
      throw error;
    }
  }

  async changeTotalInvited(
    { tahun_survey, companyid, surveygroupid }: GetModifyDetailQueryDTO,
    total: number,
  ) {
    try {
      const insert = await this.invitedRespondentsRepo
        .createQueryBuilder()
        .update(InvitedRespondents)
        .set({ totalinvited_company: total })
        .where(
          'tahun_survey = :tahun_survey AND companyid = :companyid AND surveygroupid = :surveygroupid AND is_delete = 0',
          { tahun_survey, companyid, surveygroupid },
        )
        .execute();

      return insert;
    } catch (error) {
      throw error;
    }
  }

  public async saveAllDemography(body: SaveAllSpmDTO, user: UserInfoDTO) {
    const transactiondata: SaveAllTransactionDTO[] = body.invited_respondents
      .map((inv) =>
        inv.listdemographyvalue.map((dem) => ({
          id: dem.id,
          totalinvited_demography: dem.totalinvited_demography,
          valuedemography: dem.valuedemography,
          totalinvited_company: body.total_invited_respondents,
        })),
      )
      .flat(2);

    return await this.saveAllSmpTransaction
      .setMetadata({ userinfo: user })
      .run(transactiondata);
  }

  public async addDemographyValueModify(body: PostAddModifyValueBodyDTO) {
    try {
      const findId = await this.demographyRepository.findOne({
        where: {
          demographycode: body.demographycode,
        },
      });

      if (typeof findId?.demographyid !== 'undefined') {
        const insert = await this.createRespondent({
          surveyid: body.surveyid,
          companyid: body.companyid,
          surveygroupid: body.surveygroupid,
          valuedemography: body.valuedemography,
          demographyid: findId.demographyid,
          tahun_survey: body.tahun_survey,
          startsurvey: body.startsurvey || this.now.toISOString(),
          closesurvey: body.closesurvey,
          totalinvited_demography: body.totalinvited_demography,
          totalinvited_company: body.totalinvited_company,
        });

        const result: ListDemographyValueDTO = {
          demographyvalue: insert?.valuedemography,
          inviteddemography: insert?.totalinvited_company,
        };

        return result;
      }

      throw new HttpException(
        `code: ${body.demographycode} not found`,
        HttpStatus.BAD_REQUEST,
      );
    } catch (error) {
      throw error;
    }
  }

  public async removeValueDemo({
    companyid,
    surveygroupid,
    tahun_survey,
    demography,
    valuedemography,
  }) {
    try {
      const findSelected = await this.invitedRespondentsRepo
        .createQueryBuilder('tsi')
        .select('tsi.id', 'id')
        .innerJoin('tsi.demography', 'dm')
        .where(
          'tsi.companyid = :companyid AND tsi.surveygroupid = :surveygroupid AND tsi.tahun_survey = :tahun_survey AND tsi.valuedemography = :valuedemography AND dm.demographydesc = :demography',
          {
            companyid,
            surveygroupid,
            tahun_survey,
            demography,
            valuedemography,
          },
        )
        .getRawOne();

      return await this.invitedRespondentsRepo.update(findSelected?.id, {
        sourcecreatedmodifiedtime: this.now.toISOString(),
        is_delete: '1',
      });
    } catch (error) {
      throw error;
    }
  }

  public async removeSectionDemo({
    companyid,
    surveygroupid,
    tahun_survey,
    demography,
  }: DelSectionModifyDTO) {
    try {
      const data = await this.invitedRespondentsRepo
        .createQueryBuilder('tsi')
        .select('tsi.demographyid', 'demographyid')
        .innerJoin('tsi.demography', 'dm')
        .where(
          "tsi.companyid = :companyid AND tsi.surveygroupid = :surveygroupid AND tsi.tahun_survey = :tahun_survey AND dm.demographydesc = :demography AND is_delete = '0'",
          { companyid, surveygroupid, tahun_survey, demography },
        )
        .getRawOne();
      return await this.invitedRespondentsRepo
        .createQueryBuilder()
        .update(InvitedRespondents)
        .set({
          sourcecreatedmodifiedtime: this.now.toISOString(),
          is_delete: '1',
        })
        .where(
          'companyid = :companyid AND surveygroupid = :surveygroupid AND tahun_survey = :tahun_survey AND demographyid = :demographyid',
          {
            companyid,
            surveygroupid,
            tahun_survey,
            demographyid: data?.demographyid,
          },
        )
        .execute();
    } catch (error) {
      throw error;
    }
  }

  public async extractSPMInvited(
    data: UploadBodyNameDTO,
    userinfo: UserInfoDTO,
  ) {
    const workbook = new excel.Workbook();
    const file = await workbook.xlsx.readFile(`./temp/${data.fileName}`);

    const worksheet: excel.Worksheet | undefined =
      file.getWorksheet('My Worksheet');

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (!worksheet) {
      throw new BadRequestException(
        'Worksheet not found, please use correct template',
      );
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const tableData: any = [];

    worksheet.eachRow({ includeEmpty: false }, (row) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const rowData: any[] = [];

      row.eachCell({ includeEmpty: false }, (cell) => {
        rowData.push(cell.value);
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      tableData.push(rowData as any);
    });

    const extractedData: ExtractExcelDataSPMDTO[] = tableData
      .slice(1)
      .map((item: (string | number)[]) => {
        return tableData[0].reduce((acc, current, index) => {
          return Object.assign(acc, { [current]: item[index] });
        }, {});
      });

    const transaction = await this.uploadSPMTransaction
      .setMetadata({
        userinfo: userinfo,
      })
      .run(extractedData);

    return transaction;
  }
}
