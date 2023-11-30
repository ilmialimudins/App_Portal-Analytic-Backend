import { AbstractEntity } from 'src/common/abstract.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UseDto } from 'src/decorators/use-dto.decorator';
import { MasterNewHireDto } from './dto/master-mps-newhire.dto';
import { TableApplicantPerGender } from '../table-mps-applicantpergender/table-mps-applicantpergender.entity';
import { TableNewEmployeePerGender } from '../table-mps-newemployeepergender/table-mps-newemployeepergender.entity';
import { TableOutsourcingPerGender } from '../table-mps-outsourcingpergender/table-mps-outsourcingpergender.entity';

@Entity('ms_mps_newhire')
@UseDto(MasterNewHireDto)
export class MasterNewHire extends AbstractEntity<MasterNewHireDto> {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'newhireid' })
  newhireid: number;

  @Column({ type: 'varchar', name: 'code', nullable: true })
  code: string;

  @Column({ type: 'varchar', name: 'newhire', nullable: true })
  newhire: string;

  @Column({ type: 'varchar', name: 'description', nullable: true })
  description: string;

  @Column({ type: 'varchar', name: 'isdelete', nullable: true })
  isdelete: string;

  @OneToMany(
    () => TableApplicantPerGender,
    (applicantpergender) => applicantpergender.newhireid,
  )
  applicantpergender: TableApplicantPerGender[];

  @OneToMany(
    () => TableNewEmployeePerGender,
    (newemployeepergender) => newemployeepergender.newhireid,
  )
  newemployeepergender: TableNewEmployeePerGender[];

  @OneToMany(
    () => TableOutsourcingPerGender,
    (outsourcingpergender) => outsourcingpergender.newhireid,
  )
  outsourcingpergender: TableOutsourcingPerGender[];
}
