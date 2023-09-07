import { ApiProperty } from '@nestjs/swagger';
import { AbstractDto } from 'src/common/dto/abstract.dto';
import { Demography } from '../master-demography.entity';

export class DemographyDto extends AbstractDto {
  @ApiProperty()
  demographyid: number;

  @ApiProperty()
  demographycode: string;

  @ApiProperty()
  demographydesc: string;

  @ApiProperty()
  demographyalias: string;

  @ApiProperty()
  urutanfilter: number;

  @ApiProperty()
  desc: string;

  @ApiProperty()
  isdelete: string;

  constructor(demographyEntity: Demography) {
    super(demographyEntity, { exludeFields: true });
    this.demographyid = demographyEntity.demographyid * 1;
    this.demographycode = demographyEntity.demographycode;
    this.demographydesc = demographyEntity.demographydesc;
    this.demographyalias = demographyEntity.demographyalias;
    this.urutanfilter = demographyEntity.urutanfilter;
    this.desc = demographyEntity.desc;
    this.isdelete = demographyEntity.isdelete;
  }
}
