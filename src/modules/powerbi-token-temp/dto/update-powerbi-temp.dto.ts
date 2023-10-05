import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdatePowerBIID {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly access_token: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly dashboard: string;
}
