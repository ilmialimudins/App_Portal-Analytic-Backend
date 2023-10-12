import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class AddCompanyDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  readonly businesslineid: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  readonly surveygroupid: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  readonly modellingtypeid: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  readonly businessgroupid: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  readonly ownershipstatusid: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  readonly locationid: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  readonly claid: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  readonly directreviewid: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly companycode: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly companyeesname: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly companympsname: string;

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
  @IsString()
  readonly remark: string;
}
