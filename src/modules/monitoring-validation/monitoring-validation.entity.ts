import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('tbl_monitoringvalidation')
export class MonitoringValidation {
  @PrimaryColumn({ type: 'uuid', insert: false, select: false, update: false })
  id: never;

  @Column({ type: 'varchar', name: 'uploadby', nullable: true })
  uploadby: string;

  @Column({ type: 'varchar', name: 'uploadtime', nullable: true })
  uploadtime: string;

  @Column({ type: 'varchar', name: 'statusprogress', nullable: true })
  statusprogress: string;

  @Column({ type: 'varchar', name: 'exceltitle', nullable: true })
  exceltitle: string;

  @Column({ type: 'varchar', name: 'company', nullable: true })
  company: string;

  @Column({ type: 'varchar', name: 'year', nullable: true })
  year: string;

  @Column({ type: 'varchar', name: 'suvreytitle', nullable: true })
  surveytitle: string;

  @Column({ type: 'datetime2', name: 'createdtime', nullable: true })
  createdtime: Date;
}
