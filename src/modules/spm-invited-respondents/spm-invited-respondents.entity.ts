import { UseDto } from 'src/decorators/use-dto.decorator';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SpmInvitedRespondentsDTO } from './dto/spm-invited-respondents.dto';
import { AbstractEntity } from 'src/common/abstract.entity';
import { Company } from '../master-company-ees/master-company-ees.entity';

@Entity('tbl_spm_invitedrespondents')
@UseDto(SpmInvitedRespondentsDTO)
export class InvitedRespondents extends AbstractEntity<SpmInvitedRespondentsDTO> {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
  id: number;

  @Column({ type: 'int', name: 'surveyid', nullable: true })
  surveyid: number;

  @Column()
  companyid: number;
  @ManyToOne(() => Company, (masterCompany) => masterCompany.companyid)
  @JoinColumn({
    name: 'companyid',
    referencedColumnName: 'companyid',
  })
  company: 'companyid';

  @Column({ type: 'datetime', name: 'startsurvey' })
  startsurvey: Date;

  @Column({ type: 'datetime', name: 'closesurvey' })
  closesurvey: Date;

  @Column({ type: 'int', name: 'totalinvited_company' })
  totalinvited_company: number;

  @Column({ type: 'varchar', name: 'demography', length: '255' })
  demography: string;

  @Column({ type: 'varchar', name: 'valuedemography', length: '255' })
  valuedemography: string;

  @Column({ type: 'int', name: 'totalinvited_demography' })
  totalinvited_demography: number;

  @Column({ type: 'int', name: 'is_sync' })
  is_sync: number;

  @Column({ type: 'datetime2', name: 'endcreatedtime' })
  endcreatedtime: Date;

  @Column({ type: 'int', name: 'tahun_survey' })
  tahun_survey: number;

  @Column({ type: 'varchar', name: 'is_delete', length: '1' })
  is_delete: string;
}