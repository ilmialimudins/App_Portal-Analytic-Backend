import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UseDto } from 'src/decorators/use-dto.decorator';
import { AbstractEntity } from 'src/common/abstract.entity';
import { SurveyGroupDto } from './dto/master-survey-group.dto';
import { MasterCompanyEES } from '../master-company-ees/master-company-ees.entity';

@Entity('ms_surveygroup')
@UseDto(SurveyGroupDto)
export class SurveyGroup extends AbstractEntity<SurveyGroupDto> {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'surveygroupid' })
  surveygroupid: number;

  @Column({ type: 'bigint', name: 'surveygroupcode', nullable: false })
  surveygroupcode: number;

  @Column({ type: 'varchar', name: 'surveygroupdesc', nullable: false })
  surveygroupdesc: string;

  @Column({ type: 'varchar', name: 'desc', nullable: true })
  desc: string;

  @OneToMany(
    () => MasterCompanyEES,
    (mastercompanyees) => mastercompanyees.surveygroupid,
  )
  mastercompanyees: MasterCompanyEES[];
}
