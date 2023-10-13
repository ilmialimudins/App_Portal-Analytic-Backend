import { UseDto } from 'src/decorators/use-dto.decorator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { MonitoringValidationDto } from './dto/monitoring-validation.dto';
import { AbstractEntity } from 'src/common/abstract.entity';

@Entity('tbl_monitoringvalidation')
@UseDto(MonitoringValidationDto)
export class MonitoringValidation extends AbstractEntity<MonitoringValidationDto> {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
  id: number;

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
}
