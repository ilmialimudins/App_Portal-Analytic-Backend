import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UseDto } from 'src/decorators/use-dto.decorator';
import { AbstractEntity } from 'src/common/abstract.entity';
import { SurveyGroupDto } from './dto/master-survey-group.dto';
import { Company } from '../master-company-ees/master-company-ees.entity';
import { InvitedRespondents } from '../spm-invited-respondents/spm-invited-respondents.entity';

@Entity('ms_surveygroup')
@UseDto(SurveyGroupDto)
export class SurveyGroup extends AbstractEntity<SurveyGroupDto> {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'surveygroupid' })
  surveygroupid: number;

  @Column({ type: 'varchar', name: 'surveygroupcode', nullable: false })
  surveygroupcode: string;

  @Column({ type: 'varchar', name: 'surveygroupdesc', nullable: false })
  surveygroupdesc: string;

  @Column({ type: 'varchar', name: 'desc', nullable: true })
  desc: string;

  @Column({ type: 'varchar', name: 'isdelete', nullable: true })
  isdelete: string;

  @OneToMany(() => Company, (company) => company.surveygroupid)
  company: Company[];

  @OneToMany(() => InvitedRespondents, (spm) => spm.surveygroupid)
  invitedrespondent: InvitedRespondents[];
}
