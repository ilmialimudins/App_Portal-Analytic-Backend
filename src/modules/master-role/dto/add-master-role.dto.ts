import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class AddMasterRoleDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly rolename: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly roledesc: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly createdby: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly updatedby: string;
}
