import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UseDto } from 'src/decorators/use-dto.decorator';
import { AbstractEntity } from 'src/common/abstract.entity';
import { BusinessGroupDto } from './dto/master-business-group.dto';
import { MasterCompanyEES } from '../master-company-ees/master-company-ees.entity';

@Entity('ms_businessgroup')
@UseDto(BusinessGroupDto)
export class BusinessGroup extends AbstractEntity<BusinessGroupDto> {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'businessgroupid' })
  businessgroupid: number;

  @Column({ type: 'varchar', name: 'businessgroupcode', nullable: false })
  businessgroupcode: string;

  @Column({ type: 'varchar', name: 'businessgroupdesc', nullable: false })
  businessgroupdesc: string;

  @Column({ type: 'varchar', name: 'desc', nullable: true })
  desc: string;

  @Column({ type: 'varchar', name: 'desc', nullable: true })
  isdelete: string;

  @OneToMany(
    () => MasterCompanyEES,
    (mastercompanyees) => mastercompanyees.businessgroupid,
  )
  mastercompanyees: MasterCompanyEES[];
}
