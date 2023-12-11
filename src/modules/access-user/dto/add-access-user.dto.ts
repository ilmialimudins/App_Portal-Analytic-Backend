import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';

export class AddAccessUserDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  readonly companyid: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  readonly userid: number;
}
