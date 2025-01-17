import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UseDto } from 'src/decorators/use-dto.decorator';
import { AbstractEntity } from 'src/common/abstract.entity';
import { ClaDto } from './dto/master-cla.dto';
import { Company } from '../master-company-ees/master-company-ees.entity';
import { TableProperty } from '../mps/table-mps-property/table-mps-property.entity';

@Entity('ms_cla')
@UseDto(ClaDto)
export class Cla extends AbstractEntity<ClaDto> {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'claid' })
  claid: number;

  @Column({ type: 'varchar', name: 'clacode', nullable: false })
  clacode: string;

  @Column({ type: 'varchar', name: 'cladesc', nullable: false })
  cladesc: string;

  @Column({ type: 'varchar', name: 'desc', nullable: true })
  desc: string;

  @OneToMany(() => Company, (company) => company.claid)
  company: Company[];

  @OneToMany(() => TableProperty, (property) => property.claid)
  property: TableProperty[];
}
