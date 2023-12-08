import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MasterMenu } from './master-menu.entity';
import { MasterMenuService } from './master-menu.service';
import { MasterMenuController } from './master-menu.controller';
import { RoleMenuModule } from '../role-menu/role-menu.module';
import { RoleUserModule } from '../role-user/role-user.module';
import { MappingMenuReportModule } from '../mapping-menu-report/mapping-menu-report.module';
import { AddMasterMenuTransaction } from './add-master-menu.transaction';
import { EditMasterMenuTransaction } from './edit-master-menu.transaction';

@Module({
  imports: [
    TypeOrmModule.forFeature([MasterMenu]),
    forwardRef(() => RoleMenuModule),
    RoleUserModule,
    MappingMenuReportModule,
  ],
  providers: [
    MasterMenuService,
    AddMasterMenuTransaction,
    EditMasterMenuTransaction,
  ],
  controllers: [MasterMenuController],
  exports: [MasterMenuService],
})
export class MasterMenuModule {}
