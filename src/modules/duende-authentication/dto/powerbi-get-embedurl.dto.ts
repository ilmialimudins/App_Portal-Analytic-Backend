import { ApiProperty } from '@nestjs/swagger';

export class PowerBIEmbedUrlDto {
  @ApiProperty()
  '@odata.context': string;

  @ApiProperty()
  id: string;

  @ApiProperty()
  reportType: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  webUrl: string;

  @ApiProperty()
  embedUrl: string;

  @ApiProperty()
  isFromPbix: string;

  @ApiProperty()
  isOwnedByMe: string;

  @ApiProperty()
  datasetid: string;

  @ApiProperty()
  datasetWorkspaceId: string;

  @ApiProperty()
  users: string;

  @ApiProperty()
  subscriptions: string;
}
