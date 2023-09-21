import { AbstractEntity } from 'src/common/abstract.entity';
import { UseDto } from 'src/decorators/use-dto.decorator';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AccessUserDto } from './dto/access-user.dto';
import { Company } from '../master-company-ees/master-company-ees.entity';
import { MasterUser } from '../master-user/master-user.entity';

@Entity('ir_aksesuser')
@UseDto(AccessUserDto)
export class AccessUser extends AbstractEntity<AccessUserDto> {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'aksesuserid' })
  aksesuserid: number;

  @Column({ nullable: true })
  companyid: number;
  @OneToOne(() => Company, (company) => company.companyid)
  @JoinColumn({
    name: 'companyid',
    referencedColumnName: 'companyid',
  })
  company: Company;

  @Column({ nullable: true })
  userid: number;
  @OneToOne(() => MasterUser, (masteruser) => masteruser.userid)
  @JoinColumn({
    name: 'userid',
    referencedColumnName: 'userid',
  })
  masteruser: MasterUser;

  @Column({ type: 'varchar', name: 'isdelete', nullable: true })
  isdelete: string;
}
