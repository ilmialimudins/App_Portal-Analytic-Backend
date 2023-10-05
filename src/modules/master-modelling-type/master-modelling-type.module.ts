import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ModellingType } from './master-modelling-type.entity';
import { ModellingTypeService } from './master-modelling-type.service';
import { ModellingTypeController } from './master-modelling-type.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ModellingType])],
  providers: [ModellingTypeService],
  controllers: [ModellingTypeController],
})
export class ModellingTypeModule {}
