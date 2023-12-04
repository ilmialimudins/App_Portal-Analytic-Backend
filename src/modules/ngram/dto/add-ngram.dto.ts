import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class AddNgramDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly uuid: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  readonly qcodeid: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  readonly wordid: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly n: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly ngram: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly ngramfrequency: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly updatedby: string;
}
