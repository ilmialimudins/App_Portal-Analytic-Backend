import { AbstractEntity } from 'src/common/abstract.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { MasterEducationDto } from './dto/master-mps-education.dto';
import { UseDto } from 'src/decorators/use-dto.decorator';
import { TableEducation } from '../table-mps-education/table-mps-education.entity';

@Entity('ms_mps_education')
@UseDto(MasterEducationDto)
export class MasterEducation extends AbstractEntity<MasterEducationDto> {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'educationid' })
  educationid: number;

  @Column({ type: 'varchar', name: 'code', nullable: true })
  code: string;

  @Column({ type: 'varchar', name: 'education', nullable: true })
  education: string;

  @Column({ type: 'varchar', name: 'description', nullable: true })
  description: string;

  @Column({ type: 'varchar', name: 'isdelete', nullable: true })
  isdelete: string;

  @OneToMany(() => TableEducation, (education) => education.educationid)
  tbleducation: TableEducation[];
}
