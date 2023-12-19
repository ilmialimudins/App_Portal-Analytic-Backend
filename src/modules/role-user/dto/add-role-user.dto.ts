import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class AddRoleUserDto {
  @ApiProperty()
  @IsNumber()
  readonly roleid: number;

  @ApiProperty()
  @IsNumber()
  readonly userid: number;
}
