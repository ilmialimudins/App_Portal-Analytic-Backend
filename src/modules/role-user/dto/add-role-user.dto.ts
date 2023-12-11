import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';

export class AddRoleUserDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  readonly roleid: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  readonly userid: number;
}
