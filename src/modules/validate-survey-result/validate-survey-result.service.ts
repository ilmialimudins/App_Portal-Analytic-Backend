import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ValidateSurveyResult } from './validate-survey-result.entity';
import { Repository } from 'typeorm';
import { ValidateSurveyResultDto } from './dto/validate-survey-result.dto';
import { UpdateValidateSurveyResultDto } from './dto/update-validate-survey-result.dto';
import { CheckingCompleteSurvey } from '../checking-complete-survey/checking-complete-survey.entity';

@Injectable()
export class ValidateSurveyResultService {
  constructor(
    @InjectRepository(ValidateSurveyResult)
    private valdiateSurveyResultRepository: Repository<ValidateSurveyResult>,

    @InjectRepository(CheckingCompleteSurvey)
    private checkingCompleteSurveyRepository: Repository<CheckingCompleteSurvey>,
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
          createdtime: new Date(),
          sourcecreatedmodifiedtime: new Date(),
        })
        .where('id = :id', { id })
        .execute();

      return query;
    } catch (error) {
      throw error;
    }
  }

  async updateDateVersion(surveyid: number, company: string) {
    try {
      const query = await this.valdiateSurveyResultRepository
        .createQueryBuilder()
        .update(ValidateSurveyResult)
        .set({
          dateversion: new Date(),
        })
        .where('surveyid = :surveyid', { surveyid })
        .andWhere('company = :company', { company })
        .execute();

      return query;
    } catch (error) {
      throw error;
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
}
