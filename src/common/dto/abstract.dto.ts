import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { AbstractEntity } from '../abstract.entity';

export class AbstractDto {
  @ApiPropertyOptional()
  createdby?: string;

  @ApiPropertyOptional()
  updatedby?: string;

  @ApiProperty()
  createdtime: Date;

  @ApiProperty()
  createddate: number;

  @ApiProperty()
  sourcecreatedmodifiedtime: Date;

  sync_date?: Date;

  constructor(entity: AbstractEntity, options?: { exludeFields?: boolean }) {
    if (!options?.exludeFields) {
      this.createdtime = entity.createdtime;
      this.createddate = entity.createddate;
      this.sourcecreatedmodifiedtime = entity.sourcecreatedmodifiedtime;
      this.sync_date = entity.sync_date;
    }
  }
}
