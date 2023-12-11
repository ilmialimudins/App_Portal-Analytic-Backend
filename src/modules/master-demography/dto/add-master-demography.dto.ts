import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class AddDemographyDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly demographyalias: string;
}
