import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UseDto } from 'src/decorators/use-dto.decorator';
import { AbstractEntity } from 'src/common/abstract.entity';
import { OwnershipStatusDto } from './dto/master-ownership-status.dto';
import { Company } from '../master-company-ees/master-company-ees.entity';

@Entity('ms_ownershipstatus')
@UseDto(OwnershipStatusDto)
export class OwnershipStatus extends AbstractEntity<OwnershipStatusDto> {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'ownershipstatusid' })
  ownershipstatusid: number;

  @Column({ type: 'varchar', name: 'ownershipstatuscode', nullable: false })
  ownershipstatuscode: string;

  @Column({ type: 'varchar', name: 'ownershipstatusdesc', nullable: false })
  ownershipstatusdesc: string;

  @Column({ type: 'varchar', name: 'desc', nullable: true })
  desc: string;

  @OneToMany(() => Company, (company) => company.ownershipstatusid)
  company: Company[];
}
