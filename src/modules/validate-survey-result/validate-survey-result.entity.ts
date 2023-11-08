import { UseDto } from 'src/decorators/use-dto.decorator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ValidateSurveyResultDto } from './dto/validate-survey-result.dto';
import { AbstractEntity } from 'src/common/abstract.entity';

@Entity('tbl_validatesurveyresult')
@UseDto(ValidateSurveyResultDto)
export class ValidateSurveyResult extends AbstractEntity<ValidateSurveyResultDto> {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
  id: number;

  @Column({ type: 'varchar', name: 'uuid', nullable: false })
  uuid: string;

  @Column({ type: 'varchar', name: 'excelname', nullable: false })
  excelname: string;

  @Column({ type: 'varchar', name: 'validation', nullable: true })
  validation: string;

  @Column({ type: 'datetime2', name: 'dateversion', nullable: true })
  dateversion: Date;

  @Column({ type: 'bigint', name: 'surveyid', nullable: true })
  surveyid: number;

  @Column({ type: 'bigint', name: 'respondentid', nullable: false })
  respondentid: number;

  @Column({ type: 'varchar', name: 'businesslinecode', nullable: true })
  businesslinecode: string;

  @Column({ type: 'varchar', name: 'businessline', nullable: true })
  businessline: string;

  @Column({ type: 'varchar', name: 'company', nullable: true })
  company: string;

  @Column({ type: 'varchar', name: 'division', nullable: true })
  division: string;

  @Column({ type: 'varchar', name: 'department', nullable: true })
  department: string;

  @Column({ type: 'varchar', name: 'branch', nullable: true })
  branch: string;

  @Column({ type: 'varchar', name: 'directorate', nullable: true })
  directorate: string;

  @Column({ type: 'varchar', name: 'education', nullable: true })
  education: string;

  @Column({ type: 'varchar', name: 'grade', nullable: true })
  grade: string;

  @Column({ type: 'varchar', name: 'jobtitle', nullable: true })
  jobtitle: string;

  @Column({ type: 'varchar', name: 'locationname', nullable: true })
  locationname: string;

  @Column({ type: 'varchar', name: 'age', nullable: true })
  age: string;

  @Column({ type: 'varchar', name: 'agegeneration', nullable: true })
  agegeneration: string;

  @Column({ type: 'varchar', name: 'agegroupcode', nullable: true })
  agegroupcode: string;

  @Column({ type: 'varchar', name: 'agegroup', nullable: true })
  agegroup: string;

  @Column({ type: 'varchar', name: 'serviceyearscode', nullable: true })
  serviceyearscode: string;

  @Column({ type: 'varchar', name: 'serviceyears', nullable: true })
  serviceyears: string;

  @Column({ type: 'varchar', name: 'gender', nullable: true })
  gender: string;

  @Column({ type: 'varchar', name: 'region', nullable: true })
  region: string;

  @Column({ type: 'varchar', name: 'area', nullable: true })
  area: string;

  @Column({ type: 'varchar', name: 'plant', nullable: true })
  plant: string;

  @Column({ type: 'varchar', name: 'kebun', nullable: true })
  kebun: string;

  @Column({ type: 'varchar', name: 'jobsites', nullable: true })
  jobsites: string;

  @Column({ type: 'varchar', name: 'statuskaryawan', nullable: true })
  statuskaryawan: string;

  @Column({ type: 'varchar', name: 'functionname', nullable: true })
  functionname: string;

  @Column({ type: 'varchar', name: 'salesoffice', nullable: true })
  salesoffice: string;

  @Column({ type: 'varchar', name: 'latest', nullable: true })
  latest: string;

  @Column({ type: 'int', name: 'tahunlahir', nullable: true })
  tahunlahir: number;

  @Column({ type: 'int', name: 'tahunmasuk_perusahaan', nullable: true })
  tahunmasuk_perusahaan: number;

  @Column({ type: 'int', name: 'tahunmasuk_astra', nullable: true })
  tahunmasuk_astra: number;

  @Column({ type: 'int', name: 'tahunsurvey', nullable: true })
  tahunsurvey: number;

  @Column({ type: 'varchar', name: 'entryyear_difference', nullable: true })
  entryyear_difference: string;

  @Column({ type: 'varchar', name: 'fillingtime', nullable: true })
  fillingtime: string;

  @Column({ type: 'varchar', name: 'similaranswer', nullable: true })
  similaranswer: string;

  @Column({ type: 'varchar', name: 'completeanswer', nullable: true })
  completeanswer: string;

  @Column({ type: 'varchar', name: 'age_this_year', nullable: true })
  age_this_year: string;

  @Column({
    type: 'varchar',
    name: 'age_when_entering_company',
    nullable: true,
  })
  age_when_entering_company: string;

  @Column({ type: 'varchar', name: 'excel_username', nullable: true })
  excel_username: string;

  @Column({ type: 'varchar', name: 'row_status', nullable: true })
  row_status: string;
}
