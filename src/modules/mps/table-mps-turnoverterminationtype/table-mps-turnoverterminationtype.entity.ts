import { UseDto } from 'src/decorators/use-dto.decorator';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AbstractEntity } from 'src/common/abstract.entity';
import { TableTurnOverTerminationTypeDto } from './dto/table-mps-turnoverterminationtype.dto';
import { MasterGender } from '../master-mps-gender/master-mps-gender.entity';
import { MasterGrade } from '../master-mps-grade/master-mps-grade.entity';
import { TableProperty } from '../table-mps-property/table-mps-property.entity';
import { MasterTerminationType } from '../master-mps-terminationtype/master-mps-terminationtype.entity';

@Entity('tbl_mps_turnoverperterminationtype')
@UseDto(TableTurnOverTerminationTypeDto)
export class TableTurnOverTerminationType extends AbstractEntity<TableTurnOverTerminationTypeDto> {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
  id: number;

  @Column({ nullable: true })
  genderid: number;
  @ManyToOne(() => MasterGender, (gender) => gender.genderid)
  @JoinColumn({
    name: 'genderid',
    referencedColumnName: 'genderid',
  })
  gender: MasterGender;

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
  terminationtypeid: number;
  @ManyToOne(
    () => MasterTerminationType,
    (terminationtype) => terminationtype.terminationtypeid,
  )
  @JoinColumn({
    name: 'terminationtypeid',
    referencedColumnName: 'terminationtypeid',
  })
  terminationtype: MasterTerminationType;

  @Column({ type: 'bigint', name: 'turnover', nullable: true })
  turnover: number;

  @Column({ type: 'varchar', name: 'isdelete', nullable: true })
  isdelete: string;
}
