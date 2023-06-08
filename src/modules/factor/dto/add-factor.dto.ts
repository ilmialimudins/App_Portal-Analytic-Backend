import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class AddFactorDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly factorcode: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly factorname: string;
}
