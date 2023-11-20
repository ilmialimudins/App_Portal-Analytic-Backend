import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

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
  @IsString()
  authCode: string;

  @ApiProperty()
  @IsString()
  redirect_uri: string;
}

export class GetTokenByRefreshBodyDTO {
  @ApiProperty()
  @IsString()
  refresh_token: string;
}

export class GetTokenByRevokeTokenDTO {
  @ApiProperty()
  @IsString()
  token: string;
}
