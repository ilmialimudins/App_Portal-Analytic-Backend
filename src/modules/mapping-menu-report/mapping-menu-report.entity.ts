import { AbstractEntity } from 'src/common/abstract.entity';
import { UseDto } from 'src/decorators/use-dto.decorator';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { MasterMenu } from '../master-menu/master-menu.entity';
import { MasterReport } from '../master-report/master-report.entity';
import { MasterSection } from '../master-section/master-section.entity';
import { MappingMenuReportDto } from './dto/mapping-menu-report.dto';

@Entity('ir_mappingmenureport')
@UseDto(MappingMenuReportDto)
export class MappingMenuReport extends AbstractEntity<MappingMenuReportDto> {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'mappingmenureportid' })
  mappingmenureportid: number;

  @Column({ nullable: true })
  menuid: number;
  @ManyToOne(() => MasterMenu, (mastermenu) => mastermenu.menuid)
  @JoinColumn({
    name: 'menuid',
    referencedColumnName: 'menuid',
  })
  mastermenu: MasterMenu;

  @Column({ nullable: true })
  reportid: number;
  @ManyToOne(() => MasterReport, (masterreport) => masterreport.reportid)
  @JoinColumn({
    name: 'reportid',
    referencedColumnName: 'reportid',
  })
  masterreport: MasterReport;

  @Column({ nullable: true })
  sectionid: number;
  @ManyToOne(() => MasterSection, (mastersection) => mastersection.sectionid)
  @JoinColumn({
    name: 'sectionid',
    referencedColumnName: 'sectionid',
  })
  mastersection: MasterSection;

  @Column({ type: 'varchar', name: 'isdelete', nullable: true })
  isdelete: string;
}
