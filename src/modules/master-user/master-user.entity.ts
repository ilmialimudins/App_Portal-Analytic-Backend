import { AbstractEntity } from 'src/common/abstract.entity';
import { UseDto } from 'src/decorators/use-dto.decorator';
import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { MasterUserDto } from './dto/master-user.dto';
import { AccessUser } from '../access-user/access-user.entity';
import { RoleUser } from '../role-user/role-user.entity';

@Entity('ir_masteruser')
@UseDto(MasterUserDto)
export class MasterUser extends AbstractEntity<MasterUserDto> {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'userid' })
  userid: number;

  @Column({ type: 'varchar', name: 'username', nullable: true })
  username: string;

  @Column({ type: 'varchar', name: 'email', nullable: true })
  email: string;

  @Column({ type: 'varchar', name: 'companycode', nullable: true })
  companycode: string;

  @Column({ type: 'varchar', name: 'companyname', nullable: true })
  companyname: string;

  @Column({ type: 'varchar', name: 'phonenumber', nullable: true })
  phonenumber: string;

  @Column({ type: 'varchar', name: 'npk', nullable: true })
  npk: string;

  @Column({ type: 'varchar', name: 'isdelete', nullable: true })
  isdelete: string;

  @OneToOne(() => AccessUser, (accessuser) => accessuser.userid)
  accessuser: AccessUser[];

  @OneToMany(() => RoleUser, (roleuser) => roleuser.userid)
  roleuser: RoleUser[];
}
