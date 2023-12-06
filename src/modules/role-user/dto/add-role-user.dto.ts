import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class AddRoleUserDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  readonly roleid: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  readonly userid: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly createdby: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly updatedby: string;
}
