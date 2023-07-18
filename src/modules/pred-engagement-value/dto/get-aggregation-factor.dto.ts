import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsNumber, IsString, ValidateNested } from 'class-validator';

export class GetAgregrationPerFactorDTO {
  @ApiProperty()
  @IsString()
  readonly d_companyid: number;

  @ApiProperty()
  @IsString()
  readonly demography: string;

  @ApiProperty()
  @IsString()
  readonly demographyvalue: string;
}

export class AdjustmentDriverDTO {
  @ApiProperty()
  @IsNumber()
  readonly d_factorid: number;

  @ApiProperty()
  @IsNumber()
  readonly engagementvalue_id: number;

  @ApiProperty()
  @IsNumber()
  readonly avg_respondentanswer_after: number;
}

export class DriversDTO {
  @ApiProperty({ type: () => [AdjustmentDriverDTO] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AdjustmentDriverDTO)
  drivers: AdjustmentDriverDTO[];
}
