import { ApiProperty } from '@nestjs/swagger';
import { AbstractDto } from 'src/common/dto/abstract.dto';
import { RoleMenu } from '../role-menu.entity';

export class RoleMenuDto extends AbstractDto {
  @ApiProperty()
  rolemenuid: number;

  @ApiProperty()
  roleid: number;

  @ApiProperty()
  menuid: number;

  @ApiProperty()
  isdelete: string;

  constructor(roleMenuEntity: RoleMenu) {
    super(roleMenuEntity, { exludeFields: true });
    this.rolemenuid = roleMenuEntity.rolemenuid * 1;
    this.roleid = roleMenuEntity.roleid;
    this.menuid = roleMenuEntity.menuid;
    this.isdelete = roleMenuEntity.isdelete;
  }
}
