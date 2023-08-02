import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class AddBusinessLineDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  readonly businesslinecode: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly businesslinedesc: string;
}
