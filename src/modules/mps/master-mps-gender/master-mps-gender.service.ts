import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { MasterGender } from './master-mps-gender.entity';

@Injectable()
export class MasterMPSGenderService {
  constructor(
    @InjectRepository(MasterGender)
    private masterGenderRepo: Repository<MasterGender>,
  ) {}

  public async getAllMPSGender() {
    try {
      return this.masterGenderRepo.find({ where: { gender: Not('Kosong') } });
    } catch (error) {
      throw error;
    }
  }
}
