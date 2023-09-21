import {
  Column,
  Entity,
  Generated,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Company } from '../master-company-ees/master-company-ees.entity';
import { AbstractEntity } from 'src/common/abstract.entity';
import { UseDto } from 'src/decorators/use-dto.decorator';
import { StopwordsDto } from './dto/stopwords.dto';

@Entity('tbl_stopwords')
@UseDto(StopwordsDto)
export class Stopwords extends AbstractEntity<StopwordsDto> {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
  id: number;

  @Column()
  @Generated('uuid')
  uuid: string;

  @Column({ nullable: true })
  companyid: number;
  @ManyToOne(() => Company, (company) => company.companyid)
  @JoinColumn({
    name: 'companyid',
    referencedColumnName: 'companyid',
  })
  company: Company;

  @Column({ type: 'int', name: 'tahun_survey', nullable: true })
  tahun_survey: number;

  @Column({ type: 'varchar', name: 'stopwords', nullable: true })
  stopwords: string;

  @Column({ type: 'varchar', name: 'isDelete', nullable: true })
  isdelete: string;
}
