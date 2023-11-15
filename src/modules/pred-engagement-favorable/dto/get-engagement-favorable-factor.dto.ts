import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class GetAverageFavorableAllFactorQueryDTO {
  @ApiProperty()
  @IsString()
  companyid: string;

  @ApiProperty()
  @IsString()
  demography: string;

  @ApiProperty()
  @IsString()
  demographyvalue: string;
}

export class GetAverageFavorableAllFactorResultDTO {
  @ApiProperty()
  factor_name: string;

  @ApiProperty()
  average_per_factor: number;

  @ApiProperty()
  factorid: number;
}
