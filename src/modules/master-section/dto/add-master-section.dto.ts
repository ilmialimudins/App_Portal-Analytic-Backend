import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class AddMasterSectionDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  readonly reportid: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly sectionname: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly sectiondesc: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly sectioncodepowerbiid: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly createdby: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly updatedby: string;
}
