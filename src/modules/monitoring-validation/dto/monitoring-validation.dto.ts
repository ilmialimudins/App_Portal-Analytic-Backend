import { ApiProperty } from '@nestjs/swagger';
import { MonitoringValidation } from '../monitoring-validation.entity';
import { AbstractDto } from 'src/common/dto/abstract.dto';

export class MonitoringValidationDto extends AbstractDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  uploadby: string;

  @ApiProperty()
  uploadtime: string;

  @ApiProperty()
  statusprogress: string;

  @ApiProperty()
  exceltitle: string;

  @ApiProperty()
  company: string;

  @ApiProperty()
  year: string;

  @ApiProperty()
  surveytitle: string;

  constructor(monitoringValidationEntity: MonitoringValidation) {
    super(monitoringValidationEntity, { exludeFields: true });
    this.id = monitoringValidationEntity.id * 1;
    this.uploadby = monitoringValidationEntity.uploadby;
    this.uploadtime = monitoringValidationEntity.uploadtime;
    this.statusprogress = monitoringValidationEntity.statusprogress;
    this.exceltitle = monitoringValidationEntity.exceltitle;
    this.company = monitoringValidationEntity.company;
    this.year = monitoringValidationEntity.year;
    this.surveytitle = monitoringValidationEntity.surveytitle;
  }
}
