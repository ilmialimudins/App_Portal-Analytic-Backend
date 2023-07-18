import { UseDto } from 'src/decorators/use-dto.decorator';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PredPredictionEngagementDto } from './dto/pred-prediction-engagement.dto';
import { AbstractEntity } from 'src/common/abstract.entity';
import { MasterSurveygizmo } from '../master-surveygizmo/master-surveygizmo.entity';
import { MasterEESCompany } from '../master-company/master-company.entity';
import { EESFactor } from '../factor/factor.entity';
import { MasterEngagement } from '../master-engagement/master-engagement.entity';

@Entity('tbl_pred_predictionengagement')
@UseDto(PredPredictionEngagementDto)
export class PredPredictionEngagement extends AbstractEntity<PredPredictionEngagementDto> {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
  id: number;

  @Column({ nullable: true })
  d_surveygizmoid: number;
  @ManyToOne(
    () => MasterSurveygizmo,
    (surveygizmo) => surveygizmo.predictionengagement,
  )
  @JoinColumn({
    name: 'd_surveygizmoid',
    referencedColumnName: 'd_surveygizmoid',
  })
  surveygizmo: MasterSurveygizmo;

  @Column({ nullable: true })
  d_companyid: number;
  @ManyToOne(() => MasterEESCompany, (company) => company.predictionengagement)
  @JoinColumn({
    name: 'd_companyid',
    referencedColumnName: 'd_companyid',
  })
  company: MasterEESCompany;

  @Column({ nullable: true })
  d_factorid: number;
  @ManyToOne(() => EESFactor, (factor) => factor.predictionengagement)
  @JoinColumn({
    name: 'd_factorid',
    referencedColumnName: 'd_factorid',
  })
  factor: EESFactor;

  @Column({ nullable: true })
  d_engagementid: number;
  @ManyToOne(
    () => MasterEngagement,
    (engagement) => engagement.predictionengagement,
  )
  @JoinColumn({
    name: 'd_engagementid',
    referencedColumnName: 'd_engagementid',
  })
  engagement: MasterEngagement;

  @Column({ type: 'varchar', name: 'demography', nullable: true })
  demography: string;

  @Column({ type: 'int', name: 'tahunsurvey', nullable: true })
  tahunsurvey: string;

  @Column({
    type: 'float',
    name: 'coefficients',
    nullable: true,
    precision: 53,
  })
  coefficients: string;

  @Column({ type: 'varchar', name: 'coefficients_type', nullable: true })
  coefficients_type: string;

  @Column({
    type: 'float',
    name: 'prediction_before',
    nullable: true,
    precision: 53,
  })
  prediction_before: string;

  @Column({
    type: 'float',
    name: 'prediction_after',
    nullable: true,
    precision: 53,
  })
  prediction_after: string;
}
