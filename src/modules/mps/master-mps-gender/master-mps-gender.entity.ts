import { AbstractEntity } from 'src/common/abstract.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UseDto } from 'src/decorators/use-dto.decorator';
import { MasterGenderDto } from './dto/master-mps-gender.dto';
import { TableApplicantPerGender } from '../table-mps-applicantpergender/table-mps-applicantpergender.entity';
import { TableEducation } from '../table-mps-education/table-mps-education.entity';
import { TableEmployeeByGender } from '../table-mps-employeebygender/table-mps-employeebygender.entity';
import { TableGenderAge } from '../table-mps-genderage/table-mps-genderage.entity';
import { TableGradeEmployeeStatus } from '../table-mps-gradeemployeestatus/table-mps-gradeemployeestatus.entity';
import { TableNewEmployeePerGender } from '../table-mps-newemployeepergender/table-mps-newemployeepergender.entity';
import { TableOutsourcingPerGender } from '../table-mps-outsourcingpergender/table-mps-outsourcingpergender.entity';
import { TableTenure } from '../table-mps-tenure/table-mps-tenure.entity';
import { TableTrainingHourGender } from '../table-mps-traininghourgender/table-mps-traininghourgender.entity';
import { TableTurnOverTerminationType } from '../table-mps-turnoverterminationtype/table-mps-turnoverterminationtype.entity';

@Entity('ms_mps_gender')
@UseDto(MasterGenderDto)
export class MasterGender extends AbstractEntity<MasterGenderDto> {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'genderid' })
  genderid: number;

  @Column({ type: 'varchar', name: 'code', nullable: true })
  code: string;

  @Column({ type: 'varchar', name: 'gender', nullable: true })
  gender: string;

  @Column({ type: 'varchar', name: 'description', nullable: true })
  description: string;

  @Column({ type: 'varchar', name: 'isdelete', nullable: true })
  isdelete: string;

  @OneToMany(
    () => TableApplicantPerGender,
    (applicantpergender) => applicantpergender.genderid,
  )
  applicantpergender: TableApplicantPerGender[];

  @OneToMany(() => TableEducation, (education) => education.genderid)
  education: TableEducation[];

  @OneToMany(
    () => TableEmployeeByGender,
    (employeebygender) => employeebygender.genderid,
  )
  employeebygender: TableEmployeeByGender[];

  @OneToMany(() => TableGenderAge, (genderage) => genderage.genderid)
  genderage: TableGenderAge[];

  @OneToMany(
    () => TableGradeEmployeeStatus,
    (gradeemployeestatus) => gradeemployeestatus.genderid,
  )
  gradeemployeestatus: TableGradeEmployeeStatus[];

  @OneToMany(
    () => TableNewEmployeePerGender,
    (newemployeepergender) => newemployeepergender.genderid,
  )
  newemployeepergender: TableNewEmployeePerGender[];

  @OneToMany(
    () => TableOutsourcingPerGender,
    (outsourcingpergender) => outsourcingpergender.genderid,
  )
  outsourcingpergender: TableOutsourcingPerGender[];

  @OneToMany(() => TableTenure, (tenure) => tenure.genderid)
  tenure: TableTenure[];

  @OneToMany(
    () => TableTrainingHourGender,
    (traininghour) => traininghour.genderid,
  )
  traininghour: TableTrainingHourGender[];

  @OneToMany(
    () => TableTurnOverTerminationType,
    (turnoverterminationtype) => turnoverterminationtype.genderid,
  )
  turnoverterminationtype: TableTurnOverTerminationType[];
}
