import { ApiProperty } from '@nestjs/swagger';

export class ListMenuDTO {
  @ApiProperty()
  readonly menuid: number;

  @ApiProperty()
  readonly menucode: string;

  @ApiProperty()
  readonly menuname: string;

  @ApiProperty()
  readonly parentid: number;

  @ApiProperty()
  readonly sequence: string;

  @ApiProperty()
  readonly url: string | null;

  @ApiProperty()
  readonly issection: number | null;
}

export class ListMasterMenuDTO extends ListMenuDTO {
  @ApiProperty()
  readonly children: ListMasterMenuDTO[];
}
