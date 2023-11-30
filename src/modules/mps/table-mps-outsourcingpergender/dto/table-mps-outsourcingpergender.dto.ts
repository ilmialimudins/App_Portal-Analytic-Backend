import { ApiProperty } from '@nestjs/swagger';
import { AbstractDto } from 'src/common/dto/abstract.dto';
import { TableOutsourcingPerGender } from '../table-mps-outsourcingpergender.entity';

export class TableOutsourcingPerGenderDto extends AbstractDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  newhireid: number;

  @ApiProperty()
  propertyid: number;

  @ApiProperty()
  genderid: number;

  @ApiProperty()
  total: number;

  @ApiProperty()
  isdelete: string;

  constructor(tableOutsourcingPerGenderEntity: TableOutsourcingPerGender) {
    super(tableOutsourcingPerGenderEntity, { exludeFields: true });
    this.id = tableOutsourcingPerGenderEntity.id * 1;
    this.newhireid = tableOutsourcingPerGenderEntity.newhireid;
    this.propertyid = tableOutsourcingPerGenderEntity.propertyid;
    this.genderid = tableOutsourcingPerGenderEntity.genderid;
    this.total = tableOutsourcingPerGenderEntity.total;
    this.isdelete = tableOutsourcingPerGenderEntity.isdelete;
  }
}
