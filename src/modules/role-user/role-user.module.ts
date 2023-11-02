import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleUser } from './role-user.entity';
import { RoleUserService } from './role-user.service';
import { RoleUserController } from './role-user.controller';

@Module({
  imports: [TypeOrmModule.forFeature([RoleUser])],
  providers: [RoleUserService],
  controllers: [RoleUserController],
  exports: [RoleUserService],
})
export class RoleUserModule {}
