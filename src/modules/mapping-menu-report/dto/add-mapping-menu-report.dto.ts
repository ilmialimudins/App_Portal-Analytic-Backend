import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class AddMappingMenuReportDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  readonly menuid: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  readonly reportid: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  readonly sectionid: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly createdby: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly updatedby: string;
}
