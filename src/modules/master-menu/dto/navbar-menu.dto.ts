import { ApiProperty } from '@nestjs/swagger';
import { IsArray } from 'class-validator';

export class DataMenuDTO {
  @ApiProperty()
  readonly label: string;

  @ApiProperty()
  readonly url: string;

  @ApiProperty()
  readonly sequence: number;

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
