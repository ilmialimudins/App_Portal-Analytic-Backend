import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MasterRole } from './master-role.entity';
import { MasterRoleService } from './master-role.service';
import { MasterRoleController } from './master-role.controller';

@Module({
  imports: [TypeOrmModule.forFeature([MasterRole])],
  providers: [MasterRoleService],
  controllers: [MasterRoleController],
})
export class MasterRoleModule {}
