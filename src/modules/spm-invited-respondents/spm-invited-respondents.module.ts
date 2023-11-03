import { Module } from '@nestjs/common';
import { SpmInvitedRespondentsController } from './spm-invited-respondents.controller';
import { SpmInvitedRespondentsService } from './spm-invited-respondents.service';
import { InvitedRespondents } from './spm-invited-respondents.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Demography } from '../master-demography/master-demography.entity';

@Module({
  imports: [TypeOrmModule.forFeature([InvitedRespondents, Demography])],
  controllers: [SpmInvitedRespondentsController],
  providers: [SpmInvitedRespondentsService],
})
export class SpmInvitedRespondentsModule {}
