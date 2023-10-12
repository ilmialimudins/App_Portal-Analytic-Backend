import { ApiProperty } from '@nestjs/swagger';
import { AbstractDto } from 'src/common/dto/abstract.dto';
import { Location } from '../master-location.entity';

export class LocationDto extends AbstractDto {
  @ApiProperty()
  locationid: number;

  @ApiProperty()
  locationcode: string;

  @ApiProperty()
  locationdesc: string;

  @ApiProperty()
  desc: string;

  @ApiProperty()
  isdelete: string;

  constructor(locationEntity: Location) {
    super(locationEntity, { exludeFields: true });
    this.locationid = locationEntity.locationid * 1;
    this.locationcode = locationEntity.locationcode;
    this.locationdesc = locationEntity.locationdesc;
    this.desc = locationEntity.desc;
    this.isdelete = locationEntity.isdelete;
  }
}
