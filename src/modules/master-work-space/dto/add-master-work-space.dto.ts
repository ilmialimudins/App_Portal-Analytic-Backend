import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class AddMasterWorkSpaceDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly workspacename: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly workspacedesc: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly workspacepowerbiid: string;
}
