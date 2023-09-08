import { ApiProperty } from '@nestjs/swagger';
import { AbstractDto } from 'src/common/dto/abstract.dto';
import { MasterUser } from '../master-user.entity';

export class MasterUserDto extends AbstractDto {
  @ApiProperty()
  userid: number;

  @ApiProperty()
  username: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  companycode: string;

  @ApiProperty()
  companyname: string;

  @ApiProperty()
  phonenumber: string;

  @ApiProperty()
  npk: string;

  @ApiProperty()
  isdelete: string;

  constructor(masterUserEntity: MasterUser) {
    super(masterUserEntity, { exludeFields: true });
    this.userid = masterUserEntity.userid * 1;
    this.username = masterUserEntity.username;
    this.email = masterUserEntity.email;
    this.companycode = masterUserEntity.companycode;
    this.companyname = masterUserEntity.companyname;
    this.phonenumber = masterUserEntity.phonenumber;
    this.npk = masterUserEntity.npk;
    this.isdelete = masterUserEntity.isdelete;
  }
}
