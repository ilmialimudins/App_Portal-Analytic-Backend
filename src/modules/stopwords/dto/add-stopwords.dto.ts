import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class AddStopwordsDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly uuid: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly stopwords: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly createdby: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly updatedby: string;
}
