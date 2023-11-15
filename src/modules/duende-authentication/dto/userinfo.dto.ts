import { ApiProperty } from '@nestjs/swagger';

export class UserInfoDTO {
  @ApiProperty()
  userid: number;

  @ApiProperty()
  username: string;

  @ApiProperty()
  fullname: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  companycode: string | null;

  @ApiProperty()
  companyname: string | null;

  @ApiProperty()
  phonenumber: string | null;

  @ApiProperty()
  npk: string | null;

  @ApiProperty()
  isdelete: boolean;

  @ApiProperty({ type: () => [] })
  roles: string[];
}
