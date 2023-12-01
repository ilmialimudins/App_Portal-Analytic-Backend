import { AbstractEntity } from 'src/common/abstract.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UseDto } from 'src/decorators/use-dto.decorator';
import { MasterJobGroupDto } from './dto/master-mps-jobgroup.dto';
import { TableTrainingHourJobGroup } from '../table-mps-traininghourjobgroup/table-mps-traininghourjobgroup.entity';

@Entity('ms_mps_jobgroup')
@UseDto(MasterJobGroupDto)
export class MasterJobGroup extends AbstractEntity<MasterJobGroupDto> {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'jobgroupid' })
  jobgroupid: number;

  @Column({ type: 'varchar', name: 'code', nullable: true })
  code: string;

  @Column({ type: 'varchar', name: 'jobgroup', nullable: true })
  jobgroup: string;

  @Column({ type: 'varchar', name: 'description', nullable: true })
  description: string;

  @Column({ type: 'varchar', name: 'isdelete', nullable: true })
  isdelete: string;

  @OneToMany(
    () => TableTrainingHourJobGroup,
    (traininghour) => traininghour.jobgroupid,
  )
  traininghour: TableTrainingHourJobGroup[];
}
