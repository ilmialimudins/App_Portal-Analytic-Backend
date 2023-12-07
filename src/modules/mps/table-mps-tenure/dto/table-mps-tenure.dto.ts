import { ApiProperty } from '@nestjs/swagger';
import { AbstractDto } from 'src/common/dto/abstract.dto';
import { TableTenure } from '../table-mps-tenure.entity';
import { IsNumber, IsString } from 'class-validator';

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

export class MPSTenureUpdate {
  @ApiProperty()
  @IsNumber()
  companyid: number;

  @ApiProperty()
  @IsString()
  tenure: string;

  @ApiProperty()
  @IsString()
  gender: string;

  @ApiProperty()
  @IsNumber()
  total: number;

  @ApiProperty()
  @IsNumber()
  month: number;

  @ApiProperty()
  @IsNumber()
  year: number;
}
