import { Module } from '@nestjs/common';
import { MasterEngagementService } from './master-engagement.service';
import { MasterEngagementController } from './master-engagement.controller';

@Module({
  controllers: [MasterEngagementController],
  providers: [MasterEngagementService],
})
export class MasterEngagementModule {}
