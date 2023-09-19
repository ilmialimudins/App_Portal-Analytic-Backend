import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MasterMenu } from './master-menu.entity';
import { MasterMenuService } from './master-menu.service';
import { MasterMenuController } from './master-menu.controller';

@Module({
  imports: [TypeOrmModule.forFeature([MasterMenu])],
  providers: [MasterMenuService],
  controllers: [MasterMenuController],
})
export class MasterMenuModule {}
