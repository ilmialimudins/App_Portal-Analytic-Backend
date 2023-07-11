import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class GetDemographyByCompanyDTO {
  @ApiProperty()
  @IsString()
  readonly d_companyid: string;
}

export class ListDemographyDTO {
  @ApiProperty()
  readonly demography: string;
}

export class GetDemographyValueByCompanyDTO {
  @ApiProperty()
  @IsString()
  readonly d_companyid: string;

  @ApiProperty()
  @IsString()
  readonly demography: string;
}

export class ListDemographyValueDTO {
  @ApiProperty()
  readonly demographyvalue: string;
}
