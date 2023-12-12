import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class UploadSPMDTO {
  @ApiProperty({ type: 'string', format: 'binary' })
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  file: any;
}

export class UploadBodyNameDTO {
  @ApiPropertyOptional()
  @IsString()
  fileName: string;

  @ApiPropertyOptional()
  @IsString()
  originalFileName: string;
}

export class ExtractExcelDataSPMDTO {
  @ApiProperty()
  @IsNumber()
  companyid: number;

  @ApiProperty()
  @IsNumber()
  surveygroupid: number;

  @ApiProperty()
  @IsNumber()
  surveyid: number;

  @ApiProperty()
  @IsNumber()
  demographyid: number;

  @ApiProperty()
  @IsString()
  companygroup: string;

  @ApiProperty()
  @IsString()
  companyname: string;

  @ApiProperty()
  @IsString()
  surveygroupdesc: string;

  @ApiProperty()
  @IsNumber()
  tahun_survey: number;

  @ApiProperty()
  @IsString()
  startsurvey: string;

  @ApiProperty()
  @IsString()
  closesurvey: string;

  @ApiProperty()
  @IsString()
  demography: string;

  @ApiProperty()
  @IsString()
  valuedemography: string;

  @ApiProperty()
  @IsNumber()
  totalinvited_demography: number;

  @ApiProperty()
  @IsNumber()
  totalinvited_company: number;
}
