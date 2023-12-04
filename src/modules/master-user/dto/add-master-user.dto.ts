import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class AddMasterUserDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly npk: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly username: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly fullname: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly phonenumber: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly companycode: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly companyname: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly email: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly createdby: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly updatedby: string;
}
