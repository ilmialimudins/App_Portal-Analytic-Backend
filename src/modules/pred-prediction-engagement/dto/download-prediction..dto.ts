import { ApiProperty } from '@nestjs/swagger';
import { ArrayMinSize, IsArray, IsBoolean, IsString } from 'class-validator';

export class DownloadPredictionBodyDTO {
  @ApiProperty()
  @IsString()
  companyid: string;

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
