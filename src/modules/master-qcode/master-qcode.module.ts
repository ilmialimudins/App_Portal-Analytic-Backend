import { Module } from '@nestjs/common';
import { MasterQcodeService } from './master-qcode.service';
import { MasterQcodeController } from './master-qcode.controller';

@Module({
  controllers: [MasterQcodeController],
  providers: [MasterQcodeService]
})
export class MasterQcodeModule {}
