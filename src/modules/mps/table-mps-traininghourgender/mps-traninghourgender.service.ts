import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TableTrainingHourGender } from './table-mps-traininghourgender.entity';
import { Repository } from 'typeorm';
import { MasterMPSGenderService } from '../master-mps-gender/master-mps-gender.service';

@Injectable()
export class MPSTraningHourGenderService {
  constructor(
    @InjectRepository(TableTrainingHourGender)
    private readonly trainingHourGenderRepository: Repository<TableTrainingHourGender>,

    @Inject(MasterMPSGenderService)
    private readonly masterMPSGenderService: MasterMPSGenderService,
  ) {}

  public async getTrainingHourGender(propertyid: number) {
    try {
      const result = await this.trainingHourGenderRepository
        .createQueryBuilder('traininghourgender')
        .leftJoin('traininghourgender.property', 'property')
        .leftJoin('traininghourgender.gender', 'gender')
        .select([
          'traininghourgender.id as id',
          'property.propertyid as propertyid',
          'property.year as year',
          'property.month as month',
          'gender.genderid as genderid',
          'gender.gender as gender',
          'traininghourgender.totalemployee as totalemployee',
          'traininghourgender.totaltraininghour as totaltraininghour',
        ])
        .where('property.propertyid = :id', { id: propertyid })
        .getRawMany();

      return result;
    } catch (error) {
      throw error;
    }
  }

  public async getDataForExcelTable(propertyid: number) {
    const trainingHourGenderData = await this.getTrainingHourGender(propertyid);
    const genderData = await this.masterMPSGenderService.getAllMPSGender();

    const rows = genderData.map((gender) => {
      let totalemployee: number | null = null;
      let totaltraininghour: number | null = null;

      const index = trainingHourGenderData.findIndex(
        (item) => item.genderid === gender.genderid,
      );

      if (index > -1) {
        totalemployee = trainingHourGenderData[index].totalemployee;
        totaltraininghour = trainingHourGenderData[index].totaltraininghour;
      }

      return { label: gender.gender, totalemployee, totaltraininghour };
    });

    return rows;
  }
}
