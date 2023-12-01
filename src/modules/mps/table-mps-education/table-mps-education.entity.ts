import { UseDto } from 'src/decorators/use-dto.decorator';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AbstractEntity } from 'src/common/abstract.entity';
import { TableEducationDto } from './dto/table-mps-education.dto';
import { MasterGender } from '../master-mps-gender/master-mps-gender.entity';
import { TableProperty } from '../table-mps-property/table-mps-property.entity';
import { MasterEducation } from '../master-mps-education/master-mps-education.entity';

@Entity('tbl_mps_education')
@UseDto(TableEducationDto)
export class TableEducation extends AbstractEntity<TableEducationDto> {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
  id: number;

  @Column({ nullable: true })
  educationid: number;
  @ManyToOne(() => MasterEducation, (education) => education.educationid)
  @JoinColumn({
    name: 'educationid',
    referencedColumnName: 'educationid',
  })
  education: MasterEducation;

  @Column({ nullable: true })
  propertyid: number;
  @ManyToOne(() => TableProperty, (property) => property.propertyid)
  @JoinColumn({
    name: 'propertyid',
    referencedColumnName: 'propertyid',
  })
  property: TableProperty;

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
