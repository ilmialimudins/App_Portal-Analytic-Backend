import { Column, Entity } from 'typeorm';
import { UseDto } from 'src/decorators/use-dto.decorator';
import { PredEngagementValueDto } from './dto/pred-engagement-value.dto';
import { AbstractEntity } from 'src/common/abstract.entity';

@Entity('tbl_pred_engagementvalue')
@UseDto(PredEngagementValueDto)
export class PredEngagementValue extends AbstractEntity<PredEngagementValueDto> {
  @Column({ type: 'varchar', name: 'demography', nullable: true })
  demography: string;

  @Column({
    type: 'varchar',
    name: 'avg_respondentanswer_after',
    nullable: true,
  })
  avg_respondentanswer_after: number;

  @Column({ type: 'varchar', name: 'd_surveygizmoid', nullable: true })
  d_surveygizmoid: string;

  @Column({ type: 'varchar', name: 'd_companyid', nullable: true })
  d_companyid: string;

  @Column({ type: 'varchar', name: 'demographyvalue', nullable: true })
  demographyvalue: string;

  @Column({ type: 'varchar', name: 'd_factorid', nullable: true })
  d_factorid: string;

  @Column({ type: 'varchar', name: 'tahunsurvey', nullable: true })
  tahunsurvey: string;

  @Column({
    type: 'varchar',
    name: 'avg_respondentanswer_before',
    nullable: true,
  })
  avg_respondentanswer_before: number;

  @Column({ type: 'varchar', name: 'count_respondent', nullable: true })
  count_respondent: string;
}
