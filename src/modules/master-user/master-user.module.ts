import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MasterUser } from './master-user.entity';
import { MasterUserService } from './master-user.service';
import { MasterUserController } from './master-user.controller';
import { RoleUserModule } from '../role-user/role-user.module';
import { AccessUserModule } from '../access-user/access-user.module';

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([MasterUser]),
    RoleUserModule,
    AccessUserModule,
  ],
  providers: [MasterUserService],
  controllers: [MasterUserController],
  exports: [MasterUserService],
})
export class MasterUserModule {}
