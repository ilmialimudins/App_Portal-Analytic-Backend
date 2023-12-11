import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';

export class AddRoleMenuDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  readonly roleid: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  readonly menuid: number;
}
