import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class AddMasterReportDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  readonly workspaceid: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly reportname: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly reportpowerbiid: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly datasetpowerbiid: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly reporturl: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly createdby: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly updatedby: string;
}
