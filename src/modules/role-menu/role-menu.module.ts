import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleMenu } from './role-menu.entity';
import { RoleMenuService } from './role-menu.service';
import { RoleMenuController } from './role-menu.controller';
import { MasterMenuModule } from '../master-menu/master-menu.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([RoleMenu]),
    forwardRef(() => MasterMenuModule),
  ],
  providers: [RoleMenuService],
  controllers: [RoleMenuController],
  exports: [RoleMenuService],
})
export class RoleMenuModule {}
