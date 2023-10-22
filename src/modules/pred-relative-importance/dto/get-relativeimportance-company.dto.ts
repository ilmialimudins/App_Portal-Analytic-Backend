import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';

export enum Order {
  ASC = 'ASC',
  DESC = 'DESC',
}
export class GetRelativeImportanceQueryDTO {
  @ApiProperty()
  @IsString()
  companyid: string;

  @ApiPropertyOptional({ enum: Order, enumName: 'Order' })
  @IsOptional()
  @IsEnum(Order)
  order?: Order;
}

export class RelativeImportanceDTO {
  @ApiProperty()
  factor_shortname: string;

  @ApiProperty()
  relativeimportance: number;
}

export class RelativeImportancePerCompanyDTO {
  @ApiProperty()
  engagementid: number;

  @ApiProperty()
  engagement: string;

  @ApiProperty({ type: () => [RelativeImportanceDTO] })
  relativesimportance: RelativeImportanceDTO[];
}
