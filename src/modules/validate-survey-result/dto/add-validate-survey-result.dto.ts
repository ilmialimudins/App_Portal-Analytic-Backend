import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class AddValidateSurveyResultDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly uuid: string;

  @ApiPropertyOptional()
  @IsOptional()
  readonly dateversion: Date;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  readonly surveyid: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  readonly respondentid: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly businesslinecode: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly businessline: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly company: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly division: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly department: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly branch: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly directorate: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly education: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly grade: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly jobtitle: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly locationname: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  readonly age: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly agegeneration: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly agegroupcode: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly agegroup: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly serviceyearscode: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly serviceyears: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly gender: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly region: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly area: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly plant: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly kebun: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly jobsites: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly statuskaryawan: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly functionname: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly salesoffice: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly latest: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  readonly tahunlahir: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  readonly tahunmasuk_perusahaan: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  readonly tahunmasuk_astra: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  readonly tahunsurvey: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly entryyear_difference: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly fillingtime: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly similaranswer: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly completeanswer: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly age_this_year: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly age_when_entering_company: string;
}

export class DownloadValidateSurveyResultDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  readonly tahunsurvey: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly company: string;
}
