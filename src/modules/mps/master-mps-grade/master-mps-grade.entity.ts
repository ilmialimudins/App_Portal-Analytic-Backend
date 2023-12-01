import { AbstractEntity } from 'src/common/abstract.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UseDto } from 'src/decorators/use-dto.decorator';
import { MasterGradeDto } from './dto/master-mps-grade.dto';
import { TableTurnOverTerminationType } from '../table-mps-turnoverterminationtype/table-mps-turnoverterminationtype.entity';
import { TableGradeEmployeeStatus } from '../table-mps-gradeemployeestatus/table-mps-gradeemployeestatus.entity';

@Entity('ms_mps_grade')
@UseDto(MasterGradeDto)
export class MasterGrade extends AbstractEntity<MasterGradeDto> {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'gradeid' })
  gradeid: number;

  @Column({ type: 'varchar', name: 'code', nullable: true })
  code: string;

  @Column({ type: 'varchar', name: 'grade', nullable: true })
  grade: string;

  @Column({ type: 'varchar', name: 'description', nullable: true })
  description: string;

  @Column({ type: 'varchar', name: 'isdelete', nullable: true })
  isdelete: string;

  @OneToMany(
    () => TableGradeEmployeeStatus,
    (gradeemployeestatus) => gradeemployeestatus.gradeid,
  )
  gradeemployeestatus: TableGradeEmployeeStatus[];

  @OneToMany(
    () => TableTurnOverTerminationType,
    (turnoverterminationtype) => turnoverterminationtype.gradeid,
  )
  turnoverterminationtype: TableTurnOverTerminationType[];
}
