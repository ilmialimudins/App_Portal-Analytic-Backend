import { UseDto } from 'src/decorators/use-dto.decorator';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CheckingCompleteSurveyDto } from './dto/checking-complete-survey.dto';
import { AbstractEntity } from 'src/common/abstract.entity';
import { SurveyValidation } from '../survey-validation/survey-validation.entity';

@Entity('tbl_checkingcompletesurvey')
@UseDto(CheckingCompleteSurveyDto)
export class CompleteCheckingSurvey extends AbstractEntity<CheckingCompleteSurveyDto> {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
  id: number;

  @Column({ type: 'bigint', name: 'respondentid', nullable: true })
  respondentid: number;

  @Column({ type: 'varchar', name: 'surveyid', nullable: true })
  surveyid: string;

  @Column({ type: 'varchar', name: 'company', nullable: true })
  company: string;

  @Column({ type: 'varchar', name: 'validation', nullable: true })
  validation: string;

  @Column({ type: 'varchar', name: 'status', nullable: true })
  status: string;

  @Column({ type: 'varchar', name: 'isdelete', nullable: true })
  isdelete: string;

  @OneToOne(
    () => SurveyValidation,
    (surveyvalidation) => surveyvalidation.surveyid,
  )
  surveyvalidation: SurveyValidation[];
}
