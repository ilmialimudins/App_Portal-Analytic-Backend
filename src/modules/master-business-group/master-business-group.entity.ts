import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UseDto } from 'src/decorators/use-dto.decorator';
import { AbstractEntity } from 'src/common/abstract.entity';
import { BusinessGroupDto } from './dto/master-business-group.dto';
import { Company } from '../master-company-ees/master-company-ees.entity';
import { TableProperty } from '../mps/table-mps-property/table-mps-property.entity';

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

  @Column({ type: 'varchar', name: 'isdelete', nullable: true })
  isdelete: string;

  @OneToMany(() => Company, (company) => company.businessgroupid)
  company: Company[];

  @OneToMany(() => TableProperty, (property) => property.businessgroupid)
  property: TableProperty[];
}
