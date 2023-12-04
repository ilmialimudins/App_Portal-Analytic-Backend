import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ValidateSurveyResult } from './validate-survey-result.entity';
import { EntityManager, Repository } from 'typeorm';
import { ValidateSurveyResultDto } from './dto/validate-survey-result.dto';
import { UpdateValidateSurveyResultDto } from './dto/update-validate-survey-result.dto';
import { CheckingCompleteSurvey } from '../checking-complete-survey/checking-complete-survey.entity';
import * as excel from 'exceljs';
import { addTableValidate } from 'src/common/utils/addExcelTable';
import { v4 as uuidv4 } from 'uuid';
import {
  AddValidateSurveyResultDto,
  DownloadValidateSurveyResultDto,
} from './dto/add-validate-survey-result.dto';

@Injectable()
export class ValidateSurveyResultService {
  constructor(
    @InjectRepository(ValidateSurveyResult)
    private valdiateSurveyResultRepository: Repository<ValidateSurveyResult>,

    @InjectRepository(CheckingCompleteSurvey)
    private checkingCompleteSurveyRepository: Repository<CheckingCompleteSurvey>,

    private readonly manager: EntityManager,
  ) {}

  async getAllValidateSurveyResult(
    searchParams: Record<string, number> = {},
  ): Promise<{
    data: ValidateSurveyResultDto[];
    page: number;
    take: number;
    itemCount: number;
    pageCount: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
  }> {
    try {
      const page = searchParams.page || 1;
      const take = searchParams.take || 10;
      const offset = (page - 1) * take;

      const query = this.valdiateSurveyResultRepository
        .createQueryBuilder('validatesurveyresult')
        .leftJoin('validatesurveyresult.surveyvalidation', 'surveyvalidation')
        .select([
          'validatesurveyresult.id',
          'surveyvalidation.validation',
          'validatesurveyresult.respondentid',
          'validatesurveyresult.surveyid',
          'validatesurveyresult.businessline',
          'validatesurveyresult.company',
          'validatesurveyresult.locationname',
          'validatesurveyresult.jobtitle',
          'validatesurveyresult.branch',
          'validatesurveyresult.plant',
          'validatesurveyresult.jobsites',
          'validatesurveyresult.directorate',
          'validatesurveyresult.division',
          'validatesurveyresult.department',
          'validatesurveyresult.grade',
          'validatesurveyresult.age',
          'validatesurveyresult.tahunlahir',
          'validatesurveyresult.tahunmasuk_astra',
          'validatesurveyresult.tahunmasuk_perusahaan',
          'validatesurveyresult.tahunsurvey',
          'validatesurveyresult.agegroup',
          'validatesurveyresult.agegeneration',
          'validatesurveyresult.serviceyears',
          'validatesurveyresult.statuskaryawan',
          'validatesurveyresult.functionname',
          'validatesurveyresult.region',
          'validatesurveyresult.area',
          'validatesurveyresult.salesoffice',
          'validatesurveyresult.kebun',
          'validatesurveyresult.gender',
          'validatesurveyresult.entryyear_difference',
          'validatesurveyresult.fillingtime',
          'validatesurveyresult.similaranswer',
          'validatesurveyresult.completeanswer',
          'validatesurveyresult.age_this_year',
          'validatesurveyresult.age_when_entering_company',
        ]);

      const whereClauses = Object.keys(searchParams)
        .filter((param) => param !== 'page' && param !== 'take')
        .map((param) => {
          const value = searchParams[param].toString();
          return {
            clause: `LOWER(validatesurveyresult.${param}) LIKE :${param}`,
            value: { [param]: `%${value.toLowerCase()}%` },
          };
        });

      const data = query
        .where('validatesurveyresult.row_status = :row_status', {
          row_status: false,
        })
        .andWhere('validatesurveyresult.surveyid = surveyvalidation.surveyid')
        .andWhere('validatesurveyresult.company = surveyvalidation.company');
      whereClauses.map((clause) => data.andWhere(clause.clause, clause.value));

      const result = await data
        .orderBy('validatesurveyresult.sourcecreatedmodifiedtime', 'DESC')
        .offset(offset)
        .limit(take)
        .getMany();

      const itemCount = query
        .where('validatesurveyresult.row_status = :row_status', {
          row_status: false,
        })
        .andWhere('validatesurveyresult.surveyid = surveyvalidation.surveyid')
        .andWhere('validatesurveyresult.company = surveyvalidation.company');
      whereClauses.map((clause) => data.andWhere(clause.clause, clause.value));

      const totalItemCount = await itemCount.getCount();
      const pageCount = Math.ceil(totalItemCount / take);
      const hasPreviousPage = page > 1;
      const hasNextPage = page < pageCount;

      return {
        data: result,
        page,
        take,
        itemCount: totalItemCount,
        pageCount,
        hasPreviousPage,
        hasNextPage,
      };
    } catch (error) {
      throw error;
    }
  }

  async createManyValidateSurveyResult(
    validatesurveyresult: AddValidateSurveyResultDto[],
  ) {
    try {
      const createNow = new Date(new Date().getTime() + 7 * 60 * 60 * 1000);

      const year = createNow.getFullYear();
      const month = createNow.getMonth() + 1;
      const date = createNow.getDate();

      const createdDate = parseInt(`${year}${month}${date}`);

      const values = validatesurveyresult.map((item) => {
        return {
          uuid: uuidv4(),
          dateversion: new Date(),
          surveyid: item.surveyid,
          respondentid: item.respondentid,
          businesslinecode: item.businesslinecode,
          businessline: item.businessline,
          company: item.company,
          division: item.division,
          department: item.department,
          branch: item.branch,
          directorate: item.directorate,
          education: item.education,
          grade: item.grade,
          jobtitle: item.jobtitle,
          locationname: item.locationname,
          age: item.age,
          agegeneration: item.agegeneration,
          agegroupcode: item.agegroupcode,
          agegroup: item.agegroup,
          serviceyearscode: item.serviceyearscode,
          serviceyears: item.serviceyears,
          gender: item.gender,
          region: item.region,
          area: item.area,
          plant: item.plant,
          kebun: item.kebun,
          jobsites: item.jobsites,
          statuskaryawan: item.statuskaryawan,
          functionname: item.functionname,
          salesoffice: item.salesoffice,
          latest: item.latest,
          tahunlahir: item.tahunlahir,
          tahunmasuk_perusahaan: item.tahunmasuk_perusahaan,
          tahunmasuk_astra: item.tahunmasuk_astra,
          tahunsurvey: item.tahunsurvey,
          entryyear_difference: item.entryyear_difference,
          fillingtime: item.fillingtime,
          similaranswer: item.similaranswer,
          completeanswer: item.completeanswer,
          age_this_year: item.age_this_year,
          age_when_entering_company: item.age_when_entering_company,
          createdby: item.createdby,
          row_status: 'false',
          createdtime: createNow,
          createddate: createdDate,
          sourcecreatedmodifiedtime: createNow,
        };
      });

      const result = await this.valdiateSurveyResultRepository
        .createQueryBuilder()
        .insert()
        .values([...values])
        .execute();

      return { insertedRowCount: result.identifiers.length };
    } catch (error) {
      throw error;
    }
  }

  async updateValidateSurveyResult(
    id: number,
    validatesurveyresult: UpdateValidateSurveyResultDto,
  ) {
    try {
      const query = await this.valdiateSurveyResultRepository
        .createQueryBuilder()
        .update(ValidateSurveyResult)
        .set({
          locationname: validatesurveyresult.locationname,
          directorate: validatesurveyresult.directorate,
          division: validatesurveyresult.division,
          department: validatesurveyresult.department,
          branch: validatesurveyresult.branch,
          plant: validatesurveyresult.plant,
          jobtitle: validatesurveyresult.jobtitle,
          jobsites: validatesurveyresult.jobsites,
          functionname: validatesurveyresult.functionname,
          region: validatesurveyresult.region,
          area: validatesurveyresult.area,
          salesoffice: validatesurveyresult.salesoffice,
          kebun: validatesurveyresult.kebun,
          gender: validatesurveyresult.gender,
          grade: validatesurveyresult.grade,
          education: validatesurveyresult.education,
          tahunlahir: validatesurveyresult.tahunlahir,
          tahunmasuk_astra: validatesurveyresult.tahunmasuk_astra,
          tahunmasuk_perusahaan: validatesurveyresult.tahunmasuk_perusahaan,
          updatedby: validatesurveyresult.updatedby,
        })
        .where('id = :id', { id })
        .execute();

      return query;
    } catch (error) {
      throw error;
    }
  }

  async updateDateVersion(surveyid: number, company: string) {
    const queryRunner = this.manager.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const managerValidate = this.manager.getRepository(ValidateSurveyResult);
      const query = await managerValidate
        .createQueryBuilder()
        .update(ValidateSurveyResult)
        .set({
          dateversion: new Date(),
        })
        .where('surveyid = :surveyid', { surveyid })
        .andWhere('company = :company', { company })
        .execute();

      await queryRunner.commitTransaction();

      return query;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async deleteValidateSurveyResult(id: number) {
    try {
      const query = await this.valdiateSurveyResultRepository
        .createQueryBuilder()
        .update(ValidateSurveyResult)
        .set({ row_status: 'true' })
        .where('id = :id', { id })
        .execute();

      return query;
    } catch (error) {
      throw error;
    }
  }

  async deleteRespondentIncomplete(respondentid: number) {
    try {
      const validatesurveyresult = await this.valdiateSurveyResultRepository
        .createQueryBuilder()
        .update(ValidateSurveyResult)
        .set({ row_status: 'true' })
        .where('respondentid = :respondentid', { respondentid })
        .execute();

      const checkcompletesurvey = await this.checkingCompleteSurveyRepository
        .createQueryBuilder()
        .update(CheckingCompleteSurvey)
        .set({ status: 'Complete response' })
        .where('respondentid = :respondentid', { respondentid })
        .execute();

      return { validatesurveyresult, checkcompletesurvey };
    } catch (error) {
      throw error;
    }
  }

  async generateExcelValidateSurveyResult(
    body: DownloadValidateSurveyResultDto,
  ) {
    try {
      const query = await this.valdiateSurveyResultRepository
        .createQueryBuilder('validatesurveyresult')
        .leftJoin('validatesurveyresult.surveyvalidation', 'surveyvalidation')
        .select([
          'validatesurveyresult.id',
          'surveyvalidation.validation',
          'validatesurveyresult.respondentid',
          'validatesurveyresult.surveyid',
          'validatesurveyresult.businessline',
          'validatesurveyresult.company',
          'validatesurveyresult.locationname',
          'validatesurveyresult.jobtitle',
          'validatesurveyresult.branch',
          'validatesurveyresult.plant',
          'validatesurveyresult.jobsites',
          'validatesurveyresult.directorate',
          'validatesurveyresult.division',
          'validatesurveyresult.department',
          'validatesurveyresult.grade',
          'validatesurveyresult.age',
          'validatesurveyresult.tahunlahir',
          'validatesurveyresult.tahunmasuk_astra',
          'validatesurveyresult.tahunmasuk_perusahaan',
          'validatesurveyresult.tahunsurvey',
          'validatesurveyresult.agegroup',
          'validatesurveyresult.agegeneration',
          'validatesurveyresult.serviceyears',
          'validatesurveyresult.statuskaryawan',
          'validatesurveyresult.functionname',
          'validatesurveyresult.region',
          'validatesurveyresult.area',
          'validatesurveyresult.salesoffice',
          'validatesurveyresult.kebun',
          'validatesurveyresult.gender',
          'validatesurveyresult.entryyear_difference',
          'validatesurveyresult.fillingtime',
          'validatesurveyresult.similaranswer',
          'validatesurveyresult.completeanswer',
          'validatesurveyresult.age_this_year',
          'validatesurveyresult.age_when_entering_company',
        ])
        .where('validatesurveyresult.row_status = :row_status', {
          row_status: false,
        })
        .andWhere('validatesurveyresult.surveyid = :surveyid', {
          surveyid: body.surveyid,
        })
        .andWhere('validatesurveyresult.company = :company', {
          company: body.company,
        })
        .orderBy('validatesurveyresult.sourcecreatedmodifiedtime', 'DESC')
        .getMany();

      const workbook = new excel.Workbook();
      const worksheet = workbook.addWorksheet('Validate Survey Result Data');

      const headerTitle = [
        'Validation',
        'Respondent Id',
        'Surveyid',
        'Business Line',
        'Company',
        'Location',
        'Job Title',
        'Branch',
        'Plant',
        'Job Sites',
        'Directorate',
        'Division',
        'Department',
        'Grade',
        'Age',
        'Birth Year',
        'Entry Year (Astra)',
        'Entry Year (Company)',
        'Survey Year',
        'Age Group',
        'Age Generation',
        'Service Year',
        'Employee Status',
        'Function',
        'Region',
        'Area',
        'Sales Office',
        'Kebun',
        'Gender',
        'Entry Year Difference',
        'Filling Time',
        'Similar Answer',
        'Complete Answer',
        'Age This Year',
        'Age When Entering Company',
      ];
      const tableData = query.map((item) => ({
        Validation: item.surveyvalidation.validation,
        'Respondent Id': item.respondentid,
        Surveyid: item.surveyid,
        'Business Line': item.businessline,
        Company: item.company,
        Location: item.locationname,
        'Job Title': item.jobtitle,
        Branch: item.branch,
        Plant: item.plant,
        'Job Sites': item.jobsites,
        Directorate: item.directorate,
        Division: item.division,
        Department: item.department,
        Grade: item.grade,
        Age: item.age,
        'Birth Year': item.tahunlahir,
        'Entry Year (Astra)': item.tahunmasuk_astra,
        'Entry Year (Company)': item.tahunmasuk_perusahaan,
        'Survey Year': item.tahunsurvey,
        'Age Group': item.agegroup,
        'Age Generation': item.agegeneration,
        'Service Year': item.serviceyears,
        'Employee Status': item.statuskaryawan,
        Function: item.functionname,
        Region: item.region,
        Area: item.area,
        'Sales Office': item.salesoffice,
        Kebun: item.kebun,
        Gender: item.gender,
        'Entry Year Difference': item.entryyear_difference,
        'Filling Time': item.fillingtime,
        'Similar Answer': item.similaranswer,
        'Complete Answer': item.completeanswer,
        'Age This Year': item.age_this_year,
        'Age When Entering Company': item.age_when_entering_company,
      }));

      addTableValidate(
        {
          columnStart: 'A',
          rowHeaderNum: 1,
          rowDataNum: 2,
          headerTitle: headerTitle,
          tableData: tableData,
        },
        worksheet,
      );

      return workbook;
    } catch (error) {
      throw error;
    }
  }
}
