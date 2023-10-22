import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsDefined,
  IsNotEmptyObject,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { AdjustmentDriverDTO } from 'src/modules/pred-engagement-value/dto/get-aggregation-factor.dto';

export class FilterSavePredictionDTO {
  @ApiProperty()
  @IsNumber()
  readonly companyid: number;

  @ApiProperty()
  @IsString()
  readonly demography: string;

  @ApiPropertyOptional()
  @IsOptional()
  @ApiProperty()
  @IsString()
  readonly demographyvalue: string;
}

export class SavePredictionEngagementDTO {
  @ApiProperty({ type: () => FilterSavePredictionDTO })
  @IsObject()
  @IsDefined()
  @IsNotEmptyObject()
  @Type(() => FilterSavePredictionDTO)
  @ValidateNested()
  filter: FilterSavePredictionDTO;

  @ApiProperty({ type: () => [AdjustmentDriverDTO] })
  @IsArray()
  @ArrayMinSize(1)
  @Type(() => AdjustmentDriverDTO)
  @ValidateNested({ each: true })
  drivers: AdjustmentDriverDTO[];
}
