import { Controller, UseGuards } from '@nestjs/common';
import { MasterEngagementService } from './master-engagement.service';

import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/guards/auth/auth.guard';

@ApiTags('Master Engagement')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('master-engagement')
export class MasterEngagementController {
  constructor(
    private readonly masterEngagementService: MasterEngagementService,
  ) {}
}
