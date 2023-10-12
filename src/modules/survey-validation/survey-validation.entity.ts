import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('tbl_surveyvalidation')
export class SurveyValidation {
  @PrimaryColumn({ type: 'uuid', insert: false, select: false, update: false })
  id: never;

  @Column({ type: 'varchar', name: 'validation', nullable: false })
  validation: string;

  @Column({ type: 'varchar', name: 'company', nullable: false })
  company: string;

  @Column({ type: 'varchar', name: 'surveyid', nullable: false })
  surveyid: string;

  @Column({ type: 'varchar', name: 'titlesurvey', nullable: false })
  titlesurvey: string;

  @Column({ type: 'varchar', name: 'dateversion', nullable: false })
  dateversion: Date;

  @Column({ type: 'varchar', name: 'username', nullable: false })
  username: string;

  @Column({ type: 'varchar', name: 'validateddate', nullable: false })
  validateddate: Date;
}
