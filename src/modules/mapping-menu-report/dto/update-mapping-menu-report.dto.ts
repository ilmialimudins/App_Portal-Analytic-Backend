import { PartialType } from '@nestjs/swagger';
import { AddMappingMenuReportDto } from './add-mapping-menu-report.dto';

export class UpdateMappingMenuReportDto extends PartialType(
  AddMappingMenuReportDto,
) {}
