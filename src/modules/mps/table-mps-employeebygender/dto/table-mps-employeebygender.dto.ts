import { ApiProperty } from '@nestjs/swagger';
import { AbstractDto } from 'src/common/dto/abstract.dto';
import { TableEmployeeByGender } from '../table-mps-employeebygender.entity';
import { IsNumber, IsString } from 'class-validator';

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

export class MPSEmployeeByGenderUpdate {
  @ApiProperty()
  @IsNumber()
  companyid: number;

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
