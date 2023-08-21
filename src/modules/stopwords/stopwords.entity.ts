import {
  Column,
  Entity,
  Generated,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { MasterCompanyEES } from '../master-company-ees/master-company-ees.entity';
import { AbstractEntity } from 'src/common/abstract.entity';

@Entity('tbl_stopwords')
export class Stopwords extends AbstractEntity {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
  id: number;

  @Column()
  @Generated('uuid')
  uuid: string;

  @Column({ nullable: true })
  companyid: number;
  @ManyToOne(
    () => MasterCompanyEES,
    (mastercompanyees) => mastercompanyees.companyid,
  )
  @JoinColumn({
    name: 'companyid',
    referencedColumnName: 'companyid',
  })
  mastercompanyees: MasterCompanyEES;

  @Column({ type: 'int', name: 'tahun_survey', nullable: true })
  tahun_survey: number;

  @Column({ type: 'varchar', name: 'stopwords', nullable: true })
  stopwords: string;

  @Column({ type: 'varchar', name: 'isDelete', nullable: true })
  isDelete: string;
}
