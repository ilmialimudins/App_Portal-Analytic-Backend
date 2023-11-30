import { ApiProperty } from '@nestjs/swagger';
import { AbstractDto } from 'src/common/dto/abstract.dto';
import { MasterTerminationType } from '../master-mps-terminationtype.entity';

export class MasterTerminationTypeDto extends AbstractDto {
  @ApiProperty()
  terminationtypeid: number;

  @ApiProperty()
  code: string;

  @ApiProperty()
  terminationtype: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  isdelete: string;

  constructor(masterTerminationTypeEntity: MasterTerminationType) {
    super(masterTerminationTypeEntity, { exludeFields: true });
    this.terminationtypeid = masterTerminationTypeEntity.terminationtypeid * 1;
    this.code = masterTerminationTypeEntity.code;
    this.terminationtype = masterTerminationTypeEntity.terminationtype;
    this.description = masterTerminationTypeEntity.description;
    this.isdelete = masterTerminationTypeEntity.isdelete;
  }
}
