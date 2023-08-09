import { PartialType } from '@nestjs/swagger';
import { AddMasterCompanyEESDto } from './add-master-company-ees.dto';

export class UpdateMasterCompanyEESDto extends PartialType(
  AddMasterCompanyEESDto,
) {}
