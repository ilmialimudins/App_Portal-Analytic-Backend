import { Column, Entity } from 'typeorm';
import { UseDto } from 'src/decorators/use-dto.decorator';
import { FactorDto } from './dto/factor.dto';
import { AbstractEntity } from 'src/common/abstract.entity';

@Entity('tbl_ees_factor')
@UseDto(FactorDto)
export class EESFactor extends AbstractEntity<FactorDto> {
  @Column({ type: 'varchar', name: 'd_factorid', nullable: true })
  d_factorid: string;

  @Column({ type: 'varchar', name: 'h_factorhashkey', nullable: true })
  h_factorhashkey: string;

  @Column({ type: 'varchar', name: 'factorcode', nullable: true })
  factorcode: string;

  @Column({ type: 'varchar', name: 'factorname', nullable: true })
  factorname: string;

  @Column({ type: 'varchar', name: 'factor_shortname', nullable: true })
  factor_shortname: string;

  @Column({ type: 'varchar', name: 'category', nullable: true })
  category: string;

  @Column({ type: 'varchar', name: 'label', nullable: true })
  label: string;
}
