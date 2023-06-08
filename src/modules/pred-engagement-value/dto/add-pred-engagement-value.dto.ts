import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsNumber } from 'class-validator';

export class AddPredEngagamentValueDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly demography: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly demographyvalue: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  readonly avg_respondentanswer_before: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly count_respondent: string;
}
