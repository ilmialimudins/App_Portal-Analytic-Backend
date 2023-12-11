import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class AddSurveyGroupDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly surveygroupcode: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly surveygroupdesc: string;
}
