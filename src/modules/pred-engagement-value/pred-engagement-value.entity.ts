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
import { MasterEESCompany } from '../master-company/master-company.entity';
import { EESFactor } from '../factor/factor.entity';

@Entity('tbl_pred_predictionengagement')
@UseDto(PredEngagementValueDto)
export class PredEngagementValue extends AbstractEntity<PredEngagementValueDto> {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
  id: number;

  @Column({ nullable: true })
  d_surveygizmoid: number;
  @ManyToOne(
    () => MasterSurveygizmo,
    (surveygizmo) => surveygizmo.engagementvalue,
  )
  @JoinColumn({
    name: 'd_surveygizmoid',
    referencedColumnName: 'd_surveygizmoid',
  })
  surveygizmo: MasterSurveygizmo;

  @Column({ nullable: true })
  d_companyid: number;
  @ManyToOne(() => MasterEESCompany, (company) => company.engagementvalue)
  @JoinColumn({
    name: 'd_companyid',
    referencedColumnName: 'd_companyid',
  })
  company: MasterEESCompany;

  @Column({ nullable: true })
  d_factorid: number;
  @ManyToOne(() => EESFactor, (factor) => factor.engagementvalue)
  @JoinColumn({
    name: 'd_factorid',
    referencedColumnName: 'd_factorid',
  })
  factor: EESFactor;

  @Column({ type: 'varchar', name: 'demography', nullable: true })
  demography: string;

  @Column({ type: 'varchar', name: 'demographyvalue', nullable: true })
  demographyvalue: string;

  @Column({ type: 'int', name: 'tahunsurvey', nullable: true })
  tahunsurvey: string;

  @Column({
    type: 'float',
    name: 'avg_respondentanswer_before',
    nullable: true,
    precision: 53,
  })
  avg_respondentanswer_before: string;

  @Column({
    type: 'float',
    name: 'avg_respondentanswer_after',
    nullable: true,
    precision: 53,
  })
  avg_respondentanswer_after: string;

  @Column({ type: 'bigint', name: 'count_respondent', nullable: true })
  count_respondent: string;
}
