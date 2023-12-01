import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class AddMasterMenuDto {
  @ApiProperty()
  @IsString()
  readonly menuname: string;

  @ApiProperty()
  @IsNumber()
  readonly parentid: number;

  @ApiProperty()
  @IsString()
  readonly sequence: string;

  @ApiProperty()
  @IsString()
  readonly url: string;

  @ApiProperty()
  @IsNumber()
  readonly issection: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  readonly reportid?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  readonly sectionid?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly menucode: string | null;
}
