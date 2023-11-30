import { ApiProperty } from '@nestjs/swagger';
import { AbstractDto } from 'src/common/dto/abstract.dto';
import { TableTrainingHourGender } from '../table-mps-traininghourgender.entity';

export class TableTrainingHourGenderDto extends AbstractDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  propertyid: number;

  @ApiProperty()
  genderid: number;

  @ApiProperty()
  totalemployee: number;

  @ApiProperty()
  totaltraininghour: number;

  @ApiProperty()
  isdelete: string;

  constructor(tableTrainingHourGenderEntity: TableTrainingHourGender) {
    super(tableTrainingHourGenderEntity, { exludeFields: true });
    this.id = tableTrainingHourGenderEntity.id * 1;
    this.propertyid = tableTrainingHourGenderEntity.propertyid;
    this.genderid = tableTrainingHourGenderEntity.genderid;
    this.totalemployee = tableTrainingHourGenderEntity.totalemployee;
    this.totaltraininghour = tableTrainingHourGenderEntity.totaltraininghour;
    this.isdelete = tableTrainingHourGenderEntity.isdelete;
  }
}
