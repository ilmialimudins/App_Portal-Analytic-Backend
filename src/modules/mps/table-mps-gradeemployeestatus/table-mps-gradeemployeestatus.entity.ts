import { UseDto } from 'src/decorators/use-dto.decorator';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AbstractEntity } from 'src/common/abstract.entity';
import { TableGradeEmployeeStatusDto } from './dto/table-mps-gradeemployeestatus.dto';
import { MasterGrade } from '../master-mps-grade/master-mps-grade.entity';
import { TableProperty } from '../table-mps-property/table-mps-property.entity';
import { MasterGender } from '../master-mps-gender/master-mps-gender.entity';
import { MasterEmployeeStatus } from '../master-mps-employeestatus/master-mps-employeestatus.entity';

@Entity('tbl_mps_gradeemployeestatus')
@UseDto(TableGradeEmployeeStatusDto)
export class TableGradeEmployeeStatus extends AbstractEntity<TableGradeEmployeeStatusDto> {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
  id: number;

  @Column({ nullable: true })
  gradeid: number;
  @ManyToOne(() => MasterGrade, (grade) => grade.gradeid)
  @JoinColumn({
    name: 'gradeid',
    referencedColumnName: 'gradeid',
  })
  grade: MasterGrade;

  @Column({ nullable: true })
  propertyid: number;
  @ManyToOne(() => TableProperty, (property) => property.propertyid)
  @JoinColumn({
    name: 'propertyid',
    referencedColumnName: 'propertyid',
  })
  property: TableProperty;

  @Column({ nullable: true })
  employeestatusid: number;
  @ManyToOne(
    () => MasterEmployeeStatus,
    (employeestatus) => employeestatus.employeestatusid,
  )
  @JoinColumn({
    name: 'employeestatusid',
    referencedColumnName: 'employeestatusid',
  })
  employeestatus: MasterEmployeeStatus;

  @Column({ nullable: true })
  genderid: number;
  @ManyToOne(() => MasterGender, (gender) => gender.genderid)
  @JoinColumn({
    name: 'genderid',
    referencedColumnName: 'genderid',
  })
  gender: MasterGender;

  @Column({ type: 'bigint', name: 'total', nullable: true })
  total: number;

  @Column({ type: 'varchar', name: 'isdelete', nullable: true })
  isdelete: string;
}
