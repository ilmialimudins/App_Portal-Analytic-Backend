import { UseDto } from 'src/decorators/use-dto.decorator';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PredEngagementFavorableDTO } from './dto/pred-engagement-favorable.dto';
import { AbstractEntity } from 'src/common/abstract.entity';
import { MasterSurveygizmo } from '../master-surveygizmo/master-surveygizmo.entity';
import { Company } from '../master-company-ees/master-company-ees.entity';
import { EESFactor } from '../factor/factor.entity';
import { MasterQcode } from '../master-qcode/master-qcode.entity';

@Entity('tbl_pred_engagementfavorable')
@UseDto(PredEngagementFavorableDTO)
export class PredEngagementFavorable extends AbstractEntity<PredEngagementFavorableDTO> {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
  id: number;

  @Column({ nullable: true })
  factorid: number;
  @ManyToOne(() => EESFactor, (factor) => factor.engagementfavorable)
  @JoinColumn({
    name: 'factorid',
    referencedColumnName: 'factorid',
  })
  factor: EESFactor;

  @Column({ nullable: true })
  companyid: number;
  @ManyToOne(() => Company, (company) => company.engagementfavorable)
  @JoinColumn({
    name: 'companyid',
    referencedColumnName: 'companyid',
  })
  company: Company;

  @Column({ nullable: true })
  surveygizmoid: number;
  @ManyToOne(
    () => MasterSurveygizmo,
    (surveygizmo) => surveygizmo.engagementfavorable,
  )
  @JoinColumn({
    name: 'surveygizmoid',
    referencedColumnName: 'surveygizmoid',
  })
  surveygizmo: MasterSurveygizmo;

  @Column({ nullable: true })
  qcodeid: number;
  @ManyToOne(() => MasterQcode, (factor) => factor.engagementfavorable)
  @JoinColumn({
    name: 'qcodeid',
    referencedColumnName: 'qcodeid',
  })
  qcode: MasterQcode;

  @Column({ type: 'varchar', name: 'engagementlevel', nullable: true })
  engagementlevel: string;

  @Column({ type: 'varchar', name: 'demography', nullable: true })
  demography: string;

  @Column({ type: 'varchar', name: 'demographyvalue', nullable: true })
  demographyvalue: string;

  @Column({ type: 'int', name: 'tahunsurvey', nullable: true })
  tahunsurvey: number;

  @Column({ type: 'varchar', name: 'latest', nullable: true })
  latest: string;

  @Column({ type: 'bigint', name: 'sum_unfavorable', nullable: true })
  sum_unfavorable: number;

  @Column({ type: 'bigint', name: 'sum_neutral', nullable: true })
  sum_neutral: number;

  @Column({ type: 'bigint', name: 'sum_favorable', nullable: true })
  sum_favorable: number;

  @Column({ type: 'bigint', name: 'count_unfavorable', nullable: true })
  count_unfavorable: number;

  @Column({ type: 'bigint', name: 'count_neutral', nullable: true })
  count_neutral: number;

  @Column({ type: 'bigint', name: 'count_favorable', nullable: true })
  count_favorable: number;

  @Column({ type: 'bigint', name: 'count_respondent', nullable: true })
  count_respondent: number;

  @Column({ type: 'bigint', name: 'count_answer', nullable: true })
  count_answer: number;
}
