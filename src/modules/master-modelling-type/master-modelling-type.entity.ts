import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UseDto } from 'src/decorators/use-dto.decorator';
import { AbstractEntity } from 'src/common/abstract.entity';
import { ModellingTypeDto } from './dto/master-modelling-type.dto';
import { Company } from '../master-company-ees/master-company-ees.entity';

@Entity('ms_modellingtype')
@UseDto(ModellingTypeDto)
export class ModellingType extends AbstractEntity<ModellingTypeDto> {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'modellingtypeid' })
  modellingtypeid: number;

  @Column({ type: 'varchar', name: 'modellingtypecode', nullable: false })
  modellingtypecode: string;

  @Column({ type: 'varchar', name: 'modellingtypedesc', nullable: false })
  modellingtypedesc: string;

  @Column({ type: 'varchar', name: 'desc', nullable: true })
  desc: string;

  @OneToMany(() => Company, (company) => company.modellingtypeid)
  company: Company[];
}
