import { AbstractEntity } from 'src/common/abstract.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { MasterAgeGroupDto } from './dto/master-mps-agegroup.dto';
import { UseDto } from 'src/decorators/use-dto.decorator';
import { TableGenderAge } from '../table-mps-genderage/table-mps-genderage.entity';

@Entity('ms_mps_agegroup')
@UseDto(MasterAgeGroupDto)
export class MasterAgeGroup extends AbstractEntity<MasterAgeGroupDto> {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'agegroupid' })
  agegroupid: number;

  @Column({ type: 'varchar', name: 'code', nullable: true })
  code: string;

  @Column({ type: 'varchar', name: 'agegroup', nullable: true })
  agegroup: string;

  @Column({ type: 'varchar', name: 'description', nullable: true })
  description: string;

  @Column({ type: 'varchar', name: 'isdelete', nullable: true })
  isdelete: string;

  @OneToMany(() => TableGenderAge, (genderage) => genderage.agegroupid)
  genderage: TableGenderAge[];
}
