import { ApiProperty } from '@nestjs/swagger';
import { AbstractDto } from 'src/common/dto/abstract.dto';
import { Cla } from '../master-cla.entity';

export class ClaDto extends AbstractDto {
  @ApiProperty()
  claid: number;

  @ApiProperty()
  clacode: string;

  @ApiProperty()
  cladesc: string;

  @ApiProperty()
  desc: string;

  constructor(ClaEntity: Cla) {
    super(ClaEntity, { exludeFields: true });
    this.claid = ClaEntity.claid;
    this.clacode = ClaEntity.clacode;
    this.cladesc = ClaEntity.cladesc;
    this.desc = ClaEntity.desc;
  }
}
