import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class AddMasterCompanyEESDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  readonly surveygroupid: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  readonly businesslineid: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  readonly companycode: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly companyeesname: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly aliascompany1: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly aliascompany2: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly aliascompany3: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  readonly modellingtypeid: number;
}
