import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Demography } from './master-demography.entity';
import { DemographyService } from './master-demography.service';
import { DemographyController } from './master-demography.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Demography])],
  providers: [DemographyService],
  controllers: [DemographyController],
})
export class DemographyModule {}
