import { ApiProperty } from '@nestjs/swagger';
import { AbstractDto } from 'src/common/dto/abstract.dto';
import { BusinessGroup } from '../master-business-group.entity';

export class BusinessGroupDto extends AbstractDto {
  @ApiProperty()
  businessgroupid: number;

  @ApiProperty()
  businessgroupcode: number;

  @ApiProperty()
  businessgroupdesc: string;

  @ApiProperty()
  desc: string;

  constructor(businessGroupEntity: BusinessGroup) {
    super(businessGroupEntity, { exludeFields: true });
    this.businessgroupid = businessGroupEntity.businessgroupid * 1;
    this.businessgroupcode = businessGroupEntity.businessgroupcode;
    this.businessgroupdesc = businessGroupEntity.businessgroupdesc;
    this.desc = businessGroupEntity.desc;
  }
}
