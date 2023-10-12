import { ApiProperty } from '@nestjs/swagger';
import { AbstractDto } from 'src/common/dto/abstract.dto';
import { MasterWorkSpace } from '../master-work-space.entity';

export class MasterWorkSpaceDto extends AbstractDto {
  @ApiProperty()
  workspaceid: number;

  @ApiProperty()
  workspacecode: string;

  @ApiProperty()
  workspacename: string;

  @ApiProperty()
  workspacedesc: string;

  @ApiProperty()
  workspacepowerbiid: string;

  @ApiProperty()
  isdelete: string;

  constructor(masterWorkSpaceEntity: MasterWorkSpace) {
    super(masterWorkSpaceEntity, { exludeFields: true });
    this.workspaceid = masterWorkSpaceEntity.workspaceid * 1;
    this.workspacecode = masterWorkSpaceEntity.workspacecode;
    this.workspacename = masterWorkSpaceEntity.workspacename;
    this.workspacedesc = masterWorkSpaceEntity.workspacedesc;
    this.workspacepowerbiid = masterWorkSpaceEntity.workspacepowerbiid;
    this.isdelete = masterWorkSpaceEntity.isdelete;
  }
}
