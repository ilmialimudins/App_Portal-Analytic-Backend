import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';

export class AddCompanyDto {
  @ApiPropertyOptional()
  @Type(() => String)
  @IsOptional()
  @IsString()
  readonly companycode: string;

  @ApiPropertyOptional()
  @Type(() => String)
  @IsOptional()
  @IsString()
  readonly companyname: string;

  @ApiPropertyOptional()
  @Type(() => String)
  @IsOptional()
  @IsString()
  readonly description: string;
}
