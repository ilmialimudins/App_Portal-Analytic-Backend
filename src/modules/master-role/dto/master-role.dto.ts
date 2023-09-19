import { ApiProperty } from '@nestjs/swagger';
import { AbstractDto } from 'src/common/dto/abstract.dto';
import { MasterRole } from '../master-role.entity';

export class MasterRoleDto extends AbstractDto {
  @ApiProperty()
  roleid: number;

  @ApiProperty()
  rolecode: string;

  @ApiProperty()
  rolename: string;

  @ApiProperty()
  roledesc: string;

  @ApiProperty()
  isdelete: string;

  constructor(masterRoleEntity: MasterRole) {
    super(masterRoleEntity, { exludeFields: true });
    this.roleid = masterRoleEntity.roleid * 1;
    this.rolecode = masterRoleEntity.rolecode;
    this.rolename = masterRoleEntity.rolename;
    this.roledesc = masterRoleEntity.roledesc;
    this.isdelete = masterRoleEntity.isdelete;
  }
}
