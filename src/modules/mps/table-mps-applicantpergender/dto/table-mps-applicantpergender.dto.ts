import { ApiProperty } from '@nestjs/swagger';
import { AbstractDto } from 'src/common/dto/abstract.dto';
import { TableApplicantPerGender } from '../table-mps-applicantpergender.entity';
import { IsNumber, IsString } from 'class-validator';

export class TableApplicantPerGenderDto extends AbstractDto {
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

  constructor(tableAppicantPerGenderEntity: TableApplicantPerGender) {
    super(tableAppicantPerGenderEntity, { exludeFields: true });
    this.id = tableAppicantPerGenderEntity.id * 1;
    this.newhireid = tableAppicantPerGenderEntity.newhireid;
    this.propertyid = tableAppicantPerGenderEntity.propertyid;
    this.genderid = tableAppicantPerGenderEntity.genderid;
    this.total = tableAppicantPerGenderEntity.total;
    this.isdelete = tableAppicantPerGenderEntity.isdelete;
  }
}

export class MPSApplicantPerGenderUpdate {
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
