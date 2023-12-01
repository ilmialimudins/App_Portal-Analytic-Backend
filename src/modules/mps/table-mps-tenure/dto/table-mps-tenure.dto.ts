import { ApiProperty } from '@nestjs/swagger';
import { AbstractDto } from 'src/common/dto/abstract.dto';
import { TableTenure } from '../table-mps-tenure.entity';

export class TableTenureDto extends AbstractDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  tenureid: number;

  @ApiProperty()
  propertyid: number;

  @ApiProperty()
  genderid: number;

  @ApiProperty()
  total: number;

  @ApiProperty()
  isdelete: string;

  constructor(tableTenureEntity: TableTenure) {
    super(tableTenureEntity, { exludeFields: true });
    this.id = tableTenureEntity.id * 1;
    this.tenureid = tableTenureEntity.tenureid;
    this.propertyid = tableTenureEntity.propertyid;
    this.genderid = tableTenureEntity.genderid;
    this.total = tableTenureEntity.total;
    this.isdelete = tableTenureEntity.isdelete;
  }
}
