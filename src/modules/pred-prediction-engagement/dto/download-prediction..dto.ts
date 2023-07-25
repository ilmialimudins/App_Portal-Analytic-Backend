import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsNumber,
  IsString,
} from 'class-validator';

export class DownloadPredictionBodyDTO {
  @ApiProperty()
  @IsNumber()
  d_companyid: number;

  @ApiProperty()
  @IsString()
  demography: string;

  @ApiProperty()
  @IsBoolean()
  isAll: boolean;

  @ApiProperty({ type: String, isArray: true })
  @IsArray()
  @IsString({ each: true })
  @ArrayMinSize(0)
  demoraphyvalue: string[];
}
