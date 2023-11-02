import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleMenu } from './role-menu.entity';
import { RoleMenuService } from './role-menu.service';
import { RoleMenuController } from './role-menu.controller';

@Module({
  imports: [TypeOrmModule.forFeature([RoleMenu])],
  providers: [RoleMenuService],
  controllers: [RoleMenuController],
  exports: [RoleMenuService],
})
export class RoleMenuModule {}
