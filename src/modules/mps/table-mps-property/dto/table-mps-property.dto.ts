import { ApiProperty } from '@nestjs/swagger';
import { AbstractDto } from 'src/common/dto/abstract.dto';
import { TableProperty } from '../table-mps-property.entity';
import { IsNumber, ValidateIf } from 'class-validator';

export class TablePropertyDto extends AbstractDto {
  @ApiProperty()
  propertyid: number;

  @ApiProperty()
  claid: number;

  @ApiProperty()
  directreviewid: number;

  @ApiProperty()
  companyid: number;

  @ApiProperty()
  locationid: number;

  @ApiProperty()
  month: number;

  @ApiProperty()
  year: number;

  @ApiProperty()
  isdelete: string;

  constructor(tablePropertyEntity: TableProperty) {
    super(tablePropertyEntity, { exludeFields: true });
    this.propertyid = tablePropertyEntity.propertyid;
    this.claid = tablePropertyEntity.claid;
    this.directreviewid = tablePropertyEntity.directreviewid;
    this.companyid = tablePropertyEntity.companyid;
    this.locationid = tablePropertyEntity.locationid;
    this.month = tablePropertyEntity.month;
    this.year = tablePropertyEntity.year;
    this.isdelete = tablePropertyEntity.isdelete;
  }
}

export class GetOneProperty {
  @ApiProperty()
  @IsNumber()
  companyid: number;

  @ApiProperty()
  @IsNumber()
  @ValidateIf((o) => !o.year)
  year: number;

  @ApiProperty()
  @IsNumber()
  @ValidateIf((o) => !o.month)
  month: number;
}
