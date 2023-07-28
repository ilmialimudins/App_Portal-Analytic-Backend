import { ApiProperty } from '@nestjs/swagger';
import { AbstractDto } from 'src/common/dto/abstract.dto';
import { BusinessLine } from '../master-business-line.entity';

export class BusinessLineDto extends AbstractDto {
  @ApiProperty()
  businesslineid: number;

  @ApiProperty()
  businesslinecode: number;

  @ApiProperty()
  businesslinedesc: string;

  @ApiProperty()
  desc: string;

  constructor(businessLineEntity: BusinessLine) {
    super(businessLineEntity, { exludeFields: true });
    this.businesslineid = businessLineEntity.businesslineid * 1;
    this.businesslinecode = businessLineEntity.businesslinecode;
    this.businesslinedesc = businessLineEntity.businesslinedesc;
    this.desc = businessLineEntity.desc;
  }
}
