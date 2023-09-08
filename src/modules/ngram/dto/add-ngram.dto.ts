import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { QCodeEnum } from '../ngram.entity';

export class AddNgramDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly uuid: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  readonly companyid: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  readonly tahun_survey: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly h_companyhashkey: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly h_surveygizmohashkey: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly h_surveyquestion: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly h_wordhashkey: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsEnum(QCodeEnum)
  readonly qcode: QCodeEnum;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly word: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  readonly n: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly ngram: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  readonly ngramfrequency: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  readonly wordrank: number;
}
