import { PartialType } from '@nestjs/swagger';
import { CreateMasterEngagementDto } from './create-master-engagement.dto';

export class UpdateMasterEngagementDto extends PartialType(
  CreateMasterEngagementDto,
) {}
