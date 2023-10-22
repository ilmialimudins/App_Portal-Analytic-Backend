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
  companyid: number;
  @ManyToOne(() => Company, (company) => company.engagementfavorable)
  @JoinColumn({
    name: 'companyid',
    referencedColumnName: 'companyid',
  })
  company: Company;

  @Column({ type: 'varchar', name: 'iscurrentsurvey', nullable: true })
  iscurrentsurvey: string;

  @Column({ type: 'int', name: 'tahunsurvey', nullable: true })
  tahunsurvey: number;

  @Column({ type: 'bigint', name: 'totalcompletedrespondent', nullable: true })
  totalcompletedrespondent: number;

  @Column({ nullable: true })
  factorid: number;
  @ManyToOne(() => EESFactor, (factor) => factor.engagementfavorable)
  @JoinColumn({
    name: 'factorid',
    referencedColumnName: 'factorid',
  })
  factor: EESFactor;

  @Column({ nullable: true })
  qcodeid: number;
  @ManyToOne(() => MasterQcode, (factor) => factor.engagementfavorable)
  @JoinColumn({
    name: 'qcodeid',
    referencedColumnName: 'qcodeid',
  })
  qcode: MasterQcode;

  @Column({ type: 'bigint', name: 'count_all_favorabletype', nullable: true })
  count_all_favorabletype: number;

  @Column({
    type: 'float',
    name: 'percentage_all_favorabletype',
    nullable: true,
    precision: 53,
  })
  percentage_all_favorabletype: number;

  @Column({ type: 'varchar', name: 'favorable_type', nullable: true })
  favorable_type: string;

  @Column({ type: 'bigint', name: 'count_respondent', nullable: true })
  count_respondent: number;

  @Column({
    type: 'float',
    name: 'avg_per_qcode',
    nullable: true,
    precision: 53,
  })
  avg_per_qcode: number;

  @Column({
    type: 'float',
    name: 'avg_per_factor',
    nullable: true,
    precision: 53,
  })
  avg_per_factor: number;

  @Column({ type: 'datetime', name: 'created_on', nullable: true })
  created_on: Date;

  @Column({ type: 'datetime', name: 'modified_on', nullable: true })
  modified_on: Date;
}
