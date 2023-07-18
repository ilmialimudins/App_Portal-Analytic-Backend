import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class GetAverageDriverDTO {
  @ApiProperty()
  @IsString()
  demography: string;

  @ApiProperty()
  @IsString()
  d_companyid: string;

  @ApiProperty()
  @IsString()
  demographyvalue: string;
}
