import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsString } from 'class-validator';

export class GetAverageDriverDTO {
  @ApiProperty()
  @IsInt()
  @Type(() => Number)
  d_companyid: number;

  @ApiProperty()
  @IsString()
  demography: string;

  @ApiProperty()
  @IsString()
  demographyvalue: string;
}
