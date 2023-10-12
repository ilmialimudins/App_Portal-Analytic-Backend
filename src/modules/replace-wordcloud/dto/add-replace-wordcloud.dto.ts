import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class AddReplaceWordcloudDto {
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
  readonly original_text: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly replace_text: string;
}
