import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';

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
}
