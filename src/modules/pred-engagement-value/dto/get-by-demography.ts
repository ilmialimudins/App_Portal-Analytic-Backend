import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class GetByDemography {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly demography: string;
}
