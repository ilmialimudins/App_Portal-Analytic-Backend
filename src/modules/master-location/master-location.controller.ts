import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/guards/auth/auth.guard';
import { LocationService } from './master-location.service';
import { LocationDto } from './dto/master-location.dto';
import { AddLocationDto } from './dto/add-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';

@ApiBearerAuth()
@UseGuards(AuthGuard)
@ApiTags('Location')
@Controller('location')
export class LocationController {
  constructor(private locationService: LocationService) {}

  @Get('/')
  @ApiCreatedResponse({ type: LocationDto })
  async getLocation(
    @Query('page') page: number,
    @Query('take') take: number,
    @Query('location') location: string,
  ): Promise<{
    data: LocationDto[];
    page: number;
    take: number;
    itemCount: number;
    pageCount: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
  }> {
    return this.locationService.getAllLocation(page, take, location);
  }

  @Get('/getLocationId')
  @ApiCreatedResponse({ type: LocationDto })
  async getLocationId(
    @Query('locationid') locationid: number,
  ): Promise<LocationDto | undefined> {
    return this.locationService.getLocationId(locationid);
  }

  @Get('/getLastLocationCode')
  @ApiCreatedResponse({ type: LocationDto })
  async getLastLocationCode() {
    return this.locationService.getLastLocationCode();
  }

  @Post('/createLocation')
  @ApiCreatedResponse({ type: LocationDto })
  async createLocation(@Body() location: AddLocationDto) {
    return this.locationService.createLocation(location);
  }

  @Patch('/updateLocation')
  @ApiCreatedResponse({ type: LocationDto })
  async updateLocation(
    @Query('locationid') locationid: number,
    @Body() location: UpdateLocationDto,
  ) {
    return this.locationService.updateLocation(locationid, location);
  }

  @Delete('/deleteLocation')
  @ApiCreatedResponse({ type: LocationDto })
  async deleteLocation(@Query('locationid') locationid: number) {
    return this.locationService.deleteLocation(locationid);
  }
}
