import { AbstractEntity } from 'src/common/abstract.entity';
import { UseDto } from 'src/decorators/use-dto.decorator';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { MasterWorkSpace } from '../master-work-space/master-work-space.entity';
import { MasterReportDto } from './dto/master-report.dto';
import { MasterSection } from '../master-section/master-section.entity';
import { MappingMenuReport } from '../mapping-menu-report/mapping-menu-report.entity';

@Entity('ir_masterreport')
@UseDto(MasterReportDto)
export class MasterReport extends AbstractEntity<MasterReportDto> {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'reportid' })
  reportid: number;

  @Column({ nullable: true })
  workspaceid: number;
  @ManyToOne(
    () => MasterWorkSpace,
    (masterworkspace) => masterworkspace.workspaceid,
  )
  @JoinColumn({
    name: 'workspaceid',
    referencedColumnName: 'workspaceid',
  })
  masterworkspace: MasterWorkSpace;

  @Column({ type: 'varchar', name: 'reportcode', nullable: true })
  reportcode: string;

  @Column({ type: 'varchar', name: 'reportname', nullable: true })
  reportname: string;

  @Column({ type: 'varchar', name: 'reportdesc', nullable: true })
  reportdesc: string;

  @Column({ type: 'varchar', name: 'reporturl', nullable: true })
  reporturl: string;

  @Column({ type: 'varchar', name: 'reportpowerbiid', nullable: true })
  reportpowerbiiid: string;

  @Column({ type: 'varchar', name: 'datasetpowerbiid', nullable: true })
  datasetpowerbiid: string;

  @Column({ type: 'varchar', name: 'isdelete', nullable: true })
  isdelete: string;

  @OneToMany(() => MasterSection, (mastersection) => mastersection.reportid)
  mastersection: MasterSection[];

  @OneToMany(
    () => MappingMenuReport,
    (mappingmenureport) => mappingmenureport.reportid,
  )
  mappingmenureport: MappingMenuReport[];
}
