import { ApiProperty } from '@nestjs/swagger';
import { AbstractDto } from 'src/common/dto/abstract.dto';
import { MasterAgeGroup } from '../master-mps-agegroup.entity';

export class MasterAgeGroupDto extends AbstractDto {
  @ApiProperty()
  agegroupid: number;

  @ApiProperty()
  code: string;

  @ApiProperty()
  agegroup: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  isdelete: string;

  constructor(masterAgeGroupEntity: MasterAgeGroup) {
    super(masterAgeGroupEntity, { exludeFields: true });
    this.agegroupid = masterAgeGroupEntity.agegroupid * 1;
    this.code = masterAgeGroupEntity.code;
    this.agegroup = masterAgeGroupEntity.agegroup;
    this.description = masterAgeGroupEntity.description;
    this.isdelete = masterAgeGroupEntity.isdelete;
  }
}
