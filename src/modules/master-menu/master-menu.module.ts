import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MasterMenu } from './master-menu.entity';
import { MasterMenuService } from './master-menu.service';
import { MasterMenuController } from './master-menu.controller';
import { RoleMenuModule } from '../role-menu/role-menu.module';
import { RoleUserModule } from '../role-user/role-user.module';
import { MappingMenuReportModule } from '../mapping-menu-report/mapping-menu-report.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([MasterMenu]),
    RoleMenuModule,
    RoleUserModule,
    MappingMenuReportModule,
  ],
  providers: [MasterMenuService],
  controllers: [MasterMenuController],
})
export class MasterMenuModule {}
