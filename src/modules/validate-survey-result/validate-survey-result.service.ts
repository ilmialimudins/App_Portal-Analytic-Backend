import { BadRequestException, Inject, Injectable } from '@nestjs/common';
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
import { UserInfoDTO } from '../duende-authentication/dto/userinfo.dto';
import {
  ExtractedExcelDataSurveyDTO,
  UploadBodyNameDTO,
} from './dto/upload-validate-survey-result.dto';
import { UploadSurveyTransaction } from './upload-validate-survey-result.transaction';
import { UpdateDateVersion } from './update-dateversion.transaction';

@Injectable()
export class ValidateSurveyResultService {
  constructor(
    @InjectRepository(ValidateSurveyResult)
    private valdiateSurveyResultRepository: Repository<ValidateSurveyResult>,

    @InjectRepository(CheckingCompleteSurvey)
    private checkingCompleteSurveyRepository: Repository<CheckingCompleteSurvey>,

    @Inject(UploadSurveyTransaction)
    private uploadSurveyTransaction: UploadSurveyTransaction,

    @Inject(UpdateDateVersion)
    private updateDateVersion: UpdateDateVersion,

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
    userinfo: UserInfoDTO,
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
          dateversion: createNow,
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
          createdby: userinfo.fullname,
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
    userinfo: UserInfoDTO,
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
          updatedby: userinfo.fullname,
        })
        .where('id = :id', { id })
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

  async generateExcelValidateSurveyResult(
    body: DownloadValidateSurveyResultDto,
  ) {
    try {
      const query = await this.valdiateSurveyResultRepository
        .createQueryBuilder('validatesurveyresult')
        .select([
          'validatesurveyresult.id',
          'validatesurveyresult.respondentid',
          'validatesurveyresult.surveyid',
          'validatesurveyresult.businesslinecode',
          'validatesurveyresult.businessline',
          'validatesurveyresult.company',
          'validatesurveyresult.locationname',
          'validatesurveyresult.jobtitle',
          'validatesurveyresult.branch',
          'validatesurveyresult.education',
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
        .andWhere('validatesurveyresult.tahunsurvey = :tahunsurvey', {
          tahunsurvey: body.tahunsurvey,
        })
        .andWhere('validatesurveyresult.company = :company', {
          company: body.company,
        })
        .orderBy('validatesurveyresult.sourcecreatedmodifiedtime', 'DESC')
        .getMany();

      const workbook = new excel.Workbook();
      const worksheet = workbook.addWorksheet('Validate Survey Result Data');

      worksheet.protect('qwerty', {});
      const headerTitle = [
        'Respondent Id',
        'Surveyid',
        'Business Line Code',
        'Business Line',
        'Company',
        'Location',
        'Job Title',
        'Branch',
        'Education',
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
        'Respondent Id': item.respondentid,
        Surveyid: item.surveyid,
        'Business Line Code': item.businesslinecode,
        'Business Line': item.businessline,
        Company: item.company,
        Location: item.locationname,
        'Job Title': item.jobtitle,
        Branch: item.branch,
        education: item.education,
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

  /* eslint-disable */
  async extractValidateSurveyResult(
    data: UploadBodyNameDTO,
    userinfo: UserInfoDTO,
  ) {
    const workbook = new excel.Workbook();
    const file = await workbook.xlsx.readFile(
      `./temp/cleansing-survey/${data.fileName}`,
    );

    const worksheet: excel.Worksheet | undefined = file.getWorksheet(
      'Validate Survey Result Data',
    );

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

    const extractedData: ExtractedExcelDataSurveyDTO[] = tableData
      .slice(1)
      .map((item: (string | number)[]) => {
        return tableData[0].reduce((acc, current, index) => {
          return Object.assign(acc, { [current]: item[index] });
        }, {});
      });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const mapExtractedData: ExtractedExcelDataSurveyDTO[] = extractedData.map(
      (data: any) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const convertIfNA = (value: any): any => {
          return value === 'N/A' ? '' : value;
        };

        return {
          surveyid: convertIfNA(data['Surveyid'])?.toString() ?? '',
          respondentid: convertIfNA(data['Respondent Id']),
          businesslinecode: convertIfNA(data['Business Line Code']),
          businessline: convertIfNA(data['Business Line']),
          company: convertIfNA(data['Company']),
          division: convertIfNA(data['Division']),
          department: convertIfNA(data['Department']),
          branch: convertIfNA(data['Branch']),
          directorate: convertIfNA(data['Directorate']),
          education: convertIfNA(data['Education']),
          grade: convertIfNA(data['Grade'])?.toString() ?? '',
          jobtitle: convertIfNA(data['Job Title']),
          locationname: convertIfNA(data['Location']),
          age: convertIfNA(data['Age']),
          agegeneration: convertIfNA(data['Age Generation']),
          agegroup: convertIfNA(data['Age Group']),
          serviceyears: convertIfNA(data['Service Year']),
          gender: convertIfNA(data['Gender']),
          region: convertIfNA(data['Region']),
          area: convertIfNA(data['Area']),
          plant: convertIfNA(data['Plant']),
          kebun: convertIfNA(data['Kebun']),
          jobsites: convertIfNA(data['Job Sites']),
          statuskaryawan: convertIfNA(data['Employee Status']),
          functionname: convertIfNA(data['Function']),
          salesoffice: convertIfNA(data['Sales Office']),
          tahunlahir: convertIfNA(data['Birth Year']),
          tahunmasuk_perusahaan: convertIfNA(data['Entry Year (Company)']),
          tahunmasuk_astra: convertIfNA(data['Entry Year (Astra)']),
          tahunsurvey: convertIfNA(data['Survey Year']),
          entryyear_difference: convertIfNA(data['Entry Year Difference']),
          fillingtime: convertIfNA(data['Filling Time']),
          similaranswer: convertIfNA(data['Similar Answer']),
          completeanswer: convertIfNA(data['Complete Answer']),
          age_this_year: convertIfNA(data['Age This Year']),
          age_when_entering_company: convertIfNA(
            data['Age When Entering Company'],
          ),
        };
      },
    );

    const transaction = await this.uploadSurveyTransaction
      .setMetadata({
        userinfo: userinfo,
      })
      .run(mapExtractedData);

    return transaction;
  }
}
