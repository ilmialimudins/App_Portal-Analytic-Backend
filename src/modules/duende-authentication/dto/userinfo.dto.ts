import { ApiProperty } from '@nestjs/swagger';

export class UserInfoDTO {
  @ApiProperty()
  sub: string;

  @ApiProperty()
  auth_time: number;

  @ApiProperty()
  idp: string;

  @ApiProperty()
  amr: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  email_address: string;

  @ApiProperty()
  family_name: string;

  @ApiProperty()
  given_name: string;
}
