import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class AddAccessUserDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  readonly companyid: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  readonly userid: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly createdby: string;
}
