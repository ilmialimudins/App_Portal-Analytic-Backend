import { AbstractEntity } from 'src/common/abstract.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UseDto } from 'src/decorators/use-dto.decorator';
import { MasterTenureDto } from './dto/master-mps-tenure.dto';
import { TableTenure } from '../table-mps-tenure/table-mps-tenure.entity';

@Entity('ms_mps_tenure')
@UseDto(MasterTenureDto)
export class MasterTenure extends AbstractEntity<MasterTenureDto> {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'tenureid' })
  tenureid: number;

  @Column({ type: 'varchar', name: 'code', nullable: true })
  code: string;

  @Column({ type: 'varchar', name: 'tenure', nullable: true })
  tenure: string;

  @Column({ type: 'varchar', name: 'description', nullable: true })
  description: string;

  @Column({ type: 'varchar', name: 'isdelete', nullable: true })
  isdelete: string;

  @OneToMany(() => TableTenure, (tenure) => tenure.tenureid)
  tbltenure: TableTenure[];
}
