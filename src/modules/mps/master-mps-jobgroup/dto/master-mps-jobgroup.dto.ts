import { ApiProperty } from '@nestjs/swagger';
import { AbstractDto } from 'src/common/dto/abstract.dto';
import { MasterJobGroup } from '../master-mps-jobgroup.entity';

export class MasterJobGroupDto extends AbstractDto {
  @ApiProperty()
  jobgroupid: number;

  @ApiProperty()
  code: string;

  @ApiProperty()
  jobgroup: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  isdelete: string;

  constructor(masterJobGroupEntity: MasterJobGroup) {
    super(masterJobGroupEntity, { exludeFields: true });
    this.jobgroupid = masterJobGroupEntity.jobgroupid * 1;
    this.code = masterJobGroupEntity.code;
    this.jobgroup = masterJobGroupEntity.jobgroup;
    this.description = masterJobGroupEntity.description;
    this.isdelete = masterJobGroupEntity.isdelete;
  }
}
