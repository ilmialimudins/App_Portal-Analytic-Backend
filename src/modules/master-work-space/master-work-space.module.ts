import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MasterWorkSpace } from './master-work-space.entity';
import { MasterWorkSpaceService } from './master-work-space.service';
import { MasterWorkSpaceController } from './master-work-space.controller';

@Module({
  imports: [TypeOrmModule.forFeature([MasterWorkSpace])],
  providers: [MasterWorkSpaceService],
  controllers: [MasterWorkSpaceController],
})
export class MasterWorkSpaceModule {}
