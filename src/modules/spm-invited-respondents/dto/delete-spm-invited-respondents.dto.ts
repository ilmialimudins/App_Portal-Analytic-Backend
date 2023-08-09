import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsString } from 'class-validator';

export class DelInvitedRespondentsQueryDTO {
  @ApiProperty()
  @IsInt()
  @Type(() => Number)
  companyid: number;

  @ApiProperty()
  @IsInt()
  @Type(() => Number)
  surveyid: number;

  @ApiProperty()
  @IsString()
  valuedemography: string;

  @ApiProperty()
  @IsString()
  demography: string;

  @ApiProperty()
  @IsInt()
  @Type(() => Number)
  tahun_survey: number;
}
