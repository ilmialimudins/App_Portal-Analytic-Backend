import { Module } from '@nestjs/common';
import { FactorService } from './factor.service';
import { FactorController } from './factor.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EESFactor } from './factor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EESFactor])],
  providers: [FactorService],
  controllers: [FactorController],
})
export class FactorModule {}
