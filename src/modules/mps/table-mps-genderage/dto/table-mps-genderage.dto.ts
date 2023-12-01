import { ApiProperty } from '@nestjs/swagger';
import { AbstractDto } from 'src/common/dto/abstract.dto';
import { TableGenderAge } from '../table-mps-genderage.entity';

export class TableGenderAgeDto extends AbstractDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  agegroupid: number;

  @ApiProperty()
  propertyid: number;

  @ApiProperty()
  genderid: number;

  @ApiProperty()
  total: number;

  @ApiProperty()
  isdelete: string;

  constructor(tableGenderAgeEntity: TableGenderAge) {
    super(tableGenderAgeEntity, { exludeFields: true });
    this.id = tableGenderAgeEntity.id * 1;
    this.agegroupid = tableGenderAgeEntity.agegroupid;
    this.propertyid = tableGenderAgeEntity.propertyid;
    this.genderid = tableGenderAgeEntity.genderid;
    this.total = tableGenderAgeEntity.total;
    this.isdelete = tableGenderAgeEntity.isdelete;
  }
}
