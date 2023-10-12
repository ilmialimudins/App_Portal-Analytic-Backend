import { ApiProperty } from '@nestjs/swagger';
import { AbstractDto } from 'src/common/dto/abstract.dto';
import { RoleUser } from '../role-user.entity';

export class RoleUserDto extends AbstractDto {
  @ApiProperty()
  roleuserid: number;

  @ApiProperty()
  roleid: number;

  @ApiProperty()
  userid: number;

  @ApiProperty()
  isdelete: string;

  constructor(roleUserEntity: RoleUser) {
    super(roleUserEntity, { exludeFields: true });
    this.roleuserid = roleUserEntity.roleuserid * 1;
    this.roleid = roleUserEntity.roleid;
    this.userid = roleUserEntity.userid;
    this.isdelete = roleUserEntity.isdelete;
  }
}
