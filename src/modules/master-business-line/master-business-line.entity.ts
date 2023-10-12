import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UseDto } from 'src/decorators/use-dto.decorator';
import { AbstractEntity } from 'src/common/abstract.entity';
import { BusinessLineDto } from './dto/master-business-line.dto';
import { Company } from '../master-company-ees/master-company-ees.entity';

@Entity('ms_businessline')
@UseDto(BusinessLineDto)
export class BusinessLine extends AbstractEntity<BusinessLineDto> {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'businesslineid' })
  businesslineid: number;

  @Column({ type: 'varchar', name: 'businesslinecode', nullable: false })
  businesslinecode: string;

  @Column({ type: 'varchar', name: 'businesslinedesc', nullable: false })
  businesslinedesc: string;

  @Column({ type: 'varchar', name: 'desc', nullable: true })
  desc: string;

  @Column({ type: 'varchar', name: 'isdelete', nullable: true })
  isdelete: string;

  @OneToMany(() => Company, (company) => company.businesslineid)
  company: Company[];
}
