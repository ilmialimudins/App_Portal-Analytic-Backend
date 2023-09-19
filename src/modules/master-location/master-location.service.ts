import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LocationDto } from './dto/master-location.dto';
import { Location } from './master-location.entity';
import { AddLocationDto } from './dto/add-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';

@Injectable()
export class LocationService {
  constructor(
    @InjectRepository(Location)
    private locationRepository: Repository<Location>,
  ) {}

  async getAllLocation(
    page: number,
    pageSize: number,
  ): Promise<{ data: LocationDto[]; total: number }> {
    try {
      const offset = (page - 1) * pageSize;

      const data = await this.locationRepository
        .createQueryBuilder('location')
        .select(['locationid', 'locationcode', 'locationdesc'])
        .where('location.isdelete = :isdelete', { isdelete: 'false' })
        .orderBy('locationcode')
        .offset(offset)
        .limit(pageSize)
        .getRawMany();

      const total = await this.locationRepository
        .createQueryBuilder('location')
        .select(['locationid', 'locationcode', 'locationdesc'])
        .getCount();

      return { data, total };
    } catch (error) {
      throw error;
    }
  }

  async getLocationName(
    page: number,
    pageSize: number,
    location: string,
  ): Promise<{ data: LocationDto[]; total: number }> {
    try {
      const offset = (page - 1) * pageSize;

      const data = await this.locationRepository
        .createQueryBuilder('location')
        .select(['locationid', 'locationcode', 'locationdesc'])
        .where('location.isdelete = :isdelete', { isdelete: 'false' })
        .andWhere('location.locationdesc = :location', { location })
        .orderBy('locationcode')
        .offset(offset)
        .limit(pageSize)
        .getRawMany();

      const total = await this.locationRepository
        .createQueryBuilder('location')
        .select(['locationid', 'locationcode', 'locationdesc'])
        .andWhere('location.locationdesc = :location', { location })
        .getCount();

      return { data, total };
    } catch (error) {
      throw error;
    }
  }

  async getLocationId(locationid: number): Promise<LocationDto | undefined> {
    try {
      const query = await this.locationRepository
        .createQueryBuilder('location')
        .where('location.locationid = :locationid', { locationid })
        .getOne();

      return query?.toDto();
    } catch (error) {
      throw error;
    }
  }

  async getLastLocationCode() {
    try {
      const query = await this.locationRepository
        .createQueryBuilder('location')
        .select('location.locationcode')
        .orderBy('location.locationcode', 'DESC')
        .getOne();

      return query;
    } catch (error) {
      throw error;
    }
  }

  async createLocation(location: AddLocationDto) {
    try {
      const query = await this.locationRepository
        .createQueryBuilder('location')
        .insert()
        .into(Location)
        .values({
          locationcode: location.locationcode,
          locationdesc: location.locationdesc,
          isdelete: 'false',
          createdtime: new Date(),
          sourcecreatedmodifiedtime: new Date(),
        })
        .execute();

      return query;
    } catch (error) {
      throw error;
    }
  }

  async updateLocation(locationid: number, location: UpdateLocationDto) {
    try {
      const query = await this.locationRepository
        .createQueryBuilder()
        .update(Location)
        .set({
          locationcode: location.locationcode,
          locationdesc: location.locationdesc,
        })
        .where('locationid = :locationid', { locationid })
        .execute();

      return query;
    } catch (error) {
      throw error;
    }
  }

  async deleteLocation(locationid: number) {
    try {
      const query = await this.locationRepository
        .createQueryBuilder()
        .update(Location)
        .set({ isdelete: 'true' })
        .where('locationid = :locationid', { locationid })
        .execute();

      return query;
    } catch (error) {
      throw error;
    }
  }
}
