import { ApiProperty } from '@nestjs/swagger';
import { AbstractDto } from 'src/common/dto/abstract.dto';
import { MasterNewHire } from '../master-mps-newhire.entity';

export class MasterNewHireDto extends AbstractDto {
  @ApiProperty()
  newhireid: number;

  @ApiProperty()
  code: string;

  @ApiProperty()
  newhire: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  isdelete: string;

  constructor(masterNewHireEntity: MasterNewHire) {
    super(masterNewHireEntity, { exludeFields: true });
    this.newhireid = masterNewHireEntity.newhireid * 1;
    this.code = masterNewHireEntity.code;
    this.newhire = masterNewHireEntity.newhire;
    this.description = masterNewHireEntity.description;
    this.isdelete = masterNewHireEntity.isdelete;
  }
}
