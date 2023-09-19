import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MasterSection } from './master-section.entity';
import { MasterSectionService } from './master-section.service';
import { MasterSectionController } from './master-section.controller';

@Module({
  imports: [TypeOrmModule.forFeature([MasterSection])],
  providers: [MasterSectionService],
  controllers: [MasterSectionController],
})
export class MasterSectionModule {}
