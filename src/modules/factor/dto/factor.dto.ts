import { ApiProperty } from '@nestjs/swagger';
import type { EESFactor } from '../factor.entity';
import { AbstractDto } from 'src/common/dto/abstract.dto';

export class FactorDto extends AbstractDto {
  @ApiProperty()
  factorid: string;

  @ApiProperty()
  h_factorhashkey: string;

  @ApiProperty()
  factorcode: string;

  @ApiProperty()
  factorname: string;

  @ApiProperty()
  factor_shortname: string;

  @ApiProperty()
  category: string;

  @ApiProperty()
  label: string;

  constructor(eesFactor: EESFactor) {
    super(eesFactor, { exludeFields: true });

    this.factorid = eesFactor.factorid;
    this.factorcode = eesFactor.factorcode;
    this.h_factorhashkey = eesFactor.h_factorhashkey;
    this.factorname = eesFactor.factorname;
  }
}
