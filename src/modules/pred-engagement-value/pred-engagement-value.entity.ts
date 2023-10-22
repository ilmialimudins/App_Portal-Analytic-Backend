import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UseDto } from 'src/decorators/use-dto.decorator';
import { PredEngagementValueDto } from './dto/pred-engagement-value.dto';
import { AbstractEntity } from 'src/common/abstract.entity';
import { MasterSurveygizmo } from '../master-surveygizmo/master-surveygizmo.entity';
import { Company } from '../master-company-ees/master-company-ees.entity';
import { EESFactor } from '../factor/factor.entity';

@Entity('tbl_pred_engagementvalue')
@UseDto(PredEngagementValueDto)
export class PredEngagementValue extends AbstractEntity<PredEngagementValueDto> {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
  id: number;

  @Column({ nullable: true })
  surveygizmoid: number;
  @ManyToOne(
    () => MasterSurveygizmo,
    (surveygizmo) => surveygizmo.engagementvalue,
  )
  @JoinColumn({
    name: 'surveygizmoid',
    referencedColumnName: 'surveygizmoid',
  })
  surveygizmo: MasterSurveygizmo;

  @Column({ nullable: true })
  companyid: number;
  @ManyToOne(() => Company, (company) => company.engagementvalue)
  @JoinColumn({
    name: 'companyid',
    referencedColumnName: 'companyid',
  })
  company: Company;

  @Column({ nullable: true })
  factorid: number;
  @ManyToOne(() => EESFactor, (factor) => factor.engagementvalue)
  @JoinColumn({
    name: 'factorid',
    referencedColumnName: 'factorid',
  })
  factor: EESFactor;

  @Column({ type: 'varchar', name: 'demography', nullable: true })
  demography: string;

  @Column({ type: 'varchar', name: 'demographyvalue', nullable: true })
  demographyvalue: string;

  @Column({ type: 'int', name: 'tahunsurvey', nullable: true })
  tahunsurvey: number;

  @Column({
    type: 'float',
    name: 'avg_respondentanswer_before',
    nullable: true,
    precision: 53,
  })
  avg_respondentanswer_before: number;

  @Column({
    type: 'float',
    name: 'avg_respondentanswer_after',
    nullable: true,
    precision: 53,
  })
  avg_respondentanswer_after: number;

  @Column({ type: 'bigint', name: 'count_respondent', nullable: true })
  count_respondent: number;
}
