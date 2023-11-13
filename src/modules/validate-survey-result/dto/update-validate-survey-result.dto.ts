import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateValidateSurveyResultDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly locationname: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly directorate: string;

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
  readonly plant: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly jobtitle: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly jobsites: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly functionname: string;

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
  readonly salesoffice: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly kebun: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly gender: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly grade: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly education: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  readonly tahunlahir: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  readonly tahunmasuk_astra: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  readonly tahunmasuk_perusahaan: number;
}
