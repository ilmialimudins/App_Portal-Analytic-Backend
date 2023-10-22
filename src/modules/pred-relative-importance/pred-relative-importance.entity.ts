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
import { Company } from '../master-company-ees/master-company-ees.entity';
import { EESFactor } from '../factor/factor.entity';
import { MasterEngagement } from '../master-engagement/master-engagement.entity';

@Entity('tbl_pred_relativeimportance')
@UseDto(PredRelativeImportanceDto)
export class PredRelativeImportance extends AbstractEntity<PredRelativeImportanceDto> {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
  id: number;

  @Column({ nullable: true })
  surveygizmoid: number;
  @ManyToOne(
    () => MasterSurveygizmo,
    (surveygizmo) => surveygizmo.relativeimportance,
  )
  @JoinColumn({
    name: 'surveygizmoid',
    referencedColumnName: 'surveygizmoid',
  })
  surveygizmo: MasterSurveygizmo;

  @Column({ nullable: true })
  companyid: number;
  @ManyToOne(() => Company, (company) => company.relativeimportance)
  @JoinColumn({
    name: 'companyid',
    referencedColumnName: 'companyid',
  })
  company: Company;

  @Column({ nullable: true })
  factorid: number;
  @ManyToOne(() => EESFactor, (factor) => factor.relativeimportance)
  @JoinColumn({
    name: 'factorid',
    referencedColumnName: 'factorid',
  })
  factor: EESFactor;

  @Column({ nullable: true })
  engagementid: number;
  @ManyToOne(
    () => MasterEngagement,
    (engagement) => engagement.relativeimportance,
  )
  @JoinColumn({
    name: 'engagementid',
    referencedColumnName: 'engagementid',
  })
  engagement: MasterEngagement;

  @Column({ type: 'int', name: 'tahunsurvey', nullable: true })
  tahunsurvey: number;

  @Column({
    type: 'float',
    name: 'relativeimportance',
    nullable: true,
    precision: 53,
  })
  relativeimportance: number;
}
