import { Controller } from '@nestjs/common';
import { MasterEngagementService } from './master-engagement.service';

import { ApiTags } from '@nestjs/swagger';

@ApiTags('Master Engagement')
@Controller('master-engagement')
export class MasterEngagementController {
  constructor(
    private readonly masterEngagementService: MasterEngagementService,
  ) {}
}
