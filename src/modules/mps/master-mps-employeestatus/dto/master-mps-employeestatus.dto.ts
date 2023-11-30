import { ApiProperty } from '@nestjs/swagger';
import { AbstractDto } from 'src/common/dto/abstract.dto';
import { MasterEmployeeStatus } from '../master-mps-employeestatus.entity';

export class MasterEmployeeStatusDto extends AbstractDto {
  @ApiProperty()
  employeestatusid: number;

  @ApiProperty()
  code: string;

  @ApiProperty()
  employeestatus: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  isdelete: string;

  constructor(masterEmployeeStatusEntity: MasterEmployeeStatus) {
    super(masterEmployeeStatusEntity, { exludeFields: true });
    this.employeestatusid = masterEmployeeStatusEntity.employeestatusid * 1;
    this.code = masterEmployeeStatusEntity.code;
    this.employeestatus = masterEmployeeStatusEntity.employeestatus;
    this.description = masterEmployeeStatusEntity.description;
    this.isdelete = masterEmployeeStatusEntity.isdelete;
  }
}
