import { ApiProperty } from '@nestjs/swagger';
import { AbstractDto } from 'src/common/dto/abstract.dto';
import { TableEmployeeByGender } from '../table-mps-employeebygender.entity';

export class TableEmployeeByGenderDto extends AbstractDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  propertyid: number;

  @ApiProperty()
  genderid: number;

  @ApiProperty()
  total: number;

  @ApiProperty()
  isdelete: string;

  constructor(tableEmployeeByGenderEntity: TableEmployeeByGender) {
    super(tableEmployeeByGenderEntity, { exludeFields: true });
    this.id = tableEmployeeByGenderEntity.id * 1;
    this.propertyid = tableEmployeeByGenderEntity.propertyid;
    this.genderid = tableEmployeeByGenderEntity.genderid;
    this.total = tableEmployeeByGenderEntity.total;
    this.isdelete = tableEmployeeByGenderEntity.isdelete;
  }
}
