import { ApiProperty } from '@nestjs/swagger';
import { AbstractDto } from 'src/common/dto/abstract.dto';
import { AccessUser } from '../access-user.entity';

export class AccessUserDto extends AbstractDto {
  @ApiProperty()
  aksesuserid: number;

  @ApiProperty()
  companyid: number;

  @ApiProperty()
  userid: number;

  @ApiProperty()
  isdelete: string;

  constructor(accessUserEntity: AccessUser) {
    super(accessUserEntity, { exludeFields: true });
    this.aksesuserid = accessUserEntity.aksesuserid * 1;
    this.companyid = accessUserEntity.companyid;
    this.userid = accessUserEntity.userid;
    this.isdelete = accessUserEntity.isdelete;
  }
}
