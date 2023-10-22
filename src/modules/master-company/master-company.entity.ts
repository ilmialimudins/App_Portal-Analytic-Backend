import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { UseDto } from 'src/decorators/use-dto.decorator';
import { MasterCompanyDto } from './dto/master-company.dto';
import { AbstractEntity } from 'src/common/abstract.entity';

@Entity('ms_ees_company')
@UseDto(MasterCompanyDto)
export class MasterEESCompany extends AbstractEntity<MasterCompanyDto> {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'companyid' })
  companyid: number;

  @Column({ type: 'varchar', name: 'h_companyhashkey', nullable: true })
  h_companyhashkey: string;

  @Column({ type: 'varchar', name: 'companyname', nullable: true })
  companyname: string;

  @Column({ type: 'varchar', name: 'companyname_alias', nullable: true })
  companyname_alias: string;

  @Column({ type: 'varchar', name: 'companygroup', nullable: true })
  companygroup: string;

  @Column({ type: 'varchar', name: 'modeling_type', nullable: true })
  modeling_type: string;

  @Column({ type: 'varchar', name: 'recordsource', nullable: true })
  recordsource: string;

  @Column({ type: 'datetime', name: 'loadenddate', nullable: true })
  loadenddate: Date;
}
