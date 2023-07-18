import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UseDto } from 'src/decorators/use-dto.decorator';
import { FactorDto } from './dto/factor.dto';
import { AbstractEntity } from 'src/common/abstract.entity';
import { PredEngagementFavorable } from '../pred-engagement-favorable/pred-engagement-favorable.entity';
import { PredEngagementValue } from '../pred-engagement-value/pred-engagement-value.entity';
import { PredPredictionEngagement } from '../pred-prediction-engagement/pred-prediction-engagement.entity';
import { PredRelativeImportance } from '../pred-relative-importance/pred-relative-importance.entity';

@Entity('ms_ees_factor')
@UseDto(FactorDto)
export class EESFactor extends AbstractEntity<FactorDto> {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'd_factorid',
  })
  d_factorid: string;

  @Column({ type: 'varchar', name: 'h_factorhashkey', nullable: true })
  h_factorhashkey: string;

  @Column({ type: 'varchar', name: 'factorcode', nullable: true })
  factorcode: string;

  @Column({ type: 'varchar', name: 'factorname', nullable: true })
  factorname: string;

  @Column({ type: 'varchar', name: 'factor_shortname', nullable: true })
  factor_shortname: string;

  @Column({ type: 'varchar', name: 'category', nullable: true })
  category: string;

  @Column({ type: 'varchar', name: 'label', nullable: true })
  label: string;

  @Column({ type: 'varchar', name: 'recordsource', nullable: true })
  recordsource: string;

  @Column({ type: 'datetime', name: 'loadenddate', nullable: true })
  loadenddate: Date;

  @OneToMany(
    () => PredEngagementFavorable,
    (engagementfavorable) => engagementfavorable.factor,
  )
  engagementfavorable: PredEngagementFavorable[];

  @OneToMany(
    () => PredEngagementValue,
    (engagementfavorable) => engagementfavorable.factor,
  )
  engagementvalue: PredEngagementValue[];

  @OneToMany(
    () => PredPredictionEngagement,
    (predictionengagement) => predictionengagement.factor,
  )
  predictionengagement: PredPredictionEngagement[];

  @OneToMany(
    () => PredRelativeImportance,
    (relativeimportance) => relativeimportance.factor,
  )
  relativeimportance: PredRelativeImportance[];
}
