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
import { NgramDto } from './dto/ngram.dto';
import { MasterQcode } from '../master-qcode/master-qcode.entity';
import { MasterWord } from '../master-word/master-word.entity';

@Entity('tbl_employeeopinionngram')
@UseDto(NgramDto)
export class Ngram extends AbstractEntity<NgramDto> {
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

  @Column({ nullable: true })
  qcodeid: number;
  @ManyToOne(() => MasterQcode, (qcode) => qcode.qcodeid)
  @JoinColumn({
    name: 'qcodeid',
    referencedColumnName: 'qcodeid',
  })
  qcode: MasterQcode;

  @Column({ nullable: true })
  wordid: number;
  @ManyToOne(() => MasterWord, (word) => word.wordid)
  @JoinColumn({
    name: 'wordid',
    referencedColumnName: 'wordid',
  })
  word: MasterWord;

  @Column({ type: 'int', name: 'n', nullable: true })
  n: number;

  @Column({ type: 'varchar', name: 'ngram', nullable: true })
  ngram: string;

  @Column({ type: 'int', name: 'ngramfrequency', nullable: true })
  ngramfrequency: number;

  @Column({ type: 'int', name: 'wordrank', nullable: true })
  wordrank: number;

  @Column({ type: 'varchar', name: 'isDelete', nullable: true })
  isdelete: string;
}
