import { ApiProperty } from '@nestjs/swagger';
import { AbstractDto } from 'src/common/dto/abstract.dto';
import { TableEducation } from '../table-mps-education.entity';
import { IsNumber, IsString } from 'class-validator';

export class TableEducationDto extends AbstractDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  educationid: number;

  @ApiProperty()
  propertyid: number;

  @ApiProperty()
  genderid: number;

  @ApiProperty()
  total: number;

  @ApiProperty()
  isdelete: string;

  constructor(tablEducationEntity: TableEducation) {
    super(tablEducationEntity, { exludeFields: true });
    this.id = tablEducationEntity.id * 1;
    this.educationid = tablEducationEntity.educationid;
    this.propertyid = tablEducationEntity.propertyid;
    this.genderid = tablEducationEntity.genderid;
    this.total = tablEducationEntity.total;
    this.isdelete = tablEducationEntity.isdelete;
  }
}

export class MPSEducationUpdate {
  @ApiProperty()
  @IsString()
  education: string;

  @ApiProperty()
  @IsString()
  gender: string;

  @ApiProperty()
  @IsNumber()
  total: number;
}
