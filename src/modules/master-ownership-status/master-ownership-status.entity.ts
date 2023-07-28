import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UseDto } from 'src/decorators/use-dto.decorator';
import { AbstractEntity } from 'src/common/abstract.entity';
import { OwnershipStatusDto } from './dto/master-ownership-status.dto';
import { MasterCompanyEES } from '../master-company-ees/master-company-ees.entity';

@Entity('ms_ownershipstatus')
@UseDto(OwnershipStatusDto)
export class OwnershipStatus extends AbstractEntity<OwnershipStatusDto> {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'ownershipstatusid' })
  ownershipstatusid: number;

  @Column({ type: 'bigint', name: 'ownershipstatuscode', nullable: false })
  ownershipstatuscode: number;

  @Column({ type: 'varchar', name: 'ownershipstatusdesc', nullable: false })
  ownershipstatusdesc: string;

  @Column({ type: 'varchar', name: 'desc', nullable: true })
  desc: string;

  @OneToMany(
    () => MasterCompanyEES,
    (mastercompanyees) => mastercompanyees.ownershipstatuspid,
  )
  mastercompanyees: MasterCompanyEES[];
}
