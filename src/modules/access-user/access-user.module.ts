import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccessUser } from './access-user.entity';
import { AccessUserService } from './access-user.service';
import { AccessUserController } from './access-user.controller';

@Module({
  imports: [TypeOrmModule.forFeature([AccessUser])],
  providers: [AccessUserService],
  controllers: [AccessUserController],
})
export class AccessUserModule {}
