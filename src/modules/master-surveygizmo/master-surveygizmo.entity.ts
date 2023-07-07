import { UseDto } from 'src/decorators/use-dto.decorator';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { MasterSurveyGizmoDTO } from './dto/master-surveygizmo.dto';
import { AbstractEntity } from 'src/common/abstract.entity';
import { PredEngagementFavorable } from '../pred-engagement-favorable/pred-engagement-favorable.entity';
import { PredEngagementValue } from '../pred-engagement-value/pred-engagement-value.entity';
import { PredPredictionEngagement } from '../pred-prediction-engagement/pred-prediction-engagement.entity';
import { PredRelativeImportance } from '../pred-relative-importance/pred-relative-importance.entity';

@Entity('ms_ees_surveygizmo')
@UseDto(MasterSurveyGizmoDTO)
export class MasterSurveygizmo extends AbstractEntity<MasterSurveyGizmoDTO> {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'd_surveygizmoid' })
  d_surveygizmoid: number;

  @Column({ type: 'varchar', name: 'h_surveygizmohashkey', nullable: true })
  h_surveygizmohashkey: string;

  @Column({ type: 'varchar', name: 'surveyid', nullable: true })
  surveyid: string;

  @Column({ type: 'varchar', name: 'team', nullable: true })
  team: string;

  @Column({ type: 'varchar', name: 'status', nullable: true })
  status: string;

  @Column({ type: 'varchar', name: 'title', nullable: true })
  title: string;

  @Column({ type: 'varchar', name: 'links', nullable: true })
  links: string;

  @Column({ type: 'varchar', name: 'totalinvitedrespondent', nullable: true })
  totalinvitedrespondent: number;

  @Column({ type: 'varchar', name: 'recordsource', nullable: true })
  recordsource: string;

  @Column({ type: 'datetime', name: 'loadenddate', nullable: true })
  loadenddate: Date;

  @Column({ type: 'datetime', name: 'created_on', nullable: true })
  created_on: Date;

  @Column({ type: 'datetime', name: 'modified_on', nullable: true })
  modified_on: Date;

  @OneToMany(
    () => PredEngagementFavorable,
    (engagementfavorable) => engagementfavorable.surveygizmo,
  )
  engagementfavorable: PredEngagementFavorable[];

  @OneToMany(
    () => PredEngagementValue,
    (engagementfavorable) => engagementfavorable.surveygizmo,
  )
  engagementvalue: PredEngagementValue[];

  @OneToMany(
    () => PredPredictionEngagement,
    (predictionengagement) => predictionengagement.surveygizmo,
  )
  predictionengagement: PredPredictionEngagement[];

  @OneToMany(
    () => PredRelativeImportance,
    (relativeimportance) => relativeimportance.surveygizmo,
  )
  relativeimportance: PredRelativeImportance[];
}
