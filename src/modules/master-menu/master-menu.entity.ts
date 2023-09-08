import { AbstractEntity } from 'src/common/abstract.entity';
import { UseDto } from 'src/decorators/use-dto.decorator';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { MasterMenuDto } from './dto/master-menu.dto';
import { RoleMenu } from '../role-menu/role-menu.entity';
import { MappingMenuReport } from '../mapping-menu-report/mapping-menu-report.entity';

@Entity('ir_mastermenu')
@UseDto(MasterMenuDto)
export class MasterMenu extends AbstractEntity<MasterMenuDto> {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'menuid' })
  menuid: number;

  @Column({ type: 'varchar', name: 'menucode', nullable: true })
  menucode: string;

  @Column({ type: 'varchar', name: 'menuname', nullable: true })
  menuname: string;

  @Column({ type: 'int', name: 'parentid', nullable: true })
  parentid: number;

  @Column({ type: 'int', name: 'sequence', nullable: true })
  sequence: number;

  @Column({ type: 'varchar', name: 'url', nullable: true })
  url: string;

  @Column({ type: 'int', name: 'issection', nullable: true })
  issection: number;

  @Column({ type: 'varchar', name: 'isdelete', nullable: true })
  isdelete: string;

  @OneToMany(() => RoleMenu, (rolemenu) => rolemenu.menuid)
  rolemenu: RoleMenu[];

  @OneToMany(
    () => MappingMenuReport,
    (mappingmenureport) => mappingmenureport.menuid,
  )
  mappingmenureport: MappingMenuReport[];
}
