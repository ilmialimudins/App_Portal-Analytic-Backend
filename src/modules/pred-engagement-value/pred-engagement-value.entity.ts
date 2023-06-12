import { Column, Entity } from 'typeorm';
import { UseDto } from 'src/decorators/use-dto.decorator';
import { PredEngagementValueDto } from './dto/pred-engagement-value.dto';
import { AbstractEntity } from 'src/common/abstract.entity';

@Entity('tbl_pred_predictionengagement')
@UseDto(PredEngagementValueDto)
export class PredEngagementValue extends AbstractEntity<PredEngagementValueDto> {
  @Column({ type: 'varchar', name: 'demography', nullable: true })
  demography: string;

  @Column({ type: 'varchar', name: 'd_engagementid', nullable: true })
  d_engagementid: string;

  @Column({ type: 'varchar', name: 'd_surveygizmoid', nullable: true })
  d_surveygizmoid: string;

  @Column({ type: 'varchar', name: 'd_companyid', nullable: true })
  d_companyid: string;

  @Column({ type: 'varchar', name: 'd_factorid', nullable: true })
  d_factorid: string;

  @Column({ type: 'varchar', name: 'tahunsurvey', nullable: true })
  tahunsurvey: string;
}
