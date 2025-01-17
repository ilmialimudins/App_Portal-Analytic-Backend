import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class AddDemographyDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly demographycode: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly demographydesc: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly demographyalias: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  readonly urutanfilter: number;
}
