import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UseDto } from 'src/decorators/use-dto.decorator';
import { AbstractEntity } from 'src/common/abstract.entity';
import { DirectReviewDto } from './dto/master-direct-review.dto';
import { Company } from '../master-company-ees/master-company-ees.entity';
import { TableProperty } from '../mps/table-mps-property/table-mps-property.entity';

@Entity('ms_directreview')
@UseDto(DirectReviewDto)
export class DirectReview extends AbstractEntity<DirectReviewDto> {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'directreviewid' })
  directreviewid: number;

  @Column({ type: 'varchar', name: 'directreviewcode', nullable: false })
  directreviewcode: string;

  @Column({ type: 'varchar', name: 'directreviewdesc', nullable: false })
  directreviewdesc: string;

  @Column({ type: 'varchar', name: 'desc', nullable: true })
  desc: string;

  @OneToMany(() => Company, (company) => company.directreviewid)
  company: Company[];

  @OneToMany(() => TableProperty, (property) => property.directreviewid)
  property: TableProperty[];
}
