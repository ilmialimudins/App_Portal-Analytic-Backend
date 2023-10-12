import { ApiProperty } from '@nestjs/swagger';
import { AbstractDto } from 'src/common/dto/abstract.dto';
import { ModellingType } from '../master-modelling-type.entity';

export class ModellingTypeDto extends AbstractDto {
  @ApiProperty()
  modellingtypeid: number;

  @ApiProperty()
  modellingtypecode: string;

  @ApiProperty()
  modellingtypedesc: string;

  @ApiProperty()
  desc: string;

  constructor(ModellingTypeEntity: ModellingType) {
    super(ModellingTypeEntity, { exludeFields: true });
    this.modellingtypeid = ModellingTypeEntity.modellingtypeid * 1;
    this.modellingtypecode = ModellingTypeEntity.modellingtypecode;
    this.modellingtypedesc = ModellingTypeEntity.modellingtypedesc;
    this.desc = ModellingTypeEntity.desc;
  }
}
