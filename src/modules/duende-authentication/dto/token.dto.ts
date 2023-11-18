import { ApiProperty } from '@nestjs/swagger';

export class TokenDto {
  @ApiProperty()
  id_token: string;

  @ApiProperty()
  access_token: string;

  @ApiProperty()
  expires_in: string;

  @ApiProperty()
  token_type: string;

  @ApiProperty()
  refresh_token: string;
}

export class GetTokenBodyDTO {
  @ApiProperty()
  authCode: string;

  @ApiProperty()
  redirect_uri: string;
}
