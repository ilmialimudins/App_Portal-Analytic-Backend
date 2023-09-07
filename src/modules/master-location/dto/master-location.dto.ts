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

  constructor(LocationEntity: Location) {
    super(LocationEntity, { exludeFields: true });
    this.locationid = LocationEntity.locationid * 1;
    this.locationcode = LocationEntity.locationcode;
    this.locationdesc = LocationEntity.locationdesc;
    this.desc = LocationEntity.desc;
  }
}
