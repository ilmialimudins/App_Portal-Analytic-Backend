import { UseDto } from 'src/decorators/use-dto.decorator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { SurveyValidationDto } from './dto/survey-validation.dto';
import { AbstractEntity } from 'src/common/abstract.entity';

@Entity('tbl_surveyvalidation')
@UseDto(SurveyValidationDto)
export class SurveyValidation extends AbstractEntity<SurveyValidationDto> {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
  id: number;

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
