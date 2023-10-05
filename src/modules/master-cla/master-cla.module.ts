import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cla } from './master-cla.entity';
import { ClaService } from './master-cla.service';
import { ClaController } from './master-cla.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Cla])],
  providers: [ClaService],
  controllers: [ClaController],
})
export class ClaModule {}
