import { AbstractEntity } from 'src/common/abstract.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TableTrainingHourGenderDto } from './dto/table-mps-traininghourgender.dto';
import { UseDto } from 'src/decorators/use-dto.decorator';
import { TableProperty } from '../table-mps-property/table-mps-property.entity';
import { MasterGender } from '../master-mps-gender/master-mps-gender.entity';

@Entity('tbl_mps_traininghourgender')
@UseDto(TableTrainingHourGenderDto)
export class TableTrainingHourGender extends AbstractEntity<TableTrainingHourGenderDto> {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
  id: number;

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

  @Column({ type: 'bigint', name: 'totalemployee', nullable: true })
  totalemployee: number;

  @Column({ type: 'bigint', name: 'totaltraininghour', nullable: true })
  totaltraininghour: number;

  @Column({ type: 'varchar', name: 'isdelete', nullable: true })
  isdelete: string;
}
