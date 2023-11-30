import { UseDto } from 'src/decorators/use-dto.decorator';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AbstractEntity } from 'src/common/abstract.entity';
import { TableGenderAgeDto } from './dto/table-mps-genderage.dto';
import { TableProperty } from '../table-mps-property/table-mps-property.entity';
import { MasterGender } from '../master-mps-gender/master-mps-gender.entity';
import { MasterAgeGroup } from '../master-mps-agegroup/master-mps-agegroup.entity';

@Entity('tbl_mps_genderage')
@UseDto(TableGenderAgeDto)
export class TableGenderAge extends AbstractEntity<TableGenderAgeDto> {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
  id: number;

  @Column({ nullable: true })
  agegroupid: number;
  @ManyToOne(() => MasterAgeGroup, (agegroup) => agegroup.agegroupid)
  @JoinColumn({
    name: 'agegroupid',
    referencedColumnName: 'agegroupid',
  })
  agegroup: MasterAgeGroup;

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
