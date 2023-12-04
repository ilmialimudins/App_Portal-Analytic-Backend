import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class AddLocationDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly locationcode: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly locationdesc: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly createdby: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly updatedby: string;
}
