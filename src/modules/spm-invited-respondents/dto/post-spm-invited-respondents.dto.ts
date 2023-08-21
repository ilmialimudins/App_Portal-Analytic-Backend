import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class PostInvitedRespondentsBodyDTO {
  @ApiProperty()
  @IsNumber()
  readonly companyid: number;

  @ApiProperty()
  @IsNumber()
  readonly surveyid: number;

  @ApiProperty()
  @IsString()
  readonly valuedemography: string;

  @ApiProperty()
  @IsString()
  readonly demography: string;

  @ApiProperty()
  @IsNumber()
  readonly tahun_survey: number;

  @ApiProperty()
  @IsString()
  readonly startsurvey: string;

  @ApiProperty()
  @IsString()
  readonly closesurvey: string;

  @ApiProperty()
  @IsNumber()
  readonly totalinvited_demography: number;

  @ApiProperty()
  @IsNumber()
  readonly totalinvited_company: number;
}

export class PostInvitedRespondentsResultsDTO {
  @ApiProperty()
  id: number;

  @ApiProperty()
  companyid: number;

  @ApiProperty()
  startsurvey: Date;

  @ApiProperty()
  closesurvey: Date;

  @ApiProperty()
  surveyid: number;

  @ApiProperty()
  totalinvited_company: number;

  @ApiProperty()
  valuedemography: string;

  @ApiProperty()
  demography: string;
}
