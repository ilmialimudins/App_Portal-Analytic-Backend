import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class AddPredEngagamentValueDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly demography: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly d_companyid: number;
}
