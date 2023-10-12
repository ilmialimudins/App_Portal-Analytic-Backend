import { ApiProperty } from '@nestjs/swagger';

export class PowerBIEmbedTokenDto {
  @ApiProperty()
  '@odata.context': string;

  @ApiProperty()
  token: string;

  @ApiProperty()
  tokenId: string;

  @ApiProperty()
  expiration: string;
}
