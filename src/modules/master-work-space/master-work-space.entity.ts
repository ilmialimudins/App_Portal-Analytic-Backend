import { AbstractEntity } from 'src/common/abstract.entity';
import { UseDto } from 'src/decorators/use-dto.decorator';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { MasterWorkSpaceDto } from './dto/master-work-space.dto';
import { MasterReport } from '../master-report/master-report.entity';

@Entity('ir_masterworkspace')
@UseDto(MasterWorkSpaceDto)
export class MasterWorkSpace extends AbstractEntity<MasterWorkSpaceDto> {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'workspaceid' })
  workspaceid: number;

  @Column({ type: 'varchar', name: 'workspacecode', nullable: true })
  workspacecode: string;

  @Column({ type: 'varchar', name: 'workspacename', nullable: true })
  workspacename: string;

  @Column({ type: 'varchar', name: 'workspacedesc', nullable: true })
  workspacedesc: string;

  @Column({ type: 'varchar', name: 'workspacepowerbiid', nullable: true })
  workspacepowerbiid: string;

  @Column({ type: 'varchar', name: 'isdelete', nullable: true })
  isdelete: string;

  @OneToMany(() => MasterReport, (masterreport) => masterreport.workspaceid)
  masterreport: MasterReport[];
}
