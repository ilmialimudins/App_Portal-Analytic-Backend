import { AbstractEntity } from 'src/common/abstract.entity';
import { UseDto } from 'src/decorators/use-dto.decorator';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { MasterRoleDto } from './dto/master-role.dto';
import { RoleUser } from '../role-user/role-user.entity';
import { RoleMenu } from '../role-menu/role-menu.entity';

@Entity('ir_masterrole')
@UseDto(MasterRoleDto)
export class MasterRole extends AbstractEntity<MasterRoleDto> {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'roleid' })
  roleid: number;

  @Column({ type: 'varchar', name: 'rolecode', nullable: true })
  rolecode: string;

  @Column({ type: 'varchar', name: 'rolename', nullable: true })
  rolename: string;

  @Column({ type: 'varchar', name: 'roledesc', nullable: true })
  roledesc: string;

  @Column({ type: 'varchar', name: 'isdelete', nullable: true })
  isdelete: string;

  @OneToMany(() => RoleUser, (roleuser) => roleuser.roleid)
  roleuser: RoleUser[];

  @OneToMany(() => RoleMenu, (rolemenu) => rolemenu.menuid)
  rolemenu: RoleMenu[];
}
