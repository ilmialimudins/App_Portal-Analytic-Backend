import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UseDto } from 'src/decorators/use-dto.decorator';
import { MasterCompanyDto } from './dto/master-company.dto';
import { AbstractEntity } from 'src/common/abstract.entity';
import { PredEngagementFavorable } from '../pred-engagement-favorable/pred-engagement-favorable.entity';
import { PredEngagementValue } from '../pred-engagement-value/pred-engagement-value.entity';
import { PredPredictionEngagement } from '../pred-prediction-engagement/pred-prediction-engagement.entity';
import { PredRelativeImportance } from '../pred-relative-importance/pred-relative-importance.entity';

@Entity('ms_ees_company')
@UseDto(MasterCompanyDto)
export class MasterEESCompany extends AbstractEntity<MasterCompanyDto> {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'd_companyid' })
  d_companyid: number;

  @Column({ type: 'varchar', name: 'h_companyhashkey', nullable: true })
  h_companyhashkey: string;

  @Column({ type: 'varchar', name: 'companyname', nullable: true })
  companyname: string;

  @Column({ type: 'varchar', name: 'companyname_alias', nullable: true })
  companyname_alias: string;

  @Column({ type: 'varchar', name: 'companygroup', nullable: true })
  companygroup: string;

  @Column({ type: 'varchar', name: 'modeling_type', nullable: true })
  modeling_type: string;

  @Column({ type: 'varchar', name: 'recordsource', nullable: true })
  recordsource: string;

  @Column({ type: 'datetime', name: 'loadenddate', nullable: true })
  loadenddate: Date;

  @OneToMany(
    () => PredEngagementFavorable,
    (engagementfavorable) => engagementfavorable.company,
  )
  engagementfavorable: PredEngagementFavorable[];

  @OneToMany(
    () => PredEngagementValue,
    (engagementfavorable) => engagementfavorable.company,
  )
  engagementvalue: PredEngagementValue[];

  @OneToMany(
    () => PredPredictionEngagement,
    (predictionengagement) => predictionengagement.company,
  )
  predictionengagement: PredPredictionEngagement[];

  @OneToMany(
    () => PredRelativeImportance,
    (relativeimportance) => relativeimportance.company,
  )
  relativeimportance: PredRelativeImportance[];
}
