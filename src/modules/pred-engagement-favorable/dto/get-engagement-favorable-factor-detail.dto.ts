import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString } from 'class-validator';

export class GetFavorableFactorDetailQueryDTO {
  @ApiProperty()
  @IsString()
  companyid: string;

  @ApiProperty()
  @IsString()
  demography: string;

  @ApiProperty()
  @IsString()
  demographyvalue: string;

  @ApiProperty()
  @IsString()
  factorid: string;
}

export class QcodeDataDTO {
  @ApiProperty()
  average_per_qcode: number;

  @ApiProperty()
  percentage_all_favorabletype: number;

  @ApiProperty()
  count_respondent: number;

  @ApiProperty()
  question: string;

  @ApiProperty()
  qcode: string;
}

export class FavorableDataDTO {
  @ApiProperty()
  favorable_type: string;

  @ApiProperty({ type: () => [QcodeDataDTO] })
  @Type(() => QcodeDataDTO)
  qcodedata: QcodeDataDTO[];
}

export class GetFavorableFactorDetailDTO {
  @ApiProperty()
  factor_name: string;

  @ApiProperty()
  average_per_factor: number;

  @ApiProperty({ type: () => [FavorableDataDTO] })
  @Type(() => FavorableDataDTO)
  favorabledata: FavorableDataDTO[];
}
