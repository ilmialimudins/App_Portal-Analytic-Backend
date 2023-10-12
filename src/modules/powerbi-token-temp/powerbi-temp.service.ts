import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PowerBI } from './powerbi-temp.entity';
import { Repository } from 'typeorm';
import { UpdatePowerBIID } from './dto/update-powerbi-temp.dto';
import { PowerBIDto } from './dto/powerbi-temp.dto';

@Injectable()
export class PowerBIService {
  constructor(
    @InjectRepository(PowerBI)
    private powerBIRepository: Repository<PowerBI>,
  ) {}

  async getAllPowerBI(): Promise<{ query: PowerBIDto[] }> {
    try {
      const query = await this.powerBIRepository
        .createQueryBuilder('powerbiid')
        .select(['pbiid', 'access_token', 'dashboard'])
        .getRawMany();

      return { query };
    } catch (error) {
      throw error;
    }
  }

  async updatePowerBIID(pbiid: number, powerbi: UpdatePowerBIID) {
    try {
      const query = await this.powerBIRepository
        .createQueryBuilder()
        .update(PowerBI)
        .set({
          access_token: powerbi.access_token,
          dashboard: powerbi.dashboard,
        })
        .where('pbiid = :pbiid', { pbiid })
        .execute();

      return query;
    } catch (error) {
      throw error;
    }
  }
}
