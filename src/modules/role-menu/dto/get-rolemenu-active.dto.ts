import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsBoolean, IsInt, IsNumber, IsString } from 'class-validator';

export class GetRoleMenuDTO {
  @ApiProperty()
  @IsInt()
  @Type(() => Number)
  roleid: number;
}

export class DataRoleMenuActiveDTO {
  @ApiProperty()
  @IsNumber()
  menuid: number;

  @ApiProperty()
  @IsString()
  menuname: string;

  @ApiProperty()
  @IsString()
  url: string;

  @ApiProperty()
  @IsBoolean()
  isactive: boolean;

  @ApiProperty()
  children: DataRoleMenuActiveDTO[];
}
