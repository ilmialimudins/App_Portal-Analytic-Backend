import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OwnershipStatus } from './master-ownership-status.entity';
import { OwnershipStatusService } from './master-ownership-status.service';
import { OwnershipStatusController } from './master-ownership-status.controller';

@Module({
  imports: [TypeOrmModule.forFeature([OwnershipStatus])],
  providers: [OwnershipStatusService],
  controllers: [OwnershipStatusController],
})
export class OwnershipStatusModule {}
