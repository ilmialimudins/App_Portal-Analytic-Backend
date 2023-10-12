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
import { MasterReport } from '../master-report/master-report.entity';
import { MasterSectionDto } from './dto/master-section.dto';
import { MappingMenuReport } from '../mapping-menu-report/mapping-menu-report.entity';

@Entity('ir_mastersection')
@UseDto(MasterSectionDto)
export class MasterSection extends AbstractEntity<MasterSectionDto> {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'sectionid' })
  sectionid: number;

  @Column({ nullable: true })
  reportid: number;
  @ManyToOne(() => MasterReport, (masterreport) => masterreport.reportid)
  @JoinColumn({
    name: 'reportid',
    referencedColumnName: 'reportid',
  })
  masterreport: MasterReport;

  @Column({ type: 'varchar', name: 'sectioncode', nullable: true })
  sectioncode: string;

  @Column({ type: 'varchar', name: 'sectionname', nullable: true })
  sectionname: string;

  @Column({ type: 'varchar', name: 'sectiondesc', nullable: true })
  sectiondesc: string;

  @Column({ type: 'varchar', name: 'sectioncodepowerbiid', nullable: true })
  sectioncodepowerbiid: string;

  @Column({ type: 'varchar', name: 'isdelete', nullable: true })
  isdelete: string;

  @OneToMany(
    () => MappingMenuReport,
    (mappingmenureport) => mappingmenureport.sectionid,
  )
  mappingmenureport: MappingMenuReport[];
}
