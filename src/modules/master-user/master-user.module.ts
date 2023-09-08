import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MasterUser } from './master-user.entity';
import { MasterUserService } from './master-user.service';
import { MasterUserController } from './master-user.controller';

@Module({
  imports: [TypeOrmModule.forFeature([MasterUser])],
  providers: [MasterUserService],
  controllers: [MasterUserController],
})
export class MasterUserModule {}
