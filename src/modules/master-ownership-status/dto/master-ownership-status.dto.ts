import { ApiProperty } from '@nestjs/swagger';
import { AbstractDto } from 'src/common/dto/abstract.dto';
import { OwnershipStatus } from '../master-ownership-status.entity';

export class OwnershipStatusDto extends AbstractDto {
  @ApiProperty()
  ownershipstatusid: number;

  @ApiProperty()
  ownershipstatuscode: string;

  @ApiProperty()
  ownershipstatusdesc: string;

  @ApiProperty()
  desc: string;

  constructor(OwnershipStatusEntity: OwnershipStatus) {
    super(OwnershipStatusEntity, { exludeFields: true });
    this.ownershipstatusid = OwnershipStatusEntity.ownershipstatusid * 1;
    this.ownershipstatuscode = OwnershipStatusEntity.ownershipstatuscode;
    this.ownershipstatusdesc = OwnershipStatusEntity.ownershipstatusdesc;
    this.desc = OwnershipStatusEntity.desc;
  }
}
