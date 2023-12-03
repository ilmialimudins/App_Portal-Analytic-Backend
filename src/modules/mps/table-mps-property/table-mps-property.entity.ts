import { UseDto } from 'src/decorators/use-dto.decorator';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TablePropertyDto } from './dto/table-mps-property.dto';
import { AbstractEntity } from 'src/common/abstract.entity';
import { TableGenderAge } from '../table-mps-genderage/table-mps-genderage.entity';
import { TableEducation } from '../table-mps-education/table-mps-education.entity';
import { TableGradeEmployeeStatus } from '../table-mps-gradeemployeestatus/table-mps-gradeemployeestatus.entity';
import { TableNewEmployeePerGender } from '../table-mps-newemployeepergender/table-mps-newemployeepergender.entity';
import { TableEmployeeByGender } from '../table-mps-employeebygender/table-mps-employeebygender.entity';
import { TableOutsourcingPerGender } from '../table-mps-outsourcingpergender/table-mps-outsourcingpergender.entity';
import { TableTenure } from '../table-mps-tenure/table-mps-tenure.entity';
import { TableTrainingHourGender } from '../table-mps-traininghourgender/table-mps-traininghourgender.entity';
import { TableTurnOverTerminationType } from '../table-mps-turnoverterminationtype/table-mps-turnoverterminationtype.entity';
import { TableTrainingHourJobGroup } from '../table-mps-traininghourjobgroup/table-mps-traininghourjobgroup.entity';
import { TableApplicantPerGender } from '../table-mps-applicantpergender/table-mps-applicantpergender.entity';
import { DirectReview } from 'src/modules/master-direct-review/master-direct-review.entity';
import { Cla } from 'src/modules/master-cla/master-cla.entity';
import { Company } from 'src/modules/master-company-ees/master-company-ees.entity';
import { Location } from 'src/modules/master-location/master-location.entity';

@Entity('tbl_mps_property')
@UseDto(TablePropertyDto)
export class TableProperty extends AbstractEntity<TablePropertyDto> {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'propertyid' })
  propertyid: number;

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
  companyid: number;
  @ManyToOne(() => Company, (company) => company.companyid)
  @JoinColumn({
    name: 'companyid',
    referencedColumnName: 'companyid',
  })
  company: Company;

  @Column({ nullable: true })
  locationid: number;
  @ManyToOne(() => Location, (location) => location.locationid)
  @JoinColumn({
    name: 'locationid',
    referencedColumnName: 'locationid',
  })
  location: Location;

  @Column({ type: 'varchar', name: 'month', nullable: true })
  month: string;

  @Column({ type: 'varchar', name: 'year', nullable: true })
  year: string;

  @Column({ type: 'varchar', name: 'isdelete', nullable: true })
  isdelete: string;

  @OneToMany(
    () => TableApplicantPerGender,
    (applicantpergender) => applicantpergender.propertyid,
  )
  applicantpergender: TableApplicantPerGender[];

  @OneToMany(() => TableGenderAge, (genderage) => genderage.propertyid)
  genderage: TableGenderAge[];

  @OneToMany(() => TableEducation, (education) => education.propertyid)
  education: TableEducation[];

  @OneToMany(
    () => TableGradeEmployeeStatus,
    (gradeemployeestatus) => gradeemployeestatus.propertyid,
  )
  gradeemployeestatus: TableGradeEmployeeStatus[];

  @OneToMany(
    () => TableEmployeeByGender,
    (employeebygender) => employeebygender.propertyid,
  )
  employeebygender: TableEmployeeByGender[];

  @OneToMany(
    () => TableNewEmployeePerGender,
    (newemployeepergender) => newemployeepergender.propertyid,
  )
  newemployeepergender: TableNewEmployeePerGender[];

  @OneToMany(
    () => TableOutsourcingPerGender,
    (outsourcingpergender) => outsourcingpergender.propertyid,
  )
  outsourcingpergender: TableOutsourcingPerGender[];

  @OneToMany(() => TableTenure, (tenure) => tenure.propertyid)
  tenure: TableTenure[];

  @OneToMany(
    () => TableTrainingHourGender,
    (traininghour) => traininghour.propertyid,
  )
  traininghour: TableTrainingHourGender[];

  @OneToMany(
    () => TableTrainingHourJobGroup,
    (traininghourjob) => traininghourjob.propertyid,
  )
  traininghourjob: TableTrainingHourJobGroup[];

  @OneToMany(
    () => TableTurnOverTerminationType,
    (turnoverterminationtype) => turnoverterminationtype.propertyid,
  )
  turnoverterminationtype: TableTurnOverTerminationType[];
}