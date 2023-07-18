import { UseDto } from 'src/decorators/use-dto.decorator';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { MasterQcodeDTO } from './dto/master-qcode.dto';
import { AbstractEntity } from 'src/common/abstract.entity';
import { PredEngagementFavorable } from '../pred-engagement-favorable/pred-engagement-favorable.entity';

@Entity('ms_ees_qcode')
@UseDto(MasterQcodeDTO)
export class MasterQcode extends AbstractEntity<MasterQcodeDTO> {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'd_qcodeid' })
  d_qcodeid: number;

  @Column({ type: 'varchar', name: 'h_qcodehashkey', nullable: true })
  h_qcodehashkey: string;

  @Column({ type: 'varchar', name: 'qcode', nullable: true })
  qcode: string;

  @Column({ type: 'varchar', name: 'question', nullable: true, length: '500' })
  question: string;

  @Column({
    type: 'varchar',
    name: 'surveyquestion_type',
    nullable: true,
  })
  surveyquestion_type: string;

  @Column({
    type: 'varchar',
    name: 'new_qcode',
    nullable: true,
  })
  new_qcode: string;

  @Column({
    type: 'varchar',
    name: 'recordsource',
    nullable: true,
  })
  recordsource: string;

  @Column({
    type: 'varchar',
    name: 'loadenddate',
    nullable: true,
  })
  loadenddate: string;

  @OneToMany(
    () => PredEngagementFavorable,
    (engagementfavorable) => engagementfavorable.qcode,
  )
  engagementfavorable: PredEngagementFavorable[];
}
