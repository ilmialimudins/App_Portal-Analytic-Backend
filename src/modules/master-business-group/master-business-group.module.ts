import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BusinessGroup } from './master-business-group.entity';
import { BusinessGroupService } from './master-business-group.service';
import { BusinessGroupController } from './master-business-group.controller';

@Module({
  imports: [TypeOrmModule.forFeature([BusinessGroup])],
  providers: [BusinessGroupService],
  controllers: [BusinessGroupController],
})
export class BusinessGroupModule {}
