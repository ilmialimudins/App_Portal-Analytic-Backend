import { ApiProperty } from '@nestjs/swagger';
import { AbstractDto } from 'src/common/dto/abstract.dto';
import { TableTrainingHourJobGroup } from '../table-mps-traininghourjobgroup.entity';
import { IsNumber, IsString } from 'class-validator';

export class TableTrainingHourJobGroupDto extends AbstractDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  propertyid: number;

  @ApiProperty()
  jobgroupid: number;

  @ApiProperty()
  totalemployee: number;

  @ApiProperty()
  totaltraininghour: number;

  @ApiProperty()
  isdelete: string;

  constructor(tableTrainingHourJobGroupEntity: TableTrainingHourJobGroup) {
    super(tableTrainingHourJobGroupEntity, { exludeFields: true });
    this.id = tableTrainingHourJobGroupEntity.id * 1;
    this.propertyid = tableTrainingHourJobGroupEntity.propertyid;
    this.jobgroupid = tableTrainingHourJobGroupEntity.jobgroupid;
    this.totalemployee = tableTrainingHourJobGroupEntity.totalemployee;
    this.totaltraininghour = tableTrainingHourJobGroupEntity.totaltraininghour;
    this.isdelete = tableTrainingHourJobGroupEntity.isdelete;
  }
}

export class MPSTrainingHourJobGroupUpdate {
  @ApiProperty()
  @IsString()
  jobgroup: string;

  @ApiProperty()
  @IsNumber()
  totalemployee: number;

  @ApiProperty()
  @IsNumber()
  totaltraininghour: number;
}
