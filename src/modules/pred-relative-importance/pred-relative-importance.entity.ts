import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UseDto } from 'src/decorators/use-dto.decorator';
import { PredRelativeImportanceDto } from './dto/pred-relative-importance.dto';
import { AbstractEntity } from 'src/common/abstract.entity';
import { MasterSurveygizmo } from '../master-surveygizmo/master-surveygizmo.entity';
import { MasterEESCompany } from '../master-company/master-company.entity';
import { EESFactor } from '../factor/factor.entity';
import { MasterEngagement } from '../master-engagement/master-engagement.entity';

@Entity('tbl_relative_importance')
@UseDto(PredRelativeImportanceDto)
export class PredRelativeImportance extends AbstractEntity<PredRelativeImportanceDto> {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
  id: number;

  @Column({ nullable: true })
  d_surveygizmoid: number;
  @ManyToOne(
    () => MasterSurveygizmo,
    (surveygizmo) => surveygizmo.relativeimportance,
  )
  @JoinColumn({
    name: 'd_surveygizmoid',
    referencedColumnName: 'd_surveygizmoid',
  })
  surveygizmo: MasterSurveygizmo;

  @Column({ nullable: true })
  d_companyid: number;
  @ManyToOne(() => MasterEESCompany, (company) => company.relativeimportance)
  @JoinColumn({
    name: 'd_companyid',
    referencedColumnName: 'd_companyid',
  })
  company: MasterEESCompany;

  @Column({ nullable: true })
  d_factorid: number;
  @ManyToOne(() => EESFactor, (factor) => factor.relativeimportance)
  @JoinColumn({
    name: 'd_factorid',
    referencedColumnName: 'd_factorid',
  })
  factor: EESFactor;

  @Column({ nullable: true })
  d_engagementid: number;
  @ManyToOne(
    () => MasterEngagement,
    (engagement) => engagement.relativeimportance,
  )
  @JoinColumn({
    name: 'd_engagementid',
    referencedColumnName: 'd_engagementid',
  })
  engagement: MasterEngagement;

  @Column({ type: 'int', name: 'tahunsurvey', nullable: true })
  tahunsurvey: string;

  @Column({
    type: 'float',
    name: 'relativeimportance',
    nullable: true,
    precision: 53,
  })
  relativeimportance: number;
}
