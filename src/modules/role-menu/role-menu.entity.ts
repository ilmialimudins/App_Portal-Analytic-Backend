import { AbstractEntity } from 'src/common/abstract.entity';
import { UseDto } from 'src/decorators/use-dto.decorator';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { MasterRole } from '../master-role/master-role.entity';
import { MasterMenu } from '../master-menu/master-menu.entity';
import { RoleMenuDto } from './dto/role-menu.dto';

@Entity('ir_rolemenu')
@UseDto(RoleMenuDto)
export class RoleMenu extends AbstractEntity<RoleMenuDto> {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'rolemenuid' })
  rolemenuid: number;

  @Column({ nullable: true })
  roleid: number;
  @ManyToOne(() => MasterRole, (masterrole) => masterrole.roleid)
  @JoinColumn({
    name: 'roleid',
    referencedColumnName: 'roleid',
  })
  masterrole: MasterRole;

  @Column({ nullable: true })
  menuid: number;
  @ManyToOne(() => MasterMenu, (mastermenu) => mastermenu.menuid)
  @JoinColumn({
    name: 'menuid',
    referencedColumnName: 'menuid',
  })
  mastermenu: MasterMenu;

  @Column({ type: 'varchar', name: 'isdelete', nullable: true })
  isdelete: string;
}
