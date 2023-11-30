import { UseDto } from 'src/decorators/use-dto.decorator';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AbstractEntity } from 'src/common/abstract.entity';
import { TableTenureDto } from './dto/table-mps-tenure.dto';
import { TableProperty } from '../table-mps-property/table-mps-property.entity';
import { MasterGender } from '../master-mps-gender/master-mps-gender.entity';
import { MasterTenure } from '../master-mps-tenure/master-mps-tenure.entity';

@Entity('tbl_mps_tenure')
@UseDto(TableTenureDto)
export class TableTenure extends AbstractEntity<TableTenureDto> {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
  id: number;

  @Column({ nullable: true })
  tenureid: number;
  @ManyToOne(() => MasterTenure, (tenure) => tenure.tenureid)
  @JoinColumn({
    name: 'tenureid',
    referencedColumnName: 'tenureid',
  })
  tenure: MasterTenure;

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
