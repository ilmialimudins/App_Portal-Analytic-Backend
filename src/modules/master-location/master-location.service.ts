import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LocationDto } from './dto/master-location.dto';
import { Location } from './master-location.entity';
import { AddLocationDto } from './dto/add-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { Company } from '../master-company-ees/master-company-ees.entity';

@Injectable()
export class LocationService {
  constructor(
    @InjectRepository(Location)
    private locationRepository: Repository<Location>,

    @InjectRepository(Company)
    private companyRepository: Repository<Company>,
  ) {}

  async getAllLocation(
    page: number,
    take: number,
    location?: string,
  ): Promise<{
    data: LocationDto[];
    page: number;
    take: number;
    itemCount: number;
    pageCount: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
  }> {
    try {
      const company = await this.companyRepository
        .createQueryBuilder('company')
        .select('company.locationid')
        .getMany();

      const offset = (page - 1) * take;

      let query = this.locationRepository
        .createQueryBuilder('location')
        .select(['locationid', 'locationcode', 'locationdesc']);

      if (location) {
        query = query.where('LOWER(location.locationdesc) LIKE :location', {
          location: `%${location.toLowerCase()}%`,
        });
      }

      const data = await query
        .andWhere('location.isdelete = :isdelete', { isdelete: false })
        .orderBy('location.sourcecreatedmodifiedtime', 'DESC')
        .offset(offset)
        .limit(take)
        .getRawMany();

      const dataWithStatus = data.map((item) => ({
        ...item,
        status: company.find((c) => c.locationid === item.locationid)
          ? 'isUsed'
          : 'isNotUsed',
      }));

      const itemCount = await query
        .andWhere('location.isdelete = :isdelete', { isdelete: false })
        .getCount();

      const pageCount = Math.ceil(itemCount / take);
      const hasPreviousPage = page > 1;
      const hasNextPage = page < pageCount;

      return {
        data: dataWithStatus,
        page,
        take,
        itemCount,
        pageCount,
        hasPreviousPage,
        hasNextPage,
      };
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

  async checkDuplicateLocation(location: string) {
    try {
      const query = await this.locationRepository
        .createQueryBuilder('location')
        .where('location.locationdesc = :location', { location })
        .andWhere('location.isdelete = :isdelete', { isdelete: false })
        .getOne();

      return query;
    } catch (error) {
      throw error;
    }
  }

  async getLastLocationCode() {
    try {
      const query = await this.locationRepository
        .createQueryBuilder('location')
        .select('location.locationcode')
        .orderBy('location.locationid', 'DESC')
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
