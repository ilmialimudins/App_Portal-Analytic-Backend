import { PartialType } from '@nestjs/swagger';
import { AddMasterWorkSpaceDto } from './add-master-work-space.dto';

export class UpdateMasterWorkSpaceDto extends PartialType(
  AddMasterWorkSpaceDto,
) {}
