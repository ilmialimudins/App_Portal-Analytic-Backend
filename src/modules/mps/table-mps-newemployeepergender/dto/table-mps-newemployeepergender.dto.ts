import { ApiProperty } from '@nestjs/swagger';
import { AbstractDto } from 'src/common/dto/abstract.dto';
import { TableNewEmployeePerGender } from '../table-mps-newemployeepergender.entity';

export class TableNewEmployeePerGenderDto extends AbstractDto {
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

  constructor(tableNewEmployeePerGenderEntity: TableNewEmployeePerGender) {
    super(tableNewEmployeePerGenderEntity, { exludeFields: true });
    this.id = tableNewEmployeePerGenderEntity.id * 1;
    this.newhireid = tableNewEmployeePerGenderEntity.newhireid;
    this.propertyid = tableNewEmployeePerGenderEntity.propertyid;
    this.genderid = tableNewEmployeePerGenderEntity.genderid;
    this.total = tableNewEmployeePerGenderEntity.total;
    this.isdelete = tableNewEmployeePerGenderEntity.isdelete;
  }
}
