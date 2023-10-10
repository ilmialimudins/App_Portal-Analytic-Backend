import { ApiProperty } from '@nestjs/swagger';

export class PowerBIToken {
  @ApiProperty()
  token_type: string;

  @ApiProperty()
  expires_in: string;

  @ApiProperty()
  ext_expires_in: string;

  @ApiProperty()
  expires_on: string;

  @ApiProperty()
  not_before: string;

  @ApiProperty()
  resource: string;

  @ApiProperty()
  access_token: string;
}
