import { ApiProperty } from '@nestjs/swagger';
import { AbstractDto } from 'src/common/dto/abstract.dto';
import { MasterGender } from '../master-mps-gender.entity';

export class MasterGenderDto extends AbstractDto {
  @ApiProperty()
  genderid: number;

  @ApiProperty()
  code: string;

  @ApiProperty()
  gender: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  isdelete: string;

  constructor(masterGenderEntity: MasterGender) {
    super(masterGenderEntity, { exludeFields: true });
    this.genderid = masterGenderEntity.genderid * 1;
    this.code = masterGenderEntity.code;
    this.gender = masterGenderEntity.gender;
    this.description = masterGenderEntity.description;
    this.isdelete = masterGenderEntity.isdelete;
  }
}
