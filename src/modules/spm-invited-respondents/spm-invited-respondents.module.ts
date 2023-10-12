import { Module } from '@nestjs/common';
import { SpmInvitedRespondentsController } from './spm-invited-respondents.controller';
import { SpmInvitedRespondentsService } from './spm-invited-respondents.service';
import { InvitedRespondents } from './spm-invited-respondents.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([InvitedRespondents])],
  controllers: [SpmInvitedRespondentsController],
  providers: [SpmInvitedRespondentsService],
})
export class SpmInvitedRespondentsModule {}
