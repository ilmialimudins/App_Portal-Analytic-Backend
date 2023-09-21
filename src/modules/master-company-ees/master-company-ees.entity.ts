import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UseDto } from 'src/decorators/use-dto.decorator';
import { AbstractEntity } from 'src/common/abstract.entity';
import { BusinessLine } from '../master-business-line/master-business-line.entity';
import { CompanyDto } from './dto/master-company-ees.dto';
import { BusinessGroup } from '../master-business-group/master-business-group.entity';
import { SurveyGroup } from '../master-survey-group/master-survey-group.entity';
import { Location } from '../master-location/master-location.entity';
import { OwnershipStatus } from '../master-ownership-status/master-ownership-status.entity';
import { Cla } from '../master-cla/master-cla.entity';
import { DirectReview } from '../master-direct-review/master-direct-review.entity';
import { ModellingType } from '../master-modelling-type/master-modelling-type.entity';
import { AccessUser } from '../access-user/access-user.entity';

@Entity('ms_company')
@UseDto(CompanyDto)
export class Company extends AbstractEntity<CompanyDto> {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'companyid' })
  companyid: number;

  @Column({ nullable: true })
  businesslineid: number;
  @ManyToOne(() => BusinessLine, (businessline) => businessline.businesslineid)
  @JoinColumn({
    name: 'businesslineid',
    referencedColumnName: 'businesslineid',
  })
  businessline: BusinessLine;

  @Column({ nullable: true })
  businessgroupid: number;
  @ManyToOne(
    () => BusinessGroup,
    (businessgroup) => businessgroup.businessgroupid,
  )
  @JoinColumn({
    name: 'businessgroupid',
    referencedColumnName: 'businessgroupid',
  })
  businessgroup: BusinessGroup;

  @Column({ nullable: true })
  surveygroupid: number;
  @ManyToOne(() => SurveyGroup, (surveygroup) => surveygroup.surveygroupid)
  @JoinColumn({
    name: 'surveygroupid',
    referencedColumnName: 'surveygroupid',
  })
  surveygroup: SurveyGroup;

  @Column({ nullable: true })
  locationid: number;
  @ManyToOne(() => Location, (location) => location.locationid)
  @JoinColumn({
    name: 'locationid',
    referencedColumnName: 'locationid',
  })
  location: Location;

  @Column({ nullable: true })
  ownershipstatusid: number;
  @ManyToOne(
    () => OwnershipStatus,
    (ownershipstatus) => ownershipstatus.ownershipstatusid,
  )
  @JoinColumn({
    name: 'ownershipstatusid',
    referencedColumnName: 'ownershipstatusid',
  })
  ownershipstatus: OwnershipStatus;

  @Column({ nullable: true })
  claid: number;
  @ManyToOne(() => Cla, (cla) => cla.claid)
  @JoinColumn({
    name: 'claid',
    referencedColumnName: 'claid',
  })
  cla: Cla;

  @Column({ nullable: true })
  directreviewid: number;
  @ManyToOne(() => DirectReview, (directreview) => directreview.directreviewid)
  @JoinColumn({
    name: 'directreviewid',
    referencedColumnName: 'directreviewid',
  })
  directreview: DirectReview;

  @Column({ nullable: true })
  modellingtypeid: number;
  @ManyToOne(
    () => ModellingType,
    (modelingtype) => modelingtype.modellingtypeid,
  )
  @JoinColumn({
    name: 'modellingtypeid',
    referencedColumnName: 'modellingtypeid',
  })
  modellingtype: ModellingType;

  @Column({ type: 'varchar', name: 'companycode', nullable: false })
  companycode: string;

  @Column({ type: 'varchar', name: 'companyeesname', nullable: false })
  companyeesname: string;

  @Column({ type: 'varchar', name: 'companympsname', nullable: false })
  companympsname: string;

  @Column({ type: 'varchar', name: 'aliascompany1', nullable: false })
  aliascompany1: string;

  @Column({ type: 'varchar', name: 'aliascompany2', nullable: true })
  aliascompany2: string;

  @Column({ type: 'varchar', name: 'aliascompany3', nullable: true })
  aliascompany3: string;

  @Column({ type: 'varchar', name: 'isdelete', nullable: false })
  isdelete: string;

  @OneToOne(() => AccessUser, (accessuser) => accessuser.companyid)
  accessuser: AccessUser[];
}
