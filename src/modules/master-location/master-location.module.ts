import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LocationService } from './master-location.service';
import { LocationController } from './master-location.controller';
import { Location } from './master-location.entity';
import { CompanyModule } from '../master-company-ees/master-company-ees.module';

@Module({
  imports: [TypeOrmModule.forFeature([Location]), CompanyModule],
  providers: [LocationService],
  controllers: [LocationController],
})
export class LocationModule {}
