import { ApiProperty } from '@nestjs/swagger';
import type { EESFactor } from '../factor.entity';
import { AbstractDto } from 'src/common/dto/abstract.dto';

export class FactorDto extends AbstractDto {
  @ApiProperty()
  d_factorid: string;

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

    this.d_factorid = eesFactor.d_factorid;
    this.factorcode = eesFactor.factorcode;
    this.h_factorhashkey = eesFactor.h_factorhashkey;
    this.factorname = eesFactor.factorname;
    this.id = eesFactor.id;
  }
}
