import { Module } from '@nestjs/common';
import { PredEngagamentValueService } from './pred-engagement-value.service';
import { PredEngagementValueController } from './pred-engagement-value.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PredEngagementValue } from './pred-engagement-value.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PredEngagementValue])],
  providers: [PredEngagamentValueService],
  controllers: [PredEngagementValueController],
})
export class PredEngagamentValueModule {}
