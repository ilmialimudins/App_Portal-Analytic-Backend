import { ApiProperty } from '@nestjs/swagger';
import { AbstractDto } from 'src/common/dto/abstract.dto';
import { MasterTenure } from '../master-mps-tenure.entity';

export class MasterTenureDto extends AbstractDto {
  @ApiProperty()
  tenureid: number;

  @ApiProperty()
  code: string;

  @ApiProperty()
  tenure: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  isdelete: string;

  constructor(masterTenureEntity: MasterTenure) {
    super(masterTenureEntity, { exludeFields: true });
    this.tenureid = masterTenureEntity.tenureid * 1;
    this.code = masterTenureEntity.code;
    this.tenure = masterTenureEntity.tenure;
    this.description = masterTenureEntity.description;
    this.isdelete = masterTenureEntity.isdelete;
  }
}
