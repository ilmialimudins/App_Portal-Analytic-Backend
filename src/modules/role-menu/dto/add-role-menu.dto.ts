import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class AddRoleMenuDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  readonly roleid: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  readonly menuid: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly createdby: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly updatedby: string;
}
