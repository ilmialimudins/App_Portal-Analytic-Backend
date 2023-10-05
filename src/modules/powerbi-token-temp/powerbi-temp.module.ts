import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PowerBI } from './powerbi-temp.entity';
import { PowerBIService } from './powerbi-temp.service';
import { PowerBIController } from './powerbi-temp.controller';

@Module({
  imports: [TypeOrmModule.forFeature([PowerBI])],
  providers: [PowerBIService],
  controllers: [PowerBIController],
})
export class PowerBIModule {}
