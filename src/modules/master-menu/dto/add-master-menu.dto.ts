import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class AddMasterMenuDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly menuname: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  readonly parentid: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  readonly sequence: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly url: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  readonly issection: number;
}
