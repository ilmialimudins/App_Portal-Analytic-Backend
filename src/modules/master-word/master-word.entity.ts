import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Ngram } from '../ngram/ngram.entity';
import { UseDto } from 'src/decorators/use-dto.decorator';
import { MasterWordDto } from './dto/master-word.dto';
import { AbstractEntity } from 'src/common/abstract.entity';

@Entity('ms_ees_word')
@UseDto(MasterWordDto)
export class MasterWord extends AbstractEntity<MasterWordDto> {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'wordid' })
  wordid: number;

  @Column({ type: 'varchar', name: 'h_wordhashkey', nullable: true })
  h_wordhashkey: string;

  @Column({ type: 'varchar', name: 'word', nullable: true })
  word: string;

  @Column({ type: 'varchar', name: 'isdelete', nullable: true })
  isdelete: string;

  @OneToMany(() => Ngram, (ngram) => ngram.wordid)
  ngram: Ngram[];
}
