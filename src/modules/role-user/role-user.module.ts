import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleUser } from './role-user.entity';
import { RoleUserService } from './role-user.service';
import { RoleUserController } from './role-user.controller';
import { SyncRoleUserTransaction } from './sync-role-user.transaction';

@Module({
  imports: [TypeOrmModule.forFeature([RoleUser]), SyncRoleUserTransaction],
  providers: [RoleUserService],
  controllers: [RoleUserController],
  exports: [RoleUserService],
})
export class RoleUserModule {}
