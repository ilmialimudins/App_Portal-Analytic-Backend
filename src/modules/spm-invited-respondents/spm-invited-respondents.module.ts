import { Module } from '@nestjs/common';
import { SpmInvitedRespondentsController } from './spm-invited-respondents.controller';
import { SpmInvitedRespondentsService } from './spm-invited-respondents.service';
import { InvitedRespondents } from './spm-invited-respondents.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Demography } from '../master-demography/master-demography.entity';
import { UploadSPMTransaction } from './upload-spm.transaction';
import { SaveAllSMPTransaction } from './save-all-spm.transaction';

@Module({
  imports: [TypeOrmModule.forFeature([InvitedRespondents, Demography])],
  controllers: [SpmInvitedRespondentsController],
  providers: [
    SpmInvitedRespondentsService,
    UploadSPMTransaction,
    SaveAllSMPTransaction,
  ],
})
export class SpmInvitedRespondentsModule {}
