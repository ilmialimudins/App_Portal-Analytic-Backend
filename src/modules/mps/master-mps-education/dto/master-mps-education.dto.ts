import { ApiProperty } from '@nestjs/swagger';
import { AbstractDto } from 'src/common/dto/abstract.dto';
import { MasterEducation } from '../master-mps-education.entity';

export class MasterEducationDto extends AbstractDto {
  @ApiProperty()
  educationid: number;

  @ApiProperty()
  code: string;

  @ApiProperty()
  education: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  isdelete: string;

  constructor(masterEducationEntity: MasterEducation) {
    super(masterEducationEntity, { exludeFields: true });
    this.educationid = masterEducationEntity.educationid * 1;
    this.code = masterEducationEntity.code;
    this.education = masterEducationEntity.education;
    this.description = masterEducationEntity.description;
    this.isdelete = masterEducationEntity.isdelete;
  }
}
