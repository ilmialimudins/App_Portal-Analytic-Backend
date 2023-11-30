import { AbstractEntity } from 'src/common/abstract.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UseDto } from 'src/decorators/use-dto.decorator';
import { MasterEmployeeStatusDto } from './dto/master-mps-employeestatus.dto';
import { TableGradeEmployeeStatus } from '../table-mps-gradeemployeestatus/table-mps-gradeemployeestatus.entity';

@Entity('ms_mps_employeestatus')
@UseDto(MasterEmployeeStatusDto)
export class MasterEmployeeStatus extends AbstractEntity<MasterEmployeeStatusDto> {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'employeestatusid' })
  employeestatusid: number;

  @Column({ type: 'varchar', name: 'code', nullable: true })
  code: string;

  @Column({ type: 'varchar', name: 'employeestatus', nullable: true })
  employeestatus: string;

  @Column({ type: 'varchar', name: 'description', nullable: true })
  description: string;

  @Column({ type: 'varchar', name: 'isdelete', nullable: true })
  isdelete: string;

  @OneToMany(
    () => TableGradeEmployeeStatus,
    (gradeemployeestatus) => gradeemployeestatus.employeestatusid,
  )
  gradeemployeestatus: TableGradeEmployeeStatus[];
}
