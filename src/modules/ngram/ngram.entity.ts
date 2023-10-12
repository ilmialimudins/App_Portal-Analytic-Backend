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

export enum QCodeEnum {
  FOR = 'FOR',
  UOR = 'UOR',
}

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

  @Column({ type: 'varchar', name: 'h_companyhashkey', nullable: true })
  h_companyhashkey: string;

  @Column({ type: 'varchar', name: 'h_surveygizmohashkey', nullable: true })
  h_surveygizmohashkey: string;

  @Column({ type: 'varchar', name: 'h_surveyquestionhashkey', nullable: true })
  h_surveyquestionhashkey: string;

  @Column({ type: 'varchar', name: 'h_wordhashkey', nullable: true })
  h_wordhashkey: string;

  @Column({ type: 'varchar', name: 'qcode', enum: QCodeEnum, nullable: true })
  qcode: QCodeEnum;

  @Column({ type: 'varchar', name: 'word', nullable: true })
  word: string;

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
