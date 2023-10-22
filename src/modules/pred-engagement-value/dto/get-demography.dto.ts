import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsString } from 'class-validator';

export class GetDemographyByCompanyDTO {
  @ApiProperty()
  @IsInt()
  @Type(() => Number)
  readonly companyid: number;
}

export class ListDemographyDTO {
  @ApiProperty()
  readonly demography: string;
}

export class GetDemographyValueByCompanyDTO {
  @ApiProperty()
  @IsInt()
  @Type(() => Number)
  readonly companyid: number;

  @ApiProperty()
  @IsString()
  readonly demography: string;
}

export class ListDemographyValueDTO {
  @ApiProperty()
  readonly demographyvalue: string;
}
