import { ApiProperty } from '@nestjs/swagger';
import { IsArray } from 'class-validator';

export class ListMenuDTO {
  @ApiProperty()
  readonly menuid: number;

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
export class DataMenuDTO {
  @ApiProperty()
  readonly label: string;

  @ApiProperty()
  readonly url: string;

  @ApiProperty()
  readonly sequence: string;

  @ApiProperty()
  readonly children: DataMenuDTO[];
}

export class NavbarMenuDTO {
  @ApiProperty()
  readonly name: string;

  @ApiProperty()
  readonly user_role: string[];

  @ApiProperty()
  @IsArray()
  readonly datamenu: DataMenuDTO[];
}
