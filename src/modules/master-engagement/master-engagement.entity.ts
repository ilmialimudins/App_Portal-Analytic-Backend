import { UseDto } from 'src/decorators/use-dto.decorator';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { AbstractEntity } from 'src/common/abstract.entity';
import { MasterEngagementDTO } from './dto/master-engagement.dto';
import { PredPredictionEngagement } from '../pred-prediction-engagement/pred-prediction-engagement.entity';
import { PredRelativeImportance } from '../pred-relative-importance/pred-relative-importance.entity';

@Entity('ms_ees_engagement')
@UseDto(MasterEngagementDTO)
export class MasterEngagement extends AbstractEntity<MasterEngagementDTO> {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'd_engagementid' })
  d_engagementid: number;

  @Column({ type: 'varchar', name: 'h_engagementhashkey', nullable: true })
  h_engagementhashkey: string;

  @Column({ type: 'varchar', name: 'engagement', nullable: true })
  engagement: string;

  @Column({ type: 'varchar', name: 'engagement_shortname', nullable: true })
  engagement_shortname: string;

  @OneToMany(
    () => PredPredictionEngagement,
    (predictionengagement) => predictionengagement.engagement,
  )
  predictionengagement: PredPredictionEngagement[];

  @OneToMany(
    () => PredRelativeImportance,
    (relativeimportance) => relativeimportance.engagement,
  )
  relativeimportance: PredRelativeImportance[];
}
