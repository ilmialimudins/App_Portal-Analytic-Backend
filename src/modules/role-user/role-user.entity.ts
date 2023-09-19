import { AbstractEntity } from 'src/common/abstract.entity';
import { UseDto } from 'src/decorators/use-dto.decorator';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { MasterUser } from '../master-user/master-user.entity';
import { MasterRole } from '../master-role/master-role.entity';
import { RoleUserDto } from './dto/role-user.dto';

@Entity('ir_roleuser')
@UseDto(RoleUserDto)
export class RoleUser extends AbstractEntity<RoleUserDto> {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'roleuserid' })
  roleuserid: number;

  @Column({ nullable: true })
  roleid: number;
  @ManyToOne(() => MasterRole, (masterrole) => masterrole.roleid)
  @JoinColumn({
    name: 'roleid',
    referencedColumnName: 'roleid',
  })
  masterrole: MasterRole;

  @Column({ nullable: true })
  userid: number;
  @ManyToOne(() => MasterUser, (masteruser) => masteruser.userid)
  @JoinColumn({
    name: 'userid',
    referencedColumnName: 'userid',
  })
  masteruser: MasterUser;

  @Column({ type: 'varchar', name: 'isdelete', nullable: true })
  isdelete: string;
}
