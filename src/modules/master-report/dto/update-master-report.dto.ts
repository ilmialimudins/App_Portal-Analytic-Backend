import { PartialType } from '@nestjs/swagger';
import { AddMasterReportDto } from './add-master-report.dto';

export class UpdateMasterReportDto extends PartialType(AddMasterReportDto) {}
