import { AbstractEntity } from 'src/common/abstract.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TableTrainingHourJobGroupDto } from './dto/table-mps-traininghourjobgroup.dto';
import { UseDto } from 'src/decorators/use-dto.decorator';
import { TableProperty } from '../table-mps-property/table-mps-property.entity';
import { MasterJobGroup } from '../master-mps-jobgroup/master-mps-jobgroup.entity';

@Entity('tbl_mps_traininghourjobgroup')
@UseDto(TableTrainingHourJobGroupDto)
export class TableTrainingHourJobGroup extends AbstractEntity<TableTrainingHourJobGroupDto> {
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
  jobgroupid: number;
  @ManyToOne(() => MasterJobGroup, (jobgroup) => jobgroup.jobgroupid)
  @JoinColumn({
    name: 'jobgroupid',
    referencedColumnName: 'jobgroupid',
  })
  jobgroup: MasterJobGroup;

  @Column({ type: 'bigint', name: 'totalemployee', nullable: true })
  totalemployee: number;

  @Column({ type: 'bigint', name: 'totaltraininghour', nullable: true })
  totaltraininghour: number;

  @Column({ type: 'varchar', name: 'isdelete', nullable: true })
  isdelete: string;
}
