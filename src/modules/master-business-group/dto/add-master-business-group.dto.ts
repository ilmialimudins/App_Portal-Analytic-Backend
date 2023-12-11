import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class AddBusinessGroupDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly businessgroupcode: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly businessgroupdesc: string;
}
