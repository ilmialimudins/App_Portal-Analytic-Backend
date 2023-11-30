import { ApiProperty } from '@nestjs/swagger';
import { AbstractDto } from 'src/common/dto/abstract.dto';
import { TableGradeEmployeeStatus } from '../table-mps-gradeemployeestatus.entity';

export class TableGradeEmployeeStatusDto extends AbstractDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  gradeid: number;

  @ApiProperty()
  propertyid: number;

  @ApiProperty()
  employeestatusid: number;

  @ApiProperty()
  genderid: number;

  @ApiProperty()
  total: number;

  @ApiProperty()
  isdelete: string;

  constructor(tableGradeEmployeeStatusEntity: TableGradeEmployeeStatus) {
    super(tableGradeEmployeeStatusEntity, { exludeFields: true });
    this.id = tableGradeEmployeeStatusEntity.id * 1;
    this.gradeid = tableGradeEmployeeStatusEntity.gradeid;
    this.propertyid = tableGradeEmployeeStatusEntity.propertyid;
    this.employeestatusid = tableGradeEmployeeStatusEntity.employeestatusid;
    this.genderid = tableGradeEmployeeStatusEntity.genderid;
    this.total = tableGradeEmployeeStatusEntity.total;
    this.isdelete = tableGradeEmployeeStatusEntity.isdelete;
  }
}
