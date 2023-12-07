import { ApiProperty } from '@nestjs/swagger';
import { AbstractDto } from 'src/common/dto/abstract.dto';
import { TableNewEmployeePerGender } from '../table-mps-newemployeepergender.entity';
import { IsNumber, IsString } from 'class-validator';

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

export class MPSNewEmployeePerGenderUpdate {
  @ApiProperty()
  @IsNumber()
  companyid: number;

  @ApiProperty()
  @IsString()
  newhire: string;

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
