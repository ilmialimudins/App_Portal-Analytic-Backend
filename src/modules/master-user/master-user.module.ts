import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MasterUser } from './master-user.entity';
import { MasterUserService } from './master-user.service';
import { MasterUserController } from './master-user.controller';
@Global()
@Module({
  imports: [TypeOrmModule.forFeature([MasterUser])],
  providers: [MasterUserService],
  controllers: [MasterUserController],
  exports: [MasterUserService],
})
export class MasterUserModule {}
