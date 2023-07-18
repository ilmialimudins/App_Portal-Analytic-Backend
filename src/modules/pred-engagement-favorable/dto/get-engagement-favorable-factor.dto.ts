import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class GetAverageFavorableAllFactorQueryDTO {
  @ApiProperty()
  @IsString()
  d_companyid: string;
}

export class GetAverageFavorableAllFactorResultDTO {
  @ApiProperty()
  factor_name: string;

  @ApiProperty()
  average_per_factor: number;

  @ApiProperty()
  d_factorid: number;
}
