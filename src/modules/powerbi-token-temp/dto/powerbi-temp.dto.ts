import { ApiProperty } from '@nestjs/swagger';
import { AbstractDto } from 'src/common/dto/abstract.dto';
import { PowerBI } from '../powerbi-temp.entity';

export class PowerBIDto extends AbstractDto {
  @ApiProperty()
  pbiid: number;

  @ApiProperty()
  access_token: string;

  @ApiProperty()
  dashboard: string;

  constructor(powerBIEntity: PowerBI) {
    super(powerBIEntity, { exludeFields: true });
    this.pbiid = powerBIEntity.pbiid * 1;
    this.access_token = powerBIEntity.access_token;
    this.dashboard = powerBIEntity.dashboard;
  }
}
