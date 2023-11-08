import { UseDto } from 'src/decorators/use-dto.decorator';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SurveyValidationDto } from './dto/survey-validation.dto';
import { AbstractEntity } from 'src/common/abstract.entity';
import { CompleteCheckingSurvey } from '../checking-complete-survey/checking-complete-survey.entity';

@Entity('tbl_surveyvalidation')
@UseDto(SurveyValidationDto)
export class SurveyValidation extends AbstractEntity<SurveyValidationDto> {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
  id: number;

  @Column({ type: 'varchar', name: 'validation', nullable: false })
  validation: string;

  @Column({ type: 'varchar', name: 'company', nullable: false })
  company: string;

  @Column({ nullable: false })
  surveyid: string;
  @OneToOne(() => CompleteCheckingSurvey, (complete) => complete.surveyid)
  @JoinColumn({
    name: 'surveyid',
    referencedColumnName: 'surveyid',
  })
  complete: CompleteCheckingSurvey;

  @Column({ type: 'varchar', name: 'titlesurvey', nullable: false })
  titlesurvey: string;

  @Column({ type: 'varchar', name: 'dateversion', nullable: false })
  dateversion: Date;

  @Column({ type: 'varchar', name: 'username', nullable: false })
  username: string;

  @CreateDateColumn()
  validateddate: Date;
}
