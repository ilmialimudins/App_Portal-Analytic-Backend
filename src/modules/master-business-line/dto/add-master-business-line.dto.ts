import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class AddBusinessLineDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly businesslinecode: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly businesslinedesc: string;
}
