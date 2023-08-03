import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { UseDto } from 'src/decorators/use-dto.decorator';
import { AbstractEntity } from 'src/common/abstract.entity';
import { DemographyDto } from './dto/master-demography.dto';

@Entity('ms_demography')
@UseDto(DemographyDto)
export class Demography extends AbstractEntity<DemographyDto> {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'demographyid' })
  demographyid: number;

  @Column({ type: 'bigint', name: 'demographycode', nullable: false })
  demographycode: number;

  @Column({ type: 'varchar', name: 'demographydesc', nullable: false })
  demographydesc: string;

  @Column({ type: 'varchar', name: 'demographyalias', nullable: false })
  demographyalias: string;

  @Column({ type: 'int', name: 'urutanfilter', nullable: false })
  urutanfilter: number;

  @Column({ type: 'varchar', name: 'desc', nullable: true })
  desc: string;
}
