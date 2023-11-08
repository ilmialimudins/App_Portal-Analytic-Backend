import { ApiProperty } from '@nestjs/swagger';
import { AbstractDto } from 'src/common/dto/abstract.dto';
import { ValidateSurveyResult } from '../validate-survey-result.entity';

export class ValidateSurveyResultDto extends AbstractDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  uuid: string;

  @ApiProperty()
  excelname: string;

  @ApiProperty()
  validation: string;

  @ApiProperty()
  dateversion: Date;

  @ApiProperty()
  surveyid: number;

  @ApiProperty()
  respondentid: number;

  @ApiProperty()
  businesslinecode: string;

  @ApiProperty()
  businessline: string;

  @ApiProperty()
  company: string;

  @ApiProperty()
  division: string;

  @ApiProperty()
  department: string;

  @ApiProperty()
  branch: string;

  @ApiProperty()
  directorate: string;

  @ApiProperty()
  education: string;

  @ApiProperty()
  grade: string;

  @ApiProperty()
  jobtitle: string;

  @ApiProperty()
  locationname: string;

  @ApiProperty()
  age: string;

  @ApiProperty()
  agegeneration: string;

  @ApiProperty()
  agegroupcode: string;

  @ApiProperty()
  agegroup: string;

  @ApiProperty()
  serviceyearscode: string;

  @ApiProperty()
  serviceyears: string;

  @ApiProperty()
  gender: string;

  @ApiProperty()
  region: string;

  @ApiProperty()
  area: string;

  @ApiProperty()
  plant: string;

  @ApiProperty()
  kebun: string;

  @ApiProperty()
  jobsites: string;

  @ApiProperty()
  statuskaryawan: string;

  @ApiProperty()
  functionname: string;

  @ApiProperty()
  salesoffice: string;

  @ApiProperty()
  latest: string;

  @ApiProperty()
  tahunlahir: number;

  @ApiProperty()
  tahunmasuk_perusahaan: number;

  @ApiProperty()
  tahunmasuk_astra: number;

  @ApiProperty()
  tahunsurvey: number;

  @ApiProperty()
  entryyear_difference: string;

  @ApiProperty()
  fillingtime: string;

  @ApiProperty()
  similaranswer: string;

  @ApiProperty()
  completeanswer: string;

  @ApiProperty()
  age_this_year: string;

  @ApiProperty()
  age_when_entering_company: string;

  @ApiProperty()
  excel_username: string;

  @ApiProperty()
  row_status: string;

  constructor(validateSurveyResultEntity: ValidateSurveyResult) {
    super(validateSurveyResultEntity, { exludeFields: true });
    this.id = validateSurveyResultEntity.id * 1;
    this.uuid = validateSurveyResultEntity.uuid;
    this.excelname = validateSurveyResultEntity.excelname;
    this.validation = validateSurveyResultEntity.validation;
    this.dateversion = validateSurveyResultEntity.dateversion;
    this.surveyid = validateSurveyResultEntity.surveyid;
    this.respondentid = validateSurveyResultEntity.respondentid;
    this.businesslinecode = validateSurveyResultEntity.businesslinecode;
    this.businessline = validateSurveyResultEntity.businessline;
    this.company = validateSurveyResultEntity.company;
    this.division = validateSurveyResultEntity.division;
    this.department = validateSurveyResultEntity.department;
    this.branch = validateSurveyResultEntity.branch;
    this.directorate = validateSurveyResultEntity.directorate;
    this.education = validateSurveyResultEntity.education;
    this.grade = validateSurveyResultEntity.grade;
    this.jobtitle = validateSurveyResultEntity.jobtitle;
    this.locationname = validateSurveyResultEntity.locationname;
    this.age = validateSurveyResultEntity.age;
    this.agegeneration = validateSurveyResultEntity.agegeneration;
    this.agegroupcode = validateSurveyResultEntity.agegroupcode;
    this.agegroup = validateSurveyResultEntity.agegroup;
    this.serviceyearscode = validateSurveyResultEntity.serviceyearscode;
    this.serviceyears = validateSurveyResultEntity.serviceyears;
    this.gender = validateSurveyResultEntity.gender;
    this.region = validateSurveyResultEntity.region;
    this.area = validateSurveyResultEntity.area;
    this.plant = validateSurveyResultEntity.plant;
    this.kebun = validateSurveyResultEntity.kebun;
    this.jobsites = validateSurveyResultEntity.jobsites;
    this.statuskaryawan = validateSurveyResultEntity.statuskaryawan;
    this.functionname = validateSurveyResultEntity.functionname;
    this.salesoffice = validateSurveyResultEntity.salesoffice;
    this.latest = validateSurveyResultEntity.latest;
    this.tahunlahir = validateSurveyResultEntity.tahunlahir;
    this.tahunmasuk_perusahaan =
      validateSurveyResultEntity.tahunmasuk_perusahaan;
    this.tahunmasuk_astra = validateSurveyResultEntity.tahunmasuk_astra;
    this.tahunsurvey = validateSurveyResultEntity.tahunsurvey;
    this.entryyear_difference = validateSurveyResultEntity.entryyear_difference;
    this.fillingtime = validateSurveyResultEntity.fillingtime;
    this.similaranswer = validateSurveyResultEntity.similaranswer;
    this.completeanswer = validateSurveyResultEntity.completeanswer;
    this.age_this_year = validateSurveyResultEntity.age_this_year;
    this.age_when_entering_company =
      validateSurveyResultEntity.age_when_entering_company;
    this.excel_username = validateSurveyResultEntity.excel_username;
    this.row_status = validateSurveyResultEntity.row_status;
  }
}
