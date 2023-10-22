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
import { Company } from '../master-company-ees/master-company-ees.entity';
import { EESFactor } from '../factor/factor.entity';
import { MasterEngagement } from '../master-engagement/master-engagement.entity';

@Entity('tbl_pred_predictionengagement')
@UseDto(PredPredictionEngagementDto)
export class PredPredictionEngagement extends AbstractEntity<PredPredictionEngagementDto> {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
  id: number;

  @Column({ nullable: true })
  surveygizmoid: number;
  @ManyToOne(
    () => MasterSurveygizmo,
    (surveygizmo) => surveygizmo.predictionengagement,
  )
  @JoinColumn({
    name: 'surveygizmoid',
    referencedColumnName: 'surveygizmoid',
  })
  surveygizmo: MasterSurveygizmo;

  @Column({ nullable: true })
  companyid: number;
  @ManyToOne(() => Company, (company) => company.predictionengagement)
  @JoinColumn({
    name: 'companyid',
    referencedColumnName: 'companyid',
  })
  company: Company;

  @Column({ nullable: true })
  factorid: number;
  @ManyToOne(() => EESFactor, (factor) => factor.predictionengagement)
  @JoinColumn({
    name: 'factorid',
    referencedColumnName: 'factorid',
  })
  factor: EESFactor;

  @Column({ nullable: true })
  engagementid: number;
  @ManyToOne(
    () => MasterEngagement,
    (engagement) => engagement.predictionengagement,
  )
  @JoinColumn({
    name: 'engagementid',
    referencedColumnName: 'engagementid',
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
